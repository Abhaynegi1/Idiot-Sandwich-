# IDIOT SANDWICH — UI Design System & Visual Direction

> Visual specifications, color system, typography, notebook-paper aesthetic, and interaction design.

---

## 🎨 Visual Identity: Minimal Hand-Drawn Notebook Paper

**IDIOT SANDWICH** feels like the back page of a notebook where someone has been casually drawing, scribbling, highlighting, and writing stupid ideas — translated into a clean, usable web interface.

```text
MINIMAL HAND-DRAWN + PIXEL / SCRIBBLE + NOTEBOOK PAPER
```

### The Golden Rule: KEEP IT MINIMAL
- **80–90% clean interface and 10–20% playful hand-drawn imperfections.**
- **NOT a busy scrapbook collage.** No stickers, tape, cards, illustrations, badges, or menus filling every gap.
- **Generous Whitespace:** The page breathes with abundant empty canvas; the game content is the sole focal point.

### What It Must NOT Feel Like:
- ❌ **Corporate / SaaS:** No dashboards, stat grids, or sterile gray panels.
- ❌ **Futuristic / Cyberpunk / AI-Generated:** No glassmorphism, neon glows, gradients, or purple AI tropes.
- ❌ **Restaurant Website:** No food menus, culinary marketing cards, or commercial storefront styling.
- ❌ **Childish Scrapbook:** No chaotic collage of decorative objects.

### What It MUST Feel Like:
- ✅ **Handmade & Nostalgic:** Someone drew a game interface on the back page of their notebook.
- ✅ **Playful & Absurd:** Deadpan, slightly stupid, and experimental.
- ✅ **Game-Like & Crisp:** Clean, responsive, and immediate.

---

## 🎨 Color System

Restrained, deliberate palette: **Cream + Black + Yellow**.

| Token | Hex Value | Conceptual Role |
| :--- | :--- | :--- |
| **Primary Background** | `#F7F4EA` | Warm, slightly imperfect notebook-paper cream. |
| **Primary Text / Ink** | `#171717` | Near-black ink for headings, borders, and input text. |
| **Secondary Text** | `#5F5B53` | Muted pencil / ink gray for metadata and subtitles. |
| **Subtle Paper Tones** | `#EEEAE0`, `#E5E0D5` | Faint borders and separator lines. |
| **Primary Accent** | `#F2C94C` | Warm yellow highlighter / sticky-note marker. |

> **Yellow Usage:** Used sparingly for highlights, selected states, important labels, the main `FIGHT` button, and tiny annotations.

---

## 📄 Background & Geometry

- **Background:** Sits on `#F7F4EA` with an extremely subtle, quiet micro-dot paper texture (opacity < 0.04). No heavy parchment, grunge, or brown kraft textures.
- **Borders:** Crisp black ink borders (`1.5px–2px #171717`).
- **Shadows:** Hard offset paper cutout shadow (`2px 2px 0px #171717`). No diffuse or colored elevation blurs.

---

## ✍️ Typography

1. **Primary Display Font (`Patrick Hand` / `Gaegu`):**
   - Bold, slightly imperfect, handwritten marker / pixel-inspired font.
   - Used for `IDIOT SANDWICH`, `CURRENT CHAMPION`, object titles, `FIGHT`, and outcome messages.
2. **Secondary Font (`Inter` / Sans-Serif):**
   - Clean, readable sans-serif for inputs, supporting metadata, and small labels.

---

## 🥪 Main Game Area Hierarchy

```text
IDIOT
SANDWICH (with tiny hand-drawn crown)
"type anything."

                   CURRENT CHAMPION
               [ sandwich artwork ]
              NUCLEAR BOMB SANDWICH
                     power: ∞

              WHAT CAN DEFEAT IT?
           ┌────────────────────────┐  ┌───────┐
           │ type something...      │  │ FIGHT │
           └────────────────────────┘  └───────┘
```

1. **Header (Top-Left):**
   - Handwritten title `IDIOT SANDWICH` with a tiny hand-drawn crown.
   - Handwritten subtitle: `"type anything."`
   - **Zero traditional navigation bars.**
2. **Champion Display (Direct on Paper):**
   - The sandwich artwork sits directly on the notebook paper (no glossy cards, circular frames, or ecommerce wrappers).
   - Combines rough hand-drawn ink crusts with pixel/graphic entity fillings.
   - Understated power indicator and flavor description below the title.
3. **Challenge Input:**
   - Prompt: `"WHAT CAN DEFEAT IT?"`
   - Clean notebook field with 1.5px black border and subtle yellow highlight on focus.
4. **FIGHT Button:**
   - Styled like a yellow piece of highlighter (`#F2C94C` background, black text, 1.5px black border, offset sketch shadow).
   - Quick physical press animation (`translate(2px, 2px)`).
5. **No Chain Panel on Main Screen:**
   - The main screen focuses strictly on the active champion and challenger input. No visible chain panel cluttering the page.

---

## ✏️ Doodles & Handwritten Details

- **Limit:** Exactly 2 to 4 small decorative doodles on the desktop viewport (e.g., tiny crown, pencil, star).
- **Captions:** Occasional handwritten pencil notes (`"bro..."`, `"good luck"`, `"anything can be a sandwich"`).
- **Mobile:** Decorative doodles are suppressed on mobile to keep the viewport spacious and uncluttered.

---

## ⚡ Game Feel & Battle Transitions

1. **Input Locks:** On submission, the input field freezes.
2. **Handwritten Loading Message:** Randomized notes (`"calculating something stupid..."`, `"asking the universe..."`, `"folding the bread..."`).
3. **Resolution:**
   - **Challenger Victory:** `"NEW CHAMPION!"` with a short, funny explanation (`"Yeah, the nuclear bomb was probably going to win this one."`). Challenger becomes champion.
   - **Champion Retention:** `"NOPE."` with a short roast (`"That was never going to beat it."`). Defense streak increments.

---

## 🔗 Related Documentation

- Core project philosophy: [PROJECT.md](./PROJECT.md)
- Game rules: [GAME_RULES.md](./GAME_RULES.md)
- Architectural Decisions: [DECISIONS.md](./DECISIONS.md)
