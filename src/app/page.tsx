"use client";

import React, { useState, useRef, useEffect } from "react";

interface ChampionEntity {
  name: string;
  power: string | number;
  defenses: number;
  emoji: string;
  sandwichDescription: string;
  pixelColor: string;
  scaleTier: number; // 1-100 internal tier for smart mock battles
}

const STARTER_CHAMPION: ChampionEntity = {
  name: "ONION SANDWICH",
  power: "4",
  defenses: 0,
  emoji: "🧅",
  sandwichDescription: "Raw red onion slices clamped between toasted sourdough.",
  pixelColor: "#9333ea",
  scaleTier: 5,
};

// Known entity heuristics for absurd mock adjudication
const ENTITY_KNOWLEDGE_BASE: Record<
  string,
  { name: string; power: string | number; tier: number; emoji: string; color: string; desc: string }
> = {
  car: {
    name: "CAR SANDWICH",
    power: "420 HP",
    tier: 25,
    emoji: "🚗",
    color: "#dc2626",
    desc: "A 1994 sedan pressed between two massive rye loaves.",
  },
  "nuclear bomb": {
    name: "NUCLEAR BOMB SANDWICH",
    power: "50 MEGATONS",
    tier: 80,
    emoji: "☢️",
    color: "#eab308",
    desc: "A fissile plutonium core glowing between radioactive brioche.",
  },
  "black hole": {
    name: "BLACK HOLE SANDWICH",
    power: "∞",
    tier: 99,
    emoji: "🕳️",
    color: "#1e1b4b",
    desc: "An event horizon singularity warping spacetime and crusts.",
  },
  god: {
    name: "GOD SANDWICH",
    power: "OMNIPOTENT",
    tier: 100,
    emoji: "✨",
    color: "#fbbf24",
    desc: "Pure divine revelation spread generously on heavenly pita.",
  },
  water: {
    name: "WATER SANDWICH",
    power: "0 CALORIES",
    tier: 10,
    emoji: "💧",
    color: "#38bdf8",
    desc: "Lukewarm tap water dripping through soggy sandwich bread.",
  },
  "water balloon": {
    name: "WATER BALLOON SANDWICH",
    power: "SPLASH",
    tier: 12,
    emoji: "🎈",
    color: "#06b6d4",
    desc: "Latex rubber filled with tap water, balanced between buns.",
  },
  sun: {
    name: "THE SUN SANDWICH",
    power: "5,778 K",
    tier: 92,
    emoji: "☀️",
    color: "#f97316",
    desc: "1.989 × 10^30 kg of nuclear fusion pressed in hot ciabatta.",
  },
  ant: {
    name: "ANT SANDWICH",
    power: "0.001",
    tier: 2,
    emoji: "🐜",
    color: "#78350f",
    desc: "One confused ant wandering across a slice of multigrain.",
  },
  tuesday: {
    name: "THE CONCEPT OF TUESDAY SANDWICH",
    power: "EXISTENTIAL",
    tier: 65,
    emoji: "📅",
    color: "#64748b",
    desc: "The dread of being only the second day of the work week.",
  },
};

const LOADING_NOTES = [
  "calculating something stupid...",
  "asking the universe...",
  "folding the bread...",
  "checking the laws of physics...",
  "measuring the calories...",
  "consulting the sandwich council...",
];

