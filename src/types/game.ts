/**
 * IDIOT SANDWICH — Core Game Type Definitions
 * Aligned with docs/DATA_MODEL.md and docs/AI_SYSTEM.md
 */

export interface GameEntity {
  id: string;
  rawInput: string;
  canonicalName: string;
  category: "Mundane" | "Vehicle" | "Weapon" | "Cosmic" | "Living" | "Abstract" | "Divine";
  power: string | number;
  scaleTier: number; // 1 to 100
  emoji: string;
  pixelColor: string;
  sandwichDescription: string;
  defensesWon: number;
  imageUrl?: string;
}

export interface AdjudicationVerdict {
  winner: "champion" | "challenger";
  confidence: number;
  shortHeadline: string;
  humorousReason: string;
  dominantFactor: "scale" | "destruction" | "elemental_counter" | "ironic_absurdity" | "cosmic_supremacy";
}

export interface TurnHistoryRecord {
  turnIndex: number;
  championName: string;
  championEmoji?: string;
  challengerName: string;
  challengerEmoji?: string;
  winner: "champion" | "challenger";
  headline: string;
  reason: string;
  dominantFactor?: string;
  timestamp: number;
}
