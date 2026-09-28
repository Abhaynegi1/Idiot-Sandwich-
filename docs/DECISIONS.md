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
| **DEC-006** | Persistence Layer: PostgreSQL + Drizzle ORM | `ACCEPTED` | 2026-09-28 |
| **DEC-007** | Application Framework: Next.js + TypeScript | `ACCEPTED` | 2026-09-28 |
| **DEC-008** | Rigid JSON Schema Requirement for LLM Output | `ACCEPTED` | 2026-09-28 |
| **DEC-009** | Image Generation Caching by Canonical Entity | `ACCEPTED` | 2026-09-28 |
| **DEC-010** | Primary LLM Provider: Google Gemini (Gemini 1.5 Flash) | `ACCEPTED` | 2026-09-28 |
| **DEC-011** | Matchup Scoring Architecture: Option C (Hybrid AI + Rules) | `ACCEPTED` | 2026-09-28 |
| **DEC-012** | Database Platform: Neon Serverless PostgreSQL | `ACCEPTED` | 2026-09-28 |
| **DEC-013** | Image Generation Strategy: Async Winner Flow + Placeholders | `ACCEPTED` | 2026-09-28 |

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
- **Status:** `ACCEPTED`
- **Context:** We need a robust relational model for turn trees and champion history, alongside JSON capability for flexible AI attributes.
- **Decision:** Standardize on PostgreSQL with Drizzle ORM for type-safe, lightweight database management and schema migrations.
- **Consequences:** Provides high query performance, schema migration safety, and full TypeScript typing.

---

### DEC-007: Application Framework: Next.js + TypeScript
- **Status:** `ACCEPTED`
- **Context:** Rapid development requires a unified stack for reactive UI, server-side secrets custody, and fast API endpoints.
- **Decision:** Adopt Next.js (App Router) with strict TypeScript as the primary development platform.
- **Consequences:** Single-language codebase; seamless deployment to Vercel/Node platforms.

---

### DEC-008: Rigid JSON Schema Requirement for LLM Output
- **Status:** `ACCEPTED`
- **Context:** Free-text LLM completions ("I think X wins because...") are brittle to parse and fail unexpectedly.
- **Decision:** AI calls must enforce strict structured JSON schema responses via Gemini's `responseSchema` or Zod runtime validation.
- **Consequences:** Eliminates regex parsing crashes; guarantees deterministic payload fields for the game engine.

---

### DEC-009: Image Generation Caching by Canonical Entity
- **Status:** `ACCEPTED`
- **Context:** Image generation is the primary cost bottleneck ($0.02+ per image).
- **Decision:** Cache and serve generated sandwich artwork by canonical entity key, persisting assets to object storage permanently.
- **Consequences:** Reduces long-term image generation costs to near zero for common submissions.

---

### DEC-010: Primary LLM Provider: Google Gemini (Gemini 1.5 Flash)
- **Status:** `ACCEPTED`
- **Context:** We need sub-second response times, negligible per-turn token costs, and rock-solid native JSON schema adherence.
- **Decision:** Use Google Gemini 1.5 Flash (`@google/genai` or Vercel AI SDK) as the primary semantic interpreter and matchup judge.
- **Consequences:** Ultra-low latency (<1s response), high rate limits, very low token cost, and native `responseSchema` support.

---

### DEC-011: Matchup Scoring Architecture: Option C (Hybrid AI + Rules)
- **Status:** `ACCEPTED`
- **Context:** Pure mathematical stats feel rigid for absurd concepts; pure unstructured AI prompts lack reproducibility and guardrails.
- **Decision:** Implement Option C: The AI returns a structured adjudication (`winner`, `confidence`, `reason`, `powerRatingEstimate`). The game engine enforces invariants (tiebreaker rules, cached matchup overrides, bounds checking) before mutating state.
- **Consequences:** Balance of maximum humor/flexibility with deterministic stability.

---

### DEC-012: Database Platform: Neon Serverless PostgreSQL
- **Status:** `ACCEPTED`
- **Context:** We require serverless scaling, instant database provisioning, connection pooling, and zero-maintenance operations.
- **Decision:** Use Neon Serverless PostgreSQL paired with Drizzle ORM (`@neondatabase/serverless`).
- **Consequences:** Scale-to-zero during inactivity, instant schema branching for dev/preview environments, and generous free tier.

---

### DEC-013: Image Generation Strategy: Async Winner Flow + Placeholders
- **Status:** `ACCEPTED`
- **Context:** Waiting 5–8 seconds for image generation before declaring battle results ruins fast-paced gameplay and exhausts API credits on defeated one-off inputs.
- **Decision:** Battles resolve immediately (<1s) using stylized culinary card placeholders. Full photorealistic image generation is triggered asynchronously for victors that claim the championship, and permanently cached.
- **Consequences:** Gameplay stays lightning fast; image API costs drop by 60–80% because defeated spam inputs never trigger generation.

---

## 🔗 Related Documentation

- Technical architecture: [ARCHITECTURE.md](./ARCHITECTURE.md)
- Unresolved design choices: [OPEN_QUESTIONS.md](./OPEN_QUESTIONS.md)
- Roadmap milestones: [ROADMAP.md](./ROADMAP.md)
