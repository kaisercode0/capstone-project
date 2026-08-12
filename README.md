# Settings Form

A React settings form with client-side validation using **React Hook Form** and **Zod**.

## Features

- **Display name** — required, 2–50 characters
- **Email** — required, valid email format
- Inline error messages under each field
- Success banner on save

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Tests

Validation logic is covered in `src/schema.test.ts`:

```bash
npm test
```

## Project structure

```
src/
  schema.ts              # Zod schema + validateSettings helper
  schema.test.ts         # Unit tests for validation rules
  components/
    SettingsForm.tsx     # Form UI + react-hook-form wiring
    SettingsForm.css
  App.tsx
  main.tsx
```
