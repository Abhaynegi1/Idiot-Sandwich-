"use client";

import React, { useEffect, useState } from "react";
import { GameEntity, TurnHistoryRecord } from "@/types/game";

interface SandwichCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  champion: GameEntity;
  roundNumber: number;
  history: TurnHistoryRecord[];
  onToast: (msg: string) => void;
}

// Generate the SVG string of the sandwich artwork (uses SVG <text> to prevent canvas tainting)
function getSandwichSvgString(entity: GameEntity): string {
  const heroColor = entity.pixelColor || "#8E4A35";
  const emoji = entity.emoji || "🥪";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="280" height="206" viewBox="0 0 280 206">
    <defs>
      <linearGradient id="topBun" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#F7D393" />
        <stop offset="45%" stop-color="#E9B973" />
        <stop offset="100%" stop-color="#D59B51" />
      </linearGradient>
      <linearGradient id="botBun" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#DE9E55" />
        <stop offset="100%" stop-color="#BD7C31" />
      </linearGradient>
      <linearGradient id="patty" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${heroColor}" stop-opacity="0.88" />
        <stop offset="100%" stop-color="${heroColor}" />
      </linearGradient>
    </defs>

    <!-- Ground Shadow -->
    <ellipse cx="140" cy="194" rx="86" ry="6.5" fill="#171717" opacity="0.14" />
    <ellipse cx="140" cy="194" rx="52" ry="3.5" fill="#171717" opacity="0.12" />

    <!-- Bottom Bun -->
    <path d="M 42 144 C 34 158 46 182 140 182 C 234 182 246 158 238 144 C 232 140 218 142 140 142 C 62 142 48 140 42 144 Z" fill="url(#botBun)" stroke="#171717" stroke-width="3.2" stroke-linejoin="round" />

    <!-- Lettuce -->
    <path d="M 26 142 C 14 137 12 125 22 120 C 30 116 36 122 44 122 C 52 122 56 116 64 118 C 72 120 76 131 68 140 Z" fill="#5FA842" stroke="#171717" stroke-width="2.5" stroke-linejoin="round" />
    <path d="M 212 140 C 204 131 208 120 216 118 C 224 116 228 122 236 122 C 244 122 250 116 258 120 C 268 125 266 137 254 142 Z" fill="#5FA842" stroke="#171717" stroke-width="2.5" stroke-linejoin="round" />

    <!-- Tomato -->
    <path d="M 48 136 C 44 124 54 114 70 116 C 80 118 84 130 78 138 Z" fill="#E04638" stroke="#171717" stroke-width="2.2" stroke-linejoin="round" />

    <!-- Center Patty -->
    <rect x="42" y="96" width="196" height="48" rx="14" fill="url(#patty)" stroke="#171717" stroke-width="2.75" />

    <!-- Cheese Drips -->
    <path d="M 38 90 L 242 90 C 247 90 249 94 246 98 L 236 114 C 233 118 227 118 225 112 L 218 96 L 180 96 L 172 122 C 170 128 162 128 160 122 L 152 96 L 124 96 L 116 116 C 114 120 108 120 106 116 L 98 96 L 66 96 L 56 118 C 54 122 48 122 46 117 L 38 100 C 36 96 37 90 38 90 Z" fill="#F6C744" stroke="#171717" stroke-width="2.5" stroke-linejoin="round" />

    <!-- Emoji Item via SVG text -->
    <text x="140" y="128" font-size="52" text-anchor="middle" dominant-baseline="central">${emoji}</text>

    <!-- Top Brioche Bun -->
    <path d="M 40 92 C 34 50 78 16 140 16 C 202 16 246 50 240 92 C 236 98 224 94 140 94 C 56 94 44 98 40 92 Z" fill="url(#topBun)" stroke="#171717" stroke-width="3.2" stroke-linejoin="round" />

    <!-- Sesame Seeds -->
    <ellipse cx="106" cy="46" rx="3.5" ry="2.2" fill="#FFFDF8" stroke="#171717" stroke-width="1.2" transform="rotate(-20 106 46)" />
    <ellipse cx="140" cy="38" rx="3.5" ry="2.2" fill="#FFFDF8" stroke="#171717" stroke-width="1.2" transform="rotate(5 140 38)" />
    <ellipse cx="174" cy="46" rx="3.5" ry="2.2" fill="#FFFDF8" stroke="#171717" stroke-width="1.2" transform="rotate(22 174 46)" />
    <ellipse cx="120" cy="62" rx="3.5" ry="2.2" fill="#FFFDF8" stroke="#171717" stroke-width="1.2" transform="rotate(10 120 62)" />
    <ellipse cx="160" cy="62" rx="3.5" ry="2.2" fill="#FFFDF8" stroke="#171717" stroke-width="1.2" transform="rotate(-15 160 62)" />
  </svg>`;
}

// Draw the high-res 1200x1600 (2x scale for 600x800) notebook card
async function renderSandwichCard(
  champion: GameEntity,
  roundNumber: number,
  history: TurnHistoryRecord[]
): Promise<string> {
  const canvas = document.createElement("canvas");
  const width = 600;
  const height = 800;
  const scale = 2; // Retina 2x export

  canvas.width = width * scale;
  canvas.height = height * scale;

  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  ctx.scale(scale, scale);

  // 1. Paper Background (#F7F4EA)
  ctx.fillStyle = "#F7F4EA";
  ctx.fillRect(0, 0, width, height);

  // 2. Faint Dot Grid Texture
  ctx.fillStyle = "rgba(23, 23, 23, 0.04)";
  for (let x = 20; x < width; x += 22) {
    for (let y = 20; y < height; y += 22) {
      ctx.beginPath();
      ctx.arc(x, y, 0.8, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 3. Notebook Margin Rule (Red vertical line)
  ctx.strokeStyle = "rgba(220, 80, 80, 0.28)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(50, 0);
  ctx.lineTo(50, height);
  ctx.stroke();

  // 4. Card Outer Inky Frame with Shadow
  // Shadow
  ctx.fillStyle = "rgba(23, 23, 23, 0.12)";
  ctx.fillRect(19, 19, width - 30, height - 30);

  // White paper card body
  ctx.fillStyle = "#FFFDF8";
  ctx.fillRect(15, 15, width - 30, height - 30);

  // Inky Outline
  ctx.strokeStyle = "#171717";
  ctx.lineWidth = 2.75;
  ctx.strokeRect(15, 15, width - 30, height - 30);

  // Inner dashed guide line
  ctx.strokeStyle = "rgba(23, 23, 23, 0.22)";
  ctx.lineWidth = 1;
  ctx.setLineDash([5, 4]);
  ctx.strokeRect(23, 23, width - 46, height - 46);
  ctx.setLineDash([]); // Reset dash

  // 5. Header: "IDIOT SANDWICH" + Pill Badge
  ctx.fillStyle = "#171717";
  ctx.font = "bold 26px 'Patrick Hand', cursive, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("IDIOT SANDWICH 🥪", 42, 60);

  ctx.font = "14px 'Patrick Hand', sans-serif";
  ctx.fillStyle = "rgba(23, 23, 23, 0.6)";
  ctx.fillText("COLLECTIBLE CHAMPION CARD", 42, 80);

  // Round badge
  const badgeText = `ROUND ${roundNumber.toString().padStart(2, "0")}`;
  ctx.fillStyle = "#F2C94C";
  ctx.fillRect(width - 165, 42, 125, 34);
  ctx.strokeStyle = "#171717";
  ctx.lineWidth = 2;
  ctx.strokeRect(width - 165, 42, 125, 34);

  ctx.fillStyle = "#171717";
  ctx.font = "bold 15px 'JetBrains Mono', monospace";
  ctx.textAlign = "center";
  ctx.fillText(badgeText, width - 102, 64);

  // 6. Crown Doodle above sandwich
  ctx.fillStyle = "#F2C94C";
  ctx.strokeStyle = "#171717";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(280, 114);
  ctx.lineTo(285, 100);
  ctx.lineTo(294, 107);
  ctx.lineTo(300, 94);
  ctx.lineTo(306, 107);
  ctx.lineTo(315, 100);
  ctx.lineTo(320, 114);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // "— CURRENT CHAMPION —"
  ctx.font = "bold 16px 'Patrick Hand', cursive, sans-serif";
  ctx.fillStyle = "#171717";
  ctx.fillText("— CURRENT CHAMPION —", 300, 134);

  // 7. Load & Render Sandwich SVG
  const svgStr = getSandwichSvgString(champion);
  const svgUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgStr)}`;
  const img = new Image();

  await new Promise<void>((resolve) => {
    img.onload = () => {
      // Draw sandwich centered at (160, 138)
      ctx.drawImage(img, 160, 138, 280, 206);
      resolve();
    };
    img.onerror = () => resolve();
    img.src = svgUrl;
  });

  // 8. Champion Name (Auto-scaled)
  ctx.fillStyle = "#171717";
  let nameFontSize = 28;
  if (champion.canonicalName.length > 24) nameFontSize = 22;
  if (champion.canonicalName.length > 32) nameFontSize = 19;
  ctx.font = `900 ${nameFontSize}px 'Patrick Hand', cursive, sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText(champion.canonicalName, 300, 375);

  // 9. Stats Bar
  ctx.fillStyle = "rgba(23, 23, 23, 0.06)";
  ctx.fillRect(45, 395, width - 90, 40);
  ctx.strokeStyle = "#171717";
  ctx.lineWidth = 1.8;
  ctx.strokeRect(45, 395, width - 90, 40);

  ctx.font = "bold 15px 'JetBrains Mono', monospace";
  ctx.fillStyle = "#171717";
  const defensesCount = champion.defensesWon || 0;
  ctx.fillText(
    `⚡ POWER: ${champion.power}   |   🛡️ DEFENSES: ${defensesCount}   |   ${champion.category.toUpperCase()}`,
    300,
    420
  );

  // 10. Description Quote Box
  ctx.fillStyle = "#F7F4EA";
  ctx.fillRect(45, 450, width - 90, 68);
  ctx.strokeStyle = "rgba(23, 23, 23, 0.4)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(45, 450, width - 90, 68);

  ctx.font = "italic 16px 'Patrick Hand', cursive, sans-serif";
  ctx.fillStyle = "#4A4742";
  const desc = `"${champion.sandwichDescription}"`;
  // Split into 2 lines if needed
  if (desc.length > 60) {
    const mid = desc.lastIndexOf(" ", 56);
    ctx.fillText(desc.slice(0, mid), 300, 477);
    ctx.fillText(desc.slice(mid + 1), 300, 500);
  } else {
    ctx.fillText(desc, 300, 490);
  }

  // 11. Battle History Box
  ctx.fillStyle = "#FFFDF8";
  ctx.fillRect(45, 532, width - 90, 142);
  ctx.strokeStyle = "#171717";
  ctx.lineWidth = 1.75;
  ctx.setLineDash([4, 4]);
  ctx.strokeRect(45, 532, width - 90, 142);
  ctx.setLineDash([]);

  ctx.font = "bold 15px 'Patrick Hand', cursive, sans-serif";
  ctx.fillStyle = "#171717";
  ctx.textAlign = "left";
  ctx.fillText("📜 BATTLE RECORD / HIGHLIGHTS:", 60, 556);

  const recentDuels = history.slice(0, 3);
  if (recentDuels.length > 0) {
    ctx.font = "14px 'JetBrains Mono', monospace";
    ctx.fillStyle = "rgba(23, 23, 23, 0.85)";
    recentDuels.forEach((duel, idx) => {
      const yPos = 582 + idx * 26;
      const icon = duel.winner === "challenger" ? "👑 Won:" : "🛡️ Defended:";
      const rawLine = `${icon} ${duel.challengerName} (${duel.headline.slice(0, 40)}...)`;
      ctx.fillText(rawLine, 65, yPos);
    });
  } else {
    ctx.font = "italic 15px 'Patrick Hand', sans-serif";
    ctx.fillStyle = "rgba(23, 23, 23, 0.6)";
    ctx.fillText("• Undefeated reigning champion on a fresh run.", 65, 595);
    ctx.fillText("• Waiting for a brave challenger in the kitchen arena.", 65, 622);
  }

  // 12. Bottom Red Official Seal (Gordon Ramsay Meme Seal)
  ctx.save();
  ctx.translate(width - 110, 715);
  ctx.rotate((-12 * Math.PI) / 180);
  ctx.strokeStyle = "#D32F2F";
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.arc(0, 0, 42, 0, Math.PI * 2);
  ctx.stroke();

  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(0, 0, 37, 0, Math.PI * 2);
  ctx.stroke();

  ctx.font = "bold 9px 'JetBrains Mono', monospace";
  ctx.fillStyle = "#D32F2F";
  ctx.textAlign = "center";
  ctx.fillText("★ CERTIFIED ★", 0, -18);
  ctx.font = "bold 12px 'Patrick Hand', sans-serif";
  ctx.fillText("IDIOT", 0, -3);
  ctx.fillText("SANDWICH", 0, 10);
  ctx.font = "8px 'JetBrains Mono', monospace";
  ctx.fillText("CHEF GORDON", 0, 24);
  ctx.restore();

  // 13. Footer Link & Corner Scribbles
  ctx.textAlign = "left";
  ctx.font = "13px 'JetBrains Mono', monospace";
  ctx.fillStyle = "rgba(23, 23, 23, 0.7)";
  ctx.fillText("Can you beat this? Play at:", 45, 710);
  ctx.font = "bold 14px 'Patrick Hand', sans-serif";
  ctx.fillStyle = "#171717";
  ctx.fillText("github.com/Abhaynegi1/Idiot-Sandwich-", 45, 730);

  // Corner Cat Doodle (Bottom-left margin)
  ctx.font = "bold 12px 'Patrick Hand', sans-serif";
  ctx.fillStyle = "rgba(23, 23, 23, 0.55)";
  ctx.fillText("bro...", 52, 755);

  // Export Data URL
  return canvas.toDataURL("image/png");
}

export function SandwichCardModal({
  isOpen,
  onClose,
  champion,
  roundNumber,
  history,
  onToast,
}: SandwichCardModalProps) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    const timer = setTimeout(() => {
      renderSandwichCard(champion, roundNumber, history).then((url) => {
        if (isMounted) {
          setDataUrl(url);
        }
      });
    }, 10);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [isOpen, champion, roundNumber, history]);

  const isGenerating = !dataUrl;

  // Download PNG file directly
  const handleDownload = () => {
    if (!dataUrl) return;
    const a = document.createElement("a");
    const sanitizedName = champion.canonicalName.toLowerCase().replace(/[^a-z0-9]/g, "-");
    a.href = dataUrl;
    a.download = `idiot-sandwich-round-${roundNumber}-${sanitizedName}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    onToast("📸 Downloaded Sandwich Card PNG!");
  };

  // Copy PNG image to clipboard
  const handleCopyImage = async () => {
    if (!dataUrl) return;

    try {
      const res = await fetch(dataUrl);
      const blob = await res.blob();

      if (typeof window !== "undefined" && navigator.clipboard && typeof ClipboardItem !== "undefined") {
        await navigator.clipboard.write([
          new ClipboardItem({
            "image/png": blob,
          }),
        ]);
        onToast("📋 Copied Card Image to clipboard! Paste directly into Discord or Twitter.");
        return;
      }
    } catch {
      // Fallback
    }

    // Text fallback if image copy is not supported in browser
    const bragText = `🥪 IDIOT SANDWICH — Round ${roundNumber}\n👑 Champion: ${champion.canonicalName} ${champion.emoji || ""}\n⚡ Power: ${champion.power} | Defenses: ${champion.defensesWon}\nCan you defeat it? ${window.location.origin}`;
    try {
      await navigator.clipboard.writeText(bragText);
      onToast("📋 Copied run brag text to clipboard!");
    } catch {
      onToast("Failed to copy card.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Champion Sandwich Brag Card"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(23, 23, 23, 0.65)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "1rem",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="animate-sketch-pop"
        style={{
          backgroundColor: "var(--bg-paper)",
          border: "2px solid var(--ink-primary)",
          borderRadius: "4px",
          boxShadow: "6px 6px 0px var(--ink-primary)",
          maxWidth: "480px",
          width: "100%",
          maxHeight: "92vh",
          overflowY: "auto",
          padding: "clamp(1rem, 3vw, 1.5rem)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "14px",
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1.5px dashed var(--ink-secondary)",
            paddingBottom: "10px",
          }}
        >
          <div className="font-display" style={{ fontSize: "1.35rem", fontWeight: 800 }}>
            📸 CHAMPION BRAG CARD
          </div>
          <button
            type="button"
            onClick={onClose}
            className="secondary-btn"
            style={{ padding: "2px 8px", fontSize: "0.95rem" }}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Card Canvas Preview */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            padding: "8px 0",
          }}
        >
          {isGenerating ? (
            <div
              className="font-display animate-thinking"
              style={{ padding: "40px 0", fontSize: "1.1rem" }}
            >
              Drawing your sandwich card...
            </div>
          ) : dataUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={dataUrl}
              alt={`${champion.canonicalName} Card`}
              style={{
                width: "100%",
                maxWidth: "340px",
                height: "auto",
                border: "2px solid var(--ink-primary)",
                boxShadow: "var(--shadow-sketch)",
                borderRadius: "3px",
                transform: "rotate(-1deg)",
                transition: "transform 0.15s ease",
              }}
            />
          ) : null}
        </div>

        {/* Action Buttons */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <div style={{ display: "flex", gap: "8px", width: "100%" }}>
            <button
              type="button"
              onClick={handleDownload}
              disabled={isGenerating || !dataUrl}
              className="fight-button"
              style={{
                flex: 1,
                fontSize: "1.1rem",
                padding: "8px 12px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <span>📥</span> Download PNG
            </button>

            <button
              type="button"
              onClick={handleCopyImage}
              disabled={isGenerating || !dataUrl}
              className="secondary-btn"
              style={{
                flex: 1,
                fontSize: "1.05rem",
                padding: "8px 12px",
                justifyContent: "center",
              }}
            >
              <span>📋</span> Copy Image
            </button>
          </div>

          <div
            className="font-mono"
            style={{
              fontSize: "0.75rem",
              color: "var(--ink-secondary)",
              textAlign: "center",
              marginTop: "2px",
            }}
          >
            Ready for Discord, X (Twitter), Reddit, or text bragging!
          </div>
        </div>
      </div>
    </div>
  );
}
