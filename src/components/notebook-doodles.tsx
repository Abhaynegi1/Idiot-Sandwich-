"use client";

import React from "react";
import {
  DoodlePaperAirplane,
  DoodleCoffeeCup,
  DoodleSwirl,
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
/* Distributed across the entire page (margins + inner canvas around center) */
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

      {/* 1. Paper airplane flying diagonally inward from upper left */}
      <div
        style={{
          position: "absolute",
          top: "clamp(24px, 4vh, 48px)",
          left: "clamp(20px, 5vw, 90px)",
          transform: "rotate(-12deg)",
          opacity: 0.65,
        }}
      >
        <DoodlePaperAirplane size={44} />
      </div>

      {/* 2. Soft handwritten note closer to header center-left: "sandwich council" */}
      <div
        className="font-display"
        style={{
          position: "absolute",
          top: "clamp(30px, 5vh, 65px)",
          left: "clamp(160px, 22vw, 320px)",
          fontSize: "clamp(0.85rem, 1.2vw, 1.05rem)",
          transform: "rotate(6deg)",
          opacity: 0.55,
          letterSpacing: "0.04em",
        }}
      >
        <span>sandwich council ~</span>
        <div style={{ fontSize: "0.75rem", fontStyle: "italic", opacity: 0.8 }}>
          est. lunch time
        </div>
      </div>

      {/* 3. Tiny UFO hovering in upper right margin */}
      <div
        style={{
          position: "absolute",
          top: "clamp(20px, 3vh, 42px)",
          right: "clamp(24px, 5vw, 80px)",
          transform: "rotate(8deg)",
          opacity: 0.65,
        }}
      >
        <svg width="42" height="36" viewBox="0 0 44 38" fill="none">
          <polygon points="17,16 5,36 39,36 27,16" fill="#F2C94C" opacity="0.25" />
          <path d="M16 12 C16 7, 28 7, 28 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <ellipse cx="22" cy="13" rx="14" ry="4.5" stroke="currentColor" strokeWidth="1.6" fill="#F7F4EA" />
          <circle cx="16" cy="13.5" r="1" fill="currentColor" />
          <circle cx="22" cy="13.8" r="1" fill="currentColor" />
          <circle cx="28" cy="13.5" r="1" fill="currentColor" />
        </svg>
      </div>

      {/* 4. Pencil star & sparkles near action buttons */}
      <div
        style={{
          position: "absolute",
          top: "clamp(55px, 9vh, 90px)",
          right: "clamp(140px, 20vw, 290px)",
          transform: "rotate(-10deg)",
          opacity: 0.5,
        }}
      >
        <PencilStar size={20} />
      </div>

      {/* ================= ZONE 2: MID-UPPER CANVAS (Flanking Champion Area) ================= */}

      {/* 5. 3D Isometric Cube floating at intermediate left */}
      <div
        style={{
          position: "absolute",
          top: "clamp(140px, 20vh, 195px)",
          left: "clamp(70px, 12vw, 175px)",
          transform: "rotate(14deg)",
          opacity: 0.6,
        }}
      >
        <IsometricCube size={34} />
      </div>

      {/* 6. Soft "onion + bread = ?" closer toward center champion */}
      <div
        className="font-display"
        style={{
          position: "absolute",
          top: "clamp(195px, 27vh, 260px)",
          left: "clamp(150px, 23vw, 320px)",
          fontSize: "clamp(0.9rem, 1.25vw, 1.1rem)",
          transform: "rotate(-8deg)",
          opacity: 0.55,
        }}
      >
        <span>🧅 + 🍞 = ???</span>
      </div>

      {/* 7. Classic Cool S graffiti at mid-left */}
      <div
        style={{
          position: "absolute",
          top: "clamp(230px, 32vh, 305px)",
          left: "clamp(24px, 4vw, 65px)",
          transform: "rotate(-14deg)",
          opacity: 0.65,
        }}
      >
        <CoolS size={30} />
      </div>

      {/* 8. Lightbulb doodle floating intermediate right */}
      <div
        style={{
          position: "absolute",
          top: "clamp(140px, 20vh, 190px)",
          right: "clamp(80px, 13vw, 185px)",
          transform: "rotate(-8deg)",
          opacity: 0.6,
        }}
      >
        <DoodleBulb size={28} />
      </div>

      {/* 9. Soft note "defeat: impossible?" flanking champion on the right */}
      <div
        className="font-display"
        style={{
          position: "absolute",
          top: "clamp(200px, 28vh, 270px)",
          right: "clamp(140px, 21vw, 300px)",
          fontSize: "clamp(0.85rem, 1.15vw, 1rem)",
          transform: "rotate(9deg)",
          opacity: 0.5,
        }}
      >
        <span>level 1 onion</span>
        <div style={{ fontSize: "0.75rem", opacity: 0.8 }}>it cannot be stopped</div>
      </div>

      {/* 10. Diamond sketch in right mid area */}
      <div
        style={{
          position: "absolute",
          top: "clamp(255px, 36vh, 340px)",
          right: "clamp(30px, 5vw, 75px)",
          transform: "rotate(16deg)",
          opacity: 0.6,
        }}
      >
        <PencilDiamond size={30} />
      </div>

      {/* ================= ZONE 3: MID-LOWER CANVAS (Flanking Input & Battle Arena) ================= */}

      {/* 11. Coffee mug with steam at intermediate left */}
      <div
        style={{
          position: "absolute",
          top: "clamp(350px, 49vh, 440px)",
          left: "clamp(55px, 9vw, 135px)",
          transform: "rotate(6deg)",
          opacity: 0.65,
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <DoodleCoffeeCup size={38} />
        <span
          className="font-display"
          style={{
            fontSize: "0.85rem",
            transform: "rotate(-8deg)",
            opacity: 0.75,
          }}
        >
          fuel ☕
        </span>
      </div>

      {/* 12. Soft curved scribble arrow pointing inward near input on the left */}
      <div
        style={{
          position: "absolute",
          top: "clamp(425px, 59vh, 520px)",
          left: "clamp(130px, 19vw, 270px)",
          transform: "rotate(-20deg)",
          opacity: 0.5,
        }}
      >
        <SoftCurledArrow size={34} />
      </div>

      {/* 13. Tic-tac-toe sketch at intermediate right */}
      <div
        style={{
          position: "absolute",
          top: "clamp(355px, 50vh, 450px)",
          right: "clamp(65px, 10vw, 150px)",
          transform: "rotate(10deg)",
          opacity: 0.6,
        }}
      >
        <TicTacToe size={36} />
      </div>

      {/* 14. Soft note near input on the right: "what if tuesday??" */}
      <div
        className="font-display"
        style={{
          position: "absolute",
          top: "clamp(430px, 60vh, 530px)",
          right: "clamp(130px, 18vw, 260px)",
          fontSize: "clamp(0.85rem, 1.15vw, 1rem)",
          transform: "rotate(-6deg)",
          opacity: 0.55,
        }}
      >
        <span>what if tuesday?? 💭</span>
      </div>

      {/* 15. The Legendary Debate: "hotdog is a sandwich" crossed out -> NO. */}
      <div
        className="font-display"
        style={{
          position: "absolute",
          top: "clamp(480px, 67vh, 590px)",
          left: "clamp(26px, 5.5vw, 105px)",
          fontSize: "clamp(0.95rem, 1.3vw, 1.15rem)",
          color: "var(--ink-primary)",
          transform: "rotate(-7deg)",
          opacity: 0.8,
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ textDecoration: "line-through", textDecorationThickness: "2px", opacity: 0.65 }}>
          hotdog is a sandwich
        </span>
        <span
          style={{
            color: "#D32F2F",
            fontWeight: 800,
            marginLeft: "8px",
            fontSize: "1.1em",
            border: "1.5px solid #D32F2F",
            borderRadius: "3px",
            padding: "0px 5px",
            transform: "rotate(6deg)",
            display: "inline-block",
          }}
        >
          NO.
        </span>
      </div>

      {/* ================= ZONE 4: BOTTOM CANVAS ================= */}

      {/* 16. Cat sketch + "bro..." in bottom-left */}
      <div
        style={{
          position: "absolute",
          bottom: "clamp(24px, 4vh, 45px)",
          left: "clamp(24px, 5vw, 75px)",
          opacity: 0.65,
        }}
      >
        <svg width="44" height="38" viewBox="0 0 48 42" fill="none">
          <path
            d="M8 32 C8 24, 14 18, 22 18 C30 18, 36 24, 36 32"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path d="M12 20 L10 11 L18 17" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M26 17 L34 11 L32 20" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <circle cx="17" cy="24" r="1.1" fill="currentColor" />
          <circle cx="27" cy="24" r="1.1" fill="currentColor" />
          <path d="M22 26 L22 28 M20 28 C21 29, 23 29, 24 28" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
          <path d="M9 25 L3 24 M9 27 L4 28 M35 25 L41 24 M35 27 L40 28" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        </svg>
        <div
          className="font-display"
          style={{
            fontSize: "0.85rem",
            color: "currentColor",
            marginLeft: "6px",
            transform: "rotate(-4deg)",
          }}
        >
          bro...
        </div>
      </div>

      {/* 17. Soft hearts floating at bottom center-left */}
      <div
        className="font-display"
        style={{
          position: "absolute",
          bottom: "clamp(30px, 5vh, 60px)",
          left: "clamp(170px, 25vw, 340px)",
          fontSize: "1.05rem",
          transform: "rotate(14deg)",
          opacity: 0.5,
        }}
      >
        ♡ ♡
      </div>

      {/* 18. Soft "nom nom ~" floating at bottom center-right */}
      <div
        className="font-display"
        style={{
          position: "absolute",
          bottom: "clamp(25px, 4.5vh, 55px)",
          right: "clamp(150px, 22vw, 300px)",
          fontSize: "0.95rem",
          transform: "rotate(-10deg)",
          opacity: 0.5,
        }}
      >
        nom nom ~
      </div>

      {/* 19. Pencil star in bottom-right margin */}
      <div
        style={{
          position: "absolute",
          bottom: "clamp(24px, 4vh, 45px)",
          right: "clamp(28px, 5vw, 75px)",
          transform: "rotate(12deg)",
          opacity: 0.6,
        }}
      >
        <PencilStar size={26} />
      </div>
    </div>
  );
}
