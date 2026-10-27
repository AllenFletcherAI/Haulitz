# Alternatives Considered (Haulitz)
Standard: ASD-STE100 Simplified Technical English · Habit 17

## Alternative 1: Free Container Deployment (Render / Railway / Fly.io)
- **Description:** Deploy a Python FastAPI backend container connected to an SQLite or PostgreSQL database on a free-tier hosting provider.
- **Why rejected:** Free containers spin down to sleep after 10 to 15 minutes of inactivity. When a German hiring manager clicks a portfolio link, the cold start delay is 50 to 90 seconds, or the request times out with an HTTP 502 Bad Gateway. Recruiters abandon sites that do not load in under 2 seconds.

## Alternative 2: Paid Dedicated VPS (Hetzner Cloud CX22 / AWS t4g.small)
- **Description:** Rent a Linux virtual private server in Frankfurt for €4.50 to €15 per month to keep a live Python Docker container running 24/7.
- **Why rejected:** Violates the mandatory $0 out-of-pocket project constraint. Requires ongoing operational maintenance, Linux kernel patches, reverse proxy configuration (Nginx / Caddy), firewall management, and SSL certificate renewals.

## Alternative 3: Live LLM Vision Extraction in Browser via Webhook
- **Description:** Require visitors to upload real PDF documents and send them to OpenAI or Gemini API directly from the browser.
- **Why rejected:** Hiring managers never download unknown shipping documents to their desktops to upload to an unverified web form. API keys exposed in the browser get abused or rate-limited (HTTP 429). The system must run offline with pre-cached canonical scenarios.
