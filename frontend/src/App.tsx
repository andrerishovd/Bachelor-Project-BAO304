/* import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg' */
import "./App.css";
import AppRouting from "./routing/AppRouting";
import { SidebarProvider } from "./contexts/SidebarContext";

/* App onion layer
In order to show some accessibility features on the authentication page, Sideprovider is the outer most layer

*/

function App() {
  return (
    <>
      <SidebarProvider>
        <AppRouting />
      </SidebarProvider>
    </>
  );
}

export default App;
