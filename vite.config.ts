import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base so one build works from:
//   - GitHub Pages project sites (https://user.github.io/ha-scene-builder/)
//   - Home Assistant's /local/ folder (http://homeassistant.local:8123/local/scene-builder/)
//   - any plain static file server
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
