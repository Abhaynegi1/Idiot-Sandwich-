# IDIOT SANDWICH — Proposed API Specification

> Conceptual REST/RPC endpoint contracts, payload structures, error taxonomy, and rate-limiting guidelines. Endpoints are proposed architectural blueprints and are not yet implemented.

---

## 🌐 Endpoint Summary (Proposed)

| Method | Endpoint | Purpose | MVP Status |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/game` | Create or initialize a new game session. | `PROPOSED (MVP)` |
| `GET` | `/api/game/:id` | Retrieve active game state and current champion. | `PROPOSED (MVP)` |
| `POST` | `/api/game/:id/challenge` | Submit an arbitrary challenger entity to fight the champion. | `PROPOSED (MVP)` |
| `GET` | `/api/game/:id/history` | Retrieve chronological turn chain and lineage. | `PROPOSED (MVP)` |
| `GET` | `/api/entity/:id/image` | Poll or stream image generation status. | `PROPOSED (Post-MVP)` |

---

## 📡 Detailed Endpoint Blueprints

### 1. `POST /api/game`
**Purpose:** Initializes a new game instance with a default or seeded champion (e.g., "The Humble Onion Sandwich").

- **Authentication:** None (Anonymous session supported).
- **Rate Limit:** 10 requests / minute per IP.
- **Request Body:**
  ```json
  {
    "starterEntity": "optional custom starter concept, or omitted for default"
  }
  ```
- **Success Response (`201 Created`):**
  ```json
  {
    "gameId": "b47c0a88-8255-4a55-89f4-279c67be2591",
    "turnCount": 0,
    "currentChampion": {
      "id": "e112d7c5-7f12-4256-a1ce-2856f671bb52",
      "canonicalName": "The Humble Onion",
      "sandwichDescription": "Crispy golden toast with thinly sliced red onion and tears.",
      "imageUrl": "https://cdn.idiotsandwich.game/images/starter-onion.webp",
      "defensesWon": 0
    },
    "createdAt": "2026-09-28T16:00:00Z"
  }
  ```
- **Error Responses:**
  - `400 Bad Request`: Invalid seed parameters.
  - `429 Too Many Requests`: Rate limit exceeded.

---

### 2. `GET /api/game/:id`
**Purpose:** Fetches the current snapshot of a game, including the reigning champion and current turn number.

- **Authentication:** None.
- **Rate Limit:** 60 requests / minute per IP.
- **Success Response (`200 OK`):**
  ```json
  {
    "gameId": "b47c0a88-8255-4a55-89f4-279c67be2591",
    "turnCount": 4,
    "currentChampion": {
      "id": "78201a4e-128d-4f10-bc2d-5f3a0972aa90",
      "canonicalName": "Nuclear Warhead",
      "sandwichDescription": "Two radioactive brioche halves holding a 50-megaton core.",
      "imageUrl": "https://cdn.idiotsandwich.game/images/entities/nuclear-warhead.webp",
      "defensesWon": 2
    }
  }
  ```
- **Error Responses:**
  - `404 Not Found`: Game ID does not exist.

---

### 3. `POST /api/game/:id/challenge`
**Purpose:** Submits an arbitrary concept to battle the current champion of the specified game.

- **Authentication:** Anonymous token / Session cookie.
- **Rate Limit:** 15 requests / minute per IP (prevents LLM/image quota flooding).
- **Request Body:**
  ```json
  {
    "rawInput": "a black hole with an appetite"
  }
  ```
- **Success Response (`200 OK`):**
  ```json
  {
    "turnId": "c39a08e1-5e29-450b-80cb-3987fba45cd2",
    "turnIndex": 5,
    "winner": "challenger",
    "isNewChampion": true,
    "evaluation": {
      "confidence": 0.96,
      "shortHeadline": "Event Horizon Swallows the Warhead",
      "humorousReason": "A nuclear blast is devastating, but a black hole pulls radiation, bread crumbs, and the laws of physics into an infinitely compressed snack.",
      "dominantFactor": "cosmic_supremacy"
    },
    "challenger": {
      "id": "fa2189d2-5a91-4e4b-97e3-057089b21f31",
      "canonicalName": "Black Hole",
      "sandwichDescription": "Two swirling cosmic crusts pinching a singularity.",
      "imageStatus": "pending",
      "imageUrl": "https://cdn.idiotsandwich.game/images/entities/black-hole.webp"
    },
    "champion": {
      "id": "78201a4e-128d-4f10-bc2d-5f3a0972aa90",
      "canonicalName": "Nuclear Warhead",
      "defensesWon": 2
    }
  }
  ```
- **Error Responses:**
  - `400 Bad Request`: Input empty or exceeds character limits (>120 chars).
  - `422 Unprocessable Entity`: Input triggered safety/moderation filters.
  - `429 Too Many Requests`: Rate limit reached.
  - `503 Service Unavailable`: AI evaluation service timed out.

---

### 4. `GET /api/game/:id/history`
**Purpose:** Returns the sequential turn-by-turn history of a game session.

- **Authentication:** None.
- **Success Response (`200 OK`):**
  ```json
  {
    "gameId": "b47c0a88-8255-4a55-89f4-279c67be2591",
    "totalTurns": 5,
    "history": [
      {
        "turnIndex": 1,
        "championName": "The Humble Onion",
        "challengerName": "1994 Toyota Corolla",
        "winner": "challenger",
        "reason": "The Corolla drives directly over the onion without flinching."
      },
      {
        "turnIndex": 2,
        "championName": "1994 Toyota Corolla",
        "challengerName": "Nuclear Warhead",
        "winner": "challenger",
        "reason": "50 megatons vaporizes the chassis into pure iron vapor."
      }
    ]
  }
  ```

---

## 🔗 Related Documentation

- Data model fields: [DATA_MODEL.md](./DATA_MODEL.md)
- Security & rate-limiting parameters: [SECURITY.md](./SECURITY.md)
- Game engine validation logic: [GAME_ENGINE.md](./GAME_ENGINE.md)
- Cost controls on API requests: [COSTS.md](./COSTS.md)
