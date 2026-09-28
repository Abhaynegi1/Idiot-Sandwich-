# IDIOT SANDWICH — Open Questions & Design Dilemmas

> Catalog of unresolved game balance, AI architecture, economic, and product dilemmas requiring evaluation in upcoming phases.

---

## ✅ Resolved in Phase 0.002 (Architecture Finalization)

| Question Area | Resolution | Decision Reference |
| :--- | :--- | :--- |
| **Primary LLM Model** | **Google Gemini 1.5 Flash** selected for sub-second latency, low token cost, and strict `responseSchema` support. | [DEC-010](./DECISIONS.md#dec-010) |
| **Matchup Scoring Model** | **Option C: Hybrid AI + Rule Guardrails** — AI evaluates clash with structured JSON; engine enforces deterministic invariants, tiebreakers, and caching. | [DEC-011](./DECISIONS.md#dec-011) |
| **Image Generation Strategy** | **Cache-First + Async Winner Flow** — battles resolve instantly with stylized placeholders; image generation is triggered asynchronously for victors and cached permanently. | [DEC-013](./DECISIONS.md#dec-013) |
| **Database Platform** | **Neon Serverless PostgreSQL + Drizzle ORM** for serverless scaling, connection pooling, and zero-maintenance operations. | [DEC-006](./DECISIONS.md#dec-006), [DEC-012](./DECISIONS.md#dec-012) |
| **Application Framework** | **Next.js (App Router) + TypeScript** for full-stack developer velocity. | [DEC-007](./DECISIONS.md#dec-007) |

---

## ❓ 1. Game Logic & Adjudication Dilemmas

1. **Should entity power be expressed as discrete numerical stats?**
   - *Consideration:* Numerical power ratings (e.g., `Attack: 85, Durability: 40`) make UI comparisons instant, but could overly homogenize abstract or bizarre concepts.
2. **Should contextual counters override raw destructive scale?**
   - *Example:* Can a humble `Water Balloon Sandwich` defeat a catastrophic `Sun Sandwich` through poetic irony or comedy, or must astronomical scale always prevail?
3. **How should conceptual and abstract entities be bounded?**
   - *Example:* How does the system evaluate intangible concepts like `"The feeling of nostalgia"`, `"Monday mornings"`, or `"Existential Dread"` against physical objects?
4. **How should copyrighted or fictional characters be treated?**
   - *Example:* Should `"Goku"`, `"SpongeBob"`, or `"Darth Vader"` be evaluated by their fictional canon, or should they be genericized/satirized?
5. **How much non-determinism / randomness should exist?**
   - *Consideration:* If a clash has 51% vs 49% odds, should the same matchup always produce the identical victor, or should an RNG seed allow occasional underdog upsets?

---

## 🤖 2. AI Architecture & Prompt Engineering Dilemmas

1. **Single consolidated AI call vs. Multi-stage pipeline?**
   - *Option A:* One comprehensive Gemini call that interprets input, profiles attributes, adjudicates the duel, and writes the comedic reason. (Faster, cheaper — recommended for MVP).
   - *Option B:* Multi-step pipeline with dedicated calls for moderation, entity profiling, and battle commentary. (Higher quality, higher latency).
2. **How should AI hallucinations be intercepted?**
   - *Consideration:* What happens if the model claims a toaster has psychic powers when the player didn't specify that?
3. **How aggressive should prompt injection defenses be?**
   - *Consideration:* Overly strict filters might falsely reject benign, absurd inputs like `"A hacker breaking into a mainframe sandwich"`.

---

## 🖼️ 3. Image Generation & Visual Provider Dilemmas

1. **Which specific image generation provider offers the best surrealist food fidelity?**
   - *Consideration:* Evaluating Google Imagen 3 (via Gemini API) vs. OpenAI DALL-E 3 vs. Fal.ai / Replicate (Flux-schnell) on cost, speed, and culinary realism.
2. **What visual fallback strategy is cleanest when generation fails or is pending?**
   - *Consideration:* Stylized vector art cards, procedural CSS toasted bread cards with stamp typography, or humorous culinary icons?

---

## 🎮 4. Product, Social & Progression Dilemmas

1. **Is the game single-player, asynchronous multiplayer, or a shared global arena?**
   - *Model A (Personal Session):* The player starts with an Onion and builds their own private chain as long as they can.
   - *Model B (Global King of the Hill):* A single global champion sandwich exists on the internet; whenever any player anywhere dethrones it, the new champion is broadcast to all visitors worldwide.
2. **What constitutes a "Game Over"?**
   - *Consideration:* Does the player have a pool of 3 strikes/losses, or can they attempt infinite challenges until the champion falls?
3. **Should chains be shareable on social platforms?**
   - *Consideration:* Dynamic OpenGraph cards showing the player's 5-sandwich lineage chain (e.g., *"My Onion defeated a Car, but died to a Black Hole!"*).
4. **How should duplicate submissions be handled in a session?**
   - *Consideration:* If a player types `"Nuclear Bomb"` three times, does the champion develop an immunity or does the engine simply replay the cached verdict?

---

## 🔗 Related Documentation

- Architectural decisions: [DECISIONS.md](./DECISIONS.md)
- Game rules: [GAME_RULES.md](./GAME_RULES.md)
- Roadmap milestones: [ROADMAP.md](./ROADMAP.md)
- Cost controls: [COSTS.md](./COSTS.md)
