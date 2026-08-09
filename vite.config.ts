import { defineConfig } from "vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  // Static SPA untuk hosting GitHub Pages. Build output murni file statis.
  plugins: [
    TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
    viteReact(),
    tsconfigPaths(),
    tailwindcss(),
  ],
  base: process.env.VITE_BASE_PATH || "/",
});
