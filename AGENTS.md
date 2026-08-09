# AGENTS.md — Kembar Trans Landing Page

## Project

Landing page satu halaman untuk layanan travel Kembar Trans (Pacitan–Solo).
Dibangun dengan TanStack Start (mode SPA statis) + React 19 + Tailwind CSS 4.
Konten landing page diambil dari Firebase Firestore (lihat `src/lib/site-data.ts`).
Data dapat diubah melalui aplikasi admin Flutter di folder `../kembar-trans-admin`.

## Commands

```sh
npm install      # install dependencies
npm run dev      # local dev server (Vite)
npm run build    # static build output -> dist/ (untuk GitHub Pages)
npm run lint     # ESLint
npm run format   # Prettier
```

## Structure

- `src/routes/index.tsx` — halaman landing (render dari data Firebase, fallback ke data default)
- `src/lib/firebase.ts` — inisialisasi Firebase (dari env)
- `src/lib/site-data.ts` — tipe data, hook React Query, data default
- `.env` — konfigurasi web Firebase (jangan di-commit)
- `.github/workflows/deploy.yml` — deploy otomatis ke GitHub Pages

## Deployment

Build statis otomatis di-deploy ke GitHub Pages lewat GitHub Actions saat push ke `main`.
Set `VITE_BASE_PATH` jika repo di-host di sub-path (tanpa custom domain).
