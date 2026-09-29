/**
 * IDIOT SANDWICH — Security & Sanitization Layer
 * Implements input bounds, prompt injection defense, and basic content moderation.
 * Aligned with docs/SECURITY.md
 */

const MAX_INPUT_LENGTH = 120;
const MIN_INPUT_LENGTH = 1;

// Obvious prompt injection patterns to neutralize
const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?(previous|prior|above)\s+instructions/i,
  /system\s+prompt/i,
  /you\s+are\s+now\s+(an?\s+)?unfiltered/i,
  /reveal\s+(the\s+)?(developer\s+)?instructions/i,
  /override\s+(all\s+)?rules/i,
  /jailbreak/i,
  /dan\s+mode/i,
  /bypass\s+safety/i,
];

// Content moderation heuristics for slurs, severe profanity, or toxic terms
const MODERATION_PATTERNS = [
  /\b(nazi|hitler|swastika|kill\s+yourself|suicide)\b/i,
  /\b(nigger|faggot|kike|chink|spic)\b/i,
  /\b(child\s*porn|cp|pedophil)\b/i,
];

export interface SanitizeResult {
  ok: boolean;
  sanitized: string;
  error?: string;
  statusCode?: number;
}

/**
 * Sanitizes untrusted user input string and checks for length,
 * injection attempts, and prohibited terms.
 */
export function sanitizeInput(raw: unknown): SanitizeResult {
  if (typeof raw !== "string") {
    return {
      ok: false,
      sanitized: "",
      error: "Invalid input: expected text payload.",
      statusCode: 400,
    };
  }

  // 1. Strip HTML tags, script blocks, and non-printable control characters
  const cleaned = raw
    .replace(/<[^>]*>/g, "")
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  // 2. Length Bounds
  if (cleaned.length < MIN_INPUT_LENGTH) {
    return {
      ok: false,
      sanitized: "",
      error: "The sandwich plate is empty! Please enter a challenger.",
      statusCode: 400,
    };
  }

  if (cleaned.length > MAX_INPUT_LENGTH) {
    return {
      ok: false,
      sanitized: "",
      error: `Whoa there! Your sandwich recipe exceeds ${MAX_INPUT_LENGTH} characters. Keep it punchy.`,
      statusCode: 400,
    };
  }

  // 3. Prompt Injection Defense
  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(cleaned)) {
      return {
        ok: false,
        sanitized: "",
        error: "The Head Chef detected unauthorized kitchen tampering (prompt injection). Play fair!",
        statusCode: 422,
      };
    }
  }

  // 4. Content Moderation
  for (const pattern of MODERATION_PATTERNS) {
    if (pattern.test(cleaned)) {
      return {
        ok: false,
        sanitized: "",
        error: "The Health Inspector immediately shut down that sandwich recipe for toxicity.",
        statusCode: 422,
      };
    }
  }

  return {
    ok: true,
    sanitized: cleaned,
  };
}
