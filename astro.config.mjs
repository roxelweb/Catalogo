// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

const rawSiteUrl = process.env.SITE_URL?.trim();
const site = rawSiteUrl && /^https?:\/\//i.test(rawSiteUrl) ? rawSiteUrl : undefined;

// https://astro.build/config
export default defineConfig({
  ...(site ? { site } : {}),
  compressHTML: true,
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
