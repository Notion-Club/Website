// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// La landing est 100 % statique → output: 'static'.
// L'adapter Vercel reste configuré pour un déploiement direct sur Vercel.
// Si du SSR devient nécessaire, basculer `output` sur 'server'/'hybrid'.
import vercel from '@astrojs/vercel/static';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
  integrations: [
    // Tailwind buildé (JAMAIS le Play CDN). applyBaseStyles désactivé :
    // notre reset/base vit dans src/styles/global.css pour un contrôle total.
    tailwind({ applyBaseStyles: false }),
  ],
});
