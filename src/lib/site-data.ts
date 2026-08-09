/**
 * Lapisan data landing page.
 *
 * Semua konten diambil dari Firestore (Firebase) secara client-side.
 * Jika Firebase belum dikonfigurasi / gagal / koleksi kosong, data default
 * bawaan dipakai sehingga halaman tidak pernah kosong.
 */
import { useQuery } from "@tanstack/react-query";
import type { Firestore } from "firebase/firestore";
import { getDb } from "./firebase";

import heroArmada from "@/assets/hero-armada.jpg";

// ---------------------------------------------------------------------------
// Tipe data
// ---------------------------------------------------------------------------

export type IconKey =
  | "CarFront"
  | "Clock"
  | "ShieldCheck"
  | "MapPin"
  | "Package"
  | "Wallet"
  | "Users"
  | "Wifi"
  | "Headset";

export type SiteConfig = {
  brand: {
    name: string;
    tagline: string;
    logoUrl: string;
    heroTitle: string;
    heroSubtitle: string;
  };
  hero: {
    imageUrl: string;
    imageCaption: string;
  };
  contact: {
    waNumber: string;
    phoneDisplay: string;
    waMessage: string;
    serviceHours: string;
  };
  address: {
    text: string;
    city: string;
  };
  travelTime: {
    durationText: string;
    note: string;
  };
  seo: {
    title: string;
    description: string;
    ogImageUrl: string;
  };
};

export type Feature = { icon: IconKey; title: string; desc: string };
export type Schedule = { from: string; to: string; time: string; timezone: string; note: string };
export type RoutePoint = { name: string };
export type PickupPoint = { name: string; area: string; desc: string };
export type PriceItem = { name: string; price: number; unit: string; desc: string };
export type Service = { icon: IconKey; title: string; desc: string };
export type GalleryItem = { title: string; caption: string; imageUrl: string };
export type Testimonial = {
  name: string;
  origin: string;
  rating: number;
  text: string;
  imageUrl: string;
};

export type SiteData = {
  config: SiteConfig;
  features: Feature[];
  schedules: Schedule[];
  routes: RoutePoint[];
  pickupPoints: PickupPoint[];
  prices: PriceItem[];
  services: Service[];
  gallery: GalleryItem[];
  testimonials: Testimonial[];
};

// ---------------------------------------------------------------------------
// Data default (fallback)
// ---------------------------------------------------------------------------

export const DEFAULT_CONFIG: SiteConfig = {
  brand: {
    name: "Kembar Trans",
    tagline: "Pacitan — Solo",
    logoUrl: "",
    heroTitle: "Perjalanan Pacitan–Solo, Nyaman Sampai Depan Rumah",
    heroSubtitle:
      "Kembar Trans melayani antar-jemput alamat setiap hari dengan jadwal tetap pagi dan sore. Cukup satu pesan WhatsApp, kursi Anda siap.",
  },
  hero: {
    imageUrl: heroArmada,
    imageCaption: "*Foto ilustrasi — akan diganti foto armada asli",
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
    ogImageUrl: "/og-image.jpg",
  },
};

export const DEFAULT_FEATURES: Feature[] = [
  {
    icon: "CarFront",
    title: "Antar-Jemput Alamat",
    desc: "Dijemput dan diantar sampai titik alamat dalam area layanan Pacitan & Solo. Tidak perlu ke terminal.",
  },
  {
    icon: "Clock",
    title: "Jadwal Rutin Setiap Hari",
    desc: "Keberangkatan tetap pagi dan sore, berangkat tepat waktu sehingga rencana perjalanan Anda pasti.",
  },
  {
    icon: "ShieldCheck",
    title: "Aman & Nyaman",
    desc: "Armada terawat, sopir berpengalaman menguasai rute pegunungan, kabin ber-AC dan lega.",
  },
];

export const DEFAULT_SCHEDULES: Schedule[] = [
  {
    from: "Pacitan",
    to: "Solo",
    time: "09.00",
    timezone: "WIB",
    note: "Penjemputan mulai 07.30 WIB di area Pacitan",
  },
  {
    from: "Solo",
    to: "Pacitan",
    time: "16.00",
    timezone: "WIB",
    note: "Penjemputan mulai 14.30 WIB di area Solo",
  },
];

