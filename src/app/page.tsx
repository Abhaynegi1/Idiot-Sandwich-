"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { GameEntity, AdjudicationVerdict, TurnHistoryRecord } from "@/types/game";
import { normalizeEntity, adjudicateDuel } from "@/lib/engine/mock-adjudicator";
import {
  DoodlePaperAirplane,
  DoodleCoffeeCup,
  DoodleSwirl,
  DoodleCloud,
  DoodleSkullMini,
  DoodleCurledArrow,
  DoodleSparkleCluster,
  DoodleBombWithFuse,
} from "@/components/doodle-icons";
import { NotebookMessyBackground } from "@/components/notebook-doodles";
import { SandwichCardModal } from "@/components/sandwich-card-modal";

const STARTER_CHAMPION: GameEntity = {
  id: "starter-onion",
  rawInput: "onion",
  canonicalName: "THE HUMBLE ONION SANDWICH",
  category: "Mundane",
  power: "04",
  scaleTier: 6,
  emoji: "🧅",
  pixelColor: "#EBD5EE",
  sandwichDescription: "Raw red onion slices clamped between toasted sourdough.",
  defensesWon: 0,
};

const LOADING_NOTES = [
  "thinking...",
  "consulting the sandwich council...",
  "measuring the calories...",
  "checking the laws of physics...",
  "folding the bread...",
  "asking the universe...",
];

const STORAGE_KEY = "idiot_sandwich_session_v1";

