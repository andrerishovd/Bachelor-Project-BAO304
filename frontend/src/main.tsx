import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "./i18n";
import {AuthProvider, msalInstance} from "./hooks/authProvider.tsx"

async function bootstrap() {
    await msalInstance.initialize();
    await msalInstance.handleRedirectPromise();

    createRoot(document.getElementById("root")!).render(
        <StrictMode>
            <AuthProvider>
                <App />
            </AuthProvider>
        </StrictMode>
    );
}

bootstrap();
