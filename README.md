# Settings Form

A React settings form with client-side validation using **React Hook Form** and **Zod**.

## Features

- **Profile fields**: display name, email, bio (with character count)
- **Preferences**: theme, language, timezone
- **Notifications**: email, push, and marketing toggles
- **Validation**: blur-triggered validation with accessible error messages
- **UX**: dirty-state tracking, reset, loading state, success banner

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Validation rules

| Field | Rules |
|-------|-------|
| Display name | 2–50 characters |
| Email | Required, valid email format |
| Bio | Optional, max 280 characters |
| Theme / Language / Timezone | Required selection |

## Project structure

```
src/
  schema.ts              # Zod schema + defaults
  components/
    SettingsForm.tsx     # Form UI + react-hook-form wiring
    SettingsForm.css
  App.tsx
  main.tsx
```
