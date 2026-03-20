/// <reference types="astro/client" />

// Cloudflare Pages runtime environment bindings.
// Extend `Env` when adding new secrets or bindings in the Cloudflare dashboard.
type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {}
}

interface Env {
  /** MailerLite API v3 key — set in Cloudflare Pages > Settings > Variables */
  MAILERLITE_API_KEY: string | undefined;
}
