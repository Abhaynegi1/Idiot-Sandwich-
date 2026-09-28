export default function Home() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "2rem 1rem",
        textAlign: "center",
      }}
    >
      {/* Status Pill */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.35rem 1rem",
          borderRadius: "var(--radius-full)",
          background: "rgba(245, 158, 11, 0.12)",
          border: "1px solid var(--border-bold)",
          color: "var(--color-toasted)",
          fontSize: "0.85rem",
          fontWeight: 600,
          fontFamily: "var(--font-mono)",
          marginBottom: "1.5rem",
        }}
      >
        <span
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "var(--color-toasted)",
            boxShadow: "0 0 8px var(--color-toasted)",
            display: "inline-block",
          }}
        />
        PHASE 0.003 INITIALIZED • APP SCAFFOLD READY
      </div>

      {/* Hero Title */}
      <h1
        style={{
          fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
          lineHeight: 1.05,
          color: "var(--text-main)",
          marginBottom: "0.75rem",
        }}
      >
        IDIOT <span style={{ color: "var(--color-toasted)" }}>SANDWICH</span> 🥪
      </h1>

      <p
        style={{
          fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
          color: "var(--text-muted)",
          maxWidth: "600px",
          marginBottom: "2.5rem",
        }}
      >
        An absurd competitive object game. Enter any concept in the universe, turn it into a sandwich, and clash against the reigning champion.
      </p>

      {/* Champion Teaser Card */}
      <div
        className="glass-panel animate-float"
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "1.75rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "2.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow Accent */}
        <div
          style={{
            position: "absolute",
            top: "-40px",
            right: "-40px",
            width: "120px",
            height: "120px",
            background: "radial-gradient(circle, var(--color-toasted) 0%, transparent 70%)",
            opacity: 0.3,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--color-gold)",
            fontFamily: "var(--font-mono)",
            marginBottom: "0.75rem",
          }}
        >
          👑 Reigning Champion
        </div>

        {/* Visual Sandwich Icon Box */}
        <div
          style={{
            width: "90px",
            height: "90px",
            borderRadius: "var(--radius-md)",
            background: "rgba(245, 158, 11, 0.15)",
            border: "1px solid var(--border-bold)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "3rem",
            marginBottom: "1rem",
          }}
        >
          🧅
        </div>

        <h2
          style={{
            fontSize: "1.4rem",
            color: "var(--text-main)",
            marginBottom: "0.35rem",
          }}
        >
          The Humble Onion Sandwich
        </h2>

        <p
          style={{
            fontSize: "0.85rem",
            color: "var(--text-dim)",
            marginBottom: "1.25rem",
            fontStyle: "italic",
          }}
        >
          Thinly sliced red onion clamped between golden toasted sourdough. Brings tears of defeat.
        </p>

        {/* Stats Preview */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.75rem",
            width: "100%",
            fontSize: "0.8rem",
            fontFamily: "var(--font-mono)",
          }}
        >
          <div
            style={{
              padding: "0.5rem",
              background: "rgba(0, 0, 0, 0.3)",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <div style={{ color: "var(--text-dim)", fontSize: "0.7rem" }}>DEFENSES</div>
            <div style={{ color: "var(--color-gold)", fontWeight: 700 }}>0 WINS</div>
          </div>
          <div
            style={{
              padding: "0.5rem",
              background: "rgba(0, 0, 0, 0.3)",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <div style={{ color: "var(--text-dim)", fontSize: "0.7rem" }}>CATEGORY</div>
            <div style={{ color: "var(--color-toasted)", fontWeight: 700 }}>VEGETABLE</div>
          </div>
        </div>
      </div>

      {/* Input Arena Teaser */}
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          display: "flex",
          gap: "0.5rem",
          marginBottom: "1.5rem",
        }}
      >
        <input
          id="mock-challenger-input"
          type="text"
          disabled
          placeholder="e.g. A 1994 Toyota Corolla, Supernova..."
          style={{
            flex: 1,
            padding: "0.85rem 1.25rem",
            borderRadius: "var(--radius-md)",
            background: "var(--bg-surface-elevated)",
            border: "1px solid var(--border-subtle)",
            color: "var(--text-main)",
            fontFamily: "var(--font-body)",
            fontSize: "0.95rem",
            outline: "none",
            cursor: "not-allowed",
            opacity: 0.8,
          }}
        />
        <button
          id="mock-toast-btn"
          disabled
          style={{
            padding: "0.85rem 1.5rem",
            borderRadius: "var(--radius-md)",
            background: "var(--color-toasted)",
            color: "var(--text-inverse)",
            border: "none",
            fontWeight: 700,
            fontFamily: "var(--font-display)",
            cursor: "not-allowed",
            opacity: 0.85,
          }}
        >
          CLASH
        </button>
      </div>

      <p
        style={{
          fontSize: "0.8rem",
          color: "var(--text-dim)",
          fontFamily: "var(--font-mono)",
        }}
      >
        Next milestone: Phase 0.1 — Core Game Prototype (Playable Loop)
      </p>
    </main>
  );
}
