# IDIOT SANDWICH — Architectural Decision Records (ADRs)

> Living log of foundational design and technical decisions, their rationale, status, and trade-offs.

---

## 📑 Decision Index

| ID | Title | Status | Date |
| :--- | :--- | :--- | :--- |
| **DEC-001** | AI-Assisted Infinite Object Battle Game Concept | `ACCEPTED` | 2026-09-28 |
| **DEC-002** | Unbounded Open-Ended Player Inputs | `ACCEPTED` | 2026-09-28 |
| **DEC-003** | Universal Sandwich Visual Representation | `ACCEPTED` | 2026-09-28 |
| **DEC-004** | AI Role: Semantic Interpretation & Matchup Evaluation | `ACCEPTED` | 2026-09-28 |
| **DEC-005** | Separation of Deterministic Game Engine from AI Output | `ACCEPTED` | 2026-09-28 |
| **DEC-006** | Persistence Layer: PostgreSQL + Drizzle ORM | `PROPOSED` | 2026-09-28 |
| **DEC-007** | Application Framework: Next.js + TypeScript | `PROPOSED` | 2026-09-28 |
| **DEC-008** | Rigid JSON Schema Requirement for LLM Output | `ACCEPTED` | 2026-09-28 |
| **DEC-009** | Image Generation Caching by Canonical Entity | `PROPOSED` | 2026-09-28 |

---

## 📜 Detailed Records

### DEC-001: AI-Assisted Infinite Object Battle Game Concept
- **Status:** `ACCEPTED`
- **Context:** Most battle games rely on fixed taxonomies (e.g., Pokémon, Rock-Paper-Scissors). This constrains creativity.
- **Decision:** The game is an infinite, absurd competitive clash game where any human concept can challenge the reigning champion.
- **Consequences:** Eliminates static item lookup tables; requires semantic interpretation and dynamic adjudication engines.

---

### DEC-002: Unbounded Open-Ended Player Inputs
- **Status:** `ACCEPTED`
- **Context:** Pre-populated dropdowns or fixed character rosters limit viral emergent humor.
- **Decision:** Allow freeform natural language text input of arbitrary concepts, objects, entities, and modifiers.
- **Consequences:** Requires robust input sanitization, prompt injection defense, and content moderation safeguards.

---

### DEC-003: Universal Sandwich Visual Representation
- **Status:** `ACCEPTED`
- **Context:** The game needs a unifying visual identity that makes even cosmic horrors or mundane tools funny and cohesive.
- **Decision:** Every submitted entity—without exception—is transformed into a sandwich clamped between two slices of bread/buns.
- **Consequences:** Provides a consistent artistic hook and simplifies image generation prompt templating.

---

### DEC-004: AI Role: Semantic Interpretation & Matchup Evaluation
- **Status:** `ACCEPTED`
- **Context:** Hand-coding millions of interaction rules between arbitrary objects is impossible.
- **Decision:** Utilize an LLM to interpret input, derive scale/power dimensions, adjudicate matchups, and generate humorous narratives.
- **Consequences:** Incurs API latency and token costs; requires mitigation via caching and schema validation.

---

### DEC-005: Separation of Deterministic Game Engine from AI Output
- **Status:** `ACCEPTED`
- **Context:** Relying on conversational LLMs to manage game state directly causes state desync, hallucinated rules, and broken logic.
- **Decision:** The game engine maintains custody of rules, turn increments, victory validation, and database updates. The AI is an advisory evaluator whose outputs are validated prior to state mutation.
- **Consequences:** Engine code remains testable independently of external AI availability.

---

### DEC-006: Persistence Layer: PostgreSQL + Drizzle ORM
- **Status:** `PROPOSED`
- **Context:** We need a robust relational model for turn trees and champion history, alongside JSON capability for flexible AI attributes.
- **Decision:** Standardize on PostgreSQL with Drizzle ORM for type-safe, lightweight database management.
- **Consequences:** Requires a hosted Postgres instance; provides high query performance and schema migration safety.

---

### DEC-007: Application Framework: Next.js + TypeScript
- **Status:** `PROPOSED`
- **Context:** Rapid development requires a unified stack for reactive UI, server-side secrets custody, and fast API endpoints.
- **Decision:** Adopt Next.js (App Router) with strict TypeScript as the primary development platform.
- **Consequences:** Single-language codebase; seamless deployment to Vercel/Node platforms.

---

### DEC-008: Rigid JSON Schema Requirement for LLM Output
- **Status:** `ACCEPTED`
- **Context:** Free-text LLM completions ("I think X wins because...") are brittle to parse and fail unexpectedly.
- **Decision:** AI calls must enforce strict structured JSON schema responses (e.g., via tool calling / structured outputs), validated by Zod.
- **Consequences:** Eliminates regex parsing crashes; guarantees deterministic payload fields for the game engine.

---

### DEC-009: Image Generation Caching by Canonical Entity
- **Status:** `PROPOSED`
- **Context:** Image generation is the primary cost bottleneck ($0.02+ per image).
- **Decision:** Cache and serve generated sandwich artwork by canonical entity key, persisting assets to object storage (S3/R2) permanently.
- **Consequences:** Reduces long-term image generation costs to near zero for common submissions.

---

## 🔗 Related Documentation

- Technical architecture: [ARCHITECTURE.md](./ARCHITECTURE.md)
- Unresolved design choices: [OPEN_QUESTIONS.md](./OPEN_QUESTIONS.md)
- Roadmap milestones: [ROADMAP.md](./ROADMAP.md)
