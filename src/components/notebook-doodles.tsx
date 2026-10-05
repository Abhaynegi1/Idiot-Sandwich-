"use client";

import React from "react";
import {
  DoodlePaperAirplane,
  DoodleCoffeeCup,
  DoodleBulb,
} from "./doodle-icons";

/* ================= SOFT PENCIL NOTEBOOK DOODLES ================= */

// 1. The Classic Notebook "Cool S"
export function CoolS({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 28 44" fill="none">
      <path d="M 5 12 L 14 3 L 23 12 L 23 20 L 14 26 L 5 20 Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M 5 24 L 14 30 L 23 24 L 23 32 L 14 41 L 5 32 Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M 5 20 L 14 26 L 23 20" stroke="currentColor" strokeWidth="1.8" />
      <path d="M 14 30 L 14 41" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

// 2. 3D Isometric Cube with pencil shading
export function IsometricCube({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <polygon points="20,4 36,12 20,20 4,12" stroke="currentColor" strokeWidth="1.6" fill="#FFFDF8" strokeLinejoin="round" />
      <polygon points="4,12 20,20 20,36 4,28" stroke="currentColor" strokeWidth="1.6" fill="#F7F4EA" strokeLinejoin="round" />
      <polygon points="20,20 36,12 36,28 20,36" stroke="currentColor" strokeWidth="1.6" fill="#EAE5D9" strokeLinejoin="round" />
      <path d="M 23 22 L 33 17 M 23 26 L 33 21 M 23 30 L 33 25 M 23 34 L 33 29" stroke="currentColor" strokeWidth="1" opacity="0.6" />
    </svg>
  );
}

// 3. Tic-Tac-Toe pencil sketch
export function TicTacToe({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      <path d="M 15 4 L 15 40 M 29 4 L 29 40 M 4 15 L 40 15 M 4 29 L 40 29" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M 6 6 L 12 12 M 12 6 L 6 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <ellipse cx="22" cy="10" rx="4" ry="4" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path d="M 32 20 L 37 25 M 37 20 L 32 25" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M 6 32 L 12 38 M 12 32 L 6 38" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <ellipse cx="22" cy="22" rx="4" ry="4" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path d="M 5 5 L 39 39" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}

// 4. Pencil Diamond
export function PencilDiamond({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.9} viewBox="0 0 36 32" fill="none">
      <polygon points="10,4 26,4 34,12 18,28 2,12" stroke="currentColor" strokeWidth="1.6" fill="#FFFDF8" strokeLinejoin="round" />
      <line x1="2" y1="12" x2="34" y2="12" stroke="currentColor" strokeWidth="1.4" />
      <line x1="10" y1="4" x2="18" y2="28" stroke="currentColor" strokeWidth="1.3" />
      <line x1="26" y1="4" x2="18" y2="28" stroke="currentColor" strokeWidth="1.3" />
      <line x1="10" y1="4" x2="18" y2="12" stroke="currentColor" strokeWidth="1.3" />
      <line x1="26" y1="4" x2="18" y2="12" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

// 5. Hand-drawn 5-point Star
export function PencilStar({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2 L14.5 8.5 L21 9.5 L16 14 L17.5 21 L12 17.5 L6.5 21 L8 14 L3 9.5 L9.5 8.5 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

// 6. Curled Arrow pointing scribble
export function SoftCurledArrow({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.75} viewBox="0 0 40 30" fill="none">
      <path
        d="M 6 22 C 14 26, 26 24, 32 12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 26 9 L 33 11 L 34 18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ================= SPREAD-OUT NOTEBOOK DOODLES BACKGROUND ================= */
/* Distributed across the entire page with dynamic scale variation (large, medium, micro) */
export function NotebookMessyBackground() {
  return (
    <div
      aria-hidden="true"
      className="notebook-messy-layer"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        userSelect: "none",
        zIndex: 0,
        overflow: "hidden",
        color: "var(--ink-secondary)",
      }}
    >
      {/* ================= ZONE 1: UPPER CANVAS (Flanking Logo & Header) ================= */}

      {/* 1. [LARGE] Paper airplane swooping diagonally inward from upper left */}
      <div
        style={{
          position: "absolute",
          top: "clamp(18px, 3.5vh, 42px)",
          left: "clamp(18px, 4.5vw, 85px)",
          transform: "rotate(-14deg)",
          opacity: 0.75,
        }}
      >
        <DoodlePaperAirplane size={72} />
      </div>

      {/* 2. [SMALL] Soft handwritten note near header: "sandwich council ~" */}
      <div
        className="font-display"
        style={{
          position: "absolute",
          top: "clamp(26px, 4.5vh, 60px)",
          left: "clamp(165px, 23vw, 330px)",
          fontSize: "clamp(0.85rem, 1.15vw, 1.05rem)",
          transform: "rotate(5deg)",
          opacity: 0.55,
          letterSpacing: "0.04em",
        }}
      >
        <span>sandwich council ~</span>
        <div style={{ fontSize: "0.75rem", fontStyle: "italic", opacity: 0.8 }}>
          est. lunch time
        </div>
      </div>

      {/* 3. [MEDIUM-LARGE] UFO hovering in upper right margin */}
      <div
        style={{
          position: "absolute",
          top: "clamp(16px, 3vh, 38px)",
          right: "clamp(24px, 5vw, 85px)",
          transform: "rotate(9deg)",
          opacity: 0.72,
        }}
      >
        <svg width="58" height="50" viewBox="0 0 44 38" fill="none">
          <polygon points="17,16 5,36 39,36 27,16" fill="#F2C94C" opacity="0.3" />
          <path d="M16 12 C16 7, 28 7, 28 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <ellipse cx="22" cy="13" rx="14" ry="4.5" stroke="currentColor" strokeWidth="1.6" fill="#F7F4EA" />
          <circle cx="16" cy="13.5" r="1.1" fill="currentColor" />
          <circle cx="22" cy="13.8" r="1.1" fill="currentColor" />
          <circle cx="28" cy="13.5" r="1.1" fill="currentColor" />
        </svg>
      </div>

      {/* 4. [MICRO] Tiny pencil glint star near action buttons */}
      <div
        style={{
          position: "absolute",
          top: "clamp(60px, 9vh, 95px)",
          right: "clamp(150px, 21vw, 300px)",
          transform: "rotate(-12deg)",
          opacity: 0.5,
        }}
      >
        <PencilStar size={16} />
      </div>

      {/* ================= ZONE 2: MID-UPPER CANVAS (Flanking Champion Area) ================= */}

      {/* 5. [LARGE] 3D Isometric Cube floating at intermediate left */}
      <div
        style={{
          position: "absolute",
          top: "clamp(130px, 18vh, 185px)",
          left: "clamp(55px, 10vw, 155px)",
          transform: "rotate(16deg)",
          opacity: 0.65,
        }}
      >
        <IsometricCube size={54} />
      </div>

      {/* 6. [SMALL] Soft "onion + bread = ?" closer toward center champion */}
      <div
        className="font-display"
        style={{
          position: "absolute",
          top: "clamp(205px, 28vh, 270px)",
          left: "clamp(140px, 22vw, 310px)",
          fontSize: "clamp(0.9rem, 1.25vw, 1.15rem)",
          transform: "rotate(-8deg)",
          opacity: 0.6,
        }}
      >
        <span>🧅 + 🍞 = ???</span>
      </div>

      {/* 7. [XLARGE TALL] Iconic "Cool S" graffiti doodle at mid-left */}
      <div
        style={{
          position: "absolute",
          top: "clamp(235px, 32vh, 310px)",
          left: "clamp(20px, 3.8vw, 65px)",
          transform: "rotate(-16deg)",
          opacity: 0.75,
        }}
      >
        <CoolS size={52} />
      </div>

      {/* 8. [MEDIUM] Lightbulb doodle floating intermediate right */}
      <div
        style={{
          position: "absolute",
          top: "clamp(135px, 19vh, 185px)",
          right: "clamp(75px, 12vw, 175px)",
          transform: "rotate(-8deg)",
          opacity: 0.65,
        }}
      >
        <DoodleBulb size={38} />
      </div>

      {/* 9. [SMALL] Soft note "level 1 onion • it cannot be stopped" */}
      <div
        className="font-display"
        style={{
          position: "absolute",
          top: "clamp(195px, 27vh, 265px)",
          right: "clamp(135px, 20vw, 290px)",
          fontSize: "clamp(0.85rem, 1.15vw, 1.05rem)",
          transform: "rotate(9deg)",
          opacity: 0.55,
        }}
      >
        <span>level 1 onion</span>
        <div style={{ fontSize: "0.75rem", opacity: 0.8 }}>it cannot be stopped</div>
      </div>

      {/* 10. [MICRO-SMALL] Tiny Diamond sketch in right mid area */}
      <div
        style={{
          position: "absolute",
          top: "clamp(265px, 37vh, 345px)",
          right: "clamp(28px, 4.5vw, 70px)",
          transform: "rotate(18deg)",
          opacity: 0.55,
        }}
      >
        <PencilDiamond size={24} />
      </div>

      {/* ================= ZONE 3: MID-LOWER CANVAS (Flanking Input & Battle Arena) ================= */}

      {/* 11. [LARGE] Generous Coffee Mug with steam + "fuel ☕" */}
      <div
        style={{
          position: "absolute",
          top: "clamp(345px, 48vh, 435px)",
          left: "clamp(48px, 8.5vw, 130px)",
          transform: "rotate(5deg)",
          opacity: 0.7,
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <DoodleCoffeeCup size={50} />
        <span
          className="font-display"
          style={{
            fontSize: "1.05rem",
            transform: "rotate(-8deg)",
            opacity: 0.8,
            fontWeight: 700,
          }}
        >
          fuel ☕
        </span>
      </div>

      {/* 12. [MEDIUM] Soft curved scribble arrow pointing inward toward the battle area */}
      <div
        style={{
          position: "absolute",
          top: "clamp(425px, 59vh, 520px)",
          left: "clamp(130px, 19vw, 270px)",
          transform: "rotate(-22deg)",
          opacity: 0.55,
        }}
      >
        <SoftCurledArrow size={42} />
      </div>

      {/* 13. [MEDIUM-LARGE] Tic-tac-toe sketch at intermediate right */}
      <div
        style={{
          position: "absolute",
          top: "clamp(355px, 50vh, 450px)",
          right: "clamp(60px, 9.5vw, 145px)",
          transform: "rotate(11deg)",
          opacity: 0.65,
        }}
      >
        <TicTacToe size={46} />
      </div>

      {/* 14. [SMALL] Soft note near input on the right: "what if tuesday?? 💭" */}
      <div
        className="font-display"
        style={{
          position: "absolute",
          top: "clamp(430px, 60vh, 530px)",
          right: "clamp(125px, 17.5vw, 255px)",
          fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)",
          transform: "rotate(-6deg)",
          opacity: 0.6,
        }}
      >
        <span>what if tuesday?? 💭</span>
      </div>

      {/* 15. [PROMINENT BOLD] The Legendary Debate: "hotdog is a sandwich" crossed out -> NO. */}
      <div
        className="font-display"
        style={{
          position: "absolute",
          top: "clamp(485px, 68vh, 600px)",
          left: "clamp(24px, 5vw, 95px)",
          fontSize: "clamp(1.1rem, 1.7vw, 1.45rem)",
          color: "var(--ink-primary)",
          transform: "rotate(-7deg)",
          opacity: 0.85,
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ textDecoration: "line-through", textDecorationThickness: "2.5px", opacity: 0.7 }}>
          hotdog is a sandwich
        </span>
        <span
          style={{
            color: "#D32F2F",
            fontWeight: 800,
            marginLeft: "10px",
            fontSize: "1.2em",
            border: "2px solid #D32F2F",
            borderRadius: "4px",
            padding: "1px 7px",
            transform: "rotate(7deg)",
            display: "inline-block",
            boxShadow: "1px 1px 0px rgba(211, 47, 47, 0.4)",
          }}
        >
          NO.
        </span>
      </div>

      {/* ================= ZONE 4: BOTTOM CANVAS ================= */}

      {/* 16. [MEDIUM] Cat sketch + "bro..." in bottom-left */}
      <div
        style={{
          position: "absolute",
          bottom: "clamp(22px, 3.8vh, 42px)",
          left: "clamp(22px, 4.5vw, 70px)",
          opacity: 0.72,
        }}
      >
        <svg width="54" height="46" viewBox="0 0 48 42" fill="none">
          <path
            d="M8 32 C8 24, 14 18, 22 18 C30 18, 36 24, 36 32"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path d="M12 20 L10 11 L18 17" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M26 17 L34 11 L32 20" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <circle cx="17" cy="24" r="1.2" fill="currentColor" />
          <circle cx="27" cy="24" r="1.2" fill="currentColor" />
          <path d="M22 26 L22 28 M20 28 C21 29, 23 29, 24 28" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
          <path d="M9 25 L3 24 M9 27 L4 28 M35 25 L41 24 M35 27 L40 28" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        </svg>
        <div
          className="font-display"
          style={{
            fontSize: "0.95rem",
            color: "currentColor",
            marginLeft: "8px",
            transform: "rotate(-4deg)",
            fontWeight: 700,
          }}
        >
          bro...
        </div>
      </div>

      {/* 17. [MICRO] Soft hearts floating at bottom center-left */}
      <div
        className="font-display"
        style={{
          position: "absolute",
          bottom: "clamp(28px, 4.5vh, 55px)",
          left: "clamp(165px, 24vw, 330px)",
          fontSize: "1.15rem",
          transform: "rotate(14deg)",
          opacity: 0.5,
        }}
      >
        ♡ ♡
      </div>

      {/* 18. [SMALL] Soft "nom nom ~" floating at bottom center-right */}
      <div
        className="font-display"
        style={{
          position: "absolute",
          bottom: "clamp(24px, 4vh, 50px)",
          right: "clamp(145px, 21vw, 290px)",
          fontSize: "1.05rem",
          transform: "rotate(-10deg)",
          opacity: 0.5,
        }}
      >
        nom nom ~
      </div>

      {/* 19. [MEDIUM] Pencil star in bottom-right margin */}
      <div
        style={{
          position: "absolute",
          bottom: "clamp(22px, 3.8vh, 42px)",
          right: "clamp(26px, 4.8vw, 70px)",
          transform: "rotate(12deg)",
          opacity: 0.65,
        }}
      >
        <PencilStar size={34} />
      </div>
    </div>
  );
}
