"use client";

import React, { useState, useRef, useEffect } from "react";
import { GameEntity, AdjudicationVerdict, TurnHistoryRecord } from "@/types/game";
import { normalizeEntity, adjudicateDuel } from "@/lib/engine/mock-adjudicator";

const STARTER_CHAMPION: GameEntity = {
  id: "starter-onion",
  rawInput: "onion",
  canonicalName: "THE HUMBLE ONION SANDWICH",
  category: "Mundane",
  power: "4",
  scaleTier: 6,
  emoji: "🧅",
  pixelColor: "#9333ea",
  sandwichDescription: "Raw red onion slices clamped between toasted sourdough. Brings tears.",
  defensesWon: 0,
};

const LOADING_NOTES = [
  "calculating something stupid...",
  "asking the universe...",
  "folding the bread...",
  "checking the laws of physics...",
  "measuring the calories...",
  "consulting the sandwich council...",
  "testing crust crunchiness...",
];

export default function Home() {
  const [champion, setChampion] = useState<GameEntity>(STARTER_CHAMPION);
  const [inputValue, setInputValue] = useState("");
  const [loadingStep, setLoadingStep] = useState<string | null>(null);
  const [activeDuel, setActiveDuel] = useState<{
    challenger: GameEntity;
    verdict: AdjudicationVerdict;
    phase: "clash" | "verdict";
  } | null>(null);
  const [history, setHistory] = useState<TurnHistoryRecord[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loadingStep && !activeDuel) {
      inputRef.current?.focus();
    }
  }, [loadingStep, activeDuel]);

  const handleFight = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = inputValue.trim();
    if (!query || loadingStep || activeDuel) return;

    // Pick random loading message
    const randomNote = LOADING_NOTES[Math.floor(Math.random() * LOADING_NOTES.length)];
    setLoadingStep(randomNote);

    // 1. Normalize entity
    const challenger = normalizeEntity(query);

    // 2. Evaluate duel using engine
    const verdict = adjudicateDuel(champion, challenger);

    // 3. Staging the confrontation transition
    setTimeout(() => {
      setLoadingStep(null);
      setActiveDuel({
        challenger,
        verdict,
        phase: "clash",
      });

      // Quick standoff pause (800ms) before verdict reveal
      setTimeout(() => {
        setActiveDuel((prev) => (prev ? { ...prev, phase: "verdict" } : null));

        const turnRecord: TurnHistoryRecord = {
          turnIndex: history.length + 1,
          championName: champion.canonicalName,
          challengerName: challenger.canonicalName,
          winner: verdict.winner,
          headline: verdict.shortHeadline,
          reason: verdict.humorousReason,
          timestamp: Date.now(),
        };

        setHistory((prev) => [turnRecord, ...prev]);

        if (verdict.winner === "challenger") {
          setChampion({
            ...challenger,
            defensesWon: 0,
          });
        } else {
          setChampion((prev) => ({
            ...prev,
            defensesWon: prev.defensesWon + 1,
          }));
        }

        setInputValue("");
      }, 750);
    }, 700);
  };

  const dismissDuel = () => {
    setActiveDuel(null);
    inputRef.current?.focus();
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
            {/* Hand-Drawn Crown SVG */}
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
              phase 0.1 prototype
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

        {/* Defense Streak Counter */}
        {champion.defensesWon > 0 && (
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
              {champion.defensesWon} {champion.defensesWon === 1 ? "defense" : "defenses"} won
            </span>
          </div>
        )}
      </header>

      {/* ================= MAIN ARENA ================= */}
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          margin: "clamp(2rem, 4vh, 3.5rem) 0",
          position: "relative",
          width: "100%",
        }}
      >
        {/* CURRENT CHAMPION Label */}
        <div
          className="font-hand"
          style={{
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: "var(--ink-pencil)",
            textTransform: "uppercase",
            marginBottom: "0.8rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span>—</span>
          <span>CURRENT CHAMPION</span>
          <span>—</span>
        </div>

        {/* CLASH CONFRONTATION / CHAMPION DISPLAY */}
        {activeDuel && activeDuel.phase === "clash" ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "clamp(1rem, 4vw, 2.5rem)",
              margin: "1rem 0 1.5rem 0",
            }}
          >
            {/* Champion in clash */}
            <div style={{ textAlign: "center" }} className="animate-sketch-bob">
              <SandwichGraphic emoji={champion.emoji} color={champion.pixelColor} />
              <div className="font-display" style={{ fontSize: "1.1rem", marginTop: "4px" }}>
                {champion.canonicalName}
              </div>
            </div>

            {/* Versus scribbled lightning */}
            <div
              className="font-display"
              style={{
                fontSize: "2rem",
                color: "var(--ink-primary)",
                fontStyle: "italic",
                transform: "rotate(-10deg)",
              }}
            >
              VS
            </div>

            {/* Challenger in clash */}
            <div style={{ textAlign: "center" }} className="animate-sketch-bob">
              <SandwichGraphic emoji={activeDuel.challenger.emoji} color={activeDuel.challenger.pixelColor} />
              <div className="font-display" style={{ fontSize: "1.1rem", marginTop: "4px" }}>
                {activeDuel.challenger.canonicalName}
              </div>
            </div>
          </div>
        ) : (
          /* Normal Champion Single Display */
          <div
            className="animate-sketch-bob"
            style={{
              margin: "0 auto 1rem auto",
            }}
          >
            <SandwichGraphic emoji={champion.emoji} color={champion.pixelColor} />
          </div>
        )}

        {/* OBJECT TITLE (Display Typography) */}
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
          {champion.canonicalName}
        </h2>

        {/* Metadata */}
        <div
          className="font-hand"
          style={{
            fontSize: "1.1rem",
            color: "var(--ink-pencil)",
            marginBottom: "1.75rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            flexWrap: "wrap",
          }}
        >
          <span>
            power: <strong style={{ color: "var(--ink-primary)" }}>{champion.power}</strong>
          </span>
          <span>•</span>
          <span>tier: {champion.category}</span>
          <span>•</span>
          <span style={{ fontStyle: "italic", fontSize: "0.95rem" }}>
            {champion.sandwichDescription}
          </span>
        </div>

        {/* ================= CLASH VERDICT OVERLAY ================= */}
        {activeDuel && activeDuel.phase === "verdict" && (
          <div
            className="animate-slam"
            style={{
              marginBottom: "1.75rem",
              maxWidth: "520px",
              width: "100%",
              padding: "0.85rem 1.25rem",
              background:
                activeDuel.verdict.winner === "challenger"
                  ? "var(--accent-yellow-light)"
                  : "var(--bg-paper-subtle)",
              border: "1.5px solid var(--ink-primary)",
              boxShadow: "var(--shadow-sketch)",
              borderRadius: "2px",
              textAlign: "left",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "4px",
              }}
            >
              <div
                className="font-display"
                style={{
                  fontSize: "1.35rem",
                  fontWeight: 800,
                  color:
                    activeDuel.verdict.winner === "challenger"
                      ? "var(--ink-primary)"
                      : "var(--ink-red)",
                }}
              >
                {activeDuel.verdict.winner === "challenger"
                  ? "👑 NEW CHAMPION CROWNED!"
                  : `❌ CHAMPION DEFENDED: ${activeDuel.verdict.shortHeadline}`}
              </div>

              <button
                onClick={dismissDuel}
                aria-label="Dismiss verdict"
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.2rem",
                  cursor: "pointer",
                  color: "var(--ink-pencil)",
                  fontFamily: "var(--font-hand)",
                }}
              >
                ✕
              </button>
            </div>

            <p
              className="font-hand"
              style={{
                fontSize: "1.15rem",
                color: "var(--ink-primary)",
                lineHeight: 1.3,
                marginBottom: "8px",
              }}
            >
              &quot;{activeDuel.verdict.humorousReason}&quot;
            </p>

            <div
              className="font-hand"
              style={{
                fontSize: "0.9rem",
                color: "var(--ink-pencil)",
                display: "flex",
                gap: "12px",
              }}
            >
              <span>factor: {activeDuel.verdict.dominantFactor}</span>
              <span>confidence: {Math.round(activeDuel.verdict.confidence * 100)}%</span>
            </div>
          </div>
        )}

        {/* LOADING NOTE (Handwritten message) */}
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
            <div style={{ flex: 1, position: "relative" }}>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={Boolean(loadingStep || (activeDuel && activeDuel.phase === "clash"))}
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
                }}
                onFocus={(e) => {
                  e.currentTarget.style.backgroundColor = "#FFFDF5";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--bg-paper)";
                }}
              />
            </div>

            {/* FIGHT BUTTON */}
            <button
              type="submit"
              disabled={Boolean(loadingStep || !inputValue.trim() || (activeDuel && activeDuel.phase === "clash"))}
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

          {/* Quick inspiration chips */}
          <div
            className="font-hand"
            style={{
              fontSize: "0.95rem",
              color: "var(--ink-faint)",
              marginTop: "8px",
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <span>try:</span>
            <ChipButton label="car" onClick={() => setInputValue("a car")} />
            <span>•</span>
            <ChipButton label="nuclear bomb" onClick={() => setInputValue("nuclear bomb")} />
            <span>•</span>
            <ChipButton label="water balloon" onClick={() => setInputValue("water balloon")} />
            <span>•</span>
            <ChipButton label="black hole" onClick={() => setInputValue("black hole")} />
            <span>•</span>
            <ChipButton label="tuesday" onClick={() => setInputValue("tuesday")} />
          </div>
        </div>
      </main>

      {/* ================= FOOTER / HISTORY DRAWER ================= */}
      <footer
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          paddingTop: "1.5rem",
          borderTop: "1px dashed var(--bg-paper-border)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
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

          {/* History Toggle Button */}
          {history.length > 0 && (
            <button
              onClick={() => setShowHistory((prev) => !prev)}
              className="font-hand"
              style={{
                background: "none",
                border: "none",
                color: "var(--ink-primary)",
                fontSize: "1rem",
                textDecoration: "underline",
                cursor: "pointer",
                padding: "2px 6px",
              }}
            >
              {showHistory ? "✕ hide history" : `📜 battle history (${history.length})`}
            </button>
          )}

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
        </div>

        {/* Collapsible History Drawer */}
        {showHistory && (
          <div
            className="animate-slam"
            style={{
              marginTop: "0.5rem",
              padding: "1rem",
              backgroundColor: "var(--bg-paper-subtle)",
              border: "1.5px solid var(--ink-primary)",
              boxShadow: "var(--shadow-sketch-sm)",
              borderRadius: "2px",
              maxHeight: "220px",
              overflowY: "auto",
              textAlign: "left",
            }}
          >
            <div
              className="font-display"
              style={{
                fontSize: "1.1rem",
                fontWeight: 800,
                marginBottom: "0.5rem",
                color: "var(--ink-primary)",
              }}
            >
              NOTEBOOK BATTLE LOG
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {history.map((record) => (
                <div
                  key={record.turnIndex}
                  style={{
                    fontSize: "0.9rem",
                    borderBottom: "1px dashed var(--bg-paper-border)",
                    paddingBottom: "4px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span className="font-display" style={{ fontWeight: 700 }}>
                      Turn #{record.turnIndex}: {record.challengerName} vs {record.championName}
                    </span>
                    <span
                      className="font-hand"
                      style={{
                        color: record.winner === "challenger" ? "var(--ink-green)" : "var(--ink-red)",
                        fontWeight: 700,
                      }}
                    >
                      {record.winner === "challenger" ? "CHALLENGER WON" : "CHAMPION DEFENDED"}
                    </span>
                  </div>
                  <div
                    className="font-hand"
                    style={{ color: "var(--ink-pencil)", fontStyle: "italic" }}
                  >
                    &quot;{record.reason}&quot;
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </footer>
    </div>
  );
}

/**
 * Reusable Sandwich Artwork Graphic (direct on paper, no glossy card)
 */
function SandwichGraphic({ emoji, color }: { emoji: string; color: string }) {
  return (
    <div
      style={{
        width: "clamp(160px, 28vw, 220px)",
        height: "clamp(130px, 24vw, 180px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* Top Bread Crust */}
      <div
        style={{
          width: "84%",
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
            left: "60%",
            width: "5px",
            height: "2px",
            background: "#171717",
            borderRadius: "1px",
          }}
        />
      </div>

      {/* Entity Filling Core */}
      <div
        className="pixel-art"
        style={{
          width: "92%",
          height: "68px",
          backgroundColor: color,
          border: "2px solid #171717",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "clamp(2.4rem, 4.5vw, 3.2rem)",
          boxShadow: "var(--shadow-sketch)",
          zIndex: 2,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {emoji}
      </div>

      {/* Bottom Bread Crust */}
      <div
        style={{
          width: "86%",
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
  );
}

function ChipButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
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
      {label}
    </button>
  );
}
