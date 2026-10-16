# Event Manages — Frontend Demo

Luxury editorial-style React frontend for an event management business in Vijayawada. This is a frontend-only prototype; no data is sent to a server.

## Features
- Responsive premium landing page with cinematic hero and layered backgrounds
- Animated text reveals, scroll parallax, hover depth, and reduced-motion support
- Services, process, portfolio gallery filters and image lightbox
- Frontend enquiry modal with validation and local demo success state
- Mobile navigation and responsive layouts
- Placeholder content and stock photography that should be replaced with client-approved assets

## Run locally

1. Install Node.js (LTS).
2. Open this folder in a terminal.
3. Run:

```bash
npm install
npm run dev
```

4. Open the local URL printed by Vite.

Build production files with `npm run build`; output is written to `dist/`.

## Important frontend-only notes
- The enquiry form currently does not save, email, or send WhatsApp messages. It only demonstrates the UI flow.
- Online date availability and payment are not active and should be added only after the backend is designed.
- Add real business phone/WhatsApp details, verified testimonials, service terms, privacy policy and final client photographs before launch.
- Image URLs use Unsplash and require an internet connection; download/host properly licensed final images for production.
- Never put payment secrets, database credentials or admin authorization in frontend code.
