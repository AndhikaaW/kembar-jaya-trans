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
} from "lucide-react";
import heroArmada from "@/assets/hero-armada.jpg";

/**
 * Landing Page Kembar Trans — Tier 1 (statis, tanpa backend).
 *
 * CARA EDIT CEPAT:
 * - Nomor kontak: ubah konstanta PHONE / WA_NUMBER di bawah.
 * - Jadwal keberangkatan: ubah array SCHEDULES.
 * - Keunggulan layanan: ubah array FEATURES.
 * - Testimoni: ubah array TESTIMONIALS (ganti dengan testimoni asli).
 */

const PHONE_DISPLAY = "0818-0339-2334";
const PHONE_TEL = "+6281803392334";
const WA_NUMBER = "6281803392334";
const WA_TEXT = encodeURIComponent(
  "Halo Kembar Trans, saya ingin reservasi kursi. Boleh info jadwal dan harganya?",
);
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`;

const NAV = [
  { label: "Keunggulan", href: "#keunggulan" },
  { label: "Jadwal", href: "#jadwal" },
  { label: "Rute", href: "#rute" },
  { label: "Testimoni", href: "#testimoni" },
];

const FEATURES = [
  {
    icon: CarFront,
    title: "Antar-Jemput Alamat",
    desc: "Dijemput dan diantar sampai titik alamat dalam area layanan Pacitan & Solo. Tidak perlu ke terminal.",
  },
  {
    icon: Clock,
    title: "Jadwal Rutin Setiap Hari",
    desc: "Keberangkatan tetap pagi dan sore, berangkat tepat waktu sehingga rencana perjalanan Anda pasti.",
  },
  {
    icon: ShieldCheck,
    title: "Aman & Nyaman",
    desc: "Armada terawat, sopir berpengalaman menguasai rute pegunungan, kabin ber-AC dan lega.",
  },
];

const SCHEDULES = [
  {
    from: "Pacitan",
    to: "Solo",
    time: "09.00",
    note: "Penjemputan mulai 07.30 WIB di area Pacitan",
  },
  {
    from: "Solo",
    to: "Pacitan",
    time: "16.00",
    note: "Penjemputan mulai 14.30 WIB di area Solo",
  },
];

const ROUTE_POINTS = [
  "Pacitan",
  "Punung",
  "Pracimantoro",
  "Wonogiri",
  "Sukoharjo",
  "Solo",
];

const TESTIMONIALS = [
  {
    name: "Rina W.",
    origin: "Pacitan",
    text: "Sudah langganan tiap bulan pulang kampung. Dijemput depan rumah, sopirnya ramah dan berangkatnya tepat waktu.",
  },
  {
    name: "Bagus P.",
    origin: "Solo",
    text: "Pesan lewat WhatsApp sore, besok paginya sudah dapat kursi. Mobilnya bersih dan perjalanannya nyaman.",
  },
  {
    name: "Hendra S.",
    origin: "Wonogiri",
    text: "Sering nitip paket dokumen ke Solo lewat Kembar Trans. Cepat sampai dan selalu dikabari.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kembar Trans — Travel Pacitan–Solo Antar-Jemput Setiap Hari" },
      {
        name: "description",
        content:
          "Travel shuttle Pacitan–Solo dengan layanan antar-jemput alamat. Berangkat setiap hari 09.00 & 16.00 WIB. Reservasi cepat via WhatsApp 0818-0339-2334.",
      },
      {
        property: "og:title",
        content: "Kembar Trans — Travel Pacitan–Solo Antar-Jemput Setiap Hari",
      },
      {
        property: "og:description",
        content:
          "Travel shuttle Pacitan–Solo dengan layanan antar-jemput alamat. Berangkat setiap hari 09.00 & 16.00 WIB. Reservasi cepat via WhatsApp 0818-0339-2334.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Kembar Trans",
          description:
            "Layanan travel shuttle antar-kota rute Pacitan–Solo dengan antar-jemput alamat.",
          telephone: PHONE_TEL,
          areaServed: ["Pacitan", "Solo"],
          openingHours: "Mo-Su 07:00-20:00",
        }),
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Features />
        <Schedule />
        <RouteSection />
        <Testimonials />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2.5">
      <span className="grid size-9 place-items-center rounded-lg bg-brand-gradient text-brand-foreground">
        <CarFront className="size-5" aria-hidden="true" />
      </span>
      <span className="leading-tight">
        <span className="block font-display text-base font-extrabold tracking-tight">
          KEMBAR TRANS
        </span>
        <span className="block text-[11px] font-medium tracking-wide text-muted-foreground">
          Pacitan — Solo
        </span>
      </span>
    </a>
  );
}

function Header() {
  return (
    <header
      id="top"
      className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />
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
          href={`tel:${PHONE_TEL}`}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Phone className="size-4" aria-hidden="true" />
          <span className="hidden sm:inline">{PHONE_DISPLAY}</span>
          <span className="sm:hidden">Telepon</span>
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-gradient text-brand-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent-foreground">
            Travel Resmi Pacitan — Solo
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
            Perjalanan Pacitan–Solo, Nyaman Sampai Depan Rumah
          </h1>
          <p className="mt-5 max-w-xl text-base/relaxed opacity-90 sm:text-lg/relaxed">
            Kembar Trans melayani antar-jemput alamat setiap hari dengan jadwal
            tetap pagi dan sore. Cukup satu pesan WhatsApp, kursi Anda siap.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-base font-bold text-accent-foreground shadow-float transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="size-5" aria-hidden="true" />
              Reservasi via WhatsApp
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-current/40 px-6 py-3.5 text-base font-semibold transition-colors hover:bg-brand-foreground/10"
            >
              <Phone className="size-5" aria-hidden="true" />
              Telepon {PHONE_DISPLAY}
            </a>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-current/20 pt-6 text-sm">
            <div>
              <dt className="opacity-80">Pacitan → Solo</dt>
              <dd className="font-display text-xl font-bold">09.00</dd>
            </div>
            <div>
              <dt className="opacity-80">Solo → Pacitan</dt>
              <dd className="font-display text-xl font-bold">16.00</dd>
            </div>
            <div>
              <dt className="opacity-80">Estimasi</dt>
              <dd className="font-display text-xl font-bold">±3,5 jam</dd>
            </div>
          </dl>
        </div>

        <div className="relative">
          <img
            src={heroArmada}
            alt="Armada minibus Kembar Trans di jalur pegunungan rute Pacitan–Solo"
            width={1600}
            height={1000}
            className="w-full rounded-2xl object-cover shadow-float"
          />
          <p className="mt-2 text-center text-xs opacity-70">
            *Foto ilustrasi — akan diganti foto armada asli
          </p>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
        {eyebrow}
      </span>
      <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {desc ? <p className="mt-3 text-muted-foreground">{desc}</p> : null}
    </div>
  );
}

function Features() {
  return (
    <section id="keunggulan" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      <SectionHeading
        eyebrow="Keunggulan"
        title="Kenapa Memilih Kembar Trans?"
        desc="Tiga hal yang membuat pelanggan kami kembali lagi setiap perjalanan."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {FEATURES.map((f) => (
          <article
            key={f.title}
            className="rounded-2xl border border-border bg-card p-7 shadow-card transition-transform hover:-translate-y-1"
          >
            <span className="grid size-12 place-items-center rounded-xl bg-secondary text-primary">
              <f.icon className="size-6" aria-hidden="true" />
            </span>
            <h3 className="mt-5 font-display text-lg font-bold">{f.title}</h3>
            <p className="mt-2 text-sm/relaxed text-muted-foreground">{f.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Schedule() {
  return (
    <section id="jadwal" className="bg-secondary/60 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Jadwal"
          title="Jadwal Keberangkatan Harian"
          desc="Berangkat setiap hari. Disarankan reservasi H-1 karena kursi terbatas."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {SCHEDULES.map((s) => (
            <article
              key={`${s.from}-${s.to}`}
              className="rounded-2xl border border-border bg-card p-7 shadow-card"
            >
              <div className="flex items-center gap-3 font-display text-xl font-bold">
                <span>{s.from}</span>
                <ArrowRight className="size-5 text-primary" aria-hidden="true" />
                <span>{s.to}</span>
              </div>
              <p className="mt-6 font-display text-5xl font-extrabold tracking-tight text-primary">
                {s.time}
                <span className="ml-2 text-base font-semibold text-muted-foreground">WIB</span>
              </p>
              <p className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
                <Clock className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                {s.note}
              </p>
              <a
                href={WA_LINK}
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
          Jadwal dapat menyesuaikan kondisi lalu lintas. Konfirmasi akhir diberikan
          admin saat reservasi.
        </p>
      </div>
    </section>
  );
}

function RouteSection() {
  return (
    <section id="rute" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      <SectionHeading
        eyebrow="Rute"
        title="Rute & Estimasi Waktu Tempuh"
        desc="Jalur utama Pacitan–Solo melewati titik-titik berikut, dengan estimasi 3–4 jam perjalanan."
      />
      <ol className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ROUTE_POINTS.map((point, i) => (
          <li
            key={point}
            className="flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-4 shadow-card"
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              {i + 1}
            </span>
            <span className="font-semibold">{point}</span>
            <MapPin className="ml-auto size-4 text-muted-foreground" aria-hidden="true" />
          </li>
        ))}
      </ol>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <h3 className="flex items-center gap-2 font-display font-bold">
            <Clock className="size-5 text-primary" aria-hidden="true" />
            Estimasi ±3,5 jam
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Waktu tempuh normal dari titik jemput hingga titik antar, di luar waktu
            penjemputan penumpang lain.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <h3 className="flex items-center gap-2 font-display font-bold">
            <Package className="size-5 text-primary" aria-hidden="true" />
            Layanan Titip Barang
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Kirim dokumen atau paket kecil Pacitan–Solo mengikuti jadwal keberangkatan
            harian. Hubungi admin untuk ketentuan.
          </p>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="testimoni" className="bg-secondary/60 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Testimoni"
          title="Kata Penumpang Kami"
          desc="Contoh testimoni — akan diganti dengan ulasan asli pelanggan."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-card"
            >
              <div className="flex gap-1 text-accent" aria-label="Penilaian 5 dari 5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" aria-hidden="true" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm/relaxed text-muted-foreground">
                “{t.text}”
              </blockquote>
              <figcaption className="mt-5 font-semibold">
                {t.name}
                <span className="block text-xs font-normal text-muted-foreground">
                  Penumpang asal {t.origin}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      <div className="rounded-3xl bg-brand-gradient px-6 py-14 text-center text-brand-foreground shadow-float sm:px-12">
        <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          Siap Berangkat Bersama Kembar Trans?
        </h2>
        <p className="mx-auto mt-4 max-w-xl opacity-90">
          Hubungi admin kami sekarang untuk cek ketersediaan kursi hari ini maupun
          untuk jadwal berikutnya.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-base font-bold text-accent-foreground transition-transform hover:-translate-y-0.5"
          >
            <MessageCircle className="size-5" aria-hidden="true" />
            Chat WhatsApp
          </a>
          <a
            href={`tel:${PHONE_TEL}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-current/40 px-6 py-3.5 text-base font-semibold transition-colors hover:bg-brand-foreground/10"
          >
            <Phone className="size-5" aria-hidden="true" />
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Layanan travel antar-kota rute Pacitan–Solo dengan sistem antar-jemput
            alamat, berangkat setiap hari.
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
                href={`tel:${PHONE_TEL}`}
                className="inline-flex items-center gap-2 font-semibold text-primary hover:underline"
              >
                <Phone className="size-4" aria-hidden="true" />
                {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-primary hover:underline"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                WhatsApp Admin
              </a>
            </li>
            <li className="text-muted-foreground">Jam layanan: 07.00 – 20.00 WIB</li>
            <li className="flex items-start gap-2 text-muted-foreground">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>
                Titik jemput: Pacitan – Solo PP (antar-jemput alamat).
                <br />
                {/* TODO: ganti alamat dummy di bawah dengan alamat kantor asli */}
                Kantor: Jl. Contoh No. 1, Pacitan (alamat sementara)
              </span>
            </li>

          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Kembar Trans. Seluruh hak cipta dilindungi.
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={WA_LINK}
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
