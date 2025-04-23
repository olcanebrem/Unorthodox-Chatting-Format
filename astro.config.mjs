import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(), // React entegrasyonunu etkinleştir
    tailwind({
      config: { path: './src/styles/tailwind.config.ts' },
      // Tailwind yapılandırma dosyasının yolunu belirtir
      // 'applyBaseStyles: false' seçeneği, Astro'nun temel stilleriyle çakışmayı önlemek için eklenebilir.
      // config: { applyBaseStyles: false },
    }) // Tailwind entegrasyonunu etkinleştir
  ],
  // Proje src dizininizi belirtin (genellikle varsayılan olarak 'src' kullanılır)
  srcDir: './src',
  // Çıktı dizini vb. ayarlar buraya eklenebilir
  // outDir: './dist',
}); 