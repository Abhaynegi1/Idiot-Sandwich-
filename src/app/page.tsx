"use client";

import React, { useState, useRef, useEffect } from "react";
import { GameEntity, AdjudicationVerdict } from "@/types/game";
import { normalizeEntity, adjudicateDuel } from "@/lib/engine/mock-adjudicator";

function getSandwichImage(entity: GameEntity): string | null {
  if (entity.imageUrl) return entity.imageUrl;
  const text = `${entity.rawInput || ""} ${entity.canonicalName || ""}`.toLowerCase();
  if (text.includes("onion")) return "/sandwiches/onion.jpg";
  if (
    text.includes("nuke") ||
    text.includes("nuclear") ||
    text.includes("bomb") ||
    text.includes("atomic") ||
    text.includes("warhead")
  ) {
    return "/sandwiches/nuclear.jpg";
  }
  if (
    text.includes("car") ||
    text.includes("vehicle") ||
    text.includes("truck") ||
    text.includes("sedan") ||
    text.includes("automobile")
  ) {
    return "/sandwiches/car.jpg";
  }
  if (
    text.includes("water") ||
    text.includes("balloon") ||
    text.includes("aqua") ||
    text.includes("splash")
  ) {
    return "/sandwiches/water_balloon.jpg";
  }
  return null;
}

const STARTER_CHAMPION: GameEntity = {
  id: "starter-onion",
  rawInput: "onion",
  canonicalName: "THE HUMBLE ONION SANDWICH",
  category: "Mundane",
  power: "04",
  scaleTier: 6,
  emoji: "🧅",
  pixelColor: "#F4EDE0",
  sandwichDescription: "Raw red onion slices clamped between toasted sourdough.",
  defensesWon: 0,
  imageUrl: "/sandwiches/onion.jpg",
};

const LOADING_NOTES = [
  "thinking...",
  "consulting the sandwich council...",
  "measuring the calories...",
  "checking the laws of physics...",
  "folding the bread...",
  "asking the universe...",
];

