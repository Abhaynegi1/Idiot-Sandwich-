import type { GameEntity, AdjudicationVerdict } from "../../types/game.ts";

/**
 * Normalizes user input into a clean canonical entity.
 */
export function normalizeEntity(rawInput: string): GameEntity {
  const cleaned = rawInput
    .trim()
    .replace(/^a\s+|^an\s+|^the\s+/i, "")
    .toLowerCase();

  const id = `entity-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

  // Default entity archetype
  const canonicalName = `${cleaned.toUpperCase()} SANDWICH`;
  let category: GameEntity["category"] = "Mundane";
  let power: string | number = Math.floor(Math.random() * 20) + 5;
  let scaleTier = 15;
  let emoji = "🥪";
  let pixelColor = "#d97706";
  let sandwichDescription = `Freshly assembled ${cleaned} pressed between toasted slices.`;

  // Semantic keyword heuristics
  if (
    cleaned.includes("black hole") ||
    cleaned.includes("supernova") ||
    cleaned.includes("galaxy") ||
    cleaned.includes("universe") ||
    cleaned.includes("sun") ||
    cleaned.includes("meteor") ||
    cleaned.includes("asteroid")
  ) {
    category = "Cosmic";
    scaleTier = 95;
    power = "∞";
    emoji = cleaned.includes("sun") ? "☀️" : "🕳️";
    pixelColor = "#1e1b4b";
    sandwichDescription = `Accretion disk crusts warping gravity and breadcrumbs.`;
  } else if (
    cleaned.includes("nuclear") ||
    cleaned.includes("bomb") ||
    cleaned.includes("warhead") ||
    cleaned.includes("missile") ||
    cleaned.includes("dynamite") ||
    cleaned.includes("laser")
  ) {
    category = "Weapon";
    scaleTier = 82;
    power = "50 MT";
    emoji = "☢️";
    pixelColor = "#eab308";
    sandwichDescription = `Radioactive brioche squeezing an armed plutonium warhead.`;
  } else if (
    cleaned.includes("car") ||
    cleaned.includes("truck") ||
    cleaned.includes("train") ||
    cleaned.includes("tank") ||
    cleaned.includes("plane") ||
    cleaned.includes("corolla") ||
    cleaned.includes("tractor")
  ) {
    category = "Vehicle";
    scaleTier = 45;
    power = "450 HP";
    emoji = cleaned.includes("train") ? "🚆" : "🚗";
    pixelColor = "#dc2626";
    sandwichDescription = `Heavy combustion engine and chassis clamped between artisan rye.`;
  } else if (
    cleaned.includes("god") ||
    cleaned.includes("tuesday") ||
    cleaned.includes("time") ||
    cleaned.includes("existential") ||
    cleaned.includes("dread") ||
    cleaned.includes("gravity") ||
    cleaned.includes("nothing")
  ) {
    category = "Abstract";
    scaleTier = 88;
    power = "PHILOSOPHICAL";
    emoji = "✨";
    pixelColor = "#6366f1";
    sandwichDescription = `Intangible universal truth folded into ethereal flatbread.`;
  } else if (
    cleaned.includes("elephant") ||
    cleaned.includes("lion") ||
    cleaned.includes("dinosaur") ||
    cleaned.includes("t-rex") ||
    cleaned.includes("whale") ||
    cleaned.includes("shark")
  ) {
    category = "Living";
    scaleTier = 40;
    power = "MEGAFAUNA";
    emoji = cleaned.includes("elephant") ? "🐘" : "🦖";
    pixelColor = "#059669";
    sandwichDescription = `Colossal biological entity balanced between thick sourdough loaves.`;
  } else if (
    cleaned.includes("water") ||
    cleaned.includes("rain") ||
    cleaned.includes("ocean") ||
    cleaned.includes("flood") ||
    cleaned.includes("ice")
  ) {
    category = "Mundane";
    scaleTier = 20;
    power = "SPLASH";
    emoji = "💧";
    pixelColor = "#0284c7";
    sandwichDescription = `Pure lukewarm moisture seeping directly through soggy bread.`;
  } else if (
    cleaned.includes("ant") ||
    cleaned.includes("bug") ||
    cleaned.includes("microbe") ||
    cleaned.includes("bacteria")
  ) {
    category = "Living";
    scaleTier = 3;
    power = "0.001";
    emoji = "🐜";
    pixelColor = "#78350f";
    sandwichDescription = `One minuscule creature lost on a vast expanse of multigrain.`;
  } else if (cleaned.includes("onion")) {
    category = "Mundane";
    scaleTier = 6;
    power = "4";
    emoji = "🧅";
    pixelColor = "#9333ea";
    sandwichDescription = `Thinly sliced red onion. Brings tears of defeat.`;
  }

  return {
    id,
    rawInput,
    canonicalName,
    category,
    power,
    scaleTier,
    emoji,
    pixelColor,
    sandwichDescription,
    defensesWon: 0,
  };
}

/**
 * Adjudicates a duel between the reigning champion and the challenger.
 * Evaluates contextual counters, scale disparities, and humorous ironies.
 */
export function adjudicateDuel(
  champion: GameEntity,
  challenger: GameEntity
): AdjudicationVerdict {
  const champRaw = champion.canonicalName.toLowerCase();
  const challRaw = challenger.canonicalName.toLowerCase();

  // === SPECIAL CONTEXTUAL COUNTERS ===

  // 1. Water vs Fire / Explosives / Electronics
  if (
    (challRaw.includes("water") || challRaw.includes("flood") || challRaw.includes("rain")) &&
    (champRaw.includes("nuclear") || champRaw.includes("bomb") || champRaw.includes("fire") || champRaw.includes("toaster"))
  ) {
    return {
      winner: "challenger",
      confidence: 0.94,
      shortHeadline: "DOUSED & SHORT-CIRCUITED",
      humorousReason: `The water immediately douses the fuse and shorts out the detonation trigger. A soggy, harmless dud.`,
      dominantFactor: "elemental_counter",
    };
  }

  // 2. Black Hole vs Anything Physical
  if (challRaw.includes("black hole") && !champRaw.includes("god") && !champRaw.includes("black hole")) {
    return {
      winner: "challenger",
      confidence: 0.99,
      shortHeadline: "SPAGHETTIFIED BY GRAVITY",
      humorousReason: `Gravitational forces rip the champion, its fillings, and the space-time fabric itself into subatomic crumbs.`,
      dominantFactor: "cosmic_supremacy",
    };
  }

  // 3. Ant / Microbe vs Cosmic
  if (challenger.scaleTier <= 5 && champion.scaleTier >= 80) {
    return {
      winner: "champion",
      confidence: 0.99,
      shortHeadline: "UNNOTICED STEPPING STONE",
      humorousReason: `The champion didn't even notice the attack. The challenger was vaporized by mere ambient radiation.`,
      dominantFactor: "scale",
    };
  }

  // 4. Conceptual / Abstract Supremacy
  if (challenger.category === "Abstract" && champion.category === "Vehicle") {
    return {
      winner: "challenger",
      confidence: 0.88,
      shortHeadline: "EXISTENTIAL BREAKDOWN",
      humorousReason: `You cannot drive away from ${challenger.rawInput}. The transmission rusted in the face of inevitable reality.`,
      dominantFactor: "ironic_absurdity",
    };
  }

  // === SCALE COMPARISON ===
  const scaleDiff = challenger.scaleTier - champion.scaleTier;

  if (scaleDiff > 5) {
    const reasons = [
      `A nuclear or physical scale disparity that simply cannot be negotiated. The champion was atomized.`,
      `Pure brute force. ${challenger.canonicalName} crushed the opposing sandwich with effortless weight.`,
      `The champion fought valiantly, but the sheer destructive potential of the challenger left only crumbs.`,
    ];
    return {
      winner: "challenger",
      confidence: Math.min(0.98, 0.7 + scaleDiff * 0.005),
      shortHeadline: "OUTCLASSED & CRUSHED",
      humorousReason: reasons[Math.floor(Math.random() * reasons.length)],
      dominantFactor: "destruction",
    };
  }

  if (scaleDiff < -5) {
    const lossReasons = [
      `That was never going to work. The champion stood tall without even losing a single sesame seed.`,
      `A cute effort, but hopelessly outmatched in raw power and toasted durability.`,
      `The champion sandwich absorbed the blow like a sponge and tossed the challenger out of the ring.`,
    ];
    return {
      winner: "champion",
      confidence: Math.min(0.98, 0.7 + Math.abs(scaleDiff) * 0.005),
      shortHeadline: "NO CHANCE",
      humorousReason: lossReasons[Math.floor(Math.random() * lossReasons.length)],
      dominantFactor: "scale",
    };
  }

  // === CLOSE CALL / DEAD HEAT ===
  const coinFlip = Math.random() > 0.45;
  return {
    winner: coinFlip ? "challenger" : "champion",
    confidence: 0.55,
    shortHeadline: coinFlip ? "SCRAPED A VICTORY" : "NARROWLY DEFENDED",
    humorousReason: coinFlip
      ? `A chaotic clash of near-equals. A slightly crunchier crust granted the challenger an upset win.`
      : `An absolute barnburner. The champion survived by virtue of stubborn, day-old bread resistance.`,
    dominantFactor: "ironic_absurdity",
  };
}
