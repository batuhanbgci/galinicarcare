import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { cpSync, existsSync } from 'node:fs';

const htmlPages = {
  main: resolve(import.meta.dirname, 'index.html'),
  galeri: resolve(import.meta.dirname, 'galeri.html'),
  boyaKoruma: resolve(import.meta.dirname, 'boya-koruma-uygulamalari.html'),
  detayliTemizlik: resolve(import.meta.dirname, 'detayli-temizlik.html'),
  ppfKaplama: resolve(import.meta.dirname, 'ppf-kaplama.html'),
  hakkimizda: resolve(import.meta.dirname, 'hakkimizda.html'),
  fiyatListesi: resolve(import.meta.dirname, 'fiyat-listesi.html'),
  iletisim: resolve(import.meta.dirname, 'iletisim.html'),
};

function galiniStaticAssetsPlugin() {
  return {
    name: 'galini-static-assets',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        let transformed = html;

        // Convert classic js/ script tags to ES modules automatically for Vite bundling
        // while keeping source HTML files 100% compatible with direct file:/// opening
        transformed = transformed.replace(
          /<script\s+src="(js\/[^"]+)"\s*><\/script>/gi,
          '<script type="module" src="./$1"></script>'
        );

        // In Vite dev server, allow ws:/wss: and inline dev client scripts for HMR
        if (ctx.server) {
          transformed = transformed.replace(
            /<meta\s+http-equiv="Content-Security-Policy"[^>]*>/i,
            '<meta http-equiv="Content-Security-Policy" content="default-src \'self\' \'unsafe-inline\' \'unsafe-eval\' data: blob: https: http: ws: wss:; frame-src https://www.google.com; form-action \'self\' https://wa.me;">'
          );
        }

        return transformed;
      },
    },
    closeBundle() {
      const outDir = resolve(import.meta.dirname, 'dist');
      const staticTargets = ['img', 'js', 'css', 'robots.txt', 'sitemap.xml', 'llms.txt', '_headers'];

      for (const item of staticTargets) {
        const src = resolve(import.meta.dirname, item);
        const dest = resolve(outDir, item);
        if (existsSync(src)) {
          cpSync(src, dest, { recursive: true, force: false });
        }
      }
    },
  };
}

export default defineConfig({
  appType: 'mpa',
  publicDir: false,
  server: {
    port: 5173,
    open: false,
  },
  preview: {
    port: 4173,
  },
  plugins: [galiniStaticAssetsPlugin()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsInlineLimit: 0,
    rollupOptions: {
      input: htmlPages,
    },
  },
});
