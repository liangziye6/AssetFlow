// Run against a fresh Edge/Chrome profile with this repository's unpacked extension loaded.
import assert from "node:assert/strict";

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

let out={extension:extid};
out.open=await ev('AssetFlowTemplateUI.open(); await new Promise(r=>setTimeout(r,700)); return {count:document.querySelectorAll(".template-card").length,mode:document.querySelector("#templateModeLabel").textContent};');
out.search=await ev('const s=document.querySelector("#templateSearch"); s.value="角色电影";s.dispatchEvent(new Event("input",{bubbles:true})); return [...document.querySelectorAll(".template-card")].map(x=>x.dataset.recipeId);');
out.detail=await ev('document.querySelector("[data-recipe-id=character-film-bible]").click(); await new Promise(r=>setTimeout(r,350)); return {name:document.querySelector("#templatePreview h3").textContent,image:document.querySelector("#templatePreview .template-detail-image")?.complete,buttons:[...document.querySelectorAll("#templatePreview button")].map(x=>x.textContent),similar:[...document.querySelectorAll("#templatePreview .template-similar a")].map(x=>x.textContent)};');
out.back=await ev('document.querySelector("#templatePreview .template-back-btn").click(); return {browseVisible:!document.querySelector("#templateBrowse").hidden,search:document.querySelector("#templateSearch").value};');
out.apply=await ev('document.querySelector("[data-recipe-id=character-film-bible] .template-use-btn").click(); return {drawerHidden:document.querySelector("#templateDrawer").hidden,method:promptMethod,prompt:document.querySelector("#promptInput").value.slice(0,140)};');
out.copy=await ev('AssetFlowTemplateUI.open(); await new Promise(r=>setTimeout(r,300));const s=document.querySelector("#templateSearch");s.value="角色电影";s.dispatchEvent(new Event("input",{bubbles:true}));document.querySelector("[data-recipe-id=character-film-bible] .template-copy-btn").click();await new Promise(r=>setTimeout(r,250));return {feedback:document.querySelector("#templateFeedback").textContent};');
assert.equal(out.open.count, 12);
assert.deepEqual(out.search, ["character-film-bible"]);
assert.equal(out.detail.name, "角色电影设定 Bible");
assert.equal(out.detail.image, true);
assert.equal(out.back.browseVisible, true);
assert.equal(out.apply.drawerHidden, true);
assert.ok(out.apply.prompt.includes("电影角色设定页"));
assert.equal(out.copy.feedback, "已复制 Prompt");
console.log(JSON.stringify(out,null,2));
ws.close();