export const DEFAULT_ROUTES: RoutePoint[] = [
  "Pacitan",
  "Punung",
  "Pracimantoro",
  "Wonogiri",
  "Sukoharjo",
  "Solo",
].map((name) => ({ name }));

export const DEFAULT_PICKUP_POINTS: PickupPoint[] = [
  {
    name: "Alamat Rumah / Kantor",
    area: "Pacitan & Solo",
    desc: "Penjemputan dari depan alamat Anda dalam area layanan, tanpa harus ke terminal.",
  },
  {
    name: "Titik Jemput Utama",
    area: "Kota Pacitan",
    desc: "Lokasi strategis di pusat kota untuk penumpang tanpa antar-jemput alamat.",
  },
];

export const DEFAULT_PRICES: PriceItem[] = [
  {
    name: "Pacitan – Solo (perorangan)",
    price: 100000,
    unit: "per orang",
    desc: "Harga per kursi untuk sekali perjalanan, sudah termasuk antar-jemput alamat.",
  },
  {
    name: "Titip Barang / Paket",
    price: 20000,
    unit: "per paket",
    desc: "Kirim dokumen atau paket kecil mengikuti jadwal keberangkatan harian.",
  },
];

export const DEFAULT_SERVICES: Service[] = [
  {
    icon: "CarFront",
    title: "Antar-Jemput Alamat",
    desc: "Penjemputan dari dan pengantaran ke alamat Anda di Pacitan maupun Solo.",
  },
  {
    icon: "Package",
    title: "Titip Barang",
    desc: "Kirim dokumen atau paket kecil mengikuti jadwal keberangkatan harian.",
  },
  {
    icon: "Clock",
    title: "Jadwal Harian",
    desc: "Keberangkatan rutin pagi dan sore setiap hari, berangkat tepat waktu.",
  },
];

export const DEFAULT_GALLERY: GalleryItem[] = [
  {
    title: "Armada Minibus",
    caption: "Minibus ber-AC yang nyaman untuk rute Pacitan–Solo.",
    imageUrl: heroArmada,
  },
];

export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    name: "Rina W.",
    origin: "Pacitan",
    rating: 5,
    text: "Sudah langganan tiap bulan pulang kampung. Dijemput depan rumah, sopirnya ramah dan berangkatnya tepat waktu.",
    imageUrl: "",
  },
  {
    name: "Bagus P.",
    origin: "Solo",
    rating: 5,
    text: "Pesan lewat WhatsApp sore, besok paginya sudah dapat kursi. Mobilnya bersih dan perjalanannya nyaman.",
    imageUrl: "",
  },
  {
    name: "Hendra S.",
    origin: "Wonogiri",
    rating: 5,
    text: "Sering nitip paket dokumen ke Solo lewat Kembar Trans. Cepat sampai dan selalu dikabari.",
    imageUrl: "",
  },
];

export const DEFAULT_SITE_DATA: SiteData = {
  config: DEFAULT_CONFIG,
  features: DEFAULT_FEATURES,
  schedules: DEFAULT_SCHEDULES,
  routes: DEFAULT_ROUTES,
  pickupPoints: DEFAULT_PICKUP_POINTS,
  prices: DEFAULT_PRICES,
  services: DEFAULT_SERVICES,
  gallery: DEFAULT_GALLERY,
  testimonials: DEFAULT_TESTIMONIALS,
};

// ---------------------------------------------------------------------------
// Helper Firestore
// ---------------------------------------------------------------------------

async function fetchDoc<T extends Record<string, unknown>>(
  db: Firestore,
  path: string,
): Promise<T | null> {
  const { doc, getDoc } = await import("firebase/firestore");
  const ref = doc(db, path);
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as T) : null;
}

async function fetchCollection<T extends { sortOrder?: number }>(
  db: Firestore,
  name: string,
): Promise<T[]> {
  const { collection, getDocs } = await import("firebase/firestore");
  const snap = await getDocs(collection(db, name));
  const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as unknown as T);
  return items.sort((a, b) => toNumber(a.sortOrder) - toNumber(b.sortOrder));
}

