import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import League from "./pages/League";
import Nosotros from "./pages/Nosotros";

const BASE = import.meta.env.BASE_URL;            // p.ej. "/Raynu/"
const href = (hash) => `${BASE}#${hash}`;
const logoUrl = `${BASE}logo-raynu.png`;

function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50" style={{ backdropFilter: "saturate(120%) blur(10px)" }}>
      <div className="container" style={{ height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src={logoUrl} alt="Raynu" style={{ width: 36, height: 36, borderRadius: 10, objectFit: "cover" }} />
          <strong>RAYNU</strong>
        </Link>
        <nav style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a className="btn-outline" href={href("")}>Inicio</a>
          <a className="btn-outline" href={href("servicios")}>Servicios</a>
          <a className="btn-outline" href={href("nosotros")}>Nosotros</a>
          <a className="btn-primary" href={href("contacto")}>Contáctanos</a>
        </nav>
      </div>
      <div style={{ height: 1, background: "linear-gradient(90deg, rgba(0,229,255,.25), rgba(255,255,255,.08), rgba(255,59,92,.25))" }} />
    </header>
  );
}

function Footer() {
  return (
    <footer className="section-surface">
      <div className="container" style={{ color: "rgb(var(--text-1))" }}>
        © {new Date().getFullYear()} Raynu. All rights reserved.
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/league" element={<League />} />
          <Route path="*" element={<div className="section"><div className="container">Página no encontrada.</div></div>} />
          <Route path="/nosotros" element={<Nosotros />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
