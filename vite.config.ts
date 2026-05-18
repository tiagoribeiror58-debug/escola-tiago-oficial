import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { sentryVitePlugin } from "@sentry/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(), 
    mode === "development" && componentTagger(),
    sentryVitePlugin({
      org: "tiagorbs", // Altere se o nome da sua organização no Sentry for diferente
      project: "react", // Altere para o 'Project slug' real (ex: escola-tiago-web)
      authToken: process.env.SENTRY_AUTH_TOKEN,
    })
  ].filter(Boolean),
  build: {
    sourcemap: true, // Exigido para o Sentry ler os arquivos originais
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));
