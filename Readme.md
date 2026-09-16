# Meridian Legal Consultants — Website

Plain HTML + Tailwind CSS (via CDN), deployable on Vercel with a serverless
function handling the contact form.

## Local development

Just open index.html in a browser, or use a local server:

  npx serve .

The contact form's fetch("/api/contact") call will only work when deployed
on Vercel (or run via `vercel dev` locally), since it needs the serverless
function.

## Setup

1. Install dependencies:
   npm install

2. Copy environment variables:
   cp .env.example .env

3. Fill in SMTP credentials in .env (or in Vercel project settings):
   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, CONTACT_EMAIL_TO, CONTACT_EMAIL_FROM

4. Run locally with Vercel CLI (recommended, so /api routes work):
   npm install -g vercel
   vercel dev

5. Deploy:
   vercel --prod
   (or push to GitHub and import into Vercel dashboard)

## Notes

- Tailwind is loaded via CDN script for zero build-step editing — fine for
  this project's size. If you want a production-optimized build later, swap
  to the Tailwind CLI.
- About page content is placeholder — replace once the client shares their
  company profile.
- No database used; contact form sends email directly via SMTP through the
  Vercel serverless function.