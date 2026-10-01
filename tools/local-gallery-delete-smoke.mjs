import assert from "node:assert/strict";
import { createServer } from "node:http";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
const base = process.env.ASSETFLOW_CDP_URL || "http://127.0.0.1:9239";
const targets = await (await fetch(base + "/json")).json();
const worker = targets.find(t => t.type === "service_worker" && t.url.endsWith("/background.js"));
const extensionId = process.env.ASSETFLOW_EXTENSION_ID || (worker && new URL(worker.url).host);
assert.ok(extensionId, "Load AssetFlow in an isolated browser Profile");
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const connections = [];
async function connect(target) {
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.addEventListener("open", resolve, {once:true}); socket.addEventListener("error", reject, {once:true}); });
  let seq=0; const pending=new Map(), errors=[];
  socket.addEventListener("message", ({data}) => {
    const message=JSON.parse(data);
    if(message.method==="Runtime.exceptionThrown") errors.push(message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text);
    if(message.id && pending.has(message.id)){pending.get(message.id)(message);pending.delete(message.id);}
  });
  const send=(method,params={})=>new Promise((resolve,reject)=>{
    const id=++seq, timer=setTimeout(()=>{pending.delete(id);reject(Error("CDP timeout: "+method));},25000);
    pending.set(id,response=>{clearTimeout(timer);response.error?reject(Error(JSON.stringify(response.error))):resolve(response.result);});
    socket.send(JSON.stringify({id,method,params}));
  });
  const evaluate=async code=>{
    const r=await send("Runtime.evaluate",{expression:"(async()=>{"+code+"})()",returnByValue:true,awaitPromise:true});
    if(r.exceptionDetails) throw Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
    return r.result?.value;
  };
  await send("Runtime.enable");
  const c={target,send,evaluate,errors,close:async()=>{socket.close();await fetch(base+"/json/close/"+target.id).catch(()=>{});}};
  connections.push(c);return c;
}
async function open(url){const target=await(await fetch(base+"/json/new?"+encodeURIComponent(url),{method:"PUT"})).json();return connect(target);}
async function wait(page,expr){for(let i=0;i<100;i++){if(await page.evaluate("return Boolean("+expr+");"))return;await sleep(100);}throw Error("wait: "+expr);}
async function panel(){const page=await open("chrome-extension://"+extensionId+"/popup.html?standalone=1");await wait(page,"Boolean(window.AssetFlowTemplateUI) && !isWorkspaceHydrating && Boolean(nodes.galleryGrid)");return page;}
const report={extensionId};let page,site,server;
try{
  page=await panel();
  await page.send("Emulation.setDeviceMetricsOverride",{width:472,height:920,deviceScaleFactor:1,mobile:false});
  const seed=await page.evaluate(`
    const url=chrome.runtime.getURL("assets/recipes/previews/product-commercial-kv.webp");
    const ref={id:"smoke-ref",name:"参考",width:768,height:1024,dimensionsVerified:true,roles:["subject"],rolesManual:true,assetSource:{kind:"local-file"}};
    window.smokeItems=[];
    for(let i=0;i<4;i++){
      const item=await persistGalleryItemImage({generationId:"delete-smoke-"+Date.now()+"-"+i,resultIndex:0,url,index:"#"+(i+1),model:"Smoke",width:768,height:1024,prompt:"蓝色海报",mode:"image",source:"image",
        assetLineage:{relationshipType:"image-to-image",sourceAssets:[{assetId:ref.id,order:1,roles:ref.roles,participation:"direct"}]},
        generationContext:{mode:"image",prompt:"蓝色海报",model:"Smoke",modelValue:nodes.modelSelect.value,options:{width:768,height:1024,sizeMode:"3-4",resolution:"1k",count:1},sourceImages:[ref],visualReuse:{notes:"蓝色海报"}}});
      upsertGalleryResult(null,item);smokeItems.push(item);
    }
    const recipe=AssetFlowUserRecipes.buildUserVisualRecipe(smokeItems[0]);
    await AssetFlowUserRecipes.saveUserRecipe(recipe,smokeItems[0]);
    const reverseRecipe=AssetFlowUserRecipes.buildUserVisualRecipe(smokeItems[1]);
    await AssetFlowUserRecipes.saveUserRecipe(reverseRecipe,smokeItems[1]);
    await AssetFlowUserRecipes.deleteUserRecipe(reverseRecipe.id);
    const reverse=Boolean(await AssetFlowUserRecipes.getGalleryItem(smokeItems[1].galleryId));
    return {id:smokeItems[0].galleryId,image:smokeItems[0].localStoreId,generation:smokeItems[0].generationId,recipe:recipe.id,preview:recipe.previewStoreId,reverse};
  `);
  assert.equal(await page.evaluate("return galleryItems.length;"),4);
  assert.ok(seed.reverse, "Deleting Recipe must preserve Gallery");
  assert.ok(await page.evaluate('const before=downloadImage;downloadImage=()=>{};document.querySelector(".gallery-download-btn").click();downloadImage=before;return nodes.lightbox.hidden;'));
  assert.ok(await page.evaluate(`galleryItems.unshift({isGenerating:true,generationId:"pending",model:"Pending",width:1024,height:1024,index:"#"});renderGallery();const ok=!document.querySelector(".gallery-card.is-generating .gallery-more-btn");galleryItems=galleryItems.filter(i=>!i.isGenerating);renderGallery();return ok;`));
  await page.evaluate("galleryPage=2;renderGallery();document.querySelector('.gallery-more-btn').click();");
  assert.ok(await page.evaluate("return nodes.lightbox.hidden && !document.querySelector('.gallery-item-menu').hidden;"));
  await page.evaluate("document.querySelector('.gallery-item-menu button').click();");
  mkdirSync(path.resolve(".codex-inspect/gallery-delete"),{recursive:true});
  const confirmShot=await page.send("Page.captureScreenshot",{format:"png"});
  writeFileSync(path.resolve(".codex-inspect/gallery-delete/confirm-472.png"),Buffer.from(confirmShot.data,"base64"));
  await page.evaluate("document.querySelector('#galleryDeleteCancel').click();");
  assert.equal(await page.evaluate("return galleryItems.length;"),4);
  await page.evaluate("document.querySelector('.gallery-more-btn').click();document.querySelector('.gallery-item-menu button').click();document.querySelector('#galleryDeleteSubmit').click();");
  await wait(page,"galleryItems.length===3");
  const card=await page.evaluate(`return {record:!!await withLocalGalleryStore("readonly",s=>requestToPromise(s.get(smokeItems[0].galleryId))),image:!!await imageFromIndexedDb(smokeItems[0].localStoreId),page:galleryPage,count:nodes.galleryMeta.textContent};`);
  assert.equal(card.record,false);assert.equal(card.image,false);assert.equal(card.page,1);assert.match(card.count,/3 张/);
  report.cardDelete=card;
  assert.ok(await page.evaluate("return Boolean((await AssetFlowUserRecipes.getUserRecipe("+JSON.stringify(seed.recipe)+")) && (await AssetFlowUserRecipes.getPreview("+JSON.stringify(seed.preview)+"))?.blob);"));
  await page.close();page=await panel();
  assert.equal(await page.evaluate("return galleryItems.filter(i=>!i.isGenerating).length;"),3);
  assert.equal(await page.evaluate("return galleryItems.some(i=>i.galleryId=="+JSON.stringify(seed.id)+");"),false);
  report.reopen=true;
  await page.evaluate("await chrome.storage.local.set({[COMPLETED_GENERATION_RESULTS_KEY]:[{id:'replay',status:'completed',task:{id:'replay',taskId:'task',provider:'apimart',generationId:"+JSON.stringify(seed.generation)+"},items:[{id:"+JSON.stringify(seed.id)+",galleryId:"+JSON.stringify(seed.id)+",localStoreId:"+JSON.stringify(seed.image)+",generationId:"+JSON.stringify(seed.generation)+",resultIndex:0}]}]});await consumeCompletedGenerationResults();");
  assert.equal(await page.evaluate("return galleryItems.some(i=>i.galleryId=="+JSON.stringify(seed.id)+");"),false);
  report.asyncReplay=true;
  server=createServer((_req,res)=>{res.writeHead(200,{"content-type":"text/html"});res.end("<!doctype html><title>Gallery smoke</title>");});
  await new Promise(resolve=>server.listen(0,"127.0.0.1",resolve));
  site=await open("http://127.0.0.1:"+server.address().port+"/");
  await site.send("Page.bringToFront");
  assert.ok(await page.evaluate("return await openPageLightbox(galleryItems.find(i=>!i.isGenerating));"));
  await wait(site,"Boolean(document.getElementById('image-spark-page-viewer'))");
  assert.ok(await site.evaluate(`const r=document.getElementById("image-spark-page-viewer").shadowRoot;return ["download","eagle","continue-trigger","save-recipe","delete-trigger","close"].every(x=>!!r.querySelector("."+x));`));
  await site.evaluate(`const r=document.getElementById("image-spark-page-viewer").shadowRoot;r.querySelector(".delete-trigger").click();r.querySelector(".delete-item").click();r.querySelector(".delete-submit").click();`);
  await wait(page,"galleryItems.filter(i=>!i.isGenerating).length===2");
  await wait(site,"document.getElementById('image-spark-page-viewer').shadowRoot.querySelector('.thumbs-count').textContent.includes('2')");
  report.pageViewerDelete=true;
  await page.evaluate("await closePageLightbox();await openLightbox(galleryItems.find(i=>!i.isGenerating),{forceLocal:true});");
  await page.evaluate("document.querySelector('#lightboxMoreBtn').click();document.querySelector('#lightboxDeleteBtn').click();document.querySelector('#galleryDeleteSubmit').click();");
  await wait(page,"galleryItems.filter(i=>!i.isGenerating).length===1");
  await wait(page,"!nodes.lightbox.hidden && Boolean(activeLightboxItem)");
  report.localViewerNext=true;
  await page.evaluate("document.querySelector('#lightboxMoreBtn').click();document.querySelector('#lightboxDeleteBtn').click();document.querySelector('#galleryDeleteSubmit').click();");
  await wait(page,"galleryItems.filter(i=>!i.isGenerating).length===0");
  assert.ok(await page.evaluate("return nodes.lightbox.hidden;"));
  report.localViewerClose=true;
  assert.ok(await page.evaluate("return Boolean((await AssetFlowUserRecipes.getUserRecipe("+JSON.stringify(seed.recipe)+")) && (await AssetFlowUserRecipes.getPreview("+JSON.stringify(seed.preview)+"))?.blob);"));
  report.recipeIsolation=true;
  const legacy=await page.evaluate('const legacy={url:chrome.runtime.getURL("assets/recipes/previews/product-commercial-kv.webp")+"?legacy="+Date.now(),model:"Legacy",width:768,height:1024,index:"#old"};localStorage.setItem(GALLERY_STORAGE_KEY,JSON.stringify([legacy]));galleryItems=loadStoredGalleryItems();renderGallery();await deleteGalleryItem(galleryItems[0]);return galleryItems.length;');
  assert.equal(legacy,0);
  await page.close();page=await panel();
  assert.equal(await page.evaluate("return galleryItems.length;"),0);
  report.legacyUrlOnly=true;
  report.consoleErrors=connections.flatMap(c=>c.errors);assert.deepEqual(report.consoleErrors,[]);
  const out=path.resolve(".codex-inspect/gallery-delete");mkdirSync(out,{recursive:true});writeFileSync(path.join(out,"result.json"),JSON.stringify(report,null,2));
  console.log(JSON.stringify(report,null,2));
}finally{for(const c of connections)await c.close().catch(()=>{});if(server){server.closeAllConnections();await new Promise(resolve=>server.close(resolve));}}
process.exit(0);
