/**
 * Seeder data dummy Firestore untuk landing page Kembar Trans.
 *
 * Mengisi seluruh koleksi yang dibaca landing page (`site-data.ts`):
 *   features, schedules, routes, pickupPoints, prices, services,
 *   gallery, testimonials, dan dokumen siteConfig/main.
 *
 * Persyaratan:
 *   - Rules Firestore mengizinkan write (lihat kembar-trans-admin/firestore.rules).
 *   - Konfigurasi Firebase di `.env` (VITE_FIREBASE_*).
 *
 * Cara pakai:
 *   node scripts/seed.mjs
 *
 * Idempotent: memakai document ID tetap, jadi aman dijalankan ulang.
 */
import { readFileSync } from "node:fs";
import { initializeApp } from "firebase/app";
import { getFirestore, writeBatch, doc } from "firebase/firestore";

function loadEnv() {
  const raw = readFileSync(new URL("../.env", import.meta.url), "utf8");
  const out = {};
  for (const line of raw.split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m) out[m[1]] = m[2].trim();
  }
  return out;
}

/** Placeholder SVG (data-URI) — tajam di ukuran berapa pun, ganti via admin. */
function svg(label) {
  const s = [
    `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'>`,
    `<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>`,
    `<stop offset='0' stop-color='#0ea5e9'/><stop offset='1' stop-color='#0369a1'/>`,
    `</linearGradient></defs>`,
    `<rect width='1200' height='800' fill='url(#g)'/>`,
    `<text x='50%' y='46%' font-family='Arial,sans-serif' font-size='72' font-weight='bold' fill='#ffffff' text-anchor='middle'>${label}</text>`,
    `<text x='50%' y='60%' font-family='Arial,sans-serif' font-size='28' fill='#e0f2fe' text-anchor='middle'>Kembar Trans</text>`,
    `</svg>`,
  ].join("");
  return "data:image/svg+xml;base64," + Buffer.from(s).toString("base64");
}

const data = {
  "features": [
    { id: "feature-1", icon: "CarFront", title: "Antar-Jemput Alamat", desc: "Dijemput dan diantar sampai titik alamat dalam area layanan Pacitan & Solo. Tidak perlu ke terminal.", sortOrder: 1 },
    { id: "feature-2", icon: "Clock", title: "Jadwal Rutin Setiap Hari", desc: "Keberangkatan tetap pagi dan sore, berangkat tepat waktu sehingga rencana perjalanan Anda pasti.", sortOrder: 2 },
    { id: "feature-3", icon: "ShieldCheck", title: "Aman & Nyaman", desc: "Armada terawat, sopir berpengalaman menguasai rute pegunungan, kabin ber-AC dan lega.", sortOrder: 3 },
  ],
  "schedules": [
    { id: "schedule-1", from: "Pacitan", to: "Solo", time: "09.00", timezone: "WIB", note: "Penjemputan mulai 07.30 WIB di area Pacitan", sortOrder: 1 },
    { id: "schedule-2", from: "Solo", to: "Pacitan", time: "16.00", timezone: "WIB", note: "Penjemputan mulai 14.30 WIB di area Solo", sortOrder: 2 },
  ],
  "routes": [
    { id: "route-1", name: "Pacitan", sortOrder: 1 },
    { id: "route-2", name: "Punung", sortOrder: 2 },
    { id: "route-3", name: "Pracimantoro", sortOrder: 3 },
    { id: "route-4", name: "Wonogiri", sortOrder: 4 },
    { id: "route-5", name: "Sukoharjo", sortOrder: 5 },
    { id: "route-6", name: "Solo", sortOrder: 6 },
  ],
  "pickupPoints": [
    { id: "pickup-1", name: "Alamat Rumah / Kantor", area: "Pacitan & Solo", desc: "Penjemputan dari depan alamat Anda dalam area layanan, tanpa harus ke terminal.", sortOrder: 1 },
    { id: "pickup-2", name: "Titik Jemput Utama", area: "Kota Pacitan", desc: "Lokasi strategis di pusat kota untuk penumpang tanpa antar-jemput alamat.", sortOrder: 2 },
  ],
  "prices": [
    { id: "price-1", name: "Pacitan – Solo (perorangan)", price: 100000, unit: "per orang", desc: "Harga per kursi untuk sekali perjalanan, sudah termasuk antar-jemput alamat.", sortOrder: 1 },
    { id: "price-2", name: "Titip Barang / Paket", price: 20000, unit: "per paket", desc: "Kirim dokumen atau paket kecil mengikuti jadwal keberangkatan harian.", sortOrder: 2 },
  ],
  "services": [
    { id: "service-1", icon: "CarFront", title: "Antar-Jemput Alamat", desc: "Penjemputan dari dan pengantaran ke alamat Anda di Pacitan maupun Solo.", sortOrder: 1 },
    { id: "service-2", icon: "Package", title: "Titip Barang", desc: "Kirim dokumen atau paket kecil mengikuti jadwal keberangkatan harian.", sortOrder: 2 },
    { id: "service-3", icon: "Clock", title: "Jadwal Harian", desc: "Keberangkatan rutin pagi dan sore setiap hari, berangkat tepat waktu.", sortOrder: 3 },
  ],
  "gallery": [
    { id: "gallery-1", imageUrl: svg("Armada Minibus"), title: "Armada Minibus", caption: "Minibus ber-AC yang nyaman untuk rute Pacitan–Solo.", sortOrder: 1 },
    { id: "gallery-2", imageUrl: svg("Antar-Jemput Alamat"), title: "Antar-Jemput Alamat", caption: "Penjemputan dari depan rumah atau kantor Anda.", sortOrder: 2 },
    { id: "gallery-3", imageUrl: svg("Titip Barang"), title: "Layanan Titip Barang", caption: "Kirim dokumen atau paket kecil mengikuti jadwal harian.", sortOrder: 3 },
    { id: "gallery-4", imageUrl: svg("Rute Pegunungan"), title: "Rute Pegunungan", caption: "Jalur indah yang dikuasai sopir berpengalaman kami.", sortOrder: 4 },
  ],
  "testimonials": [
    { id: "testimonial-1", name: "Rina W.", origin: "Pacitan", rating: 5, text: "Sudah langganan tiap bulan pulang kampung. Dijemput depan rumah, sopirnya ramah dan berangkatnya tepat waktu.", imageUrl: "", sortOrder: 1 },
    { id: "testimonial-2", name: "Bagus P.", origin: "Solo", rating: 5, text: "Pesan lewat WhatsApp sore, besok paginya sudah dapat kursi. Mobilnya bersih dan perjalanannya nyaman.", imageUrl: "", sortOrder: 2 },
    { id: "testimonial-3", name: "Hendra S.", origin: "Wonogiri", rating: 5, text: "Sering nitip paket dokumen ke Solo lewat Kembar Trans. Cepat sampai dan selalu dikabari.", imageUrl: "", sortOrder: 3 },
  ],
};

