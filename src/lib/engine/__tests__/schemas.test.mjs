import test from "node:test";
import assert from "node:assert/strict";
import { MatchupEvaluationSchema, ChallengeRequestSchema } from "../schemas.ts";

test("MatchupEvaluationSchema validates well-formed AI response", () => {
  const validPayload = {
    winner: "challenger",
    confidence: 0.95,
    shortHeadline: "Spaghettified Snack",
    humorousReason: "The black hole compressed the bread and physics itself.",
    dominantFactor: "cosmic_supremacy",
    challengerProfile: {
      canonicalName: "Supermassive Black Hole",
      sandwichDescription: "Singularity between two accretion buns.",
      powerRatingEstimate: "9999",
      category: "Cosmic",
      scaleTier: 95,
      emoji: "🕳️",
      pixelColor: "#111111",
    },
  };

  const parsed = MatchupEvaluationSchema.safeParse(validPayload);
  assert.equal(parsed.success, true);
});

test("MatchupEvaluationSchema rejects invalid winner or out-of-bound confidence", () => {
  const invalidPayload = {
    winner: "draw",
    confidence: 1.5,
    shortHeadline: "Draw",
    humorousReason: "Nobody wins.",
    dominantFactor: "scale",
    challengerProfile: {
      canonicalName: "X",
      sandwichDescription: "Y",
      powerRatingEstimate: 1,
      category: "Mundane",
      scaleTier: 10,
      emoji: "🥪",
      pixelColor: "#111111",
    },
  };

  const parsed = MatchupEvaluationSchema.safeParse(invalidPayload);
  assert.equal(parsed.success, false);
});

test("ChallengeRequestSchema validates clean challenge payload", () => {
  const validReq = {
    rawInput: "a giant steamroller",
    champion: {
      id: "champ-1",
      canonicalName: "THE HUMBLE ONION SANDWICH",
      sandwichDescription: "Crispy toast with red onion.",
      category: "Mundane",
      power: 4,
      scaleTier: 6,
      defensesWon: 0,
    },
  };

  const parsed = ChallengeRequestSchema.safeParse(validReq);
  assert.equal(parsed.success, true);
});
