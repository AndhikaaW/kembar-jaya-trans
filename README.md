# Kembar Trans Connect

Product Requirements Document (PRD)

Landing Page Kembar Trans — Tier 1 (MVP)

Nama Produk Landing Page Kembar Trans Versi Dokumen 1.0 Tanggal 07 Agustus 2026 Disusun oleh System Analyst (AI-assisted) Status Draft — siap direview

1. Latar Belakang & Masalah

Kembar Trans adalah layanan travel/shuttle antar-kota rute Pacitan–Solo yang saat ini melakukan promosi melalui banner digital (gambar statis) di media sosial/WhatsApp. Masalah yang muncul dari pendekatan ini:

Calon penumpang tidak punya tempat resmi untuk melihat info lengkap (jadwal, kontak, keunggulan) selain gambar banner yang terbatas ruang informasinya.

Tidak ada jejak digital yang bisa diindeks Google (banner gambar tidak SEO-friendly).

Sulit membangun kepercayaan (trust) calon pelanggan baru tanpa halaman resmi yang terlihat profesional.

Proses reservasi masih sepenuhnya manual (telepon/WA langsung), yang untuk Tier 1 memang tetap dipertahankan, namun perlu wadah digital yang mengarahkan user ke kontak tersebut secara efektif.

2. Tujuan Produk (Goals)

Menyediakan landing page resmi, satu halaman, yang menampilkan identitas brand Kembar Trans secara konsisten dengan materi promosi yang sudah ada (banner).

Memudahkan calon penumpang menemukan jadwal keberangkatan dan cara reservasi dalam waktu singkat (< 10 detik dari membuka halaman).

Meningkatkan kredibilitas brand melalui tampilan web yang profesional, modern, dan responsive.

Menjadi fondasi teknis yang bisa dikembangkan bertahap ke Tier 2 (booking online, payment gateway) tanpa perlu dibangun ulang dari nol.

Non-Goals (Di Luar Cakupan Versi Ini)

Tidak membangun sistem booking/reservasi online otomatis.

Tidak ada autentikasi/akun pengguna.

Tidak ada backend, database, atau panel admin.

Tidak menangani pembayaran online.

3. Target Pengguna & Persona

Persona Deskripsi Kebutuhan Utama Penumpang Reguler Warga Pacitan/Solo yang rutin bepergian (kerja, kuliah, keluarga) Cek jadwal cepat, hubungi travel dengan 1 klik Penumpang Baru Belum pernah pakai Kembar Trans, cari referensi travel lewat pencarian Google/rekomendasi teman Yakin dulu brand ini kredibel & aman sebelum menghubungi Pengirim Barang/Titipan Menitipkan barang lewat travel Info bahwa layanan antar-jemput barang tersedia

4. Ruang Lingkup (Scope) — Tier 1

4.1 In-Scope

Landing page statis, single-page, fully responsive (mobile/tablet/desktop)

Section: Header/Nav, Hero, Keunggulan Layanan, Jadwal Keberangkatan, Rute & Estimasi, Testimoni, CTA akhir, Footer, Floating WhatsApp Button

Integrasi klik-to-call (tel:) dan klik-to-WhatsApp (wa.me)

Identitas visual mengikuti palet warna & gaya dari logo/banner Kembar Trans

SEO dasar (meta title, description, Open Graph untuk preview link)

(Opsional, dikonfirmasi user) Widget live chat Tawk.to versi gratis

4.2 Out-of-Scope (masuk roadmap Tier 2/3)

Form booking online dengan pemilihan kursi/tanggal

Payment gateway (Midtrans/Xendit)

Sistem akun user & login

Panel admin untuk mengubah jadwal/harga tanpa edit kode

Notifikasi otomatis (email/WA blast)

Multi-bahasa

5. Kebutuhan Fungsional (Functional Requirements)

ID Requirement Prioritas FR-01 Sistem menampilkan nama brand, tagline, dan rute layanan di hero section Must FR-02 Sistem menampilkan minimal 2 CTA aktif (WhatsApp & Telepon) di hero section Must FR-03 Sistem menampilkan 3 keunggulan layanan sesuai banner asli (antar-jemput, jadwal rutin, aman-nyaman) Must FR-04 Sistem menampilkan jadwal keberangkatan Pacitan→Solo (09.00 WIB) dan Solo→Pacitan (16.00 WIB) dengan jelas Must FR-05 Sistem menyediakan tombol WhatsApp mengambang (floating) yang selalu terlihat saat scroll Must FR-06 Sistem menampilkan nomor telepon yang dapat langsung diklik minimal di 3 lokasi (navbar, hero, footer/CTA akhir) Must FR-07 Navigasi menu dapat mengarahkan user ke section terkait via anchor link (smooth scroll) Should FR-08 Sistem menampilkan estimasi rute/waktu tempuh Pacitan-Solo Should FR-09 Sistem menampilkan testimoni pelanggan (boleh data contoh/placeholder di Tier 1) Could FR-10 Sistem terhubung dengan widget live chat Tawk.to Could (perlu konfirmasi user)

