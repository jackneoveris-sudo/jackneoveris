#!/usr/bin/env python3
"""
Serves the site locally for testing.

Usage:
    python3 serve.py
    Then open http://localhost:8000 in a browser.

Why this exists:
    The PDF reader uses Web Workers + ES modules, which browsers refuse to load
    over file:// URLs. The site MUST be served via HTTP (or HTTPS) to test the
    book reader. This script does that locally with the correct MIME types for
    .mjs files.

    On the live host (Netlify, Cloudflare Pages, etc.) this isn't an issue —
    everything is served via HTTPS by default. This script is only for local
    preview before deploying.
"""

import http.server
import socketserver
import mimetypes
import sys

PORT = 8000

# Ensure .mjs files are served with the correct JavaScript MIME type
mimetypes.add_type("application/javascript", ".mjs")
mimetypes.add_type("application/javascript", ".js")
mimetypes.add_type("text/css", ".css")
mimetypes.add_type("application/pdf", ".pdf")


class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Disable caching so changes show up immediately during local development
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


if __name__ == "__main__":
    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            print(f"Serving site at http://localhost:{PORT}")
            print("Press Ctrl+C to stop.")
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")
        sys.exit(0)
    except OSError as e:
        if "Address already in use" in str(e):
            print(f"Port {PORT} is already in use. Stop the other process or change PORT in this script.")
        else:
            raise
