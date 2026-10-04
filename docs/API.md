# IDIOT SANDWICH — API Specification (Zero-DB Architecture)

> Endpoint contracts, request/response payloads, and error handling for the stateless adjudication server. Under **DEC-014**, the backend serves purely as a stateless edge/serverless proxy to sanitize inputs and evaluate duels with Google Gemini while securing API credentials.

---

## 🌐 Endpoint Summary

| Method | Endpoint | Purpose | Status |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/challenge` | Evaluates a matchup between reigning champion and a challenger input. | `ACTIVE (Implemented)` |

> **Note on Superseded Endpoints:** The earlier proposed relational CRUD endpoints (`POST /api/game`, `GET /api/game/:id`, `GET /api/game/:id/history`) have been superseded by [DEC-014](./DECISIONS.md#dec-014). Game state, round progression, and history are kept locally in client React state without server database overhead.

---

## 📡 Detailed Endpoint Specification

### `POST /api/challenge`

Submits an arbitrary player concept to battle the client's current champion.

- **URL:** `/api/challenge`
- **Method:** `POST`
- **Content-Type:** `application/json`
- **Authentication:** None (Protected by server-side rate limits and Gemini API key isolation).

#### Request Body
```json
{
  "rawInput": "a toaster that shoots guided missiles",
  "champion": {
    "id": "starter-onion",
    "canonicalName": "THE HUMBLE ONION SANDWICH",
    "sandwichDescription": "Raw red onion slices clamped between toasted sourdough.",
    "category": "Mundane",
    "power": "04",
    "scaleTier": 6,
    "defensesWon": 1
  }
}
```

#### Field Specifications:
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `rawInput` | `string` | Yes | Raw text input entered by the user (max 120 chars). Sanitized against script tags, HTML, and injection patterns. |
| `champion` | `object` | Yes | Snapshot of the standing champion from client state. |
| `champion.id` | `string` | Yes | Unique identifier of champion entity. |
| `champion.canonicalName` | `string` | Yes | Display title of champion. |
| `champion.sandwichDescription` | `string` | Yes | Descriptive text of how the champion is a sandwich. |
| `champion.category` | `string` | Yes | One of `"Mundane"`, `"Vehicle"`, `"Weapon"`, `"Cosmic"`, `"Living"`, `"Abstract"`, `"Divine"`. |
| `champion.power` | `string \| number` | Yes | Formatted power level (e.g. `"04"` or `4`). |
| `champion.scaleTier` | `number` | Yes | Power/scale tier from 1 to 100. |
| `champion.defensesWon` | `number` | Yes | Consecutive defense counter. |

---

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "winner": "challenger",
  "isNewChampion": true,
  "evaluation": {
    "confidence": 0.94,
    "shortHeadline": "Missile Barrage Vaporizes the Onion",
    "humorousReason": "Guided micro-missiles lock onto the sourdough crust and detonate, turning the allium champion into a warm caramelized mist before it can induce tears.",
    "dominantFactor": "destruction"
  },
  "challenger": {
    "id": "78201a4e-128d-4f10-bc2d-5f3a0972aa90",
    "rawInput": "a toaster that shoots guided missiles",
    "canonicalName": "HOMING MISSILE TOASTER SANDWICH",
    "category": "Weapon",
    "power": "42",
    "scaleTier": 35,
    "emoji": "🍞",
    "pixelColor": "#8C92AC",
    "sandwichDescription": "Two metallic chrome bread halves housing heated coils and twin micro-missile silos."
  },
  "adjudicatorSource": "gemini-live"
}
```

---

#### Error Responses

##### `400 Bad Request` — Input Validation / Sanitization Error
```json
{
  "success": false,
  "error": "Input contains forbidden characters or patterns."
}
```

##### `422 Unprocessable Entity` — Safety & Moderation Triggered
```json
{
  "success": false,
  "error": "The kitchen safety inspector flagged this item. Keep it culinary and fun!"
}
```

##### `500 Internal Server Error` — Fallback Anomaly
```json
{
  "success": false,
  "error": "The kitchen encountered a culinary anomaly. Please try again."
}
```

---

## 🔒 Security & Performance Guarantees

1. **API Key Custody:** The `GEMINI_API_KEY` is strictly held on the server and is never exposed in browser JavaScript bundles.
2. **Zero Persistent Storage:** Requests are processed in memory and no data is written to a server database.
3. **Deterministic Option C Fallback:** If Gemini API is unreachable or rate-limited, the engine automatically resolves the battle via deterministic offline rules ([`gemini-adjudicator.ts`](../src/lib/engine/gemini-adjudicator.ts)).

---

## 🔗 Related Documentation

- Session Data Model: [DATA_MODEL.md](./DATA_MODEL.md)
- Architectural Decisions: [DECISIONS.md](./DECISIONS.md) (DEC-014)
- Input Sanitization & Security: [SECURITY.md](./SECURITY.md)
