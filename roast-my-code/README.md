# Roast My Code 🔥

Paste a code snippet. Get roasted first, then get the real feedback — no sugar-coating either way.

A tiny full-stack demo of using the Claude API for something more fun than a chatbot: a "burn meter" rates how bad your code actually is, then the tone flips from savage roast (ember colors) to genuine constructive feedback (cool cyan).

## How it works

- `index.html` — the whole UI in one file (no build step, no framework)
- `server.js` — a minimal Express server with one route, `POST /api/roast`, that forwards your code to the Claude API and keeps your API key on the server (never exposed to the browser)

## Run it locally

```bash
npm install
cp .env.example .env
# edit .env and add your Anthropic API key
npm start
```

Then open `http://localhost:3000`.

Get an API key at [console.anthropic.com](https://console.anthropic.com).

## Why the server exists

The Claude API doesn't allow safe, direct calls from a browser with a real API key baked into client-side JavaScript — anyone could open dev tools and steal it. `server.js` is a ~50-line proxy: the browser calls your own server, your server calls Claude, your key never leaves the backend.

## Customize the roast

Everything about the personality lives in one place — the `systemPrompt` string in `index.html`. Want it meaner, nicer, or focused on a specific language's idioms? Edit that prompt.

## Deploy it

Any Node host works (Render, Railway, Fly.io, a VPS, etc.). Set the `ANTHROPIC_API_KEY` environment variable there instead of a local `.env` file, and you're live.

---

Built as a small R&D project exploring the Claude API beyond chat.