export default function Home() {
  const [champion, setChampion] = useState<GameEntity>(STARTER_CHAMPION);
  const [roundNumber, setRoundNumber] = useState<number>(1);
  const [history, setHistory] = useState<TurnHistoryRecord[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [showCardModal, setShowCardModal] = useState<boolean>(false);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

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

  // 1. Hydrate state from localStorage on initial mount asynchronously
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.champion && parsed.roundNumber) {
            // Strip obsolete legacy image URLs so all entities render in unified notebook emoji style
            const cleanChampion = { ...parsed.champion };
            delete cleanChampion.imageUrl;
            setChampion(cleanChampion);
            setRoundNumber(parsed.roundNumber);
            if (Array.isArray(parsed.history)) {
              setHistory(parsed.history);
            }
          }
        }
      } catch (e) {
        console.warn("Failed to load saved session:", e);
      } finally {
        setIsHydrated(true);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // 2. Persist state to localStorage on updates (only after initial hydration)
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          champion,
          roundNumber,
          history,
        })
      );
    } catch (e) {
      console.warn("Failed to save session:", e);
    }
  }, [champion, roundNumber, history, isHydrated]);

  useEffect(() => {
    if (!loadingStep && (!duelState || duelState.phase === "result")) {
      inputRef.current?.focus();
    }
  }, [loadingStep, duelState]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  const handleShare = () => {
    setShowCardModal(true);
  };

  const handleReset = () => {
    setChampion(STARTER_CHAMPION);
    setRoundNumber(1);
    setHistory([]);
    setDuelState(null);
    setErrorMessage(null);
    setShowResetConfirm(false);
    setShowHistory(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
    showToast("Run reset back to The Humble Onion 🧅");
  };

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

        // Record in history
        const newRecord: TurnHistoryRecord = {
          turnIndex: roundNumber,
          championName: champion.canonicalName,
          championEmoji: champion.emoji,
          challengerName: challenger.canonicalName,
          challengerEmoji: challenger.emoji,
          winner: verdict.winner,
          headline: verdict.shortHeadline,
          reason: verdict.humorousReason,
          dominantFactor: verdict.dominantFactor,
          timestamp: Date.now(),
        };
        setHistory((prev) => [newRecord, ...prev]);

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
        zIndex: 1,
      }}
    >
      {/* ================= MESSY NOTEBOOK DOODLES & ROUGH TEXT BACKGROUND ================= */}
      <NotebookMessyBackground />

      {/* ================= 1. TITLE / LOGO & ACTIONS ================= */}
      <header
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "clamp(0.75rem, 2vh, 1.5rem)",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        {/* Branding: Logo + Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Image
            src="/icon.svg"
            alt="Idiot Sandwich Logo"
            width={62}
            height={62}
            unoptimized
            style={{
              width: "clamp(48px, 7vw, 62px)",
              height: "auto",
              display: "block",
              userSelect: "none",
              filter: "drop-shadow(2px 2px 0px var(--ink-primary))",
              transform: "rotate(-3deg)",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(2.1rem, 4.5vw, 2.9rem)",
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
                fontSize: "1.1rem",
                color: "var(--ink-secondary)",
                marginTop: "3px",
                letterSpacing: "0.02em",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span>type anything.</span>
              <svg width="22" height="6" viewBox="0 0 22 6" fill="none" opacity="0.6">
                <path d="M 1 3 Q 4 0.5 7 3 T 13 3 T 19 3" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Action Controls: Share, History, Reset */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flexWrap: "wrap",
            justifyContent: "flex-end",
            marginTop: "6px",
          }}
        >
          <Link
            href="/how-to-play"
            className="secondary-btn"
            title="How to play and game rules"
            style={{ textDecoration: "none" }}
          >
            ❓ Rules
          </Link>

          <button
            type="button"
            onClick={() => setShowCardModal(true)}
            className="secondary-btn"
            title="Download collectible sandwich brag card"
            style={{ backgroundColor: "var(--accent-yellow-light)" }}
          >
            📸 Card
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="secondary-btn"
            title="Share run card or copy brag text"
          >
            📋 Share
          </button>

          <button
            type="button"
            onClick={() => setShowHistory((prev) => !prev)}
            className={`secondary-btn ${showHistory ? "active" : ""}`}
            title="Toggle battle history receipt"
          >
            📜 History {history.length > 0 ? `(${history.length})` : ""}
          </button>

          {showResetConfirm ? (
            <div style={{ display: "inline-flex", gap: "4px", alignItems: "center" }}>
              <button
                type="button"
                onClick={handleReset}
                className="secondary-btn"
                style={{ backgroundColor: "var(--accent-yellow)", fontWeight: 700 }}
              >
                Reset? Yes
              </button>
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="secondary-btn"
              >
                Cancel
              </button>
            </div>
          ) : (
            roundNumber > 1 && (
              <button
                type="button"
                onClick={() => setShowResetConfirm(true)}
                className="secondary-btn"
                title="Restart run back to Round 1"
              >
                🔄 Reset
              </button>
            )
          )}
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
            gap: "8px",
          }}
        >
          <span style={{ opacity: 0.7, transform: "rotate(-10deg)" }}>
            <DoodleSparkleCluster size={18} />
          </span>
          <span>—</span>
          <span className="highlighter" style={{ fontWeight: 700 }}>
            CURRENT CHAMPION
          </span>
          <span>—</span>
          <span style={{ opacity: 0.7, transform: "rotate(10deg)" }}>
            <DoodleSparkleCluster size={18} />
          </span>
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
              <SandwichArtwork entity={champion} compact isChampion />
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
            <SandwichArtwork entity={champion} isChampion />
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
                <button
                  type="button"
                  onClick={() => setShowCardModal(true)}
                  className="secondary-btn"
                  style={{
                    marginTop: "8px",
                    fontSize: "0.95rem",
                    padding: "3px 10px",
                    backgroundColor: "var(--accent-yellow-light)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <span>📸</span> Export Champion Card
                </button>
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
              opacity: 0.75,
            }}
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
              <span style={{ transform: "rotate(-6deg)" }}>
                <DoodleCurledArrow size={20} />
              </span>
              <span>try:</span>
            </span>
            <ChipText text="a car" onClick={() => setInputValue("a car")} />
            <span>•</span>
            <ChipText text="nuclear bomb" onClick={() => setInputValue("nuclear bomb")} />
            <span>•</span>
            <ChipText text="water balloon" onClick={() => setInputValue("water balloon")} />
            <span>•</span>
            <ChipText text="tuesday" onClick={() => setInputValue("tuesday")} />
          </div>
        )}

        {/* ================= BATTLE HISTORY DRAWER ================= */}
        {showHistory && (
          <div
            className="animate-sketch-pop"
            style={{
              width: "100%",
              maxWidth: "540px",
              marginTop: "1.25rem",
              padding: "14px 16px",
              backgroundColor: "var(--bg-paper)",
              border: "2px solid var(--ink-primary)",
              borderRadius: "3px",
              boxShadow: "var(--shadow-sketch)",
              textAlign: "left",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
                borderBottom: "1.5px dashed var(--ink-secondary)",
                paddingBottom: "6px",
              }}
            >
              <span className="font-display" style={{ fontSize: "1.2rem", fontWeight: 700 }}>
                📓 BATTLE RECEIPT ({history.length} {history.length === 1 ? "Turn" : "Turns"})
              </span>
              <button
                type="button"
                onClick={() => setShowHistory(false)}
                className="secondary-btn"
                style={{ padding: "1px 8px", fontSize: "0.85rem" }}
              >
                ✕ Close
              </button>
            </div>

            {history.length === 0 ? (
              <p
                className="font-display"
                style={{
                  color: "var(--ink-secondary)",
                  fontStyle: "italic",
                  fontSize: "1rem",
                  padding: "8px 0",
                }}
              >
                No battles fought yet in this run. Challenge the Onion to make history!
              </p>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  maxHeight: "260px",
                  overflowY: "auto",
                  paddingRight: "4px",
                }}
              >
                {history.map((record, idx) => (
                  <div key={idx} className="history-entry">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "3px",
                      }}
                    >
                      <span
                        className="font-mono"
                        style={{
                          fontSize: "0.75rem",
                          letterSpacing: "0.1em",
                          color: "var(--ink-secondary)",
                        }}
                      >
                        ROUND {record.turnIndex.toString().padStart(2, "0")}
                      </span>
                      <span
                        className="highlighter font-display"
                        style={{
                          fontSize: "0.8rem",
                          fontWeight: 700,
                          backgroundColor:
                            record.winner === "challenger"
                              ? "var(--accent-yellow)"
                              : "var(--bg-paper-muted)",
                        }}
                      >
                        {record.winner === "challenger" ? "👑 NEW CHAMPION" : "🛡️ DEFENDED"}
                      </span>
                    </div>
                    <div
                      className="font-display"
                      style={{
                        fontSize: "1.05rem",
                        fontWeight: 700,
                        color: "var(--ink-primary)",
                        lineHeight: 1.2,
                      }}
                    >
                      {record.championName} vs {record.challengerName} {record.challengerEmoji || ""}
                    </div>
                    <div
                      className="font-display"
                      style={{
                        fontSize: "0.95rem",
                        color: "var(--ink-secondary)",
                        fontStyle: "italic",
                        marginTop: "2px",
                        lineHeight: 1.2,
                      }}
                    >
                      &quot;{record.reason}&quot;
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* ================= FOOTER ================= */}
      <footer
        style={{
          width: "100%",
          paddingTop: "0.75rem",
        }}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="notebook-toast" role="status" aria-live="polite">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Downloadable Champion Card Modal */}
      <SandwichCardModal
        isOpen={showCardModal}
        onClose={() => setShowCardModal(false)}
        champion={champion}
        roundNumber={roundNumber}
        history={history}
        onToast={showToast}
      />
    </div>
  );
}

