import { z } from "zod";

export const EntityCategorySchema = z.enum([
  "Mundane",
  "Vehicle",
  "Weapon",
  "Cosmic",
  "Living",
  "Abstract",
  "Divine",
]);

export const DominantFactorSchema = z.enum([
  "scale",
  "destruction",
  "elemental_counter",
  "ironic_absurdity",
  "cosmic_supremacy",
]);

export const WinnerSchema = z.enum(["champion", "challenger"]);

export const ChallengerProfileSchema = z.object({
  canonicalName: z.string().min(1).max(100),
  sandwichDescription: z.string().min(1).max(300),
  powerRatingEstimate: z.union([z.number(), z.string()]),
  category: EntityCategorySchema,
  scaleTier: z.number().int().min(1).max(100),
  emoji: z.string().min(1).max(10),
  pixelColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).default("#d97706"),
});

export const MatchupEvaluationSchema = z.object({
  winner: WinnerSchema,
  confidence: z.number().min(0).max(1),
  shortHeadline: z.string().min(1).max(120),
  humorousReason: z.string().min(1).max(500),
  dominantFactor: DominantFactorSchema,
  challengerProfile: ChallengerProfileSchema,
});

export type MatchupEvaluation = z.infer<typeof MatchupEvaluationSchema>;

export const ChallengeRequestSchema = z.object({
  rawInput: z.string().min(1).max(120),
  champion: z.object({
    id: z.string(),
    canonicalName: z.string(),
    sandwichDescription: z.string(),
    category: EntityCategorySchema,
    power: z.union([z.number(), z.string()]),
    scaleTier: z.number(),
    defensesWon: z.number().default(0),
  }),
});

export type ChallengeRequest = z.infer<typeof ChallengeRequestSchema>;
