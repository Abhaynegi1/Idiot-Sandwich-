import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  DoodlePencil,
  DoodleChefHat,
  DoodleCrown,
  DoodleScales,
  DoodlePlanet,
  DoodleLightning,
  DoodleBrain,
  DoodleCleaver,
  DoodleReceipt,
  DoodleBulb,
  MiniOnion,
  MiniKnife,
  MiniCar,
  MiniAsteroid,
  MiniBomb,
  MiniBug,
} from "@/components/doodle-icons";

export const metadata: Metadata = {
  title: "How to Play | Idiot Sandwich",
  description: "Master the kitchen of absurdity. Learn how to defeat sandwich champions, climb the streak ladder, and crown new culinary abominations.",
};

export default function HowToPlayPage() {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "clamp(1rem, 3vw, 2.5rem) clamp(1rem, 4vw, 2rem)",
        maxWidth: "860px",
        margin: "0 auto",
      }}
    >
      {/* ================= 1. HEADER ================= */}
      <header
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "2px dashed var(--ink-secondary)",
          paddingBottom: "1rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            color: "var(--ink-primary)",
          }}
        >
          <Image
            src="/icon.svg"
            alt="Idiot Sandwich Logo"
            width={38}
            height={38}
            priority
            style={{
              filter: "drop-shadow(1.5px 1.5px 0px var(--ink-primary))",
            }}
          />
          <div>
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(1.4rem, 3.5vw, 1.85rem)",
                lineHeight: 1,
                letterSpacing: "0.02em",
                fontWeight: 800,
              }}
            >
              IDIOT SANDWICH
            </h1>
            <p
              className="font-mono"
              style={{
                fontSize: "0.75rem",
                color: "var(--ink-secondary)",
                letterSpacing: "0.05em",
              }}
            >
              rulebook & field guide
            </p>
          </div>
        </Link>

        <Link
          href="/"
          className="secondary-btn"
          style={{
            backgroundColor: "var(--accent-yellow)",
            fontWeight: 700,
            textDecoration: "none",
            fontSize: "1.1rem",
          }}
        >
          ← Back to Game
        </Link>
      </header>

      {/* ================= 2. TITLE HERO ================= */}
      <section style={{ textAlign: "center", marginBottom: "2.5rem", width: "100%" }}>
        <div
          className="font-mono"
          style={{
            fontSize: "0.85rem",
            letterSpacing: "0.15em",
            color: "var(--ink-secondary)",
            textTransform: "uppercase",
            marginBottom: "0.5rem",
          }}
        >
          OFFICIAL KITCHEN HANDBOOK
        </div>
        <h2
          className="font-display"
          style={{
            fontSize: "clamp(2.2rem, 5.5vw, 3.4rem)",
            lineHeight: 1.05,
            fontWeight: 800,
            marginBottom: "0.75rem",
          }}
        >
          HOW TO PLAY <span className="highlighter">IDIOT SANDWICH</span>
        </h2>
        <p
          className="font-mono"
          style={{
            fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
            color: "var(--ink-secondary)",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: 1.45,
          }}
        >
          The infinite escalating battle game where literally anything can fight, anything can be a sandwich, and sanity is strictly optional.
        </p>
      </section>

      {/* ================= 3. THE 3 SIMPLE STEPS ================= */}
      <section
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.25rem",
          marginBottom: "2.5rem",
        }}
      >
        {/* Step 1 */}
        <div
          style={{
            backgroundColor: "var(--bg-paper)",
            border: "2px solid var(--ink-primary)",
            borderRadius: "4px",
            padding: "1.25rem",
            boxShadow: "var(--shadow-sketch)",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-12px",
              left: "14px",
              backgroundColor: "var(--accent-yellow)",
              border: "1.5px solid var(--ink-primary)",
              padding: "2px 8px",
              fontSize: "0.8rem",
              fontWeight: 700,
              fontFamily: "var(--font-mono)",
            }}
          >
            STEP 01
          </div>
          <div style={{ margin: "0.6rem 0 0.35rem" }}>
            <DoodlePencil size={38} />
          </div>
          <h3
            className="font-display"
            style={{ fontSize: "1.35rem", marginBottom: "0.4rem", fontWeight: 700 }}
          >
            Type Anything
          </h3>
          <p
            className="font-mono"
            style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.4 }}
          >
            Look at the current sandwich champion. Think of anything in the known universe, fiction, or conceptual reality that could defeat it.
          </p>
        </div>

        {/* Step 2 */}
        <div
          style={{
            backgroundColor: "var(--bg-paper)",
            border: "2px solid var(--ink-primary)",
            borderRadius: "4px",
            padding: "1.25rem",
            boxShadow: "var(--shadow-sketch)",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-12px",
              left: "14px",
              backgroundColor: "var(--accent-yellow)",
              border: "1.5px solid var(--ink-primary)",
              padding: "2px 8px",
              fontSize: "0.8rem",
              fontWeight: 700,
              fontFamily: "var(--font-mono)",
            }}
          >
            STEP 02
          </div>
          <div style={{ margin: "0.6rem 0 0.35rem" }}>
            <DoodleChefHat size={38} />
          </div>
          <h3
            className="font-display"
            style={{ fontSize: "1.35rem", marginBottom: "0.4rem", fontWeight: 700 }}
          >
            The Chef Judges
          </h3>
          <p
            className="font-mono"
            style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.4 }}
          >
            Our AI Adjudicator compares both entities across cosmic scale, material properties, elemental counters, and hilarious real-world logic.
          </p>
        </div>

        {/* Step 3 */}
        <div
          style={{
            backgroundColor: "var(--bg-paper)",
            border: "2px solid var(--ink-primary)",
            borderRadius: "4px",
            padding: "1.25rem",
            boxShadow: "var(--shadow-sketch)",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-12px",
              left: "14px",
              backgroundColor: "var(--accent-yellow)",
              border: "1.5px solid var(--ink-primary)",
              padding: "2px 8px",
              fontSize: "0.8rem",
              fontWeight: 700,
              fontFamily: "var(--font-mono)",
            }}
          >
            STEP 03
          </div>
          <div style={{ margin: "0.6rem 0 0.35rem" }}>
            <DoodleCrown size={38} />
          </div>
          <h3
            className="font-display"
            style={{ fontSize: "1.35rem", marginBottom: "0.4rem", fontWeight: 700 }}
          >
            Crown New Champion
          </h3>
          <p
            className="font-mono"
            style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.4 }}
          >
            If your challenger wins, it is clamped between fresh brioche buns and crowned as the new reigning Idiot Sandwich! How long can your streak last?
          </p>
        </div>
      </section>

      {/* ================= 4. WHAT MAKES AN ATTACK WIN? ================= */}
      <section
        style={{
          width: "100%",
          backgroundColor: "#FFFDF8",
          border: "2px solid var(--ink-primary)",
          borderRadius: "4px",
          padding: "clamp(1.2rem, 3vw, 1.8rem)",
          boxShadow: "var(--shadow-sketch-lg)",
          marginBottom: "2.5rem",
        }}
      >
        <h3
          className="font-display"
          style={{
            fontSize: "clamp(1.4rem, 3.5vw, 1.85rem)",
            fontWeight: 800,
            marginBottom: "0.75rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <DoodleScales size={26} />
          <span>The Laws of Kitchen Combat</span>
        </h3>
        <p
          className="font-mono"
          style={{
            fontSize: "0.9rem",
            color: "var(--ink-secondary)",
            marginBottom: "1.25rem",
            lineHeight: 1.5,
          }}
        >
          The referee evaluates duels using four core pillars of absurd reasoning:
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Pillar 1 */}
          <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <div style={{ marginTop: "2px" }}>
              <DoodlePlanet size={24} />
            </div>
            <div>
              <strong className="font-display" style={{ fontSize: "1.15rem" }}>
                1. Scale & Mass:
              </strong>
              <p className="font-mono" style={{ fontSize: "0.85rem", color: "var(--ink-secondary)" }}>
                A galaxy defeats a planet; a freight train crushes a skateboard; an elephant stomps a teacup. Pure physical scale always carries tremendous weight.
              </p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <div style={{ marginTop: "2px" }}>
              <DoodleLightning size={24} />
            </div>
            <div>
              <strong className="font-display" style={{ fontSize: "1.15rem" }}>
                2. Elemental & Material Counters:
              </strong>
              <p className="font-mono" style={{ fontSize: "0.85rem", color: "var(--ink-secondary)" }}>
                Water extinguishes fire, rust corrodes iron, salt dehydrates slugs, and a diamond tip scratches steel. Smart counters can topple larger foes!
              </p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <div style={{ marginTop: "2px" }}>
              <DoodleBrain size={24} />
            </div>
            <div>
              <strong className="font-display" style={{ fontSize: "1.15rem" }}>
                3. Conceptual & Metaphysical Power:
              </strong>
              <p className="font-mono" style={{ fontSize: "0.85rem", color: "var(--ink-secondary)" }}>
                Ideas can be deadlier than iron. Concepts like <em>&quot;Thermodynamic Entropy&quot;</em>, <em>&quot;Economic Inflation&quot;</em>, or <em>&quot;Tuesday Afternoon Ennui&quot;</em> can decay tangible champions.
              </p>
            </div>
          </div>

          {/* Pillar 4 */}
          <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <div style={{ marginTop: "2px" }}>
              <DoodleCleaver size={24} />
            </div>
            <div>
              <strong className="font-display" style={{ fontSize: "1.15rem" }}>
                4. Chef Discretion & Comedy:
              </strong>
              <p className="font-mono" style={{ fontSize: "0.85rem", color: "var(--ink-secondary)" }}>
                When two absurd forces collide, the referee honors poetic justice and comedy. If an argument is delightfully creative, it has a serious fighting chance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 5. EXAMPLE MATCHUPS ================= */}
      <section style={{ width: "100%", marginBottom: "2.5rem" }}>
        <h3
          className="font-display"
          style={{
            fontSize: "clamp(1.4rem, 3.5vw, 1.85rem)",
            fontWeight: 800,
            marginBottom: "0.5rem",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <DoodleReceipt size={26} />
          <span>Battle Receipts From The Field</span>
        </h3>
        <p
          className="font-mono"
          style={{
            fontSize: "0.85rem",
            color: "var(--ink-secondary)",
            textAlign: "center",
            marginBottom: "1.25rem",
          }}
        >
          Real rulings adjudicated by our engine:
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* Card 1 */}
          <div
            style={{
              backgroundColor: "var(--bg-paper)",
              border: "1.5px solid var(--ink-primary)",
              borderRadius: "3px",
              padding: "1rem",
              boxShadow: "var(--shadow-sketch-sm)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "6px",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              <div
                className="font-display"
                style={{
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <MiniOnion />
                <span>The Humble Onion Sandwich</span>
                <span style={{ color: "var(--ink-secondary)", margin: "0 2px" }}>vs</span>
                <MiniKnife />
                <span>A Sharp Chef Knife</span>
              </div>
              <span
                className="font-mono"
                style={{
                  backgroundColor: "var(--accent-yellow)",
                  border: "1px solid var(--ink-primary)",
                  padding: "1px 8px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  borderRadius: "2px",
                }}
              >
                WINNER: KNIFE
              </span>
            </div>
            <p className="font-mono" style={{ fontSize: "0.82rem", color: "var(--ink-secondary)", lineHeight: 1.4 }}>
              &quot;The chef knife slices through all concentric layers in one decisive julienne cut, crying tears of victory.&quot;
            </p>
          </div>

          {/* Card 2 */}
          <div
            style={{
              backgroundColor: "var(--bg-paper)",
              border: "1.5px solid var(--ink-primary)",
              borderRadius: "3px",
              padding: "1rem",
              boxShadow: "var(--shadow-sketch-sm)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "6px",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              <div
                className="font-display"
                style={{
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <MiniCar />
                <span>Toyota Corolla Sandwich</span>
                <span style={{ color: "var(--ink-secondary)", margin: "0 2px" }}>vs</span>
                <MiniAsteroid />
                <span>A 5-Mile Asteroid</span>
              </div>
              <span
                className="font-mono"
                style={{
                  backgroundColor: "var(--accent-yellow)",
                  border: "1px solid var(--ink-primary)",
                  padding: "1px 8px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  borderRadius: "2px",
                }}
              >
                WINNER: ASTEROID
              </span>
            </div>
            <p className="font-mono" style={{ fontSize: "0.82rem", color: "var(--ink-secondary)", lineHeight: 1.4 }}>
              &quot;Even Toyota&apos;s legendary reliability cannot survive an extinction-level kinetic impact from deep orbit.&quot;
            </p>
          </div>

          {/* Card 3 */}
          <div
            style={{
              backgroundColor: "var(--bg-paper)",
              border: "1.5px solid var(--ink-primary)",
              borderRadius: "3px",
              padding: "1rem",
              boxShadow: "var(--shadow-sketch-sm)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "6px",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              <div
                className="font-display"
                style={{
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <MiniBomb />
                <span>Nuclear Warhead Sandwich</span>
                <span style={{ color: "var(--ink-secondary)", margin: "0 2px" }}>vs</span>
                <MiniBug />
                <span>A Cockroach</span>
              </div>
              <span
                className="font-mono"
                style={{
                  backgroundColor: "#EAE5D9",
                  border: "1px solid var(--ink-primary)",
                  padding: "1px 8px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  borderRadius: "2px",
                }}
              >
                WINNER: WARHEAD (DEFENDED)
              </span>
            </div>
            <p className="font-mono" style={{ fontSize: "0.82rem", color: "var(--ink-secondary)", lineHeight: 1.4 }}>
              &quot;While the cockroach could survive the fallout, the immediate ground-zero fireball vaporizes organic chitin instantly.&quot;
            </p>
          </div>
        </div>
      </section>

      {/* ================= 6. PRO TIPS FOR TOP STREAKS ================= */}
      <section
        style={{
          width: "100%",
          border: "2px dashed var(--ink-primary)",
          borderRadius: "4px",
          padding: "1.25rem",
          marginBottom: "2.5rem",
          backgroundColor: "rgba(242, 201, 76, 0.08)",
        }}
      >
        <h4
          className="font-display"
          style={{
            fontSize: "1.3rem",
            fontWeight: 700,
            marginBottom: "0.5rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <DoodleBulb size={24} />
          <span>Master Chef Tips</span>
        </h4>
        <ul
          className="font-mono"
          style={{
            fontSize: "0.85rem",
            color: "var(--ink-secondary)",
            paddingLeft: "1.2rem",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          <li>
            <strong>Auto-Save is Enabled:</strong> Your champion and round streak are saved locally. You can close the tab or share your brag card without losing your run.
          </li>
          <li>
            <strong>Get Specific:</strong> Typing &quot;a dog with a laser visor&quot; gives the referee more comedic material than just &quot;dog&quot;.
          </li>
          <li>
            <strong>Share Receipts:</strong> Click <strong>Share</strong> on the homepage anytime to copy a retro scorecard to your clipboard.
          </li>
        </ul>
      </section>

      {/* ================= 7. CALL TO ACTION ================= */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Link
          href="/"
          className="fight-button"
          style={{
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "1.45rem",
          }}
        >
          <Image
            src="/icon.svg"
            alt="Sandwich"
            width={26}
            height={26}
            style={{ filter: "drop-shadow(1px 1px 0px var(--ink-primary))" }}
          />
          <span>Back to the Kitchen & Fight!</span>
        </Link>
      </div>

      {/* ================= 8. FOOTER ================= */}
      <footer
        className="font-mono"
        style={{
          fontSize: "0.75rem",
          color: "var(--ink-secondary)",
          textAlign: "center",
          opacity: 0.75,
          paddingTop: "1rem",
        }}
      >
        inspired by gordon ramsay
      </footer>
    </div>
  );
}
