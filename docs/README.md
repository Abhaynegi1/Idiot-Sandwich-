# IDIOT SANDWICH — Documentation Index

> An absurd, AI-assisted competitive object game where players pit arbitrary natural-language entities—manifested as sandwiches—against an ever-evolving champion.

---

## 📌 Implementation Status

> **Status:** Phase 0.001 (Documentation Initialization) and Phase 0.002 (Architecture Finalization) are complete. Core architectural standards, provider selections, and system blueprints are finalized.
>
> Application scaffolding and project initialization begin in Phase 0.003.

- **Completed Phases:** `Phase 0.001 — Documentation Initialization`, `Phase 0.002 — Architecture Finalization`
- **Current Status:** Technical Architecture & Decision Records Finalized
- **Next Phase:** `Phase 0.003 — Project Initialization`

---

## 🥪 What is Idiot Sandwich?

**IDIOT SANDWICH** is an experimental web game that combines infinite open-ended user input, semantic entity interpretation, absurd sandwich visual generation, and AI-powered matchup adjudication.

1. A player inputs any natural-language concept (e.g., `onion`, `steam locomotive`, `black hole`, `the concept of Tuesday`).
2. The game engine normalizes the input into a structured entity and envisions it as a ridiculous sandwich.
3. The challenger sandwich battles the reigning champion sandwich.
4. An AI adjudication system evaluates the clash, determining a winner based on semantic attributes, scale, conceptual properties, and humorous matchup logic.
5. If the challenger triumphs, it assumes the champion mantle, prompting the next challenger to enter the ring.

---

## 🗺️ Documentation Map

| Document | Purpose & Scope |
| :--- | :--- |
| [PROJECT.md](./PROJECT.md) | High-level vision, core gameplay loop, target feeling, and explicit non-goals. |
| [GAMEPLAY.md](./GAMEPLAY.md) | Detailed walkthrough of player experience, battle progression, and chain mechanics. |
| [GAME_RULES.md](./GAME_RULES.md) | The 10 fundamental conceptual rules governing game flow, resolution, and bounds. |
| [GAME_ENGINE.md](./GAME_ENGINE.md) | Engine pipeline from input normalization to state resolution, attribute models, and scoring concepts. |
| [AI_SYSTEM.md](./AI_SYSTEM.md) | LLM duties: classification, structured adjudication, explanation generation, and prompt engineering. |
| [IMAGE_SYSTEM.md](./IMAGE_SYSTEM.md) | Sandwich image generation pipeline, prompt crafting, caching, latency handling, and fallbacks. |
| [DATA_MODEL.md](./DATA_MODEL.md) | Conceptual database entities, relations, fields, and MVP vs. speculative attributes. |
| [API.md](./API.md) | Proposed REST/RPC endpoints, request/response contracts, rate limits, and error handling. |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Proposed system architecture, technology selections, data flow diagrams, and alternatives. |
| [UI_UX.md](./UI_UX.md) | Visual direction, screen breakdowns, interaction design, animations, and sound aesthetics. |
| [SECURITY.md](./SECURITY.md) | Threat modeling: prompt injection, API key custody, abuse prevention, UGC moderation, and DoS. |
| [COSTS.md](./COSTS.md) | Cost drivers (LLM tokens, image generation, egress), latency mitigation, and cost controls. |
| [DEVELOPMENT.md](./DEVELOPMENT.md) | Local workflow, coding standards, environment config, and commit guidelines. |
| [TESTING.md](./TESTING.md) | Testing strategy across unit, integration, and E2E tiers, plus adversarial test cases. |
| [ROADMAP.md](./ROADMAP.md) | Phased project progression from initial documentation to public MVP. |
| [DECISIONS.md](./DECISIONS.md) | Architectural Decision Records (ADRs) tracking accepted, proposed, and rejected decisions. |
| [OPEN_QUESTIONS.md](./OPEN_QUESTIONS.md) | Catalog of unresolved game balance, AI architecture, and product decisions. |

---

## 🧭 Core Principles

1. **Infinite-Input Philosophy:** The game refuses predefined item tables or rock-paper-scissors taxonomies. Any concept a player can describe in human language should be accepted and evaluated dynamically.
2. **Absurdity is a Feature:** The tone is chaotic, satirical, and funny. Battles are not rigid scientific simulations; humor and absurd logic are prioritized while maintaining defensible internal consistency.
3. **AI Enhances, Not Controls:** AI is utilized for semantic interpretation, humorous reasoning, and creative generation. The game engine retains deterministic custody over game rules, validation, state transitions, and history.
4. **Structured Over Freeform:** AI responses must conform to strict JSON schemas rather than free-flowing text to prevent parsing errors and erratic game state mutations.
5. **Consistency Matters:** Submitting identical or near-identical concepts must not yield diametrically opposed or unpredictable outcomes. Normalization and evaluation caching provide predictable baseline behaviors.
6. **Cost & Latency Consciousness:** Image generation and LLM inferences carry financial and latency costs. Visual caching, prompt reuse, and tiered model strategies are core architectural requirements.