(Prioritas mengikuti MoSCoW: Must, Should, Could, Won't)

6. Kebutuhan Non-Fungsional (Non-Functional Requirements)

ID Requirement NFR-01 Halaman harus fully responsive pada 3 breakpoint: mobile (<640px), tablet (640–1024px), desktop (>1024px) NFR-02 Waktu muat halaman < 3 detik pada koneksi 4G standar NFR-03 Kontras warna teks terhadap background memenuhi standar keterbacaan dasar (khususnya teks putih di atas biru) NFR-04 Semua gambar memiliki atribut alt NFR-05 Kode dibangun tanpa dependency backend — dapat di-hosting di static hosting apa pun (Netlify/Vercel/GitHub Pages/hosting biasa) NFR-06 Struktur kode rapi dan terdokumentasi agar mudah diperluas ke Tier 2 di kemudian hari

7. User Stories

Sebagai calon penumpang, saya ingin melihat jadwal keberangkatan dengan cepat di halaman utama, agar saya tidak perlu menghubungi CS hanya untuk menanyakan jam berangkat.

Sebagai calon penumpang di HP, saya ingin ada tombol WhatsApp yang selalu terlihat, agar saya bisa langsung reservasi tanpa scroll mencari nomor kontak.

Sebagai calon penumpang baru, saya ingin melihat keunggulan layanan (aman, nyaman, antar-jemput), agar saya lebih yakin memilih Kembar Trans dibanding travel lain.

Sebagai pemilik usaha travel, saya ingin halaman ini terlihat profesional dan sesuai identitas brand saya, agar meningkatkan kepercayaan pelanggan baru.

8. Metrik Keberhasilan (Success Metrics)

Karena Tier 1 statis tanpa analytics bawaan, metrik berikut disarankan diukur lewat Google Analytics/Meta Pixel (dapat ditambahkan sebagai enhancement kecil, tidak mengubah sifat statis halaman):

Metrik Target Awal Klik tombol WhatsApp/Telepon per pengunjung Baseline dulu di bulan pertama, lalu tingkatkan Rata-rata waktu di halaman > 30 detik Bounce rate < 60% Skor performa (Google PageSpeed Insights, mobile) > 85

9. Dependensi & Asumsi

Nomor WhatsApp/telepon 0818-0339-2334 aktif dan dipantau secara rutin oleh admin/CS Kembar Trans.

Jadwal (09.00 & 16.00 WIB) adalah jadwal tetap yang jarang berubah; jika sering berubah, sebaiknya dipertimbangkan naik ke Tier 2 (jadwal dikelola dari panel admin, bukan hardcode di kode).

Aset visual asli (logo vector, foto armada, foto sopir/tim) akan disusulkan; sebelum tersedia, digunakan placeholder yang ditandai jelas.

User (pemilik Kembar Trans) menyediakan konten testimoni asli jika ingin menggantikan data contoh.

10. Risiko

Risiko Dampak Mitigasi Jadwal berubah tapi halaman statis tidak ter-update Info salah ke calon penumpang Sediakan README cara edit cepat; pertimbangkan migrasi ke Tier 2 jika perubahan jadwal sering terjadi Nomor WA/telepon tidak direspon cepat Calon penumpang beralih ke kompetitor Di luar scope teknis — rekomendasi operasional: pastikan admin responsif Belum ada foto/aset asli saat go-live Halaman terlihat kurang meyakinkan Gunakan placeholder berkualitas baik sementara, prioritaskan penggantian aset asli secepatnya setelah go-live

11. Timeline Pengembangan (Estimasi Tier 1)

Tahap Estimasi Waktu Setup struktur & styling dasar (palet warna, tipografi) 0.5 hari Pembangunan seluruh section (hero s/d footer) 1–1.5 hari Responsive testing & perbaikan 0.5 hari Review konten & QA akhir 0.5 hari Total estimasi ± 2.5–3 hari kerja

(Estimasi untuk 1 developer/AI agent, tanpa aset foto asli — waktu bisa lebih cepat karena sifatnya statis dan tanpa backend)

12. Kriteria Penerimaan (Acceptance Criteria)

Merujuk pada checklist Definition of Done di dokumen planning teknis sebelumnya (planning-landing-page-kembartrans.md), PRD ini dianggap terpenuhi jika seluruh Functional Requirement berprioritas Must (FR-01 s/d FR-06) selesai diimplementasikan dan lolos uji responsive di 3 breakpoint.

13. Dokumen Terkait

analisis-fitur-sistem-travel.md — analisis fitur menyeluruh sistem travel (semua tier)

tier-fitur-sistem-travel.docx — pembagian fitur per tier (Word)

planning-landing-page-kembartrans.md — spesifikasi teknis & desain detail untuk implementasi

14. Pertanyaan Terbuka (Perlu Konfirmasi User)

Apakah widget live chat Tawk.to (gratis) ingin dimasukkan sekarang di Tier 1, atau ditunda ke iterasi berikutnya?

Apakah sudah ada foto asli armada/logo vector, atau perlu pakai placeholder dulu?

Apakah ada alamat kantor/titik jemput fisik yang perlu ditampilkan di footer?

Apakah domain sudah tersedia, atau masih perlu direkomendasikan opsi hosting?

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://kembar-jaya-trans.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/42b4962f-f42c-4590-ab34-a176f9c19f04).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