/** sortOrder bisa berupa number atau string (data manual di console). */
function toNumber(v: unknown): number {
  if (typeof v === "number") return Number.isFinite(v) ? v : 0;
  if (typeof v === "string") {
    const n = Number(v.replace(/\./g, ""));
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}

function mergeConfig(base: SiteConfig, override: Record<string, unknown> | null): SiteConfig {
  if (!override) return base;
  const merged: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(override)) {
    const baseValue = merged[key];
    if (
      baseValue &&
      typeof baseValue === "object" &&
      !Array.isArray(baseValue) &&
      value &&
      typeof value === "object" &&
      !Array.isArray(value)
    ) {
      merged[key] = { ...baseValue, ...(value as Record<string, unknown>) };
    } else if (value !== undefined && value !== null) {
      merged[key] = value;
    }
  }
  return merged as SiteConfig;
}

// ---------------------------------------------------------------------------
// Hooks React Query
// ---------------------------------------------------------------------------

const STALE_TIME = 60_000;

function useCollectionQuery<T extends { sortOrder?: number }>(
  key: string,
  collectionName: string,
  defaults: T[],
) {
  return useQuery({
    queryKey: [key],
    queryFn: async () => {
      const db = await getDb();
      if (!db) return defaults;
      try {
        const items = await fetchCollection<T>(db, collectionName);
        return items.length > 0 ? items : defaults;
      } catch (err) {
        console.warn(`[site-data] gagal memuat ${collectionName}:`, err);
        return defaults;
      }
    },
    staleTime: STALE_TIME,
    placeholderData: defaults,
  });
}

export function useSiteData(): SiteData {
  const configQuery = useQuery({
    queryKey: ["site-config"],
    queryFn: async () => {
      const db = await getDb();
      if (!db) return DEFAULT_CONFIG;
      try {
        const remote = await fetchDoc(db, "siteConfig/main");
        return mergeConfig(DEFAULT_CONFIG, remote);
      } catch (err) {
        console.warn("[site-data] gagal memuat siteConfig:", err);
        return DEFAULT_CONFIG;
      }
    },
    staleTime: STALE_TIME,
    placeholderData: DEFAULT_CONFIG,
  });

  const features = useCollectionQuery<Feature>("features", "features", DEFAULT_FEATURES);
  const schedules = useCollectionQuery<Schedule>("schedules", "schedules", DEFAULT_SCHEDULES);
  const routes = useCollectionQuery<RoutePoint>("routes", "routes", DEFAULT_ROUTES);
  const pickupPoints = useCollectionQuery<PickupPoint>(
    "pickup-points",
    "pickupPoints",
    DEFAULT_PICKUP_POINTS,
  );
  const prices = useCollectionQuery<PriceItem>("prices", "prices", DEFAULT_PRICES);
  const services = useCollectionQuery<Service>("services", "services", DEFAULT_SERVICES);
  const gallery = useCollectionQuery<GalleryItem>("gallery", "gallery", DEFAULT_GALLERY);
  const testimonials = useCollectionQuery<Testimonial>(
    "testimonials",
    "testimonials",
    DEFAULT_TESTIMONIALS,
  );

  return {
    config: configQuery.data ?? DEFAULT_CONFIG,
    features: features.data ?? DEFAULT_FEATURES,
    schedules: schedules.data ?? DEFAULT_SCHEDULES,
    routes: routes.data ?? DEFAULT_ROUTES,
    pickupPoints: pickupPoints.data ?? DEFAULT_PICKUP_POINTS,
    prices: prices.data ?? DEFAULT_PRICES,
    services: services.data ?? DEFAULT_SERVICES,
    gallery: gallery.data ?? DEFAULT_GALLERY,
    testimonials: testimonials.data ?? DEFAULT_TESTIMONIALS,
  };
}

// ---------------------------------------------------------------------------
// Helper link kontak
// ---------------------------------------------------------------------------

export function buildWaLink(config: SiteConfig): string {
  const num = config.contact.waNumber.replace(/\D/g, "");
  const text = encodeURIComponent(config.contact.waMessage || "Halo, saya ingin reservasi kursi.");
  return `https://wa.me/${num}?text=${text}`;
}

export function buildTelLink(config: SiteConfig): string {
  return `tel:+${config.contact.waNumber.replace(/\D/g, "")}`;
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}
