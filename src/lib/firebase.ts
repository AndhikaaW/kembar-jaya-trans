/**
 * Inisialisasi Firebase (web SDK).
 *
 * Firebase di-load secara lazy (dynamic import) sehingga kode Firebase hanya
 * ikut ter-bundle/diunduh jika konfigurasi env tersedia. Jika belum diisi,
 * seluruh fungsi mengembalikan `null` dan halaman memakai data default.
 */
import type { Firestore } from "firebase/firestore";

export function getFirebaseConfig() {
  return {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string | undefined,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string | undefined,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string | undefined,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string | undefined,
    appId: import.meta.env.VITE_FIREBASE_APP_ID as string | undefined,
  };
}

export function isFirebaseConfigured(): boolean {
  const cfg = getFirebaseConfig();
  return Boolean(cfg.apiKey && cfg.projectId);
}

let dbPromise: Promise<Firestore | null> | null = null;

export function getDb(): Promise<Firestore | null> {
  if (!isFirebaseConfigured()) return Promise.resolve(null);
  if (!dbPromise) {
    dbPromise = (async () => {
      const { initializeApp } = await import("firebase/app");
      const { getFirestore } = await import("firebase/firestore");
      const app = initializeApp(getFirebaseConfig());
      return getFirestore(app);
    })();
  }
  return dbPromise;
}
