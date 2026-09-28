# IDIOT SANDWICH — Open Questions & Design Dilemmas

> Catalog of unresolved game balance, AI architecture, economic, and product dilemmas requiring evaluation in upcoming phases.

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

## 🤖 2. AI Architecture & Orchestration Dilemmas

1. **Which primary LLM model family should be selected?**
   - *Consideration:* Trade-offs between latency, token cost, comedic wit, and structured JSON reliability (e.g., Google Gemini 1.5 Flash vs. OpenAI GPT-4o-mini vs. Anthropic Claude 3.5 Haiku).
2. **Single consolidated AI call vs. Multi-stage pipeline?**
   - *Option A:* One comprehensive call that interprets input, profiles attributes, adjudicates the duel, and writes the comedic reason. (Faster, cheaper).
   - *Option B:* Multi-agent pipeline with dedicated prompt templates for moderation, entity profiling, and battle commentary. (Higher quality, higher latency and cost).
3. **How should AI hallucinations be intercepted?**
   - *Consideration:* What happens if the model claims a toaster has psychic powers when the player didn't specify that?
4. **How aggressive should prompt injection defenses be?**
   - *Consideration:* Overly strict filters might falsely reject benign, absurd inputs like `"A hacker breaking into a mainframe sandwich"`.

---

## 🖼️ 3. Image Generation & Visual Dilemmas

1. **Which image generation provider offers the best surrealist food fidelity?**
   - *Consideration:* Evaluating Google Imagen 3, OpenAI DALL-E 3, Midjourney API proxies, or self-hosted Flux/Stable Diffusion on cost, speed, and culinary realism.
2. **Should every challenger generate an image immediately?**
   - *Option A:* Generate images for all contenders synchronously. (Slows turn speed, increases API spending).
   - *Option B:* Generate images only for victors that claim the championship, using stylistic procedural placeholders for failed challengers.
3. **What is the acceptable per-image latency budget?**
   - *Consideration:* If an image takes 6 seconds to render, how should the UI maintain engagement during the battle animation?
4. **What visual fallback strategy is cleanest when generation fails?**
   - *Consideration:* Stylized vector art cards, cartoon bread stamps, or humorous apology graphics?

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
