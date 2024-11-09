import React from "react";
import { createRoot } from 'react-dom/client';
import { App } from "./components/App.jsx";
import { LangProvider } from './langProvider';


const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
  <React.StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </React.StrictMode>
);
