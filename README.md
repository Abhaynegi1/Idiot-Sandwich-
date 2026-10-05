# Idiot Sandwich 🥪

An absurd, AI-assisted competitive object game where anything can be challenged, anything can be a sandwich, and sanity is optional. Inspired by Gordon Ramsay's legendary meme.

<p align="center">
  <img src="https://media1.tenor.com/m/p98d_YNK3K8AAAAC/gordon-ramsay-idiot-sandwich.gif" alt="Gordon Ramsay Idiot Sandwich" width="480" />
</p>

---

## 🎮 How It Works

1. You face the reigning champion — starting with **The Humble Onion Sandwich**.
2. Type literally anything to challenge it: a kitchen knife, a Toyota Corolla, a nuclear warhead, an asteroid, or existential dread.
3. An AI judge (Google Gemini 2.5 Flash) evaluates the matchup using cosmic scale, elemental physics, comedic logic, or cold reality.
4. If your challenger wins, it gets clamped between fresh brioche buns and crowned the new champion. How long can your streak last?

```text
🧅 Onion
  → The Humble Onion Sandwich (Reigning Champion)

🔪 Chef Knife
  → Chef Knife Sandwich
  → Slices Onion Sandwich! (New Champion)

🚗 1997 Honda Civic
  → Honda Civic Sandwich
  → Crushes Knife Sandwich! (New Champion)

☄️ 5-Mile Asteroid
  → Asteroid Sandwich
  → Obliterates Civic Sandwich! (New Champion)
```

---

## ⚡ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router) + React 19 + TypeScript
- **Styling:** Hand-crafted Vanilla CSS with custom notebook doodle theme (`#F7F4EA`), inky sketch shadows, and highlighter accents
- **Visuals:** Pure procedural hand-drawn SVG artisan sandwich artwork (0 token cost, 0ms latency)
- **AI Adjudication:** Google Gemini 2.5 Flash via `@google/genai` with strict Zod JSON schemas
- **Fallback Engine:** Deterministic offline rules engine (100% uptime with zero AI dependencies)
- **State & Storage:** Zero-DB architecture (`localStorage` session durability + clipboard brag card generator)

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/Abhaynegi1/Idiot-Sandwich-.git
cd Idiot-Sandwich-
npm install
```

### 2. Configure Environment (Optional)
```bash
cp .env.example .env.local
```
Add your Gemini API key in `.env.local`:
```ini
GEMINI_API_KEY=your_actual_gemini_api_key_here
```
*(Note: If no API key is provided, the game runs automatically on the built-in deterministic hybrid rules engine.)*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Verification & Quality Checks

```bash
# Run automated tests (17 tests covering engine, parser, security & schemas)
npm test

# Run TypeScript typecheck
npm run typecheck

# Run ESLint
npm run lint

# Build for production
npm run build
```

---

## 📚 Essential Documentation

The project documentation has been streamlined down to 4 focused references in [`docs/`](./docs/):

- 🏗️ **[System Architecture](./docs/ARCHITECTURE.md)** — Hybrid evaluation flow, zero-DB architecture, and system diagrams.
- 📡 **[API Specification](./docs/API.md)** — Complete `/api/challenge` endpoint contract, schemas, and error codes.
- 🧪 **[Testing & CI Guide](./docs/TESTING.md)** — Test suite layout, automated test cases, and GitHub Actions CI workflow.
- 📋 **[Architecture Decision Records (ADRs)](./docs/DECISIONS.md)** — Historical log of technical decisions (DEC-001 through DEC-014).
