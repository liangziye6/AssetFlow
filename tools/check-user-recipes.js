"use strict";
const assert = require("node:assert/strict");
const Library = require("../template-library.js");
const UserRecipes = require("../user-recipes.js");
const roles = ["subject", "composition", "style"];
const fixture = (count, mode = "reuse") => {
  const references = roles.slice(0, count).map((role, index) => ({
    assetId: "input-" + index, order: index + 1, roles: [role], src: "https://private.invalid/input",
    previewStoreId: "source-private-" + index, source: { kind: "local-file", uri: "https://private.invalid/file" }
  }));
  const plan = { intent: { coreRequirement: "让产品更清晰，保留蓝色", assetType: "poster" },
    references, textStrategy: { mode: "with-text", content: "新品" },
    canvas: { width: 768, height: 1024, sizeMode: "3-4", resolution: "1k" },
    analysis: { inheritedTraits: ["产品结构", "品牌主色"], changedTraits: ["背景", "光线"] } };
  return { mode: "image", source: mode, galleryId: "gallery-origin", generationId: "generation-origin",
    assetName: "产品科技 KV", assetLineage: { sourceAssets: references },
    generationContext: { mode, prompt: "产品商业视觉", model: "原模型", modelValue: "original-model",
      options: { width: 768, height: 1024, sizeMode: "3-4", resolution: "1k" },
      sourceImages: references, reusePlan: mode === "reuse" ? plan : null } };
};
for (const count of [1, 2, 3]) {
  const recipe = UserRecipes.buildUserVisualRecipe(fixture(count));
  assert.equal(recipe.sourceType, "user");
  assert.equal(recipe.status, "personal");
  assert.equal(recipe.name, "产品科技 KV 方案");
  assert.equal(recipe.goalTemplate, "让产品更清晰，保留蓝色");
  assert.equal(recipe.generationContext.modelValue, "original-model");
  assert.equal(recipe.generationContext.options.height, 1024);
  assert.deepEqual(Library.presetForExistingImages(recipe, count).map((entry) => entry.roles[0]), roles.slice(0, count));
  assert.equal(Library.requiredImageCount(recipe), count);
  assert.deepEqual(recipe.preserve, ["产品结构", "品牌主色"]);
  assert.deepEqual(recipe.change, ["背景", "光线"]);
  assert.equal(recipe.textStrategy.mode, "with-text");
  assert.equal(recipe.originGalleryId, "gallery-origin");
  assert.doesNotMatch(JSON.stringify(recipe), /private\.invalid|source-private|sourceImages/);
  assert.equal(Library.validateRecipes([recipe])[0].status, "personal");
}
const image = UserRecipes.buildUserVisualRecipe(fixture(1, "image"));
assert.equal(image.goalTemplate, "产品商业视觉");
assert.deepEqual(image.preserve, []);
assert.deepEqual(image.change, []);
assert.equal(image.references[0].role, "subject");
assert.equal(Library.validateRecipes([image])[0].summary, "");
assert.equal(Library.validateRecipes([image])[0].tags.length, 0);
assert.notEqual(UserRecipes.buildUserVisualRecipe(fixture(1)).id, UserRecipes.buildUserVisualRecipe(fixture(1)).id);
assert.equal(UserRecipes.availability({ mode: "text", prompt: "text" }).visible, false);
assert.equal(UserRecipes.availability({ mode: "image", prompt: "old" }).enabled, false);
assert.equal(UserRecipes.availability({ ...fixture(1), isGenerating: true }).visible, false);
assert.throws(() => UserRecipes.buildUserVisualRecipe({ mode: "image", prompt: "old" }), /上下文/);
assert.throws(() => Library.validateRecipes([{ ...image, status: "verified" }]), /个人方案/);
assert.throws(() => Library.validateRecipes([{ ...image, sourceType: "builtin" }]), /personal/);
assert.throws(() => Library.validateRecipes([{ ...image, references: [{ slot: 2, role: "subject", required: true }] }]), /个人方案/);
assert.throws(() => Library.validateRecipes([{ ...image, previewStoreId: "gallery-original" }]), /个人方案/);
assert.throws(() => Library.validateRecipes([{ ...image, name: "   " }]), /个人方案/);
assert.throws(() => Library.validateRecipes([{ ...image, tags: ["1", "2", "3", "4", "5", "6"] }]), /个人方案/);
assert.equal(Library.resolveText({ ...image, goalTemplate: "保留 {title} 原文字" }), "保留 {title} 原文字");
const many = Array.from({ length: 50 }, () => UserRecipes.buildUserVisualRecipe(fixture(1)));
assert.equal(Library.validateRecipes(many).length, 50);
assert.equal(Library.filter(many, { type: "visual_recipe", sourceType: "user" }).length, 50);
assert.equal(Library.filter(many, { type: "visual_recipe", sourceType: "builtin" }).length, 0);
assert.equal(Library.filter(many, { type: "visual_recipe", query: "科技" }).length, 50);
const multiRole = fixture(1);
multiRole.generationContext.reusePlan.references[0].roles = ["subject", "style"];
assert.deepEqual(Library.presetForExistingImages(UserRecipes.buildUserVisualRecipe(multiRole), 1)[0].roles, ["subject", "style"]);
const edited = UserRecipes.applyEdits(image, { id: "hack", sourceType: "builtin", references: [], goalTemplate: "新需求", preserve: ["结构"] });
assert.equal(edited.id, image.id);
assert.equal(edited.sourceType, "user");
assert.equal(edited.references.length, 1);
assert.equal(edited.goalTemplate, "新需求");
assert.deepEqual(edited.preserve, ["结构"]);
console.log("Personal Visual Recipe schema/conversion checks passed.");
