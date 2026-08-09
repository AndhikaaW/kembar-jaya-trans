# Kembar Trans — Landing Page

Landing page satu halaman untuk layanan travel Kembar Trans (rute Pacitan–Solo),
dengan konten dinamis yang dikelola dari aplikasi admin Flutter (`../kembar-trans-admin`).

## Stack

- [TanStack Start](https://tanstack.com/start) — mode SPA statis
- React 19 + TanStack Router + TanStack Query
- Tailwind CSS 4
- Firebase Firestore sebagai sumber data master (gambar disimpan sebagai base64
  dalam dokumen, tanpa Firebase Storage)

## Development

```sh
npm install
npm run dev
```

Konfigurasi Firebase web diletakkan di file `.env` (lihat `.env.example`):

```ini
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_BASE_PATH=/
```

Jika konfigurasi Firebase belum diisi, halaman tetap tampil menggunakan data default bawaan.

## Build & Deploy

```sh
npm run build
```

Output statis berada di folder `dist/`. Deploy ke GitHub Pages otomatis dilakukan
oleh GitHub Actions (`.github/workflows/deploy.yml`) setiap push ke `main`.

Untuk custom domain: atur di GitHub → Settings → Pages → Custom domain, lalu buat
record DNS sesuai petunjuk GitHub.
