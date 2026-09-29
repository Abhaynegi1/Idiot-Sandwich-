import { NextResponse } from "next/server";
import { sanitizeInput } from "@/lib/security/sanitizer";
import { ChallengeRequestSchema } from "@/lib/engine/schemas";
import { evaluateMatchup } from "@/lib/engine/gemini-adjudicator";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Malformed request payload. Expected JSON body.",
        },
        { status: 400 }
      );
    }

    // 1. Sanitize raw input
    const rawInputCandidate =
      typeof body === "object" && body !== null && "rawInput" in body
        ? (body as Record<string, unknown>).rawInput
        : "";

    const sanitizeResult = sanitizeInput(rawInputCandidate);
    if (!sanitizeResult.ok) {
      return NextResponse.json(
        {
          success: false,
          error: sanitizeResult.error,
        },
        { status: sanitizeResult.statusCode || 400 }
      );
    }

    // 2. Validate payload structure
    const parseResult = ChallengeRequestSchema.safeParse({
      rawInput: sanitizeResult.sanitized,
      champion: (body as Record<string, unknown>).champion,
    });

    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid challenge request parameters.",
          details: parseResult.error.format(),
        },
        { status: 400 }
      );
    }

    const { champion, rawInput } = parseResult.data;

    // 3. Adjudicate matchup (Gemini with deterministic fallback)
    const result = await evaluateMatchup(champion, rawInput);

    return NextResponse.json({
      success: true,
      winner: result.evaluation.winner,
      isNewChampion: result.evaluation.winner === "challenger",
      evaluation: {
        confidence: result.evaluation.confidence,
        shortHeadline: result.evaluation.shortHeadline,
        humorousReason: result.evaluation.humorousReason,
        dominantFactor: result.evaluation.dominantFactor,
      },
      challenger: result.challengerEntity,
      adjudicatorSource: result.adjudicatorSource,
    });
  } catch (error) {
    console.error("[api/challenge] Unexpected error in challenge handler:", error);
    return NextResponse.json(
      {
        success: false,
        error: "The kitchen encountered a culinary anomaly. Please try again.",
      },
      { status: 500 }
    );
  }
}
