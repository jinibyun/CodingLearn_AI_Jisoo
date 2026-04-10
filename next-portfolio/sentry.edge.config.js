import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn:
    process.env.NEXT_PUBLIC_SENTRY_DSN ||
    "https://ba0775ed7dd0e058a3afec6e74bf52c6@o4511197222273024.ingest.us.sentry.io/4511197237084160",
  tracesSampleRate: 1.0,
});
