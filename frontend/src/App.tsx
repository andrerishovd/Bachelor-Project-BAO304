/* import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg' */
import "./App.css";
import AppRouting from "./routing/AppRouting";
import { SidebarProvider } from "./contexts/SidebarContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ChatProvider } from "./contexts/ChatContext";
import { AlertProvider } from "./contexts/AlertContext";
import { FontSizeProvider } from "./contexts/FontSizeContext";

/**
 * App Component
 *
 * Root component that wraps the entire application with context providers.
 *
 * @provider-hierarchy
 * 1. ThemeProvider - Manages light/dark theme (outermost)
 * 2. SidebarProvider - Manages sidebar expand/collapse
 * 3. AppRouting - All routes and pages (innermost)
 *
 * @why-this-order
 * ThemeProvider must be outermost so theme is available on the login page.
 * SidebarProvider comes next, available to all authenticated pages.
 *
 * @usage
 * // Access theme anywhere:
 * const { theme, toggleTheme } = useThemeContext();
 *
 * // Access sidebar anywhere:
 * const { isExtended, toggleSidebar } = useSidebar();
 */

function App() {
  return (
    <>
      <ThemeProvider>
        <FontSizeProvider>
          <AlertProvider>
            <SidebarProvider>
              <ChatProvider>
                <AppRouting />
              </ChatProvider>
            </SidebarProvider>
          </AlertProvider>
        </FontSizeProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
