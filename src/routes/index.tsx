import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Phone,
  MessageCircle,
  Clock,
  ShieldCheck,
  CarFront,
  MapPin,
  Star,
  ArrowRight,
  Package,
  Wallet,
  Users,
  Wifi,
  Headset,
  type LucideIcon,
} from "lucide-react";

import {
  useSiteData,
  buildWaLink,
  buildTelLink,
  formatPrice,
  type SiteConfig,
  type Feature,
  type Schedule,
  type RoutePoint,
  type PickupPoint,
  type PriceItem,
  type Service,
  type GalleryItem,
  type Testimonial,
  type IconKey,
} from "@/lib/site-data";

/**
 * Landing Page Kembar Trans — konten dinamis dari Firebase Firestore.
 * Jika Firebase belum dikonfigurasi, otomatis memakai data default
 * (lihat src/lib/site-data.ts).
 */

const ICON_MAP: Record<IconKey, LucideIcon> = {
  CarFront,
  Clock,
  ShieldCheck,
  MapPin,
  Package,
  Wallet,
  Users,
  Wifi,
  Headset,
};

const NAV = [
  { label: "Keunggulan", href: "#keunggulan" },
  { label: "Layanan", href: "#layanan" },
  { label: "Jadwal", href: "#jadwal" },
  { label: "Harga", href: "#harga" },
  { label: "Rute", href: "#rute" },
  { label: "Testimoni", href: "#testimoni" },
];

export const Route = createFileRoute("/")({
  component: LandingPage,
});

const DEFAULT_TITLE = "Kembar Trans — Travel Pacitan–Solo Antar-Jemput Setiap Hari";
const DEFAULT_DESC =
  "Travel shuttle Pacitan–Solo dengan layanan antar-jemput alamat. Berangkat setiap hari 09.00 & 16.00 WIB. Reservasi cepat via WhatsApp 0818-0339-2334.";

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Menerapkan nilai SEO dari siteConfig ke <title>/meta (judul, deskripsi,
 * og:image, canonical). dipanggil setiap config berubah.
 */
function applySeo(config: SiteConfig) {
  const seo = config.seo;
  const title = seo.title?.trim() || DEFAULT_TITLE;
  const description = seo.description?.trim() || DEFAULT_DESC;

  document.title = title;
  setMeta("name", "description", description);
  setMeta("property", "og:title", title);
  setMeta("property", "og:description", description);

  // og:image harus URL absolut (data-URI/base64 tidak bisa dibaca crawler).
  const ogImage = seo.ogImageUrl?.trim();
  if (ogImage && /^https?:\/\//.test(ogImage)) {
    setMeta("property", "og:image", ogImage);
  } else {
    setMeta(
      "property",
      "og:image",
      new URL("og-image.jpg", window.location.origin + import.meta.env.BASE_URL).href,
    );
  }

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = new URL(import.meta.env.BASE_URL, window.location.origin).href;
}

function LandingPage() {
  const data = useSiteData();
  const { config } = data;
  const waLink = buildWaLink(config);
  const telLink = buildTelLink(config);

  useEffect(() => {
    applySeo(config);
  }, [config]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header config={config} waLink={waLink} telLink={telLink} />
      <main>
        <Hero config={config} schedules={data.schedules} waLink={waLink} telLink={telLink} />
        <Features features={data.features} />
        <Services services={data.services} />
        <Schedule schedules={data.schedules} waLink={waLink} />
        <Prices prices={data.prices} waLink={waLink} />
        <RouteSection routes={data.routes} config={config} />
        <PickupPoints points={data.pickupPoints} />
        <Gallery gallery={data.gallery} />
        <Testimonials testimonials={data.testimonials} />
        <FinalCta config={config} waLink={waLink} telLink={telLink} />
      </main>
      <Footer config={config} waLink={waLink} telLink={telLink} />
      <FloatingWhatsApp waLink={waLink} />
    </div>
  );
}

function Logo({ config }: { config: SiteConfig }) {
  return (
    <a href="#top" className="flex items-center gap-2.5">
      <span className="grid size-9 place-items-center overflow-hidden rounded-lg bg-brand-gradient text-brand-foreground">
        {config.brand.logoUrl ? (
          <img src={config.brand.logoUrl} alt={config.brand.name} className="size-9 object-cover" />
        ) : (
          <CarFront className="size-5" aria-hidden="true" />
        )}
      </span>
      <span className="leading-tight">
        <span className="block font-display text-base font-extrabold tracking-tight">
          {config.brand.name}
        </span>
        <span className="block text-[11px] font-medium tracking-wide text-muted-foreground">
          {config.brand.tagline}
        </span>
      </span>
    </a>
  );
}

