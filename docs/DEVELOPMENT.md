# IDIOT SANDWICH — Development Workflow

> Developer guidelines, local setup patterns, code organization, and lightweight engineering practices.

---

## 🚀 Guiding Philosophy

This is an experimental, fast-paced indie web game. Development workflows should be **lightweight, friction-free, and practical**, deliberately avoiding bureaucratic enterprise ceremony while upholding strict type safety and code clarity.

---

## 💻 Local Development Setup (Future Phase Preview)

*Note: The commands below are planned for Phase 0.003 (Project Initialization) and are not to be run in Phase 0.001.*

### Proposed Stack Tooling
- **Node.js:** `>= 20.x LTS`
- **Package Manager:** `pnpm` or `npm`
- **AI Credentials:** Google AI Studio Gemini API Key

### Typical Setup Flow
```bash
# Clone and enter repo
git clone https://github.com/example/idiot-sandwich.git
cd idiot-sandwich

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Add your GEMINI_API_KEY in .env.local, then start dev server:
npm run dev
```

---

## 🔑 Environment Variables Specification

```env
# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# AI Inference (Google Gemini)
GEMINI_API_KEY="your-gemini-api-key"
GEMINI_MODEL="gemini-1.5-flash"

# AI Inference Services
AI_API_KEY="your-llm-provider-key"
AI_MODEL_NAME="gemini-1.5-flash"

# Image Generation Services
IMAGE_API_KEY="your-image-provider-key"
IMAGE_PROVIDER="imagen-3"

# Asset Storage (S3 / Cloudflare R2)
STORAGE_BUCKET_NAME="idiot-sandwich-assets"
STORAGE_ACCESS_KEY="your-storage-access-key"
STORAGE_SECRET_KEY="your-storage-secret-key"
```

---

## 📁 Proposed Code Organization

```text
/
├── docs/                # Architectural & design documentation
├── src/
│   ├── app/             # Next.js App Router (pages & route handlers)
│   │   ├── api/         # Stateless route handlers (/api/challenge)
│   │   └── page.tsx     # Main arena battle view & session state
│   ├── components/      # React UI components (SandwichCard, ClashArena, etc.)
│   ├── lib/
│   │   ├── engine/      # Adjudication engine, schemas, normalization
│   │   └── security/    # Sanitization, length limits, moderation
│   └── types/           # Shared TypeScript interfaces
└── package.json
```

---

## 🌿 Branch & Commit Conventions

Keep it simple and readable:

- **Branches:**
  - `main`: Deployable production branch.
  - `feat/feature-name`: Feature development.
  - `fix/bug-description`: Bug resolution.
  - `docs/doc-update`: Documentation iterations.
- **Commit Messages:**
  - Use conventional commit tags: `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`.
  - Example: `feat: add structured Zod schema for matchup evaluation`

---

## 🔍 Code Quality Standards

1. **Strict TypeScript:** No implicit `any`. All API contracts and database entities must have runtime validation (Zod) and compile-time types.
2. **Linting & Formatting:** ESLint + Prettier with minimal configuration to maintain consistency without hindering velocity.
3. **No Dead Code:** Delete obsolete prototypes rather than commenting out large blocks.

---

## 🚢 Deployment Workflow

- **CI/CD:** Automated GitHub Actions running `typecheck`, `lint`, and unit test suites on PRs to `main`.
- **Target Platform:** Vercel edge/serverless platform with automated preview deployments for branches.

---

## 🔗 Related Documentation

- Architectural decisions: [DECISIONS.md](./DECISIONS.md)
- Testing strategy: [TESTING.md](./TESTING.md)
- Development roadmap: [ROADMAP.md](./ROADMAP.md)
