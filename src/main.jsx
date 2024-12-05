import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.jsx";

import Register from "./components/Register.jsx";
import AuthProvider from "./AuthProvider.jsx";
import LoggedIn from "./components/login/LoggedIn.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <div className="max-w-[1200px] mx-auto">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<LoggedIn />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  </AuthProvider>
);