function Header({
  config,
  waLink,
  telLink,
}: {
  config: SiteConfig;
  waLink: string;
  telLink: string;
}) {
  return (
    <header
      id="top"
      className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo config={config} />
        <nav className="hidden items-center gap-7 md:flex" aria-label="Navigasi utama">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href={telLink}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Phone className="size-4" aria-hidden="true" />
          <span className="hidden sm:inline">{config.contact.phoneDisplay}</span>
          <span className="sm:hidden">Telepon</span>
        </a>
      </div>
    </header>
  );
}

function Hero({
  config,
  schedules,
  waLink,
  telLink,
}: {
  config: SiteConfig;
  schedules: Schedule[];
  waLink: string;
  telLink: string;
}) {
  return (
    <section className="relative overflow-hidden bg-brand-gradient text-brand-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent-foreground">
            Travel Resmi {config.brand.tagline}
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
            {config.brand.heroTitle}
          </h1>
          <p className="mt-5 max-w-xl text-base/relaxed opacity-90 sm:text-lg/relaxed">
            {config.brand.heroSubtitle}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-base font-bold text-accent-foreground shadow-float transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="size-5" aria-hidden="true" />
              Reservasi via WhatsApp
            </a>
            <a
              href={telLink}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-current/40 px-6 py-3.5 text-base font-semibold transition-colors hover:bg-brand-foreground/10"
            >
              <Phone className="size-5" aria-hidden="true" />
              Telepon {config.contact.phoneDisplay}
            </a>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-current/20 pt-6 text-sm">
            {schedules.slice(0, 2).map((s) => (
              <div key={`${s.from}-${s.to}`}>
                <dt className="opacity-80">
                  {s.from} → {s.to}
                </dt>
                <dd className="font-display text-xl font-bold">{s.time}</dd>
              </div>
            ))}
            <div>
              <dt className="opacity-80">Estimasi</dt>
              <dd className="font-display text-xl font-bold">{config.travelTime.durationText}</dd>
            </div>
          </dl>
        </div>

        <div className="relative">
          <img
            src={config.hero.imageUrl}
            alt="Armada minibus Kembar Trans di jalur rute Pacitan–Solo"
            width={1600}
            height={1000}
            className="w-full rounded-2xl object-cover shadow-float"
            loading="lazy"
          />
          {config.hero.imageCaption ? (
            <p className="mt-2 text-center text-xs opacity-70">{config.hero.imageCaption}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{eyebrow}</span>
      <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {desc ? <p className="mt-3 text-muted-foreground">{desc}</p> : null}
    </div>
  );
}

function Features({ features }: { features: Feature[] }) {
  if (features.length === 0) return null;
  return (
    <section id="keunggulan" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      <SectionHeading
        eyebrow="Keunggulan"
        title="Kenapa Memilih Kembar Trans?"
        desc="Tiga hal yang membuat pelanggan kami kembali lagi setiap perjalanan."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {features.map((f) => {
          const Icon = ICON_MAP[f.icon] ?? CarFront;
          return (
            <article
              key={f.title}
              className="rounded-2xl border border-border bg-card p-7 shadow-card transition-transform hover:-translate-y-1"
            >
              <span className="grid size-12 place-items-center rounded-xl bg-secondary text-primary">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm/relaxed text-muted-foreground">{f.desc}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Services({ services }: { services: Service[] }) {
  if (services.length === 0) return null;
  return (
    <section id="layanan" className="bg-secondary/60 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Layanan"
          title="Layanan Kami"
          desc="Berbagai layanan yang bisa Anda manfaatkan bersama Kembar Trans."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((s) => {
            const Icon = ICON_MAP[s.icon] ?? Package;
            return (
              <article
                key={s.title}
                className="flex flex-col rounded-2xl border border-border bg-card p-7 shadow-card"
              >
                <span className="grid size-12 place-items-center rounded-xl bg-secondary text-primary">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm/relaxed text-muted-foreground">{s.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Schedule({ schedules, waLink }: { schedules: Schedule[]; waLink: string }) {
  if (schedules.length === 0) return null;
  return (
    <section id="jadwal" className="py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Jadwal"
          title="Jadwal Keberangkatan Harian"
          desc="Berangkat setiap hari. Disarankan reservasi H-1 karena kursi terbatas."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {schedules.map((s) => (
            <article
              key={`${s.from}-${s.to}-${s.time}`}
              className="rounded-2xl border border-border bg-card p-7 shadow-card"
            >
              <div className="flex items-center gap-3 font-display text-xl font-bold">
                <span>{s.from}</span>
                <ArrowRight className="size-5 text-primary" aria-hidden="true" />
                <span>{s.to}</span>
              </div>
              <p className="mt-6 font-display text-5xl font-extrabold tracking-tight text-primary">
                {s.time}
                <span className="ml-2 text-base font-semibold text-muted-foreground">
                  {s.timezone}
                </span>
              </p>
              <p className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
                <Clock className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                {s.note}
              </p>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
              >
                Pesan kursi jadwal ini
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Jadwal dapat menyesuaikan kondisi lalu lintas. Konfirmasi akhir diberikan admin saat
          reservasi.
        </p>
      </div>
    </section>
  );
}

function Prices({ prices, waLink }: { prices: PriceItem[]; waLink: string }) {
  if (prices.length === 0) return null;
  return (
    <section id="harga" className="bg-secondary/60 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Harga"
          title="Etalase Harga"
          desc="Tarif perjalanan & layanan Kembar Trans. Hubungi admin untuk detail."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {prices.map((p) => (
            <article
              key={p.name}
              className="flex flex-col rounded-2xl border border-border bg-card p-7 shadow-card"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-lg font-bold">{p.name}</h3>
                  {p.unit ? (
                    <p className="mt-1 text-xs font-medium text-muted-foreground">{p.unit}</p>
                  ) : null}
                </div>
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
                  <Wallet className="size-5" aria-hidden="true" />
                </span>
              </div>
              <p className="mt-6 font-display text-3xl font-extrabold tracking-tight text-primary">
                {formatPrice(p.price)}
              </p>
              {p.desc ? (
                <p className="mt-3 text-sm/relaxed text-muted-foreground">{p.desc}</p>
              ) : null}
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
              >
                Tanya ketersediaan
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function RouteSection({ routes, config }: { routes: RoutePoint[]; config: SiteConfig }) {
  if (routes.length === 0) return null;
  return (
    <section id="rute" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      <SectionHeading
        eyebrow="Rute"
        title="Rute & Estimasi Waktu Tempuh"
        desc="Jalur utama Pacitan–Solo melewati titik-titik berikut."
      />
      <ol className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {routes.map((point, i) => (
          <li
            key={point.name}
            className="flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-4 shadow-card"
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              {i + 1}
            </span>
            <span className="font-semibold">{point.name}</span>
            <MapPin className="ml-auto size-4 text-muted-foreground" aria-hidden="true" />
          </li>
        ))}
      </ol>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <h3 className="flex items-center gap-2 font-display font-bold">
            <Clock className="size-5 text-primary" aria-hidden="true" />
            Estimasi {config.travelTime.durationText}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">{config.travelTime.note}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <h3 className="flex items-center gap-2 font-display font-bold">
            <Package className="size-5 text-primary" aria-hidden="true" />
            Layanan Titip Barang
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Kirim dokumen atau paket kecil Pacitan–Solo mengikuti jadwal keberangkatan harian.
            Hubungi admin untuk ketentuan.
          </p>
        </div>
      </div>
    </section>
  );
}

function PickupPoints({ points }: { points: PickupPoint[] }) {
  if (points.length === 0) return null;
  return (
    <section id="titik-jemput" className="bg-secondary/60 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Titik Penjemputan"
          title="Titik-Titik Penjemputan"
          desc="Kami menjemput Anda dari titik yang paling mudah dijangkau."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {points.map((pt) => (
            <article
              key={pt.name}
              className="rounded-2xl border border-border bg-card p-7 shadow-card"
            >
              <span className="grid size-12 place-items-center rounded-xl bg-secondary text-primary">
                <MapPin className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold">{pt.name}</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-primary">
                {pt.area}
              </p>
              {pt.desc ? (
                <p className="mt-3 text-sm/relaxed text-muted-foreground">{pt.desc}</p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery({ gallery }: { gallery: GalleryItem[] }) {
  const items = gallery.filter((g) => g.imageUrl);
  if (items.length === 0) return null;
  return (
    <section id="galeri" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      <SectionHeading
        eyebrow="Galeri"
        title="Produk & Layanan Kami"
        desc="Dokumentasi armada dan layanan Kembar Trans."
      />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((g) => (
          <figure
            key={g.imageUrl}
            className="overflow-hidden rounded-2xl border border-border bg-card shadow-card"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={g.imageUrl}
                alt={g.title || "Galeri Kembar Trans"}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
            </div>
            <figcaption className="p-5">
              <h3 className="font-display text-base font-bold">{g.title}</h3>
              {g.caption ? <p className="mt-1 text-sm text-muted-foreground">{g.caption}</p> : null}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;
  return (
    <section id="testimoni" className="bg-secondary/60 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Testimoni"
          title="Kata Penumpang Kami"
          desc="Ulasan langsung dari penumpang setia Kembar Trans."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={`${t.name}-${t.origin}`}
              className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-card"
            >
              <div className="flex gap-1 text-accent" aria-label={`Penilaian ${t.rating} dari 5`}>
                {Array.from({ length: Math.min(t.rating, 5) }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" aria-hidden="true" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm/relaxed text-muted-foreground">
                “{t.text}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 font-semibold">
                {t.imageUrl ? (
                  <img
                    src={t.imageUrl}
                    alt={`Foto ${t.name}`}
                    className="size-10 rounded-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <span className="grid size-10 place-items-center rounded-full bg-secondary text-sm font-bold text-primary">
                    {t.name.charAt(0).toUpperCase()}
                  </span>
                )}
                <span>
                  {t.name}
                  <span className="block text-xs font-normal text-muted-foreground">
                    Penumpang asal {t.origin}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta({
  config,
  waLink,
  telLink,
}: {
  config: SiteConfig;
  waLink: string;
  telLink: string;
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      <div className="rounded-3xl bg-brand-gradient px-6 py-14 text-center text-brand-foreground shadow-float sm:px-12">
        <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          Siap Berangkat Bersama {config.brand.name}?
        </h2>
        <p className="mx-auto mt-4 max-w-xl opacity-90">
          Hubungi admin kami sekarang untuk cek ketersediaan kursi hari ini maupun untuk jadwal
          berikutnya.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-base font-bold text-accent-foreground transition-transform hover:-translate-y-0.5"
          >
            <MessageCircle className="size-5" aria-hidden="true" />
            Chat WhatsApp
          </a>
          <a
            href={telLink}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-current/40 px-6 py-3.5 text-base font-semibold transition-colors hover:bg-brand-foreground/10"
          >
            <Phone className="size-5" aria-hidden="true" />
            {config.contact.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer({
  config,
  waLink,
  telLink,
}: {
  config: SiteConfig;
  waLink: string;
  telLink: string;
}) {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <Logo config={config} />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Layanan travel antar-kota rute {config.brand.tagline} dengan sistem antar-jemput alamat,
            berangkat setiap hari.
          </p>
        </div>
        <nav aria-label="Navigasi footer">
          <h3 className="font-display font-bold">Halaman</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors hover:text-primary">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h3 className="font-display font-bold">Kontak & Reservasi</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={telLink}
                className="inline-flex items-center gap-2 font-semibold text-primary hover:underline"
              >
                <Phone className="size-4" aria-hidden="true" />
                {config.contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-primary hover:underline"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                WhatsApp Admin
              </a>
            </li>
            <li className="text-muted-foreground">Jam layanan: {config.contact.serviceHours}</li>
            <li className="flex items-start gap-2 text-muted-foreground">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>
                Titik jemput: {config.brand.tagline} PP (antar-jemput alamat).
                <br />
                Kantor: {config.address.text}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {config.brand.name}. Seluruh hak cipta dilindungi.
      </div>
    </footer>
  );
}

function FloatingWhatsApp({ waLink }: { waLink: string }) {
  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp Kembar Trans"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-3.5 font-bold text-brand-foreground shadow-float transition-transform hover:scale-105"
    >
      <MessageCircle className="size-5" aria-hidden="true" />
      <span className="hidden sm:inline">Reservasi</span>
    </a>
  );
}