/**
 * Large, expressive Sandwich Artwork
 * Displays high-quality graphical generated sandwich art on the notebook page,
 * with seamless multiply blending and clean physical presence.
 */
/**
 * Large, expressive Sandwich Artwork
 * Displays a delicious, hand-drawn vector artisan sandwich clamping the absurd entity.
 * Features organic brioche buns, melting cheddar drips, crisp wavy lettuce,
 * and the signature crooked golden crown for the reigning champion.
 */
function SandwichArtwork({
  entity,
  compact = false,
  isChampion = false,
}: {
  entity: GameEntity;
  compact?: boolean;
  isChampion?: boolean;
}) {
  const reactId = React.useId().replace(/:/g, "_");
  const width = compact ? "clamp(135px, 20vw, 175px)" : "clamp(230px, 32vw, 295px)";
  const heroColor = entity.pixelColor || "#8E4A35";

  return (
    <div
      style={{
        width,
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        userSelect: "none",
      }}
    >
      <svg
        viewBox="0 0 280 206"
        style={{
          width: "100%",
          height: "auto",
          overflow: "visible",
          filter: "drop-shadow(0 6px 14px rgba(23, 23, 23, 0.08))",
        }}
      >
        <defs>
          {/* Top Brioche Bun Gradient */}
          <linearGradient id={`topBun-${reactId}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F7D393" />
            <stop offset="45%" stopColor="#E9B973" />
            <stop offset="100%" stopColor="#D59B51" />
          </linearGradient>

          {/* Bottom Bun Gradient */}
          <linearGradient id={`botBun-${reactId}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#DE9E55" />
            <stop offset="100%" stopColor="#BD7C31" />
          </linearGradient>

          {/* Filling Bed Gradient */}
          <linearGradient id={`patty-${reactId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={heroColor} stopOpacity="0.88" />
            <stop offset="100%" stopColor={heroColor} />
          </linearGradient>
        </defs>

        {/* 1. Ground Sketch Shadow */}
        <ellipse cx="140" cy="194" rx="86" ry="6.5" fill="#171717" opacity="0.14" />
        <ellipse cx="140" cy="194" rx="52" ry="3.5" fill="#171717" opacity="0.12" />
        <g stroke="#171717" strokeWidth="1.5" strokeLinecap="round" opacity="0.28">
          <path d="M 66 196 L 76 198" />
          <path d="M 92 197 L 104 199" />
          <path d="M 176 197 L 188 199" />
          <path d="M 204 196 L 214 198" />
        </g>

        {/* 2. Bottom Bun */}
        <path
          d="M 42 144 C 34 158 46 182 140 182 C 234 182 246 158 238 144 C 232 140 218 142 140 142 C 62 142 48 140 42 144 Z"
          fill={`url(#botBun-${reactId})`}
          stroke="#171717"
          strokeWidth="3.2"
          strokeLinejoin="round"
        />
        {/* Bottom Bun Toasted Rim Accent */}
        <path
          d="M 68 173 C 96 179 184 179 212 173"
          stroke="#9E5D20"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.45"
        />

        {/* 3. Wavy Ruffled Lettuce Layer */}
        {/* Left Leaf */}
        <path
          d="M 26 142 C 14 137 12 125 22 120 C 30 116 36 122 44 122 C 52 122 56 116 64 118 C 72 120 76 131 68 140 Z"
          fill="#5FA842"
          stroke="#171717"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path d="M 30 129 C 40 127 52 129 60 134" stroke="#3E7528" strokeWidth="1.5" strokeLinecap="round" fill="none" />

        {/* Right Leaf */}
        <path
          d="M 212 140 C 204 131 208 120 216 118 C 224 116 228 122 236 122 C 244 122 250 116 258 120 C 268 125 266 137 254 142 Z"
          fill="#5FA842"
          stroke="#171717"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path d="M 250 129 C 240 127 228 129 220 134" stroke="#3E7528" strokeWidth="1.5" strokeLinecap="round" fill="none" />

        {/* 4. Tomato Slice Accents */}
        <path
          d="M 48 136 C 44 124 54 114 70 116 C 80 118 84 130 78 138 Z"
          fill="#E04638"
          stroke="#171717"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <circle cx="60" cy="125" r="1.5" fill="#FFE082" />
        <circle cx="68" cy="127" r="1.5" fill="#FFE082" />

        {/* 5. Center Savory Filling Bed / Entity Wrap */}
        <rect
          x="42"
          y="96"
          width="196"
          height="48"
          rx="14"
          fill={`url(#patty-${reactId})`}
          stroke="#171717"
          strokeWidth="2.75"
        />

        {/* 6. Melted Golden Cheddar Cheese Drips */}
        <path
          d="M 38 90 L 242 90 C 247 90 249 94 246 98 L 236 114 C 233 118 227 118 225 112 L 218 96 L 180 96 L 172 122 C 170 128 162 128 160 122 L 152 96 L 124 96 L 116 116 C 114 120 108 120 106 116 L 98 96 L 66 96 L 56 118 C 54 122 48 122 46 117 L 38 100 C 36 96 37 90 38 90 Z"
          fill="#F6C744"
          stroke="#171717"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* 7. Center Hero Clamped Entity (Emoji) */}
        <foreignObject x="35" y="72" width="210" height="92">
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: compact ? "44px" : "58px",
              lineHeight: 1,
              filter: "drop-shadow(0 3px 5px rgba(0,0,0,0.22))",
              pointerEvents: "none",
            }}
          >
            {entity.emoji || "🥪"}
          </div>
        </foreignObject>

        {/* 8. Top Brioche Dome Bun */}
        <path
          d="M 34 88 C 28 44 70 28 140 28 C 210 28 252 44 246 88 C 244 92 236 93 224 93 L 56 93 C 44 93 36 92 34 88 Z"
          fill={`url(#topBun-${reactId})`}
          stroke="#171717"
          strokeWidth="3.4"
          strokeLinejoin="round"
        />

        {/* Top Bun Creamy Crust Highlight */}
        <path
          d="M 64 54 C 88 40 120 35 150 35"
          stroke="#FFF6E0"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          opacity="0.65"
        />

        {/* Hand-Drawn Sesame Seeds */}
        <g fill="#FFFDF5" stroke="#171717" strokeWidth="1.5">
          <ellipse cx="94" cy="62" rx="3.5" ry="2" transform="rotate(-15 94 62)" />
          <ellipse cx="120" cy="48" rx="3.5" ry="2" transform="rotate(10 120 48)" />
          <ellipse cx="148" cy="44" rx="3.5" ry="2" transform="rotate(-5 148 44)" />
          <ellipse cx="176" cy="52" rx="3.5" ry="2" transform="rotate(20 176 52)" />
          <ellipse cx="200" cy="66" rx="3.5" ry="2" transform="rotate(-25 200 66)" />
          <ellipse cx="134" cy="66" rx="3.5" ry="2" transform="rotate(5 134 66)" />
          <ellipse cx="164" cy="68" rx="3.5" ry="2" transform="rotate(-12 164 68)" />
        </g>

        {/* 9. Crooked Golden Crown (Perched for Champion) */}
        {isChampion && (
          <g transform="translate(140, 16) rotate(-7) translate(-18, -16)">
            <path
              d="M 3 18 L 7 4 L 14 11 L 21 2 L 28 11 L 35 4 L 39 18 Z"
              fill="#F2C94C"
              stroke="#171717"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="7" cy="4" r="1.8" fill="#E65100" />
            <circle cx="21" cy="2" r="2.2" fill="#E65100" />
            <circle cx="35" cy="4" r="1.8" fill="#E65100" />
            <circle cx="21" cy="13" r="1.4" fill="#171717" />
          </g>
        )}
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
