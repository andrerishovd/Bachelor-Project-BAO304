import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "./i18n";
import { AuthProvider, msalInstance } from "./contexts/AuthContext.tsx";
import { AlertProvider } from "./contexts/AlertContext.tsx";

async function bootstrap() {
  await msalInstance.initialize();

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <AlertProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </AlertProvider>
    </StrictMode>,
  );
}

bootstrap();
