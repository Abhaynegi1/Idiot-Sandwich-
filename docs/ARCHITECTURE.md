# IDIOT SANDWICH — System Architecture

> Structural architecture, accepted technology stack, data flow pathways, and operational design.

---

## 🏗️ High-Level System Architecture

```text
                    ┌───────────────┐
                    │    Browser    │
                    └───────┬───────┘
                            │ (HTTPS / JSON)
                            ▼
                    ┌───────────────┐
                    │    Next.js    │ (App Router / Server Actions)
                    └───────┬───────┘
                            │
              ┌─────────────┼─────────────┐
              ▼             ▼             ▼
        ┌──────────┐  ┌──────────┐  ┌───────────┐
        │   Game   │  │  Google  │  │   Image   │
        │  Engine  │  │  Gemini  │  │  Service  │
        │ (Hybrid) │  │1.5 Flash │  │  (Async)  │
        └────┬─────┘  └──────────┘  └───────────┘
             │
             ▼
        ┌──────────┐
        │   Neon   │ (Serverless PostgreSQL + Drizzle ORM)
        └──────────┘
```

---

## 🛠️ Finalized Technology Stack (Accepted)

| Layer | Accepted Choice | Primary Rationale | Reference |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | **Next.js (App Router) + TypeScript** | React ecosystem, server-rendered landing, fast client interactions, co-located API routes. | [DEC-007](./DECISIONS.md#dec-007) |
| **Backend / API** | **Next.js Server Functions & Route Handlers** | Single unified codebase, fast serverless execution, minimal deployment overhead. | [DEC-007](./DECISIONS.md#dec-007) |
| **Database** | **Neon Serverless PostgreSQL** | Serverless scale-to-zero, instant database branching, connection pooling, generous free tier. | [DEC-012](./DECISIONS.md#dec-012) |
| **ORM / Data Access** | **Drizzle ORM** (`@neondatabase/serverless`) | Type-safe, lightweight, zero-dependency overhead, seamless migrations. | [DEC-006](./DECISIONS.md#dec-006) |
| **AI LLM Inference** | **Google Gemini 1.5 Flash** | Sub-second latency, lowest token cost, strict JSON schema output via `responseSchema`. | [DEC-010](./DECISIONS.md#dec-010) |
| **Scoring Engine** | **Option C: Hybrid AI + Rule Guardrails** | AI evaluates clash; engine enforces deterministic invariants, tiebreakers, and caching. | [DEC-011](./DECISIONS.md#dec-011) |
| **Image Pipeline** | **Cache-First + Async Winner Generation** | Instant clash resolution with stylized placeholders; image gen triggered only for new champions. | [DEC-013](./DECISIONS.md#dec-013) |
| **Asset Storage / CDN** | **Cloudflare R2 / AWS S3** | S3-compatible, zero/low-cost egress for cached sandwich imagery. | [DEC-009](./DECISIONS.md#dec-009) |
| **Hosting & Deployment** | **Vercel** | Turnkey Next.js deployment, automatic edge caching, global distribution. | [DEC-007](./DECISIONS.md#dec-007) |

---

## 🔄 End-to-End Data Flow (Async Winner Flow)

```mermaid
sequenceDiagram
    autonumber
    actor Player
    participant Browser
    participant NextServer as Next.js API
    participant AI as Gemini 1.5 Flash
    participant Img as Image Service (Async)
    participant DB as Neon PostgreSQL

    Player->>Browser: Types "Nuclear Bomb" & clicks [CLASH]
    Browser->>NextServer: POST /api/game/:id/challenge { rawInput }
    NextServer->>NextServer: Sanitize & validate input bounds
    NextServer->>DB: Fetch Active Champion Entity
    DB-->>NextServer: Champion: "1994 Toyota Corolla"
    
    NextServer->>AI: EvaluateMatchup(Corolla, Nuclear Bomb) with JSON Schema
    AI-->>NextServer: Structured JSON { winner: "challenger", reason: "50 megatons vaporizes chassis..." }
    
    NextServer->>NextServer: Engine validates invariants & checks cached pairings
    NextServer->>DB: Record GameTurn & update currentChampionEntityId
    DB-->>NextServer: Transaction Committed
    
    NextServer-->>Browser: HTTP 200 { winner: "challenger", reason, placeholderCard }
    Browser->>Player: Animate clash & crown Nuclear Bomb Sandwich!
    
    opt Asynchronous Background Visual Generation (Winner Only)
        NextServer->)Img: Dispatch background sandwich generation for "Nuclear Bomb"
        Img->)DB: Update GeneratedImage record with CDN URL
    end
```

---

## ⚖️ Architectural Invariants

1. **Decoupled Resolution:** Text adjudication never blocks on image generation. Battles resolve within <1 second.
2. **Server-Side API Keys:** Gemini API keys, database connection strings, and storage credentials never touch the browser bundle.
3. **Immutable History:** Past `GameTurn` records are append-only and strictly preserved for lineage reels.

---

## 🔗 Related Documentation

- AI orchestration: [AI_SYSTEM.md](./AI_SYSTEM.md)
- Image generation strategy: [IMAGE_SYSTEM.md](./IMAGE_SYSTEM.md)
- Database schema details: [DATA_MODEL.md](./DATA_MODEL.md)
- Architectural Decision Records: [DECISIONS.md](./DECISIONS.md)
