import assert from "node:assert/strict";
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";
const base = process.env.ASSETFLOW_CDP_URL || "http://127.0.0.1:9237";
const outDir = path.resolve(process.env.ASSETFLOW_SMOKE_OUTPUT || ".codex-inspect/user-recipes");
mkdirSync(outDir, { recursive: true });
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const connections = [];
async function connect(target) {
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.addEventListener("open", resolve, { once: true }); socket.addEventListener("error", reject, { once: true }); });
  let sequence = 0;
  const pending = new Map(), errors = [];
  socket.addEventListener("message", ({ data }) => {
    const message = JSON.parse(data);
    if (message.method === "Runtime.exceptionThrown") errors.push(message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text);
    if (message.id && pending.has(message.id)) { pending.get(message.id)(message); pending.delete(message.id); }
  });
  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = ++sequence;
      const timer = setTimeout(() => { pending.delete(id); reject(new Error("CDP timeout: " + method)); }, 25000);
      pending.set(id, (response) => { clearTimeout(timer); response.error ? reject(new Error(JSON.stringify(response.error))) : resolve(response.result); });
      socket.send(JSON.stringify({ id, method, params }));
    });
  }
  async function evaluate(code) {
    const response = await send("Runtime.evaluate", { expression: "(async()=>{" + code + "})()", returnByValue: true, awaitPromise: true });
    if (response.exceptionDetails) throw new Error(response.exceptionDetails.exception?.description || response.exceptionDetails.text);
    return response.result?.value;
  }
  await send("Runtime.enable");
  let closed = false;
  const connection = { target, send, evaluate, errors, close: async () => { if (closed) return; closed = true; socket.close(); await fetch(base + "/json/close/" + target.id, { signal: AbortSignal.timeout(3000) }); } };
  connections.push(connection);
  return connection;
}
const targets = await (await fetch(base + "/json")).json();
const worker = targets.find((target) => target.type === "service_worker" && target.url.endsWith("/background.js"));
const extid = process.env.ASSETFLOW_EXTENSION_ID || (worker && new URL(worker.url).host);
if (!extid) throw new Error("Load this unpacked extension in an isolated test Profile before running this smoke.");
async function openPage(url) {
  const target = await (await fetch(base + "/json/new?" + encodeURIComponent(url), { method: "PUT" })).json();
  return connect(target);
}
async function panel() {
  const page = await openPage("chrome-extension://" + extid + "/popup.html?standalone=1");
  for (let i = 0; i < 100; i++) {
    if (await page.evaluate("return Boolean(window.AssetFlowTemplateUI) && !isWorkspaceHydrating;")) return page;
    await sleep(100);
  }
  throw new Error("Panel did not initialize");
}
async function waitFor(page, expression, message) {
  for (let i = 0; i < 100; i++) {
    if (await page.evaluate("return Boolean(" + expression + ");")) return;
    await sleep(100);
  }
  throw new Error(message || expression);
}
async function screenshot(page, filename, width = 472) {
  await page.send("Emulation.setDeviceMetricsOverride", { width, height: 920, deviceScaleFactor: 1, mobile: false });
  await sleep(250);
  const shot = await page.send("Page.captureScreenshot", { format: "png" });
  writeFileSync(path.join(outDir, filename), Buffer.from(shot.data, "base64"));
  assert.equal(await page.evaluate("return document.documentElement.scrollWidth > innerWidth;"), false, "Horizontal overflow at " + width);
}
const report = { extensionId: extid, providerCalls: "mocked at existing analysis/generation boundary; no live Provider calls" };
let server;
try {
  if (process.argv.includes("--native-panel-reopen")) {
    const controller = await panel();
    const windowId = await controller.evaluate("return (await chrome.windows.getCurrent()).id;");
    const expected = JSON.parse(readFileSync(path.join(outDir, "result.json"), "utf8"));
    await controller.evaluate("await chrome.sidePanel.close({windowId:" + windowId + "});");
    await sleep(300);
    const snapshots = [];
    for (let attempt = 0; attempt < 2; attempt++) {
      const before = new Set((await (await fetch(base + "/json")).json()).map(target => target.id));
      const opened = await controller.send("Runtime.evaluate", {
        expression: "chrome.sidePanel.open({windowId:" + windowId + "}).then(()=>true)",
        awaitPromise: true, returnByValue: true, userGesture: true
      });
      assert.equal(opened.result?.value, true);
      let target;
      for (let i = 0; i < 50 && !target; i++) {
        const current = await (await fetch(base + "/json")).json();
        target = current.find(candidate => !before.has(candidate.id) && candidate.url.includes(extid + "/popup.html"));
        if (!target) await sleep(100);
      }
      assert.ok(target, "Native Side Panel target must open");
      const native = await connect(target);
      await waitFor(native, "window.AssetFlowTemplateUI && !isWorkspaceHydrating");
      const state = await native.evaluate("const recipes=await AssetFlowUserRecipes.listUserRecipes();return {ids:recipes.map(r=>r.id),previews:await Promise.all(recipes.map(async r=>Boolean((await AssetFlowUserRecipes.getPreview(r.previewStoreId))?.blob)))};");
      assert.deepEqual(state.ids.sort(), expected.remainingIds.sort());
      assert.ok(state.previews.every(Boolean));
      snapshots.push({ targetId: target.id, count: state.ids.length });
      await native.evaluate('AssetFlowTemplateUI.open();await AssetFlowTemplateUI.refresh();document.querySelector("[data-template-type=visual_recipe]").click();document.querySelector("[data-recipe-source=user]").click();');
      await waitFor(native, '[...document.querySelectorAll(".template-card-media img")].every(img=>img.complete && img.naturalWidth>0)');
      await screenshot(native, "native-side-panel-472.png");
      await controller.evaluate("await chrome.sidePanel.close({windowId:" + windowId + "});");
      await sleep(300);
    }
    assert.notEqual(snapshots[0].targetId, snapshots[1].targetId);
    expected.nativeSidePanelReopen = snapshots;
    writeFileSync(path.join(outDir, "result.json"), JSON.stringify(expected, null, 2));
    console.log(JSON.stringify({ nativeSidePanelReopen: snapshots }));
  } else if (process.argv.includes("--verify-reopen")) {
    const expected = JSON.parse(readFileSync(path.join(outDir, "result.json"), "utf8"));
    const page = await panel();
    const result = await page.evaluate("const recipes = await AssetFlowUserRecipes.listUserRecipes(); return { ids: recipes.map(r=>r.id), previews: await Promise.all(recipes.map(async r=> Boolean((await AssetFlowUserRecipes.getPreview(r.previewStoreId))?.blob))) };");
    assert.deepEqual(result.ids.sort(), expected.remainingIds.sort());
    assert.ok(result.previews.every(Boolean));
    expected.browserProfileReopen = true;
    writeFileSync(path.join(outDir, "result.json"), JSON.stringify(expected, null, 2));
    console.log(JSON.stringify({ browserProfileReopen: true, recipes: result.ids.length }));
  } else {
    const setup = await openPage("chrome-extension://" + extid + "/options.html");
    await sleep(500);
    report.migrationSeeded = await setup.evaluate(`
      const databases = await indexedDB.databases();
      if (databases.some(db => db.name === "imageSparkLocalImages")) return false;
      const blob = await (await fetch(chrome.runtime.getURL("assets/recipes/sources/product-source.webp"))).blob();
      await new Promise((resolve,reject) => {
        const r=indexedDB.open("imageSparkLocalImages",2);
        r.onupgradeneeded=()=>{ const db=r.result;db.createObjectStore("images",{keyPath:"id"});db.createObjectStore("gallery",{keyPath:"id"}).createIndex("createdAt","createdAt"); };
        r.onsuccess=()=>{ const db=r.result;const tx=db.transaction(["images","gallery"],"readwrite");
          tx.objectStore("images").put({id:"migration-image",blob});
          tx.objectStore("gallery").put({id:"migration-gallery",galleryId:"migration-gallery",localStoreId:"migration-image",createdAt:1});
          tx.oncomplete=()=>{db.close();resolve();};tx.onerror=()=>reject(tx.error); };
      });
      localStorage.setItem("imageSparkWorkspaceState",JSON.stringify({migrationMarker:true}));
      await chrome.storage.local.set({imageSparkApiConfig:{migrationMarker:true}});
      return true;
    `);
    await setup.close();
    let page = await panel();
    if (report.migrationSeeded) {
      const migration = await page.evaluate(`
        const db=await openLocalImageDb();const version=db.version;const stores=[...db.objectStoreNames];db.close();
        return {version,stores,image:Boolean((await imageFromIndexedDb("migration-image"))?.blob),
          gallery:Boolean(await AssetFlowUserRecipes.getGalleryItem("migration-gallery")),
          api:(await chrome.storage.local.get("imageSparkApiConfig")).imageSparkApiConfig.migrationMarker};
      `);
      assert.equal(migration.version, 3); assert.ok(migration.stores.includes("recipes")); assert.ok(migration.image && migration.gallery && migration.api);
      report.migration = migration;
      await page.evaluate('await removeGalleryRecordFromIndexedDb({galleryId:"migration-gallery",localStoreId:"migration-image"});galleryItems=[];await chrome.storage.local.remove("imageSparkApiConfig");');
    }
    const fixtures = await page.evaluate(`
      window.recipeSmokeFixtures={};
      for(const [name, count, mode] of [["one",1,"image"],["three",3,"reuse"]]){
        const refs=["subject","composition","style"].slice(0,count).map((role,index)=>({id:"input-"+index,name:"参考图"+(index+1),width:768,height:1024,dimensionsVerified:true,roles:[role],rolesManual:true,assetSource:{kind:"local-file"}}));
        let plan=mode==="reuse"?reusePlanApi().createDraft({coreRequirement:"制作蓝色科技产品海报",references:refs,width:768,height:1024,textMode:"with-text",textContent:"新品",assetType:"poster"}):null;
        if(plan) plan=reusePlanApi().applyAnalysisResponse(plan,JSON.stringify({analysis:{subject:"产品",composition:"中心构图",inheritedTraits:["产品结构","品牌主色"],changedTraits:["背景","光线"]}}));
        const result=await persistGalleryItemImage({generationId:"user-recipe-smoke-"+name+"-"+Date.now(),resultIndex:0,
          url:chrome.runtime.getURL("assets/recipes/previews/product-commercial-kv.webp"),model:nodes.modelSelect.selectedOptions[0].text,
          width:768,height:1024,prompt:mode==="image"?"更换产品背景":"制作蓝色科技产品海报",source:mode,mode:"image",reusePlan:plan,
          assetLineage:{relationshipType:mode==="reuse"?"visual-reuse":"image-to-image",sourceAssets:refs.map((ref,index)=>({assetId:ref.id,order:index+1,roles:ref.roles,participation:"direct",previewStoreId:"never-persist-this-source",previewUrl:"https://private.invalid/ref"}))},
          generationContext:{mode,prompt:mode==="image"?"更换产品背景":"制作蓝色科技产品海报",model:nodes.modelSelect.selectedOptions[0].text,modelValue:nodes.modelSelect.value,
            options:{width:768,height:1024,sizeMode:"3-4",resolution:"1k",count:1},sourceImages:refs,reusePlan:plan,
            visualReuse:{notes:"制作蓝色科技产品海报",textMode:"with-text",textContent:"新品"}}});
        upsertGalleryResult(null,result);window.recipeSmokeFixtures[name]=result;
      }
      renderGallery();
      return Object.fromEntries(Object.entries(recipeSmokeFixtures).map(([k,v])=>[k,{galleryId:v.galleryId,localStoreId:v.localStoreId}]));
    `);
    await page.evaluate('await openLightbox(recipeSmokeFixtures.one,{forceLocal:true});document.querySelector("#lightboxSaveRecipeBtn").click();');
    await waitFor(page, 'document.querySelector(".af-recipe-editor")');
    await screenshot(page, "save-one.png");
    await page.evaluate('const f=document.querySelector(".af-recipe-editor form");f.elements.name.value="单图产品方案";f.elements.tags.value="1,2,3,4,5,6";f.requestSubmit();');
    await waitFor(page, '!document.querySelector(".af-editor-error").hidden');
    assert.equal(await page.evaluate('return (await AssetFlowUserRecipes.listUserRecipes()).length;'), 0);
    await page.evaluate('const f=document.querySelector(".af-recipe-editor form");f.elements.tags.value="产品,蓝色";f.requestSubmit();');
    await waitFor(page, '!document.querySelector(".af-recipe-editor")', "Save dialog should close");
    assert.equal(await page.evaluate('return document.querySelector("#lightbox").hidden;'), false);
    assert.match(await page.evaluate('return document.querySelector("#lightboxRecipeNotice").textContent;'), /已保存/);
    let saved = await page.evaluate('return await AssetFlowUserRecipes.listUserRecipes();');
    const one = saved[0];
    assert.equal(one.references[0].role, "subject");
    assert.equal(one.generationContext.mode, "image");
    await page.evaluate('document.querySelector("#lightboxSaveRecipeBtn").click();const f=document.querySelector(".af-recipe-editor form");f.elements.name.value="同图另一个用途";f.requestSubmit();');
    await waitFor(page, '!document.querySelector(".af-recipe-editor")');
    assert.equal(await page.evaluate('return (await AssetFlowUserRecipes.listUserRecipes()).length;'), 2);
    await page.evaluate('openLocalLightbox({...recipeSmokeFixtures.one,source:"text",mode:"text",generationContext:{mode:"text"}});');
    assert.equal(await page.evaluate('return document.querySelector("#lightboxSaveRecipeBtn").hidden;'), true);
    await page.evaluate('openLocalLightbox({...recipeSmokeFixtures.one,generationContext:null,reusePlan:null});');
    assert.equal(await page.evaluate('return document.querySelector("#lightboxSaveRecipeBtn").disabled;'), true);
    report.localViewer = { imageSave: true, duplicateGenerationAllowed: true, textHidden: true, legacyDisabled: true, tagValidation: true };
    server = createServer((request, response) => { response.writeHead(200, {"Content-Type":"text/html"}); response.end("<!doctype html><title>AssetFlow local Viewer smoke</title><body>Viewer smoke</body>"); });
    await new Promise(resolve=>server.listen(0,"127.0.0.1",resolve));
    const site = await openPage("http://127.0.0.1:" + server.address().port);
    await sleep(400);
    assert.equal(await page.evaluate('closeLightbox();return await openPageLightbox(recipeSmokeFixtures.three);'), true, "Page Viewer must open");
    await waitFor(site, 'document.querySelector("#image-spark-page-viewer")?.shadowRoot?.querySelector(".save-recipe")');
    await site.evaluate('document.querySelector("#image-spark-page-viewer").shadowRoot.querySelector(".save-recipe").click();');
    await waitFor(site, 'document.querySelector("#image-spark-page-viewer")?.shadowRoot?.querySelector(".af-recipe-editor")');
    await screenshot(site, "save-three-viewer.png", 1331);
    await site.evaluate('const f=document.querySelector("#image-spark-page-viewer").shadowRoot.querySelector(".af-recipe-editor form");f.elements.name.value="三图科技方案";f.elements.summary.value="保留产品结构，迁移构图与材质";f.elements.tags.value="科技,产品";f.requestSubmit();');
    await waitFor(site, '!document.querySelector("#image-spark-page-viewer").shadowRoot.querySelector(".af-recipe-editor")');
    const three = await page.evaluate('return (await AssetFlowUserRecipes.listUserRecipes()).find(r=>r.name==="三图科技方案");');
    assert.deepEqual(three.references.map(r=>r.role),["subject","composition","style"]);
    assert.deepEqual(three.preserve,["产品结构","品牌主色"]);
    assert.doesNotMatch(JSON.stringify(three),/never-persist-this-source|private.invalid|sourceImages/);
    assert.match(await site.evaluate('return document.querySelector("#image-spark-page-viewer").shadowRoot.querySelector(".notice").textContent;'),/已保存/);
    report.pageViewer = true;
    report.preview = await page.evaluate(`
      const recipe=await AssetFlowUserRecipes.getUserRecipe(${JSON.stringify(three.id)});
      const record=await AssetFlowUserRecipes.getPreview(recipe.previewStoreId);
      const bitmap=await createImageBitmap(record.blob);const dimensions=[bitmap.width,bitmap.height];bitmap.close();
      return {type:record.blob.type,dimensions,recipeAsset:record.meta.recipeAsset,independent:recipe.previewStoreId!==${JSON.stringify(fixtures.three.localStoreId)}};
    `);
    assert.equal(report.preview.type,"image/webp");assert.ok(Math.max(...report.preview.dimensions)<=1024);assert.ok(report.preview.independent && report.preview.recipeAsset);
    await page.close(); page = await panel();
    assert.equal(await page.evaluate('return (await AssetFlowUserRecipes.listUserRecipes()).length;'),3);
    report.sidePanelDocumentReopen = true;
    await page.evaluate('AssetFlowTemplateUI.open();');
    await waitFor(page, 'document.querySelectorAll(".template-card").length > 0');
    await page.evaluate('document.querySelector("[data-template-type=visual_recipe]").click();document.querySelector("[data-recipe-source=user]").click();');
    await waitFor(page, 'document.querySelectorAll(".template-card").length === 3');
    await screenshot(page, "my-recipes-472.png");
    await screenshot(page, "my-recipes-1331.png",1331);
    await page.evaluate('const s=document.querySelector("#templateSearch");s.value="科技";s.dispatchEvent(new Event("input"));');
    assert.equal(await page.evaluate('return document.querySelectorAll(".template-card").length;'),1);
    await page.evaluate('document.querySelector(".template-card").click();');
    assert.ok((await page.evaluate('return document.querySelector("#templatePreview").innerText;')).includes("核心需求"));
    await page.evaluate('const menu=document.querySelector("#templatePreview .template-manage");menu.open=true;[...menu.querySelectorAll("button")].find(b=>b.textContent==="重命名").click();const f=document.querySelector(".af-recipe-editor form");f.elements.name.value="三图科技方案已重命名";f.requestSubmit();');
    await waitFor(page, '!document.querySelector(".af-recipe-editor")');
    assert.equal(await page.evaluate('return (await AssetFlowUserRecipes.getUserRecipe('+JSON.stringify(three.id)+')).name;'),"三图科技方案已重命名");
    await page.evaluate('const menu=document.querySelector("#templatePreview .template-manage");menu.open=true;[...menu.querySelectorAll("button")].find(b=>b.textContent==="编辑").click();');
    assert.equal(await page.evaluate('return document.querySelectorAll(".af-recipe-editor [name=references]").length;'),0);
    await page.evaluate('const f=document.querySelector(".af-recipe-editor form");f.elements.goalTemplate.value="编辑后的科技海报需求";f.elements.preserve.value="保留产品轮廓";f.elements.change.value="改变背景光线";f.elements.category.value="商业产品";f.requestSubmit();');
    await waitFor(page, '!document.querySelector(".af-recipe-editor")');
    report.library = { search: true, detail: true, rename: true, edit: true, referenceStructureReadOnly: true };
    // Enter the existing requestUse flow and upload replacement images.
    const useResult = await page.evaluate(`
      imageItems=[];selectedImageIds=new Set();activeImageId="";nodes.visualReuseNotes.value="";nodes.promptInput.value="";renderImageStack();
      document.querySelector("#templatePreview .template-use-btn").click();
      return {mode:promptMethod,goal:nodes.visualReuseNotes.value,width:nodes.widthInput.value,height:nodes.heightInput.value,model:nodes.modelSelect.value,textMode:nodes.visualReuseTextMode.value,title:nodes.visualReuseTextContent.value};
    `);
    assert.equal(useResult.mode,"reuse");assert.equal(useResult.goal,"编辑后的科技海报需求");assert.equal(useResult.width,"768");assert.equal(useResult.height,"1024");assert.equal(useResult.model,three.generationContext.modelValue);assert.equal(useResult.textMode,"with-text");assert.equal(useResult.title,"新品");
    await page.evaluate(`
      window.smokeAnalysisCalls=0;
      callVisualReusePromptApi=async (targets,instruction)=>{window.smokeAnalysisCalls++;window.smokeInstruction=instruction;return JSON.stringify({analysis:{subject:"产品",composition:"中心构图",inheritedTraits:[],changedTraits:[]}});};
      const blob=await (await fetch(chrome.runtime.getURL("assets/recipes/sources/product-source.webp"))).blob();
      await setImagesFromFiles([new File([blob],"new-1.webp",{type:blob.type})]);
      await generateVisualReusePrompt();
    `);
    assert.equal(await page.evaluate("return smokeAnalysisCalls;"),0);
    assert.match(await page.evaluate('return document.querySelector("#statusText").textContent;'),/需要 3 张参考图/);
    await page.evaluate(`
      const blob=await (await fetch(chrome.runtime.getURL("assets/recipes/sources/product-source.webp"))).blob();
      await setImagesFromFiles([2,3].map(n=>new File([blob],"new-"+n+".webp",{type:blob.type})));
      await generateVisualReusePrompt();
    `);
    const pipeline = await page.evaluate(`
      const before=galleryItems.length;
      shouldUseRealImageApi=()=>true;
      runRealGeneration=(payload,placeholders)=>{window.smokeGeneration=payload;};
      generateNewVisualFromReusePlan();
      return {roles:imageItems.map(i=>i.visualReuseRoles[0]),planRoles:promptMeta.reusePlan.references.map(i=>i.roles[0]),
        preserve:promptMeta.reusePlan.analysis.inheritedTraits,change:promptMeta.reusePlan.analysis.changedTraits,
        instruction:smokeInstruction.includes("保留产品轮廓"),
        compiled:nodes.promptInput.value,generationMode:window.smokeGeneration?.mode,source:window.smokeGeneration?.source,
        generationReferences:window.smokeGeneration?.referenceItems.length,placeholderAdded:galleryItems.length>before};
    `);
    assert.deepEqual(pipeline.roles,["subject","composition","style"]);assert.deepEqual(pipeline.planRoles,pipeline.roles);
    assert.ok(pipeline.preserve.includes("保留产品轮廓"));assert.ok(pipeline.change.includes("改变背景光线"));assert.ok(pipeline.instruction);assert.match(pipeline.compiled,/保留产品轮廓/);assert.equal(pipeline.generationMode,"image");assert.equal(pipeline.source,"reuse");assert.equal(pipeline.generationReferences,3);assert.ok(pipeline.placeholderAdded);
    await page.evaluate('galleryItems=galleryItems.filter(i=>!i.isGenerating);renderGallery();saveWorkspaceState();');
    report.threeImageReuse = { ...useResult, ...pipeline, compiled: "verified saved constraints in compiled prompt" };
    // One-image recipe must use the same UI flow and recover a subject slot.
    await page.evaluate('AssetFlowTemplateUI.open();await AssetFlowTemplateUI.refresh();document.querySelector("#templateSearch").value="";document.querySelector("#templateSearch").dispatchEvent(new Event("input"));document.querySelector("[data-recipe-id='+one.id+']").click();');
    const conflicts = await page.evaluate('const before=imageItems.map(i=>i.visualReuseRoles.join(","));document.querySelector("#templatePreview .template-use-btn").click();const choices=[...document.querySelectorAll("#templateConfirmActions button")].map(b=>b.textContent);[...document.querySelectorAll("#templateConfirmActions button")].find(b=>b.textContent==="取消").click();return {choices,unchanged:JSON.stringify(before)===JSON.stringify(imageItems.map(i=>i.visualReuseRoles.join(",")))};');
    assert.deepEqual(conflicts.choices,["应用角色","仅填需求","取消"]);assert.ok(conflicts.unchanged);
    await page.evaluate('imageItems=[];selectedImageIds=new Set();nodes.visualReuseNotes.value="";nodes.promptInput.value="";document.querySelector("#templatePreview .template-use-btn").click();const blob=await (await fetch(chrome.runtime.getURL("assets/recipes/sources/product-source.webp"))).blob();await setImagesFromFiles([new File([blob],"replacement.webp",{type:blob.type})]);await generateVisualReusePrompt();');
    const single = await page.evaluate('return {roles:imageItems.map(i=>i.visualReuseRoles[0]),goal:nodes.visualReuseNotes.value,plan:promptMeta.reusePlan?.status};');
    assert.deepEqual(single.roles,["subject"]);assert.equal(single.goal,"更换产品背景");assert.equal(single.plan,"ready");report.oneImageReuse=single;report.conflictChoices=conflicts;
    const unavailable = await page.evaluate(`
      await AssetFlowUserRecipes.updateUserRecipe(${JSON.stringify(one.id)}, {name:"单图产品方案"});
      const recipe=await AssetFlowUserRecipes.getUserRecipe(${JSON.stringify(one.id)});
      // Emulate a provider that was removed after the recipe was saved.
      const db=await openLocalImageDb();await new Promise((resolve,reject)=>{const tx=db.transaction("recipes","readwrite");tx.objectStore("recipes").put({...recipe,generationContext:{...recipe.generationContext,modelValue:"removed-model",model:"已移除模型"}});tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);});db.close();
      AssetFlowTemplateUI.open();await AssetFlowTemplateUI.refresh();
      document.querySelector("[data-recipe-id="+recipe.id+"]").click();
      imageItems=[];nodes.visualReuseNotes.value="";nodes.promptInput.value="";
      const current=nodes.modelSelect.value;document.querySelector("#templatePreview .template-use-btn").click();
      return {unchanged:current===nodes.modelSelect.value,status:document.querySelector("#statusText").textContent,goal:nodes.visualReuseNotes.value};
    `);
    assert.ok(unavailable.unchanged);assert.match(unavailable.status,/原模型不可用/);assert.equal(unavailable.goal,"更换产品背景");report.unavailableModelFallback=true;
    // Simulate failures at both storage writes. Atomic transaction must roll back the Preview.
    report.rollback = await page.evaluate(`
      const item=await AssetFlowUserRecipes.getGalleryItem(${JSON.stringify(fixtures.one.galleryId)});
      const results=[];
      for(const stage of ["images","recipes"]){
        const recipe=AssetFlowUserRecipes.buildUserVisualRecipe(item);
        const original=IDBObjectStore.prototype.add;
        IDBObjectStore.prototype.add=function(value){if(this.name===stage)throw new DOMException("quota","QuotaExceededError");return original.call(this,value);};
        let message="";
        try{await AssetFlowUserRecipes.saveUserRecipe(recipe,item);}catch(error){message=error.message;}finally{IDBObjectStore.prototype.add=original;}
        results.push({stage,message,metadata:Boolean(await AssetFlowUserRecipes.getUserRecipe(recipe.id)),preview:Boolean(await AssetFlowUserRecipes.getPreview(recipe.previewStoreId))});
      }
      return results;
    `);
    for(const result of report.rollback){assert.match(result.message,/本地存储空间不足/);assert.equal(result.metadata,false);assert.equal(result.preview,false);}
    // Delete the source gallery of the three-reference recipe.
    await page.evaluate('await removeGalleryRecordFromIndexedDb('+JSON.stringify(fixtures.three)+');galleryItems=galleryItems.filter(i=>i.galleryId!=='+JSON.stringify(fixtures.three.galleryId)+');renderGallery();saveWorkspaceState();');
    const isolation = await page.evaluate('const r=await AssetFlowUserRecipes.getUserRecipe('+JSON.stringify(three.id)+');return Boolean(r && (await AssetFlowUserRecipes.getPreview(r.previewStoreId))?.blob);');
    assert.ok(isolation);report.galleryDeleteIsolation=true;
    await page.evaluate('AssetFlowTemplateUI.open();await AssetFlowTemplateUI.refresh();document.querySelector("[data-recipe-id='+one.id+']").click();const menu=document.querySelector("#templatePreview .template-manage");menu.open=true;[...menu.querySelectorAll("button")].find(b=>b.textContent==="删除").click();');
    assert.match(await page.evaluate('return document.querySelector("#templateConfirmText").textContent;'),/确认删除/);
    await page.evaluate('document.querySelector("#templateConfirmActions button").click();');
    await waitFor(page,'document.querySelector("#templateConfirm").hidden');
    const deleted = await page.evaluate('return {recipe:Boolean(await AssetFlowUserRecipes.getUserRecipe('+JSON.stringify(one.id)+')),preview:Boolean(await AssetFlowUserRecipes.getPreview('+JSON.stringify(one.previewStoreId)+')),gallery:Boolean(await AssetFlowUserRecipes.getGalleryItem('+JSON.stringify(fixtures.one.galleryId)+'))};');
    assert.equal(deleted.recipe,false);assert.equal(deleted.preview,false);assert.equal(deleted.gallery,true);report.recipeDeleteIsolation=deleted;
    await page.evaluate('document.querySelector("[data-recipe-source=builtin]").click();');
    assert.equal(await page.evaluate('return document.querySelectorAll(".template-card .template-manage").length;'),0);
    await page.evaluate('document.querySelector(".template-card").click();');
    assert.equal(await page.evaluate('return document.querySelectorAll("#templatePreview .template-manage").length;'),0);report.builtinProtected=true;
    report.remainingIds=await page.evaluate('return (await AssetFlowUserRecipes.listUserRecipes()).map(r=>r.id);');
    report.consoleErrors=connections.flatMap(c=>c.errors);
    assert.deepEqual(report.consoleErrors,[]);
    report.browserProfileReopen=false;
    writeFileSync(path.join(outDir,"result.json"),JSON.stringify(report,null,2));
    console.log(JSON.stringify(report,null,2));
  }
} finally {
  for(const connection of connections) await connection.close().catch(()=>{});
  if(server) { server.closeAllConnections(); await new Promise(resolve=>server.close(resolve)); }
}
