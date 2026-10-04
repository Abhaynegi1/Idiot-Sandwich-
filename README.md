# Idiot Sandwich 🥪

An absurd, AI-assisted competitive object game where anything can be challenged, anything can be a sandwich, and sanity is optional.

## What is it?

You enter an arbitrary object, concept, or cosmic entity. The game converts it into a sandwich. Your sandwich challenges the reigning champion sandwich. An AI judge evaluates the clash with absurd yet defensible reasoning. If you win, your sandwich takes the crown. If you lose, the champion reigns supreme.

## Example

```text
🧅 Onion
  → Onion Sandwich (Reigning Champion)

🚗 Car
  → Car Sandwich
  → Smashes Onion Sandwich! (New Champion)

☢️ Nuclear Bomb
  → Nuclear Bomb Sandwich
  → Vaporizes Car Sandwich! (New Champion)

🕳️ Black Hole
  → Black Hole Sandwich
  → Consumes Nuclear Bomb Sandwich! (New Champion)
```

## Status

**Phase 0.002 — Architecture Finalization (Completed)**  
Design specifications, provider selections, and system architectures are locked in. The project is ready for **Phase 0.003 — Project Initialization**.

## Documentation

Full architectural specifications, game rules, AI pipelines, and roadmap can be found in the documentation directory:

👉 **[Explore Full Project Documentation](./docs/README.md)**

## Finalized Stack (Accepted)

- **Frontend & App:** Next.js (App Router) + TypeScript + React 19
- **State Architecture:** Pure Ephemeral Session State (Zero-DB / Zero-Maintenance)
- **AI Adjudication:** Google Gemini 1.5 Flash (Structured JSON via `@google/genai`)
- **Engine Guardrails:** Hybrid Option C (Deterministic offline fallback + Zod validation)
- **Visuals:** Stylized Card System & Food Photography Templates
- **Hosting:** Vercel (Edge / Serverless Functions)
