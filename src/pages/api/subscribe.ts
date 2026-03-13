/**
 * POST /api/subscribe
 *
 * Adds the diagnostic tool email-gate submission to MailerLite.
 * Fire-and-forget from the client — user flow continues regardless of outcome.
 * Requires MAILERLITE_API_KEY set in Cloudflare Pages environment variables.
 */
export const prerender = false;

import type { APIRoute } from "astro";

// ── helpers ────────────────────────────────────────────────────────────────

function jsonResponse(data: Record<string, unknown>, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

// ── route ──────────────────────────────────────────────────────────────────

export const POST: APIRoute = async ({ request, locals }) => {
  // Validate content type
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return jsonResponse({ error: "Invalid content type" }, 400);
  }

  // Parse and coerce body — never trust external input types
  let name: string;
  let email: string;
  let company: string | undefined;

  try {
    const raw = (await request.json()) as Record<string, unknown>;
    name = typeof raw.name === "string" ? raw.name.trim() : "";
    email = typeof raw.email === "string" ? raw.email.trim() : "";
    company =
      typeof raw.company === "string" && raw.company.trim()
        ? raw.company.trim()
        : undefined;
  } catch {
    return jsonResponse({ error: "Invalid JSON" }, 400);
  }

  // Validate required fields
  if (!name || !email || !email.includes("@")) {
    return jsonResponse({ error: "Name and email required" }, 400);
  }

  // Get API key from Cloudflare runtime env
  const apiKey = locals.runtime.env.MAILERLITE_API_KEY;
  if (!apiKey) {
    console.error("[subscribe] MAILERLITE_API_KEY not configured");
    return jsonResponse({ error: "Service unavailable" }, 503);
  }

  // Build MailerLite subscriber payload
  const payload: Record<string, unknown> = {
    email,
    fields: {
      name,
      ...(company ? { company } : {}),
    },
    status: "active",
    resubscribe: true, // re-subscribes if previously unsubscribed
  };

  // POST to MailerLite API v3
  try {
    const mlRes = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!mlRes.ok) {
      const errorText = await mlRes.text();
      console.error(`[subscribe] MailerLite ${mlRes.status}: ${errorText}`);
      return jsonResponse({ error: "Subscription failed" }, 502);
    }

    return jsonResponse({ success: true }, 200);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[subscribe] Fetch error:", message);
    return jsonResponse({ error: "Network error" }, 502);
  }
};
