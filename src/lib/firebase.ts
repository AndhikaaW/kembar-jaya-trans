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
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? "AIzaSyCYTcoCKERhNix7HUGsBwql27e7YnkCLvM",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? "kembar-trans.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "kembar-trans",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? "kembar-trans.firebasestorage.app",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? "224099575816",
    appId: import.meta.env.VITE_FIREBASE_APP_ID ?? "1:224099575816:web:c8ae13a34813fa25c4c9bd",
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
