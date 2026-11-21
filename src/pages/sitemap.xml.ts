import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  if (!site) {
    const emptyXml = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      "<!-- Configurá SITE_URL (o site en astro.config.mjs) para generar URLs absolutas en el sitemap -->",
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>',
    ].join("\n");

    return new Response(`${emptyXml}\n`, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
      },
    });
  }

  const lastmod = new Date().toISOString().split("T")[0];
  const homeUrl = new URL("/", site).href;

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    "  <url>",
    `    <loc>${homeUrl}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    "  </url>",
    "</urlset>",
  ].join("\n");

  return new Response(`${xml}\n`, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