export default function Home() {
  const [champion, setChampion] = useState<GameEntity>(STARTER_CHAMPION);
  const [roundNumber, setRoundNumber] = useState<number>(1);
  const [inputValue, setInputValue] = useState("");
  const [loadingStep, setLoadingStep] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Active duel state: "clash" (quick physical impact) -> "result"
  const [duelState, setDuelState] = useState<{
    challenger: GameEntity;
    verdict: AdjudicationVerdict;
    phase: "clash" | "result";
  } | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loadingStep && (!duelState || duelState.phase === "result")) {
      inputRef.current?.focus();
    }
  }, [loadingStep, duelState]);

  const handleFight = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = inputValue.trim();
    if (!query || loadingStep || (duelState && duelState.phase === "clash")) return;

    setErrorMessage(null);
    let noteIndex = Math.floor(Math.random() * LOADING_NOTES.length);
    setLoadingStep(LOADING_NOTES[noteIndex]);

    const intervalId = setInterval(() => {
      noteIndex = (noteIndex + 1) % LOADING_NOTES.length;
      setLoadingStep(LOADING_NOTES[noteIndex]);
    }, 1100);

    try {
      let challenger: GameEntity;
      let verdict: AdjudicationVerdict;

      try {
        const res = await fetch("/api/challenge", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            rawInput: query,
            champion: {
              id: champion.id,
              canonicalName: champion.canonicalName,
              sandwichDescription: champion.sandwichDescription,
              category: champion.category,
              power: champion.power,
              scaleTier: champion.scaleTier,
              defensesWon: champion.defensesWon,
            },
          }),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          clearInterval(intervalId);
          setLoadingStep(null);
          setErrorMessage(data.error || "The challenge could not be served. Try again!");
          return;
        }

        challenger = {
          ...data.challenger,
          imageUrl: getSandwichImage(data.challenger) || undefined,
        };
        verdict = {
          winner: data.winner,
          confidence: data.evaluation.confidence,
          shortHeadline: data.evaluation.shortHeadline,
          humorousReason: data.evaluation.humorousReason,
          dominantFactor: data.evaluation.dominantFactor,
        };
      } catch {
        // Deterministic fallback if API fails
        challenger = normalizeEntity(query);
        challenger.imageUrl = getSandwichImage(challenger) || undefined;
        verdict = adjudicateDuel(champion, challenger);
      }

      clearInterval(intervalId);
      setLoadingStep(null);

      // 1. Enter clash phase: Challenger appears, they move toward each other
      setDuelState({
        challenger,
        verdict,
        phase: "clash",
      });

      // 2. Physical impact resolution after ~750ms
      setTimeout(() => {
        setDuelState({
          challenger,
          verdict,
          phase: "result",
        });

        if (verdict.winner === "challenger") {
          setChampion({
            ...challenger,
            power: formatPower(challenger.power),
            defensesWon: 0,
          });
        } else {
          setChampion((prev) => ({
            ...prev,
            defensesWon: prev.defensesWon + 1,
          }));
        }

        setRoundNumber((r) => r + 1);
        setInputValue("");
      }, 750);
    } catch {
      clearInterval(intervalId);
      setLoadingStep(null);
      setErrorMessage("Something went wrong in the arena. Try again.");
    }
  };

  const isLocked = Boolean(loadingStep || (duelState && duelState.phase === "clash"));

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "clamp(1.5rem, 3.5vh, 2.5rem) 1.5rem",
        maxWidth: "840px",
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* ================= EDGE DOODLES (Restrained: 3 Desktop Doodles) ================= */}
      
      {/* Doodle 1: Tiny UFO in top-right margin */}
      <aside
        aria-hidden="true"
        className="desktop-doodle"
        style={{
          position: "fixed",
          top: "clamp(24px, 5vh, 50px)",
          right: "clamp(24px, 5vw, 60px)",
          pointerEvents: "none",
          opacity: 0.75,
          transform: "rotate(6deg)",
        }}
      >
        <svg width="44" height="38" viewBox="0 0 44 38" fill="none">
          <polygon points="17,16 5,36 39,36 27,16" fill="#F2C94C" opacity="0.3" />
          <path d="M16 12 C16 7, 28 7, 28 12" stroke="#171717" strokeWidth="1.75" strokeLinecap="round" />
          <ellipse cx="22" cy="13" rx="14" ry="4.5" stroke="#171717" strokeWidth="1.75" fill="#F7F4EA" />
          <circle cx="16" cy="13.5" r="1" fill="#171717" />
          <circle cx="22" cy="13.8" r="1" fill="#171717" />
          <circle cx="28" cy="13.5" r="1" fill="#171717" />
        </svg>
      </aside>

      {/* Doodle 2: Tiny sketched cat + "bro..." in bottom-left margin */}
      <aside
        aria-hidden="true"
        className="desktop-doodle"
        style={{
          position: "fixed",
          bottom: "clamp(24px, 5vh, 48px)",
          left: "clamp(24px, 5vw, 60px)",
          pointerEvents: "none",
          opacity: 0.7,
        }}
      >
        <svg width="48" height="42" viewBox="0 0 48 42" fill="none">
          <path
            d="M8 32 C8 24, 14 18, 22 18 C30 18, 36 24, 36 32"
            stroke="#171717"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          <path d="M12 20 L10 11 L18 17" stroke="#171717" strokeWidth="1.75" strokeLinejoin="round" />
          <path d="M26 17 L34 11 L32 20" stroke="#171717" strokeWidth="1.75" strokeLinejoin="round" />
          <circle cx="17" cy="24" r="1.2" fill="#171717" />
          <circle cx="27" cy="24" r="1.2" fill="#171717" />
          <path d="M22 26 L22 28 M20 28 C21 29, 23 29, 24 28" stroke="#171717" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M9 25 L3 24 M9 27 L4 28 M35 25 L41 24 M35 27 L40 28" stroke="#171717" strokeWidth="1" strokeLinecap="round" />
        </svg>
        <div
          className="font-display"
          style={{
            fontSize: "0.85rem",
            color: "var(--ink-secondary)",
            marginLeft: "8px",
            transform: "rotate(-4deg)",
          }}
        >
          bro...
        </div>
      </aside>

      {/* Doodle 3: Tiny scribbled star in bottom-right margin */}
      <aside
        aria-hidden="true"
        className="desktop-doodle"
        style={{
          position: "fixed",
          bottom: "clamp(30px, 6vh, 60px)",
          right: "clamp(24px, 5vw, 60px)",
          pointerEvents: "none",
          opacity: 0.6,
          transform: "rotate(12deg)",
        }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2 L14.5 8.5 L21 9.5 L16 14 L17.5 21 L12 17.5 L6.5 21 L8 14 L3 9.5 L9.5 8.5 Z"
            stroke="#171717"
            strokeWidth="1.5"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </aside>

      {/* ================= 1. TITLE / LOGO ================= */}
      <header
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          marginBottom: "clamp(0.75rem, 2vh, 1.5rem)",
        }}
      >
        {/* Tiny Crown above title */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            marginBottom: "-4px",
            marginLeft: "2px",
          }}
        >
          <svg
            width="20"
            height="15"
            viewBox="0 0 24 18"
            fill="none"
            stroke="#171717"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transform: "rotate(-5deg)" }}
          >
            <path d="M2 16L4 5L9 11L14 3L19 11L21 5L22 16H2Z" fill="#F2C94C" />
          </svg>
        </div>

        <h1
          className="font-display"
          style={{
            fontSize: "clamp(2.3rem, 5vw, 3.2rem)",
            lineHeight: 0.9,
            fontWeight: 900,
            letterSpacing: "-0.01em",
            color: "var(--ink-primary)",
            margin: 0,
            userSelect: "none",
          }}
        >
          IDIOT<br />SANDWICH
        </h1>

        <div
          className="font-display"
          style={{
            fontSize: "1.15rem",
            color: "var(--ink-secondary)",
            marginTop: "3px",
            letterSpacing: "0.02em",
          }}
        >
          type anything.
        </div>
      </header>

      {/* ================= 2. MAIN GAME AREA (55–70% Viewport) ================= */}
      <main
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          flex: 1,
          padding: "0.25rem 0",
        }}
      >
        {/* ROUND 01 (Clean mono) */}
        <div
          className="font-mono"
          style={{
            fontSize: "0.85rem",
            letterSpacing: "0.18em",
            color: "var(--ink-secondary)",
            marginBottom: "0.25rem",
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          ROUND {roundNumber.toString().padStart(2, "0")}
        </div>

        {/* — CURRENT CHAMPION — (Handwritten with subtle yellow highlight) */}
        <div
          className="font-display"
          style={{
            fontSize: "1.05rem",
            letterSpacing: "0.08em",
            color: "var(--ink-primary)",
            textTransform: "uppercase",
            marginBottom: "0.85rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span>—</span>
          <span className="highlighter" style={{ fontWeight: 700 }}>
            CURRENT CHAMPION
          </span>
          <span>—</span>
        </div>

        {/* ================= LARGE ARTWORK / CLASH ARENA ================= */}
        {duelState && duelState.phase === "clash" ? (
          /* Clash: Champion and Challenger move toward each other */
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "clamp(12px, 3vw, 24px)",
              margin: "0.5rem 0",
              width: "100%",
            }}
          >
            {/* Clashing Champion */}
            <div className="animate-clash-left" style={{ textAlign: "center" }}>
              <SandwichArtwork entity={champion} compact />
              <div
                className="font-display"
                style={{
                  fontSize: "1.05rem",
                  marginTop: "4px",
                  color: "var(--ink-primary)",
                  maxWidth: "180px",
                  lineHeight: 1.1,
                }}
              >
                {champion.canonicalName}
              </div>
            </div>

            {/* Inky VS */}
            <div
              className="font-display animate-impact"
              style={{
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
                fontWeight: 900,
                color: "var(--ink-primary)",
                fontStyle: "italic",
                transform: "rotate(-8deg)",
              }}
            >
              VS
            </div>

            {/* Clashing Challenger */}
            <div className="animate-clash-right" style={{ textAlign: "center" }}>
              <SandwichArtwork entity={duelState.challenger} compact />
              <div
                className="font-display"
                style={{
                  fontSize: "1.05rem",
                  marginTop: "4px",
                  color: "var(--ink-primary)",
                  maxWidth: "180px",
                  lineHeight: 1.1,
                }}
              >
                {duelState.challenger.canonicalName}
              </div>
            </div>
          </div>
        ) : (
          /* Normal Single Large Artwork (Anchors the page) */
          <div
            className="animate-idle"
            style={{
              margin: "0 0 0.5rem 0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <SandwichArtwork entity={champion} />
          </div>
        )}

        {/* ================= OBJECT NAME ================= */}
        <h2
          className="font-display"
          style={{
            fontSize: "clamp(1.9rem, 4.5vw, 2.85rem)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "0.01em",
            color: "var(--ink-primary)",
            margin: "0 0 0.25rem 0",
            textTransform: "uppercase",
            maxWidth: "680px",
          }}
        >
          {champion.canonicalName}
        </h2>

        {/* POWER: XX (Clean Mono, Small) */}
        <div
          className="font-mono"
          style={{
            fontSize: "0.95rem",
            color: "var(--ink-secondary)",
            letterSpacing: "0.1em",
            marginBottom: "0.6rem",
          }}
        >
          POWER: <span style={{ color: "var(--ink-primary)", fontWeight: 700 }}>{champion.power}</span>
        </div>

        {/* ================= RESULT STATE (Inline in Game Area) ================= */}
        {duelState && duelState.phase === "result" && (
          <div
            className="animate-sketch-pop"
            style={{
              marginBottom: "0.75rem",
              padding: "0.35rem 0.75rem",
              maxWidth: "540px",
            }}
          >
            {duelState.verdict.winner === "challenger" ? (
              <div>
                <span
                  className="highlighter font-display"
                  style={{
                    fontSize: "1.35rem",
                    fontWeight: 700,
                    letterSpacing: "0.03em",
                  }}
                >
                  NEW CHAMPION
                </span>
                <p
                  className="font-display"
                  style={{
                    fontSize: "1.05rem",
                    color: "var(--ink-secondary)",
                    marginTop: "4px",
                    fontStyle: "italic",
                  }}
                >
                  &quot;{duelState.verdict.humorousReason || "yeah... that was inevitable."}&quot;
                </p>
              </div>
            ) : (
              <div>
                <span
                  className="font-display"
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: 800,
                    letterSpacing: "0.04em",
                    color: "var(--ink-primary)",
                  }}
                >
                  NOPE.
                </span>
                <p
                  className="font-display"
                  style={{
                    fontSize: "1.05rem",
                    color: "var(--ink-secondary)",
                    marginTop: "4px",
                    fontStyle: "italic",
                  }}
                >
                  &quot;nice try.&quot; — {duelState.verdict.shortHeadline}
                </p>
              </div>
            )}
          </div>
        )}

        {/* ================= WHAT CAN DEFEAT IT? ================= */}
        <div
          className="font-display"
          style={{
            fontSize: "clamp(1.35rem, 3vw, 1.7rem)",
            fontWeight: 700,
            letterSpacing: "0.03em",
            color: "var(--ink-primary)",
            margin: "0.5rem 0 0.5rem 0",
          }}
        >
          WHAT CAN DEFEAT IT?
        </div>

        {/* INPUT + FIGHT FORM */}
        <form
          onSubmit={handleFight}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            width: "100%",
            maxWidth: "480px",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLocked}
            placeholder="type something..."
            maxLength={100}
            className="notebook-input"
            aria-label="What can defeat the current sandwich champion?"
          />

          <button
            type="submit"
            disabled={isLocked || !inputValue.trim()}
            className="fight-button"
          >
            FIGHT
          </button>
        </form>

        {/* THINKING ANIMATION / ROTATING NOTE */}
        {loadingStep && (
          <div
            className="font-display animate-thinking"
            style={{
              marginTop: "0.75rem",
              fontSize: "1.15rem",
            }}
          >
            <span className="highlighter">{loadingStep}</span>
          </div>
        )}

        {/* Error Feedback */}
        {errorMessage && (
          <div
            className="font-display animate-sketch-pop"
            style={{
              marginTop: "0.75rem",
              color: "var(--ink-primary)",
              fontSize: "1.05rem",
              border: "1.5px dashed var(--ink-secondary)",
              padding: "4px 12px",
              borderRadius: "2px",
              backgroundColor: "var(--bg-paper-muted)",
            }}
          >
            {errorMessage}
          </div>
        )}

        {/* Minimal inspiration annotations (dry, unobtrusive) */}
        {!loadingStep && (!duelState || duelState.phase === "result") && (
          <div
            className="font-mono"
            style={{
              fontSize: "0.8rem",
              color: "var(--ink-secondary)",
              marginTop: "0.75rem",
              display: "flex",
              gap: "8px",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "center",
              opacity: 0.7,
            }}
          >
            <span>try:</span>
            <ChipText text="a car" onClick={() => setInputValue("a car")} />
            <span>•</span>
            <ChipText text="nuclear bomb" onClick={() => setInputValue("nuclear bomb")} />
            <span>•</span>
            <ChipText text="water balloon" onClick={() => setInputValue("water balloon")} />
            <span>•</span>
            <ChipText text="tuesday" onClick={() => setInputValue("tuesday")} />
          </div>
        )}
      </main>

      {/* ================= FOOTER (Clean & Empty) ================= */}
      <footer
        style={{
          width: "100%",
          paddingTop: "0.75rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span
          className="font-display"
          style={{
            fontSize: "0.95rem",
            color: "var(--ink-secondary)",
            opacity: 0.6,
          }}
        >
          drawn in the back of a notebook
        </span>
      </footer>
    </div>
  );
}

/**
 * Large, expressive Sandwich Artwork
 * Displays high-quality graphical generated sandwich art on the notebook page,
 * with seamless multiply blending and clean physical presence.
 */
function SandwichArtwork({
  entity,
  compact = false,
}: {
  entity: GameEntity;
  compact?: boolean;
}) {
  const imageSrc = getSandwichImage(entity);
  const width = compact ? "clamp(150px, 20vw, 190px)" : "clamp(260px, 38vw, 330px)";

  if (imageSrc) {
    return (
      <div
        style={{
          width,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          userSelect: "none",
        }}
      >
        {/* Graphical Generated Sandwich Illustration */}
        <img
          src={imageSrc}
          alt={entity.canonicalName}
          style={{
            width: "100%",
            height: "auto",
            maxHeight: compact ? "140px" : "240px",
            aspectRatio: "4 / 3",
            objectFit: "contain",
            mixBlendMode: "multiply",
            display: "block",
            filter: "contrast(1.04) drop-shadow(0px 3px 6px rgba(23, 23, 23, 0.08))",
          }}
        />
        {/* Subtle Sketched Ground Line */}
        <svg
          width={compact ? "120" : "190"}
          height="8"
          viewBox="0 0 190 8"
          fill="none"
          style={{
            marginTop: "-4px",
            opacity: 0.35,
          }}
        >
          <ellipse cx="95" cy="4" rx="80" ry="2.5" stroke="#171717" strokeWidth="1.25" strokeDasharray="3 2" />
        </svg>
      </div>
    );
  }

  // Dynamic illustrated sandwich for unmapped custom inputs
  const bunHeight = compact ? "22px" : "clamp(30px, 4vw, 36px)";
  const fillingHeight = compact ? "55px" : "clamp(80px, 11vw, 100px)";
  const emojiSize = compact ? "2.6rem" : "clamp(3.8rem, 5.5vw, 4.8rem)";

  return (
    <div
      style={{
        width,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        userSelect: "none",
      }}
    >
      {/* Top Bun */}
      <div
        style={{
          width: "90%",
          height: bunHeight,
          backgroundColor: "#DFB277",
          border: "2.5px solid var(--ink-primary)",
          borderRadius: "20px 20px 5px 5px",
          boxShadow: "var(--shadow-sketch-sm)",
          marginBottom: "-6px",
          zIndex: 4,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "6px",
            left: "25%",
            width: "8px",
            height: "2.5px",
            backgroundColor: "var(--ink-primary)",
            borderRadius: "2px",
            transform: "rotate(-10deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "7px",
            right: "28%",
            width: "8px",
            height: "2.5px",
            backgroundColor: "var(--ink-primary)",
            borderRadius: "2px",
            transform: "rotate(12deg)",
          }}
        />
      </div>

      {/* Filling Core with Absurd Entity */}
      <div
        style={{
          width: "96%",
          height: fillingHeight,
          backgroundColor: entity.pixelColor || "#F4EDE0",
          border: "2.5px solid var(--ink-primary)",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: emojiSize,
          boxShadow: "var(--shadow-sketch)",
          zIndex: 3,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: "-3px",
            left: "6px",
            width: "28px",
            height: "8px",
            backgroundColor: "#7D9D64",
            border: "1.5px solid var(--ink-primary)",
            borderRadius: "4px",
            transform: "rotate(-6deg)",
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-4px",
            right: "12px",
            width: "20px",
            height: "10px",
            backgroundColor: "var(--accent-yellow)",
            border: "1.5px solid var(--ink-primary)",
            borderRadius: "2px 2px 5px 5px",
            transform: "rotate(4deg)",
            zIndex: 1,
          }}
        />
        <span
          style={{
            position: "relative",
            zIndex: 2,
            filter: "drop-shadow(2px 2px 0px rgba(0,0,0,0.15))",
          }}
        >
          {entity.emoji}
        </span>
      </div>

      {/* Bottom Bun */}
      <div
        style={{
          width: "92%",
          height: bunHeight,
          backgroundColor: "#D0A065",
          border: "2.5px solid var(--ink-primary)",
          borderRadius: "4px 4px 18px 18px",
          boxShadow: "var(--shadow-sketch-sm)",
          marginTop: "-6px",
          zIndex: 2,
        }}
      />

      {/* Ground Shadow */}
      <svg
        width={compact ? "120" : "190"}
        height="8"
        viewBox="0 0 190 8"
        fill="none"
        style={{
          marginTop: "4px",
          opacity: 0.35,
        }}
      >
        <ellipse cx="95" cy="4" rx="80" ry="2.5" stroke="#171717" strokeWidth="1.25" strokeDasharray="3 2" />
      </svg>
    </div>
  );
}

function ChipText({ text, onClick }: { text: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        background: "none",
        border: "none",
        color: "var(--ink-secondary)",
        textDecoration: "underline",
        textUnderlineOffset: "3px",
        cursor: "pointer",
        fontFamily: "inherit",
        fontSize: "inherit",
        padding: 0,
      }}
    >
      {text}
    </button>
  );
}

function formatPower(power: string | number): string {
  const num = Number(power);
  if (isNaN(num)) return String(power);
  return num < 10 && num >= 0 ? `0${num}` : String(num);
}
