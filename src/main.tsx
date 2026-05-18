import { createRoot } from "react-dom/client";
import * as Sentry from "@sentry/react";
import App from "./App.tsx";
import "./index.css";

// Inicializa o Sentry de forma segura usando variáveis de ambiente do Vite
const sentryDsn = import.meta.env.VITE_SENTRY_DSN;

if (sentryDsn) {
  Sentry.init({
    dsn: sentryDsn,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    // Medição de performance otimizada: captura 100% no local e 20% em produção
    tracesSampleRate: import.meta.env.DEV ? 1.0 : 0.2,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
} else {
  console.warn("[Sentry] VITE_SENTRY_DSN não configurado no arquivo .env. Monitoramento inativo.");
}

// O ErrorBoundary intercepta falhas graves no React e exibe uma tela amigável
// ao invés de uma tela branca, além de garantir o envio pro Sentry.
const fallbackUI = (
  <div style={{ padding: "2rem", textAlign: "center", fontFamily: "sans-serif" }}>
    <h2>Ops! A plataforma teve um problema inesperado.</h2>
    <p>Nossa equipe técnica já foi notificada. Por favor, recarregue a página.</p>
    <button onClick={() => window.location.reload()} style={{ padding: "0.5rem 1rem", marginTop: "1rem", cursor: "pointer" }}>
      Recarregar Página
    </button>
  </div>
);

createRoot(document.getElementById("root")!).render(
  <Sentry.ErrorBoundary fallback={fallbackUI} showDialog>
    <App />
  </Sentry.ErrorBoundary>
);
