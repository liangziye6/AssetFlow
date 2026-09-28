// Run against a fresh Edge/Chrome profile with this repository's unpacked extension loaded.
// Example: node tools/local-recipe-smoke.mjs style-composition-transfer '["product-source.webp","style-composition-layout.webp","style-composition-style.webp"]' testing
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const base = process.env.ASSETFLOW_CDP_URL || "http://127.0.0.1:9229";
const targets = await (await fetch(base+"/json")).json();
const worker = targets.find(x => x.type === "service_worker" && x.url.endsWith("/background.js"));
const extid = process.env.ASSETFLOW_EXTENSION_ID || (worker && new URL(worker.url).host);
if (!extid) throw new Error("Set ASSETFLOW_EXTENSION_ID when the extension service worker is sleeping.");
const target = await (await fetch(base+"/json/new?"+encodeURIComponent("chrome-extension://"+extid+"/popup.html"),{method:"PUT"})).json();
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve,reject)=>{ws.addEventListener("open",resolve,{once:true});ws.addEventListener("error",reject,{once:true});});
let seq=0; const pending=new Map();
ws.addEventListener("message",e=>{const m=JSON.parse(e.data); if(m.id&&pending.has(m.id)){pending.get(m.id)(m);pending.delete(m.id);}});
function send(method,params={}){return new Promise(resolve=>{const id=++seq; pending.set(id,resolve); ws.send(JSON.stringify({id,method,params}));});}
async function ev(expr) {
 const r=await send("Runtime.evaluate",{expression:"(async()=>{"+expr+"})()",returnByValue:true,awaitPromise:true});
 if(r.result?.exceptionDetails) throw new Error(r.result.exceptionDetails.text+" "+r.result.exceptionDetails.exception?.description);
 return r.result?.result?.value;
}
const pause = ms => new Promise(r=>setTimeout(r,ms));
await pause(1600);

const recipeId=process.argv[2];
const filenames=JSON.parse(process.argv[3]);
const status=process.argv[4];
if (!recipeId || !Array.isArray(filenames) || !filenames.length || !["testing", "verified"].includes(status)) {
  throw new Error("Usage: node tools/local-recipe-smoke.mjs <recipeId> <JSON array of source filenames> <testing|verified>");
}
const recipes = JSON.parse(readFileSync(new URL("../recipes/visual-recipes.json", import.meta.url), "utf8"));
const recipe = recipes.find((item) => item.id === recipeId);
assert.ok(recipe, "Recipe missing from local source");
let out={extension:extid,recipeId};
out.open=await ev('AssetFlowTemplateUI.open(); await new Promise(r=>setTimeout(r,600)); document.querySelector("[data-template-type=visual_recipe]").click(); return {initialImages:imageItems.length};');
if(status==="testing") await ev('document.querySelector("#templateResearchBtn").click();return true;');
out.detail=await ev('const card=document.querySelector("[data-recipe-id='+recipeId+']");if(!card)throw Error("recipe card missing");card.click();return {status:document.querySelector("#templatePreview").innerText.includes("测试中"),actions:[...document.querySelectorAll("#templatePreview button")].map(x=>x.textContent),roles:document.querySelector("#templatePreview").innerText.match(/图[123].*/g)};');
out.apply=await ev('document.querySelector("#templatePreview .template-use-btn").click(); return {method:promptMethod,drawerHidden:document.querySelector("#templateDrawer").hidden,notes:document.querySelector("#visualReuseNotes").value.length,images:imageItems.length};');
out.upload=await ev('const names='+JSON.stringify(filenames)+'; const files=await Promise.all(names.map(async name=>{let b=await (await fetch(chrome.runtime.getURL("assets/recipes/sources/"+name))).blob();return new File([b],name,{type:"image/webp"});}));const dt=new DataTransfer();files.forEach(f=>dt.items.add(f));const input=document.querySelector("#fileInput");input.files=dt.files;input.dispatchEvent(new Event("change",{bubbles:true}));for(let i=0;i<50&&imageItems.length<names.length;i++)await new Promise(r=>setTimeout(r,100));return {images:imageItems.map(x=>({name:x.name,roles:x.visualReuseRoles,manual:x.visualReuseRolesManual,width:x.width,height:x.height})),button:document.querySelector("#visualReusePlanBtn").textContent};');
out.plan=await ev('document.querySelector("#visualReusePlanBtn").click(); await new Promise(r=>setTimeout(r,1100)); return {hidden:document.querySelector("#visualReusePlan").hidden,status:document.querySelector("#visualReusePlanStatus").textContent,feedback:document.querySelector("#statusText").textContent};');
assert.equal(out.open.initialImages, 0, "Use a fresh browser profile for this smoke test");
assert.equal(out.apply.method, "reuse");
assert.equal(out.apply.drawerHidden, true);
assert.ok(out.apply.notes > 0);
assert.deepEqual(out.upload.images.map((image) => image.roles[0]),
  recipe.references.slice(0, filenames.length).map((reference) => reference.role));
assert.ok(out.upload.images.every((image) => image.width > 0 && image.height > 0));
if (process.env.ASSETFLOW_EXPECT_NO_API === "1") {
  assert.equal(out.plan.feedback, "请先保存反推提示词 API 设置。");
}
console.log(JSON.stringify(out,null,2));
ws.close();
