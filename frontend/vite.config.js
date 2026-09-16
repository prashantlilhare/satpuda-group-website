import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        // React and the router change far less often than page code, so keep
        // them in their own long-lived chunk. (Vite 8 / Rolldown wants a fn.)
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (/[\\/]node_modules[\\/](react|react-dom|scheduler|react-router)/.test(id)) {
              return "vendor";
            }
          }
          return undefined;
        },
      },
    },
  },
});
