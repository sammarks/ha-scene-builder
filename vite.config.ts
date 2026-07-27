import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Builds the panel as a single ES module that Home Assistant loads directly.
 *
 * `panel_custom` points at one URL and expects it to define the custom element,
 * so there is no HTML document and no place for a chunk graph to live: React,
 * the app and the stylesheet all have to end up in that one file. The CSS
 * arrives as a string via `?inline` in entrypoint.tsx and is adopted into the
 * shadow root, so no stylesheet asset is emitted either.
 *
 * The output is committed to git, because HACS copies files out of the
 * repository and has no way to run a build.
 */
export default defineConfig(({ command }) => ({
  // `npm run dev` serves the harness in dev/, which mounts the real panel
  // element against a mock `hass`. The build ignores dev/ entirely.
  root: command === 'serve' ? 'dev' : undefined,
  plugins: [react()],
  server: {
    // Vite does not look at PORT on its own, and tooling that assigns a free
    // port expects it to be honoured.
    port: Number(process.env.PORT) || 5173,
  },
  // Library builds do not substitute this the way an app build does, which
  // leaves React reaching for `process` at runtime — undefined in a browser,
  // so the panel would throw before it rendered. Setting it explicitly also
  // drops React's development-only branches from the bundle.
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    outDir: 'custom_components/scene_builder/frontend',
    emptyOutDir: true,
    sourcemap: false,
    minify: 'esbuild',
    // Home Assistant supports evergreen browsers only, and so does this.
    target: 'es2022',
    lib: {
      entry: 'src/entrypoint.tsx',
      formats: ['es'],
      fileName: () => 'entrypoint.js',
    },
    rollupOptions: {
      output: {
        // A stable filename the integration can hardcode; cache busting is done
        // with a ?v= query carrying the integration version.
        inlineDynamicImports: true,
      },
    },
  },
}))
