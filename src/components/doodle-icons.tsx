import React from "react";

/* ================= CUSTOM INKY DOODLE VECTOR GRAPHICS ================= */

// 1. Doodle Pencil (Step 1: Type Anything)
export function DoodlePencil({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <path
        d="M 8 28 L 24 12 L 28 16 L 12 32 L 6 34 L 8 28 Z"
        fill="#F2C94C"
        stroke="#171717"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="M 6 34 L 8 28 L 12 32 Z" fill="#E5B574" />
      <path d="M 6 34 L 7.5 30.5 L 9.5 32.5 Z" fill="#171717" />
      <path
        d="M 24 12 L 27 9 C 28.5 7.5 30.5 7.5 32 9 C 33.5 10.5 33.5 12.5 32 14 L 28 17 Z"
        fill="#FF8A80"
        stroke="#171717"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="M 23 13 L 29 17" stroke="#171717" strokeWidth="2.2" />
      <path d="M 4 34 C 1 35 1 31 4 30 C 6 29 6 32 8 32" stroke="#171717" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

// 2. Doodle Chef Toque (Step 2: The Chef Judges)
export function DoodleChefHat({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <path
        d="M 9 23 C 6 22 4 18 6 14 C 8 10 12 11 13 8 C 15 4 21 4 23 8 C 24 11 28 10 30 14 C 32 18 30 22 27 23 Z"
        fill="#FFFDF8"
        stroke="#171717"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="M 14 12 L 14 23 M 18 9 L 18 23 M 22 12 L 22 23" stroke="#171717" strokeWidth="1.6" strokeLinecap="round" />
      <rect
        x="8"
        y="23"
        width="20"
        height="6"
        rx="1.5"
        fill="#F2C94C"
        stroke="#171717"
        strokeWidth="2.2"
      />
      <circle cx="14" cy="26" r="1.2" fill="#171717" />
      <circle cx="22" cy="26" r="1.2" fill="#171717" />
      <path d="M 17 27 Q 18 28 19 27" stroke="#171717" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

// 3. Doodle Crown (Step 3: Crown New Champion)
export function DoodleCrown({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <path
        d="M 5 27 L 7 12 L 14 20 L 18 8 L 22 20 L 29 12 L 31 27 Z"
        fill="#F2C94C"
        stroke="#171717"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="12" r="2" fill="#E65100" stroke="#171717" strokeWidth="1.2" />
      <circle cx="18" cy="8" r="2.2" fill="#E65100" stroke="#171717" strokeWidth="1.2" />
      <circle cx="29" cy="12" r="2" fill="#E65100" stroke="#171717" strokeWidth="1.2" />
      <ellipse cx="18" cy="23" rx="4" ry="1.5" fill="#171717" />
    </svg>
  );
}

// 4. Doodle Scales (Laws of Kitchen Combat)
export function DoodleScales({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <path d="M 14 4 L 14 24 M 8 24 L 20 24" stroke="#171717" strokeWidth="2" strokeLinecap="round" />
      <path d="M 6 9 L 22 9" stroke="#171717" strokeWidth="2" strokeLinecap="round" />
      <path d="M 6 9 L 3 17 L 9 17 Z" fill="#F2C94C" stroke="#171717" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M 22 9 L 19 15 L 25 15 Z" fill="#F2C94C" stroke="#171717" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="14" cy="5" r="2" fill="#E65100" />
    </svg>
  );
}

// 5. Doodle Planet (Scale & Mass)
export function DoodlePlanet({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="6.5" fill="#E5B574" stroke="#171717" strokeWidth="1.8" />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="3.5"
        stroke="#171717"
        strokeWidth="1.8"
        transform="rotate(-20 12 12)"
        fill="none"
      />
      <circle cx="10" cy="10" r="1" fill="#171717" opacity="0.4" />
      <circle cx="14" cy="13" r="1.2" fill="#171717" opacity="0.4" />
    </svg>
  );
}

// 6. Doodle Lightning (Elemental & Material Counters)
export function DoodleLightning({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M 13 2 L 6 13 L 12 13 L 10 22 L 19 10 L 13 10 Z"
        fill="#F2C94C"
        stroke="#171717"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 7. Doodle Brain / Idea Core (Conceptual & Metaphysical)
export function DoodleBrain({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M 12 5 C 9 5 7 7 7 10 C 7 12 8 13.5 9 14.5 L 9 17 L 15 17 L 15 14.5 C 16 13.5 17 12 17 10 C 17 7 15 5 12 5 Z"
        fill="#FCE89B"
        stroke="#171717"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M 12 8 C 11 8 10.5 9 11 10 C 11.5 11 12.5 11 13 12" stroke="#E65100" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M 10 19 L 14 19 M 11 21 L 13 21" stroke="#171717" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

// 8. Doodle Cleaver (Chef Discretion & Comedy)
export function DoodleCleaver({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M 4 5 L 18 5 C 19 5 20 6 20 7 L 18 15 L 4 15 Z"
        fill="#E8ECEF"
        stroke="#171717"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="8" r="1.2" fill="#171717" />
      <path d="M 18 15 L 22 19 L 20 21 L 16 17" fill="#C9934B" stroke="#171717" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

// 9. Doodle Receipt (Battle Receipts Header)
export function DoodleReceipt({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <path
        d="M 7 4 L 21 4 L 21 23 L 18.5 21.5 L 16 23 L 13.5 21.5 L 11 23 L 8.5 21.5 L 7 23 Z"
        fill="#FFFDF8"
        stroke="#171717"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M 10 8 L 18 8 M 10 12 L 16 12 M 10 16 L 18 16" stroke="#171717" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

// 10. Doodle Lightbulb (Master Chef Tips)
export function DoodleBulb({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M 12 4 C 8.5 4 6 6.5 6 10 C 6 12.5 7.5 14 8.5 15 L 8.5 17.5 L 15.5 17.5 L 15.5 15 C 16.5 14 18 12.5 18 10 C 18 6.5 15.5 4 12 4 Z"
        fill="#F2C94C"
        stroke="#171717"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M 9.5 20 L 14.5 20 M 10.5 22 L 13.5 22" stroke="#171717" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 12 1 L 12 2.5 M 4 6 L 5.5 7 M 20 6 L 18.5 7" stroke="#171717" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

// Mini Matchup Entity Vector Badges:
export function MiniOnion() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
      <path d="M 10 2 C 7.5 5.5 3.5 8 3.5 12.5 C 3.5 16 6.5 18.5 10 18.5 C 13.5 18.5 16.5 16 16.5 12.5 C 16.5 8 12.5 5.5 10 2 Z" fill="#E8B4B8" stroke="#171717" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M 10 2 L 10 5 M 10 6 C 8.5 8.5 7 11.5 7 15 M 10 6 C 11.5 8.5 13 11.5 13 15" stroke="#8D3B47" strokeWidth="1.2" />
    </svg>
  );
}

export function MiniKnife() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
      <path d="M 4 16 L 8 12" stroke="#795548" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 8 12 L 17 3 C 18 8 13 13 8 12 Z" fill="#CFD8DC" stroke="#171717" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function MiniCar() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
      <path d="M 2 13 L 3.5 8.5 L 7 5.5 L 13 5.5 L 16.5 8.5 L 18 13 Z" fill="#EF5350" stroke="#171717" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="5.5" cy="14" r="2.2" fill="#171717" />
      <circle cx="14.5" cy="14" r="2.2" fill="#171717" />
      <path d="M 7 9 L 13 9" stroke="#FFF" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function MiniAsteroid() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
      <path d="M 16 3 L 7 12 C 5 14 4 16.5 6 17.5 C 8 18.5 10.5 16.5 13 14 Z" fill="#FF7043" stroke="#171717" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="7" cy="15" r="1.5" fill="#5D4037" />
    </svg>
  );
}

export function MiniBomb() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
      <circle cx="9" cy="11" r="6" fill="#37474F" stroke="#171717" strokeWidth="1.5" />
      <path d="M 13.5 6.5 L 17 3" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 16 2 L 18 4 M 18 2 L 16 4" stroke="#F44336" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function MiniBug() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
      <ellipse cx="10" cy="11" rx="4" ry="5.5" fill="#6D4C41" stroke="#171717" strokeWidth="1.5" />
      <path d="M 4 9 L 6.5 10 M 4 13 L 6.5 12 M 16 9 L 13.5 10 M 16 13 L 13.5 12 M 8.5 5.5 L 6.5 3 M 11.5 5.5 L 13.5 3" stroke="#171717" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