export default function Home() {
  const [champion, setChampion] = useState<ChampionEntity>(STARTER_CHAMPION);
  const [inputValue, setInputValue] = useState("");
  const [loadingStep, setLoadingStep] = useState<string | null>(null);
  const [battleResult, setBattleResult] = useState<{
    status: "win" | "lose";
    headline: string;
    note: string;
  } | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, [champion]);

  const handleFight = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = inputValue.trim().toLowerCase();
    if (!query || loadingStep) return;

    // Pick random loading message
    const randomNote = LOADING_NOTES[Math.floor(Math.random() * LOADING_NOTES.length)];
    setLoadingStep(randomNote);
    setBattleResult(null);

    // Simulate quick handmade battle resolution (1s for fast game feel)
    setTimeout(() => {
      // Resolve entity metadata
      let challengerTier = 30;
      let challengerName = `${query.toUpperCase()} SANDWICH`;
      let challengerEmoji = "🥪";
      let challengerDesc = `A freshly assembled ${query} clamped between thick artisan bread.`;
      let challengerPower: string | number = Math.floor(Math.random() * 50) + 10;
      let challengerColor = "#d97706";

      // Match against known entities or compute dynamic heuristic
      for (const [key, data] of Object.entries(ENTITY_KNOWLEDGE_BASE)) {
        if (query.includes(key)) {
          challengerTier = data.tier;
          challengerName = data.name;
          challengerEmoji = data.emoji;
          challengerDesc = data.desc;
          challengerPower = data.power;
          challengerColor = data.color;
          break;
        }
      }

      // Contextual humor / counter logic
      let wins = false;
      let note = "";

      // Special comedic counters
      if (query.includes("water") && champion.name.includes("NUCLEAR")) {
        wins = true;
        note = "Water short-circuits the detonation sequence. The radioactive toast is doused.";
      } else if (query.includes("black hole")) {
        wins = true;
        note = "Spacetime itself collapses into a singularity. The bread never stood a chance.";
      } else if (query.includes("ant") && champion.name.includes("BLACK HOLE")) {
        wins = false;
        note = "The ant was instantly spaghettified into subatomic toast crumbs.";
      } else if (challengerTier > champion.scaleTier) {
        wins = true;
        const reasons = [
          `Yeah, ${challengerName.toLowerCase()} was obviously going to win this one.`,
          `Unforgiving scale difference. The previous champion has been completely crushed.`,
          `Pure culinary dominance. The champion was turned into crumbs.`,
          `An undeniable triumph of absurd physics.`,
        ];
        note = reasons[Math.floor(Math.random() * reasons.length)];
      } else if (challengerTier === champion.scaleTier) {
        wins = Math.random() > 0.5;
        note = wins
          ? "A razor-thin victory decided by the crustiness of the bread."
          : "Dead even matchup, but the champion defended with stubborn stale bread.";
      } else {
        wins = false;
        const lossReasons = [
          "That was never going to beat it.",
          "Not even close. The champion barely noticed the attack.",
          "A noble effort, but completely outmatched in flavor and destructive scale.",
          "Nope. That sandwich got devoured instantly.",
        ];
        note = lossReasons[Math.floor(Math.random() * lossReasons.length)];
      }

      if (wins) {
        setChampion({
          name: challengerName,
          power: challengerPower,
          defenses: 0,
          emoji: challengerEmoji,
          sandwichDescription: challengerDesc,
          pixelColor: challengerColor,
          scaleTier: challengerTier,
        });
        setBattleResult({
          status: "win",
          headline: "NEW CHAMPION!",
          note,
        });
      } else {
        setChampion((prev) => ({
          ...prev,
          defenses: prev.defenses + 1,
        }));
        setBattleResult({
          status: "lose",
          headline: "NOPE.",
          note,
        });
      }

      setLoadingStep(null);
      setInputValue("");
    }, 900);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "clamp(1.5rem, 4vw, 3rem) clamp(1.2rem, 5vw, 4rem)",
        maxWidth: "960px",
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* ================= HEADER (Minimal, Top-Left) ================= */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "-2px",
            }}
          >
            {/* Tiny Hand-Drawn Crown SVG */}
            <svg
              width="18"
              height="14"
              viewBox="0 0 24 18"
              fill="none"
              stroke="#171717"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transform: "rotate(-6deg)" }}
            >
              <path d="M2 16L4 5L9 11L14 3L19 11L21 5L22 16H2Z" fill="#F2C94C" />
            </svg>
            <span
              className="font-hand"
              style={{
                fontSize: "0.95rem",
                color: "var(--ink-pencil)",
                letterSpacing: "0.02em",
              }}
            >
              web game
            </span>
          </div>

          <h1
            className="font-display"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              lineHeight: 0.95,
              fontWeight: 900,
              letterSpacing: "-0.01em",
              color: "var(--ink-primary)",
            }}
          >
            IDIOT<br />SANDWICH
          </h1>

          <div
            className="font-hand"
            style={{
              fontSize: "1.05rem",
              color: "var(--ink-pencil)",
              marginTop: "4px",
            }}
          >
            type anything.
          </div>
        </div>

        {/* Minimal Reign Counter in Corner */}
        {champion.defenses > 0 && (
          <div
            className="font-hand"
            style={{
              fontSize: "1.1rem",
              color: "var(--ink-pencil)",
              textAlign: "right",
              transform: "rotate(1.5deg)",
            }}
          >
            <span className="highlighter" style={{ fontWeight: 700 }}>
              {champion.defenses} {champion.defenses === 1 ? "win" : "wins"} in a row
            </span>
          </div>
        )}
      </header>

      {/* ================= MAIN GAME AREA (Centered, Generous Whitespace) ================= */}
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          margin: "clamp(2rem, 5vh, 4rem) 0",
          position: "relative",
          width: "100%",
        }}
      >
        {/* Decorative Doodle 1: Top-Right (Desktop Only) */}
        <div
          className="font-hand"
          style={{
            position: "absolute",
            top: "-15px",
            right: "clamp(2%, 8vw, 15%)",
            color: "var(--ink-pencil)",
            fontSize: "1.05rem",
            transform: "rotate(6deg)",
            userSelect: "none",
            display: "none",
          }}
        >
          <span>✏️</span> <span>&quot;bro...&quot;</span>
        </div>

        {/* CURRENT CHAMPION Label */}
        <div
          className="font-hand"
          style={{
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: "var(--ink-pencil)",
            textTransform: "uppercase",
            marginBottom: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span>—</span>
          <span>CURRENT CHAMPION</span>
          <span>—</span>
        </div>

        {/* CHAMPION SANDWICH ARTWORK (Directly sitting on paper, NO card/gloss) */}
        <div
          className="animate-sketch-bob"
          style={{
            width: "clamp(180px, 32vw, 240px)",
            height: "clamp(160px, 28vw, 210px)",
            margin: "0 auto 1.5rem auto",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Hand-drawn Bread Top Crust */}
          <div
            style={{
              width: "82%",
              height: "26px",
              backgroundColor: "#D4A373",
              border: "2px solid #171717",
              borderRadius: "14px 14px 4px 4px",
              boxShadow: "var(--shadow-sketch-sm)",
              marginBottom: "-6px",
              zIndex: 3,
              position: "relative",
            }}
          >
            {/* Bread seeds/scoring marks */}
            <div
              style={{
                position: "absolute",
                top: "4px",
                left: "25%",
                width: "4px",
                height: "2px",
                background: "#171717",
                borderRadius: "1px",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "6px",
                left: "55%",
                width: "5px",
                height: "2px",
                background: "#171717",
                borderRadius: "1px",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "5px",
                left: "75%",
                width: "4px",
                height: "2px",
                background: "#171717",
                borderRadius: "1px",
              }}
            />
          </div>

          {/* Absurd Entity Filling (Pixel/Graphic Core) */}
          <div
            className="pixel-art"
            style={{
              width: "92%",
              height: "76px",
              backgroundColor: champion.pixelColor,
              border: "2px solid #171717",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "clamp(2.5rem, 5vw, 3.4rem)",
              boxShadow: "var(--shadow-sketch)",
              zIndex: 2,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {champion.emoji}

            {/* Subtle paper cutout stamp label */}
            <span
              className="font-hand"
              style={{
                position: "absolute",
                bottom: "2px",
                right: "4px",
                fontSize: "0.75rem",
                color: "#171717",
                background: "#F7F4EA",
                padding: "0px 4px",
                border: "1px solid #171717",
                borderRadius: "2px",
                opacity: 0.85,
              }}
            >
              filling
            </span>
          </div>

          {/* Hand-drawn Bread Bottom Crust */}
          <div
            style={{
              width: "84%",
              height: "24px",
              backgroundColor: "#CCD5AE",
              border: "2px solid #171717",
              borderRadius: "4px 4px 12px 12px",
              boxShadow: "var(--shadow-sketch-sm)",
              marginTop: "-6px",
              zIndex: 1,
            }}
          />
        </div>

        {/* OBJECT TITLE (Display Typography, Centered) */}
        <h2
          className="font-display"
          style={{
            fontSize: "clamp(1.7rem, 4vw, 2.6rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "0.01em",
            color: "var(--ink-primary)",
            marginBottom: "0.35rem",
            textTransform: "uppercase",
          }}
        >
          {champion.name}
        </h2>

        {/* Power Indicator (Understated) */}
        <div
          className="font-hand"
          style={{
            fontSize: "1.1rem",
            color: "var(--ink-pencil)",
            marginBottom: "2rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <span>
            power: <strong style={{ color: "var(--ink-primary)" }}>{champion.power}</strong>
          </span>
          <span>•</span>
          <span style={{ fontStyle: "italic", fontSize: "0.95rem" }}>
            {champion.sandwichDescription}
          </span>
        </div>

        {/* BATTLE RESULT NOTIFICATION (Inline handwritten feedback) */}
        {battleResult && (
          <div
            className="animate-slam"
            style={{
              marginBottom: "1.75rem",
              maxWidth: "480px",
              padding: "0.6rem 1rem",
              background: battleResult.status === "win" ? "var(--accent-yellow-light)" : "var(--bg-paper-subtle)",
              border: "1.5px solid var(--ink-primary)",
              boxShadow: "var(--shadow-sketch-sm)",
              borderRadius: "2px",
              transform: battleResult.status === "win" ? "rotate(-0.8deg)" : "rotate(0.5deg)",
            }}
          >
            <div
              className="font-display"
              style={{
                fontSize: "1.3rem",
                fontWeight: 800,
                color: battleResult.status === "win" ? "var(--ink-primary)" : "var(--ink-red)",
                marginBottom: "2px",
              }}
            >
              {battleResult.headline}
            </div>
            <p
              className="font-hand"
              style={{
                fontSize: "1.1rem",
                color: "var(--ink-primary)",
                lineHeight: 1.25,
              }}
            >
              &quot;{battleResult.note}&quot;
            </p>
          </div>
        )}

        {/* LOADING STATE (Handwritten message, no standard spinners) */}
        {loadingStep && (
          <div
            className="font-hand animate-scribble-pulse"
            style={{
              fontSize: "1.3rem",
              color: "var(--ink-primary)",
              marginBottom: "1.5rem",
              display: "inline-block",
            }}
          >
            <span className="highlighter">{loadingStep}</span>
          </div>
        )}

        {/* ================= INPUT EXPERIENCE ================= */}
        <div style={{ width: "100%", maxWidth: "460px" }}>
          <div
            className="font-display"
            style={{
              fontSize: "1.45rem",
              fontWeight: 700,
              color: "var(--ink-primary)",
              marginBottom: "0.6rem",
              textAlign: "center",
            }}
          >
            WHAT CAN DEFEAT IT?
          </div>

          <form
            onSubmit={handleFight}
            style={{
              display: "flex",
              alignItems: "stretch",
              gap: "8px",
              width: "100%",
            }}
          >
            <div
              style={{
                flex: 1,
                position: "relative",
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={Boolean(loadingStep)}
                placeholder="type something..."
                maxLength={100}
                style={{
                  width: "100%",
                  height: "46px",
                  padding: "0 14px",
                  backgroundColor: "var(--bg-paper)",
                  border: "1.5px solid var(--ink-primary)",
                  borderRadius: "2px",
                  boxShadow: "var(--shadow-sketch-sm)",
                  color: "var(--ink-primary)",
                  fontFamily: "var(--font-sans)",
                  fontSize: "1rem",
                  outline: "none",
                  transition: "background-color 0.15s ease, border-color 0.15s ease",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.backgroundColor = "#FFFDF5";
                  e.currentTarget.style.borderColor = "#171717";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--bg-paper)";
                }}
              />
            </div>

            {/* FIGHT BUTTON (Yellow Highlighter Marker Style) */}
            <button
              type="submit"
              disabled={Boolean(loadingStep) || !inputValue.trim()}
              className="sketch-button"
              style={{
                height: "46px",
                padding: "0 22px",
                fontSize: "1.35rem",
                borderRadius: "2px",
                letterSpacing: "0.05em",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              FIGHT
            </button>
          </form>

          {/* Subtle suggestions below input */}
          <div
            className="font-hand"
            style={{
              fontSize: "0.95rem",
              color: "var(--ink-faint)",
              marginTop: "8px",
              display: "flex",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <span>try:</span>
            <button
              type="button"
              onClick={() => setInputValue("a nuclear bomb")}
              style={{
                background: "none",
                border: "none",
                color: "var(--ink-pencil)",
                textDecoration: "underline",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "inherit",
              }}
            >
              nuclear bomb
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setInputValue("a black hole")}
              style={{
                background: "none",
                border: "none",
                color: "var(--ink-pencil)",
                textDecoration: "underline",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "inherit",
              }}
            >
              black hole
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setInputValue("water balloon")}
              style={{
                background: "none",
                border: "none",
                color: "var(--ink-pencil)",
                textDecoration: "underline",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "inherit",
              }}
            >
              water balloon
            </button>
          </div>
        </div>
      </main>

      {/* ================= FOOTER / DOODLES ================= */}
      <footer
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          paddingTop: "1.5rem",
          borderTop: "1px dashed var(--bg-paper-border)",
        }}
      >
        <div
          className="font-hand"
          style={{
            fontSize: "0.95rem",
            color: "var(--ink-pencil)",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span>✏️</span>
          <span>drew this in the back of my notebook</span>
        </div>

        {/* Small Hand-drawn Star / Smile doodle */}
        <div
          className="font-hand"
          style={{
            fontSize: "0.95rem",
            color: "var(--ink-faint)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span>anything can be a sandwich</span>
          <span>★</span>
        </div>
      </footer>
    </div>
  );
}