const siteConfig = {
  brand: {
    name: "Kembar Trans",
    tagline: "Pacitan — Solo",
    logoUrl: "",
    heroTitle: "Perjalanan Pacitan–Solo, Nyaman Sampai Depan Rumah",
    heroSubtitle:
      "Kembar Trans melayani antar-jemput alamat setiap hari dengan jadwal tetap pagi dan sore. Cukup satu pesan WhatsApp, kursi Anda siap.",
  },
  hero: {
    imageUrl: svg("Hero Armada Kembar Trans"),
    imageCaption: "*Foto ilustrasi — ganti dengan foto armada asli via aplikasi admin",
  },
  contact: {
    waNumber: "6281803392334",
    phoneDisplay: "0818-0339-2334",
    waMessage: "Halo Kembar Trans, saya ingin reservasi kursi. Boleh info jadwal dan harganya?",
    serviceHours: "07.00 – 20.00 WIB",
  },
  address: {
    text: "Jl. Contoh No. 1, Pacitan (alamat sementara)",
    city: "Pacitan",
  },
  travelTime: {
    durationText: "±3,5 jam",
    note: "Waktu tempuh normal dari titik jemput hingga titik antar, di luar waktu penjemputan penumpang lain.",
  },
  seo: {
    title: "Kembar Trans — Travel Pacitan–Solo Antar-Jemput Setiap Hari",
    description:
      "Travel shuttle Pacitan–Solo dengan layanan antar-jemput alamat. Berangkat setiap hari 09.00 & 16.00 WIB. Reservasi cepat via WhatsApp 0818-0339-2334.",
    ogImageUrl: "",
  },
};

async function main() {
  const env = loadEnv();
  const app = initializeApp({
    apiKey: env.VITE_FIREBASE_API_KEY,
    authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: env.VITE_FIREBASE_APP_ID,
  });
  const db = getFirestore(app);

  for (const [collection, items] of Object.entries(data)) {
    const batch = writeBatch(db);
    for (const { id, ...rest } of items) {
      batch.set(doc(db, collection, id), rest);
    }
    await batch.commit();
    console.log(`OK  ${collection} (${items.length} dokumen)`);
  }

  await setDocCustom(db, "siteConfig", "main", siteConfig);
  console.log("OK  siteConfig/main");

  console.log("\nSelesai. Landing page kini memuat data dari Firestore.");
}

async function setDocCustom(db, collection, id, obj) {
  const { setDoc } = await import("firebase/firestore");
  await setDoc(doc(db, collection, id), obj);
}

main().catch((err) => {
  console.error("Seeder gagal:", err.code ?? "", err.message);
  process.exit(1);
});
