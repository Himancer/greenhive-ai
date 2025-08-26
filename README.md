
# GreenHive.ai — AI Nursery (Next.js 14)

A flashy, neon‑green plant nursery with animations and a built‑in chatbot.
**Stack:** Next.js 14 (App Router) • Tailwind CSS • Framer Motion • lucide-react

## Quick Deploy (Vercel)
1. Push this folder to a GitHub repo named `greenhive-ai` (or any name).
2. Go to **vercel.com** → New Project → Import from GitHub → Deploy.
3. Done. Next.js is auto-detected.

## Local Dev (optional)
```bash
npm i
npm run dev
```

## Customize
- Edit plant data in `lib/plants.ts`.
- Chatbot endpoint: `app/api/ask/route.ts` (rule-based). Swap with an LLM later.
- Branding in `app/layout.tsx` + header in `app/page.tsx`.
