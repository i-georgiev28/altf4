import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import Landing from "./pages/Landing.tsx";
import App from "./pages/App.tsx";
import Field from "./pages/Field.tsx";
// import Profile from "./pages/Profile.tsx";
import {LogIn} from "./pages/LogIn";

import "@/styles/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route index element={<Landing />} />
      <Route path="field">
        <Route index element={<App />} />
        <Route path=":field" element={<Field />} />
      </Route>
      <Route path="profile">
      <Route index element={<LogIn />} />
      </Route>
    </Routes>
    </BrowserRouter>
  </StrictMode>
);
