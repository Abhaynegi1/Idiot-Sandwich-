import test from "node:test";
import assert from "node:assert/strict";
import { evaluateMatchup } from "../gemini-adjudicator.ts";

const SAMPLE_CHAMPION = {
  id: "starter-onion",
  canonicalName: "THE HUMBLE ONION SANDWICH",
  sandwichDescription: "Raw red onion slices clamped between toasted sourdough.",
  category: "Mundane",
  power: "04",
  scaleTier: 6,
  defensesWon: 0,
};

test("evaluateMatchup reliably returns valid adjudication via fallback or live engine", async () => {
  const result = await evaluateMatchup(SAMPLE_CHAMPION, "a giant laser cannon");

  // Validate top-level result shape
  assert.ok(result);
  assert.ok(result.evaluation);
  assert.ok(result.challengerEntity);
  assert.ok(["gemini", "deterministic-fallback"].includes(result.adjudicatorSource));

  // Validate evaluation properties
  assert.ok(["champion", "challenger"].includes(result.evaluation.winner));
  assert.ok(typeof result.evaluation.confidence === "number");
  assert.ok(result.evaluation.confidence >= 0 && result.evaluation.confidence <= 1);
  assert.ok(typeof result.evaluation.shortHeadline === "string");
  assert.ok(result.evaluation.shortHeadline.length > 0);
  assert.ok(typeof result.evaluation.humorousReason === "string");
  assert.ok(result.evaluation.humorousReason.length > 0);

  // Validate challenger entity profile
  const challenger = result.challengerEntity;
  assert.ok(challenger.canonicalName);
  assert.ok(challenger.emoji);
  assert.ok(challenger.pixelColor);
  assert.ok(challenger.sandwichDescription);
  assert.ok(challenger.category);
});

test("evaluateMatchup handles abstract and surreal inputs without throwing", async () => {
  const result = await evaluateMatchup(SAMPLE_CHAMPION, "the concept of existential dread");

  assert.ok(result.evaluation);
  assert.ok(result.challengerEntity);
  assert.equal(result.challengerEntity.rawInput, "the concept of existential dread");
});
