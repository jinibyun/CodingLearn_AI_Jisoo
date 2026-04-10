"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "system-ui, sans-serif",
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#f8fafc",
          color: "#0f172a",
          padding: "2rem",
        }}
      >
        <main
          style={{
            width: "100%",
            maxWidth: "520px",
            background: "white",
            borderRadius: "12px",
            padding: "2rem",
            boxShadow: "0 12px 30px rgba(2, 6, 23, 0.1)",
            textAlign: "center",
          }}
        >
          <h1 style={{ marginTop: 0, marginBottom: "0.75rem" }}>Something went wrong</h1>
          <p style={{ marginTop: 0, marginBottom: "1.5rem", lineHeight: 1.6 }}>
            We are sorry, an unexpected error occurred. Our team has been notified.
          </p>
          <button
            onClick={reset}
            style={{
              border: 0,
              borderRadius: "8px",
              padding: "0.65rem 1rem",
              background: "#0f172a",
              color: "white",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
