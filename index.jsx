import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, ArrowRight, HeartHandshake, Users, Calendar, Mail, MapPin, Instagram, Twitter, Youtube, Globe, Trophy, Search } from "lucide-react";

// NOTES
// - Replace placeholder images with your own assets (logos, photos) by updating the src URLs.
// - Colors are set via Tailwind utility classes. Adjust the color scheme in the "brand" object.
// - This is a single-file, responsive landing page suitable for a small organization.
// - Sections: Hero, About, Programs, Impact Stats, Events, Gallery, Team, Partners, CTA, Contact, Footer.
// - Designed to feel like a clean, modern NGO/community site (adaptado a gaming).

const brand = {
  name: "Raynu",
  tagline: "Ligas y eventos de videojuegos en comunidad",
  primary: "#0ea5e9", // sky-500
  secondary: "#22c55e", // green-500
  dark: "#0b1220",
  light: "#ffffff",
};

const navItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Raynu League", href: "#league" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Programas", href: "#programas" },
  { label: "Eventos", href: "#eventos" },
  { label: "Equipo", href: "#equipo" },
  { label: "Contacto", href: "#contacto" },
];

const programs = [
  {
    title: "Educación y Mentoría",
    icon: <Users className="w-6 h-6" aria-hidden />,
    desc: "Talleres y acompañamiento para potenciar habilidades académicas y personales.",
  },
  {
    title: "Salud y Bienestar",
    icon: <HeartHandshake className="w-6 h-6" aria-hidden />,
    desc: "Actividades de salud mental, nutrición y deporte para una vida integral.",
  },
  {
    title: "Red de Voluntariado",
    icon: <Globe className="w-6 h-6" aria-hidden />,
    desc: "Conecta con causas locales y participa en proyectos de alto impacto.",
  },
];

const stats = [
  { label: "Voluntarios", value: "+250" },
  { label: "Beneficiarios", value: "+3,500" },
  { label: "Proyectos", value: "42" },
  { label: "Alianzas", value: "18" },
];

const events = [
  { date: "12 OCT", title: "Feria de Oportunidades", location: "Centro Comunal Raynu" },
  { date: "26 OCT", title: "Jornada de Mentoría", location: "Colegio San Lucas" },
  { date: "09 NOV", title: "Raynu Talks: Educación 360°", location: "Auditorio Municipal" },
];

const team = [
  {
    name: "Amalia Rojas",
    role: "Dirección Ejecutiva",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Nicolás Vega",
    role: "Programas y Proyectos",
    img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Lucía Campos",
    role: "Comunidad y Alianzas",
    img: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=800&auto=format&fit=crop",
  },
];

const partners = [
  { name: "Kuntur", img: "https://dummyimage.com/120x48/0b1220/fff&text=Kuntur" },
  { name: "Sumak", img: "https://dummyimage.com/120x48/0b1220/fff&text=Sumak" },
  { name: "Wayra", img: "https://dummyimage.com/120x48/0b1220/fff&text=Wayra" },
  { name: "Muyu", img: "https://dummyimage.com/120x48/0b1220/fff&text=Muyu" },
];

const gallery = [
  "https://images.unsplash.com/photo-1520975940468-d2a62d055742?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515165562835-c3b8c0dfb9f0?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1593113598332-cd2a89b2edee?q=80&w=1200&auto=format&fit=crop",
];

function Container({ children }) {
  return <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>;
}

function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      {eyebrow && (
        <span className="inline-block uppercase tracking-widest text-sm text-sky-500 font-semibold mb-2">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">{title}</h2>
      {subtitle && <p className="text-slate-600">{subtitle}</p>}
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-white/70 border-b border-slate-200">
      <Container>
        <div className="flex items-center justify-between h-16">
          <a href="#inicio" className="flex items-center gap-2">
            {/* Replace with your logo */}
            <div className="w-9 h-9 rounded-xl bg-sky-500" />
            <span className="font-bold text-slate-900 text-lg">{brand.name}</span>
          </a>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-slate-700 hover:text-slate-900">
                {item.label}
              </a>
            ))}
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-sky-500 text-white font-medium hover:opacity-90"
            >
              Únete <ArrowRight className="w-4 h-4" />
            </a>
          </nav>
          <button
            className="md:hidden rounded-xl p-2 border border-slate-200"
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menú"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {open && (
          <div className="md:hidden pb-4 animate-in fade-in slide-in-from-top-2">
            <div className="grid gap-2">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="px-3 py-2 rounded-lg hover:bg-slate-100">
                  {item.label}
                </a>
              ))}
              <a href="#contacto" className="px-3 py-2 rounded-lg bg-sky-500 text-white">
                Únete
              </a>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="relative pt-28 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-sky-50 via-white to-white">
      <Container>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900"
            >
              {brand.name}: {brand.tagline}
            </motion.h1>
            <p className="mt-5 text-lg text-slate-600">
              Impulsamos ligas y torneos como Dota 2, Left 4 Dead y eventos creativos en Minecraft. ¡Únete a la comunidad!
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#league" className="px-5 py-3 rounded-xl bg-sky-500 text-white font-medium">
                Ver Raynu League
              </a>
              <a href="#contacto" className="px-5 py-3 rounded-xl border border-slate-300 text-slate-800 font-medium">
                Ser voluntario
              </a>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1604881991720-f91add269bed?q=80&w=1200&auto=format&fit=crop"
              alt="Personas colaborando en un proyecto comunitario"
              className="rounded-3xl shadow-xl w-full object-cover aspect-[4/3]"
            />
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3 border border-slate-200">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Jugadores inscritos</p>
                <p className="font-semibold text-slate-900">3,500+ este año</p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function About() {
  return (
    <section id="nosotros" className="py-16 md:py-24">
      <Container>
        <SectionTitle
          eyebrow="Quiénes somos"
          title="Construimos oportunidades reales"
          subtitle="Raynu es una comunidad que impulsa el talento gamer y la organización de eventos competitivos."
        />
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {programs.map((p) => (
            <div key={p.title} className="rounded-2xl border border-slate-200 p-6 bg-white shadow-sm">
              <div className="w-11 h-11 rounded-xl bg-sky-500/10 text-sky-600 flex items-center justify-center mb-3">
                {p.icon}
              </div>
              <h3 className="font-semibold text-lg text-slate-900">{p.title}</h3>
              <p className="text-slate-600 mt-2">{p.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Stats() {
  return (
    <section className="py-12 bg-slate-50 border-y border-slate-200">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
              <div className="text-3xl md:text-4xl font-extrabold text-slate-900">{s.value}</div>
              <div className="mt-1 text-slate-600">{s.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function League() {
  // === Raynu League (Dota 2) ===
  // Publica tu Google Sheet como CSV y pega el enlace a continuación.
  // Archivo → Compartir → Publicar en la Web → Hoja → CSV.
  // URL tipo: https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/export?format=csv&gid=GID
  const SHEET_CSV_URL =
    "https://docs.google.com/spreadsheets/d/1mJQKC7i55bOqzgp_O0amSvhfeW03ojSQJEV6p5SnHOk/export?format=csv&gid=0";

  const [rows, setRows] = useState([]);
  const [q, setQ] = useState("");
  const [sortKey, setSortKey] = useState("MMR");
  const [sortDir, setSortDir] = useState("desc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function parseCSV(text) {
    // Parser CSV básico con soporte de comillas y CRLF
    const out = [];
    let i = 0, field = "", row = [], inQuotes = false;

    // Remueve posible BOM
    if (text && text.charCodeAt(0) === 0xFEFF) text = text.slice(1);

    while (i < text.length) {
      const c = text[i];

      if (c === '"') {
        if (inQuotes && text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (c === "," && !inQuotes) {
        row.push(field);
        field = "";
      } else if ((c === "\n" || c === "\r") && !inQuotes) {
        if (field !== "" || row.length > 0) {
          row.push(field);
          out.push(row);
          row = [];
          field = "";
        }
      } else {
        field += c;
      }
      i++;
    }
    if (field !== "" || row.length > 0) {
      row.push(field);
      out.push(row);
    }
    return out;
  }

  function get(val) {
    return (val ?? "").trim();
  }

  function normalize(raw) {
    if (!raw || raw.length === 0) return [];
    const headers = raw[0].map((h) => h.trim().toLowerCase());
    const idx = (name) => headers.indexOf(name.toLowerCase());
    const iName = idx("jugador") !== -1 ? idx("jugador") : idx("player");
    const iMMR = idx("mmr");
    const iKick = idx("kick") !== -1 ? idx("kick") : idx("canal");
    const iTeam = idx("equipo");
    const iRole = idx("rol") !== -1 ? idx("rol") : idx("pos");

    return raw
      .slice(1)
      .map((r) => ({
        nombre: get(r[iName]),
        mmr: Number(get(r[iMMR]).replace(/[^0-9.]/g, "")) || 0,
        kick: get(r[iKick]),
        equipo: get(r[iTeam]),
        rol: get(r[iRole]),
      }))
      .filter((r) => r.nombre);
  }

  function sortData(data) {
    const dir = sortDir === "asc" ? 1 : -1;
    return [...data].sort((a, b) => {
      if (sortKey === "MMR") return (a.mmr - b.mmr) * dir;
      return a.nombre.localeCompare(b.nombre) * dir;
    });
  }

  const filtered = sortData(
    rows.filter((r) => {
      const qq = q.toLowerCase();
      return (
        !qq ||
        r.nombre.toLowerCase().includes(qq) ||
        (r.equipo || "").toLowerCase().includes(qq) ||
        (r.kick || "").toLowerCase().includes(qq)
      );
    })
  );

  async function load() {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(SHEET_CSV_URL, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const txt = await res.text();
      const parsed = parseCSV(txt);
      setRows(normalize(parsed));
    } catch (e) {
      console.error("Error cargando CSV", e);
      setError(
        "No se pudo cargar el CSV. ¿Publicaste la hoja en la web y el gid es el de la pestaña correcta?"
      );
    } finally {
      setLoading(false);
    }
  }

  // Carga al montar
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="league" className="py-16 md:py-24 bg-slate-50 border-y border-slate-200">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 uppercase tracking-widest text-sm text-sky-600 font-semibold mb-2">
            <Trophy className="w-4 h-4" /> Raynu League — Dota 2
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Ranking y Jugadores</h2>
          <p className="text-slate-600 mt-2">
            Se actualiza automáticamente desde tu Google Sheet publicado (solo lectura).
          </p>
        </div>

        <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar jugador, equipo o canal"
              className="pl-9 pr-3 py-2 rounded-xl border border-slate-300 w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-600">Ordenar por</span>
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
              className="rounded-lg border border-slate-300 px-2 py-1"
            >
              <option value="MMR">MMR</option>
              <option value="Nombre">Nombre</option>
            </select>
            <button
              onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
              className="rounded-lg border border-slate-300 px-2 py-1"
            >
              {sortDir === "asc" ? "Asc" : "Desc"}
            </button>
          </div>
        </div>

        {loading && <p className="mt-6 text-sm text-slate-500">Cargando jugadores…</p>}
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-white">
                <th className="text-left p-3 font-semibold text-slate-700">#</th>
                <th className="text-left p-3 font-semibold text-slate-700">Jugador</th>
                <th className="text-left p-3 font-semibold text-slate-700">Equipo</th>
                <th className="text-left p-3 font-semibold text-slate-700">Rol</th>
                <th className="text-left p-3 font-semibold text-slate-700">MMR</th>
                <th className="text-left p-3 font-semibold text-slate-700">Kick</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.map((r, i) => (
                <tr key={`${r.nombre}-${i}`} className="bg-white hover:bg-slate-50">
                  <td className="p-3 text-slate-500">{i + 1}</td>
                  <td className="p-3 font-medium text-slate-900">{r.nombre}</td>
                  <td className="p-3 text-slate-700">{r.equipo || "-"}</td>
                  <td className="p-3 text-slate-700">{r.rol || "-"}</td>
                  <td className="p-3 font-semibold">{r.mmr.toLocaleString()}</td>
                  <td className="p-3">
                    <a
                      className="text-sky-600 hover:underline"
                      href={
                        r.kick && r.kick.startsWith("http")
                          ? r.kick
                          : r.kick
                          ? `https://kick.com/${r.kick}`
                          : "#"
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      {r.kick || "-"}
                    </a>
                  </td>
                </tr>
              ))}
              {!loading && !error && filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-slate-500">
                    Sin resultados. Verifica el enlace del Sheet o el filtro.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-xs text-slate-500">
          <p className="mb-2">
            Sugerencia: si ves error, asegúrate de <strong>Publicar en la Web</strong> la hoja y que el{" "}
            <em>gid</em> corresponde a la pestaña con los jugadores. Para encontrar el gid justo de esa
            pestaña, ábrela y mira el parámetro <code>gid=</code> en la URL.
          </p>
          <p>
            Alternativa sin publicar: comparte la hoja con "Cualquiera con el enlace" y usa{" "}
            <code>/gviz/tq?tqx=out:csv&gid=GID</code>. Ej.:{" "}
            <code>
              https://docs.google.com/spreadsheets/d/1mJQKC7i55bOqzgp_O0amSvhfeW03ojSQJEV6p5SnHOk/gviz/tq?tqx=out:csv&gid=0
            </code>
            . (Puede variar por CORS.)
          </p>
        </div>
      </Container>
    </section>
  );
}

function Programs() {
  return (
    <section id="programas" className="py-16 md:py-24">
      <Container>
        <SectionTitle
          eyebrow="Qué hacemos"
          title="Programas principales"
          subtitle="Iniciativas medibles, centradas en personas y sostenibles en el tiempo."
        />
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {programs.map((p) => (
            <div key={p.title} className="group rounded-2xl overflow-hidden border border-slate-200 bg-white">
              <div className="h-44 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200&auto=format&fit=crop"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="programa"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-sky-600 mb-2">
                  {p.icon}
                  <span className="text-sm font-semibold">Programa</span>
                </div>
                <h3 className="font-semibold text-lg text-slate-900">{p.title}</h3>
                <p className="text-slate-600 mt-2">{p.desc}</p>
                <a href="#contacto" className="inline-flex items-center gap-2 mt-4 text-sky-600 font-medium">
                  Únete <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Events() {
  return (
    <section id="eventos" className="py-16 md:py-24 bg-slate-50 border-y border-slate-200">
      <Container>
        <SectionTitle eyebrow="Participa" title="Próximos eventos" />
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {events.map((e) => (
            <div key={e.title} className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="text-2xl font-extrabold text-slate-900">{e.date}</div>
                <Calendar className="w-5 h-5 text-slate-500" />
              </div>
              <h3 className="mt-3 font-semibold text-lg text-slate-900">{e.title}</h3>
              <div className="mt-1 flex items-center gap-2 text-slate-600 text-sm">
                <MapPin className="w-4 h-4" /> {e.location}
              </div>
              <a href="#contacto" className="inline-flex items-center gap-2 mt-4 text-sky-600 font-medium">
                Quiero asistir <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Gallery() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionTitle eyebrow="Momentos" title="Galería" />
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
          {gallery.map((g, i) => (
            <img key={i} src={g} alt={`galeria-${i}`} className="rounded-xl aspect-[4/3] object-cover" />
          ))}
        </div>
      </Container>
    </section>
  );
}

function Team() {
  return (
    <section id="equipo" className="py-16 md:py-24 bg-slate-50 border-y border-slate-200">
      <Container>
        <SectionTitle eyebrow="Personas" title="Nuestro equipo" />
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {team.map((t) => (
            <div key={t.name} className="rounded-2xl overflow-hidden border border-slate-200 bg-white text-center">
              <img src={t.img} alt={t.name} className="w-full aspect-square object-cover" />
              <div className="p-5">
                <h3 className="font-semibold text-lg text-slate-900">{t.name}</h3>
                <p className="text-slate-600 text-sm">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Partners() {
  return (
    <section className="py-12">
      <Container>
        <div className="flex items-center justify-center flex-wrap gap-8 opacity-70">
          {partners.map((p) => (
            <img key={p.name} src={p.img} alt={p.name} className="h-8 object-contain" />
          ))}
        </div>
      </Container>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="rounded-3xl p-10 md:p-16 bg-gradient-to-r from-sky-500 to-green-500 text-white text-center shadow-xl">
          <h3 className="text-3xl md:text-4xl font-extrabold">Sé parte de {brand.name}</h3>
          <p className="mt-3 text-white/90">Tu tiempo y talento pueden cambiar la vida de muchas personas.</p>
          <a href="#contacto" className="inline-block mt-6 rounded-xl bg-white text-slate-900 px-6 py-3 font-semibold">
            Quiero ser voluntario
          </a>
        </div>
      </Container>
    </section>
  );
}

function Contact() {
  return (
    <section id="contacto" className="py-16 md:py-24 bg-slate-50 border-y border-slate-200">
      <Container>
        <SectionTitle eyebrow="Conversemos" title="Contacto" subtitle="Escríbenos y te responderemos pronto." />
        <div className="mt-10 grid md:grid-cols-2 gap-8">
          <form className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Nombre</label>
                <input type="text" className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Tu nombre" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Email</label>
                <input type="email" className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="tucorreo@ejemplo.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Mensaje</label>
                <textarea className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 h-28 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Cuéntanos en qué te gustaría participar..." />
              </div>
              <button type="button" className="rounded-xl bg-sky-500 text-white px-4 py-2 font-semibold">
                Enviar
              </button>
            </div>
          </form>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-slate-500" />
                <a href="mailto:hola@raynu.org" className="text-slate-700 hover:underline">hola@raynu.org</a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-slate-500" />
                <span className="text-slate-700">Av. Principal 123, Lima, Perú</span>
              </div>
              <div className="flex items-center gap-4 pt-2">
                <a href="#" aria-label="Instagram" className="p-2 rounded-lg border hover:bg-slate-50"><Instagram className="w-5 h-5" /></a>
                <a href="#" aria-label="Twitter" className="p-2 rounded-lg border hover:bg-slate-50"><Twitter className="w-5 h-5" /></a>
                <a href="#" aria-label="YouTube" className="p-2 rounded-lg border hover:bg-slate-50"><Youtube className="w-5 h-5" /></a>
              </div>
              <div className="aspect-[16/10] rounded-xl overflow-hidden mt-4">
                <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover" alt="Mapa o sede" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-sky-500" />
            <span className="font-semibold text-slate-800">{brand.name}</span>
          </div>
        </div>
        <p className="text-slate-500 text-sm mt-4">
          © {new Date().getFullYear()} {brand.name}. Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  );
}

export default function RaynuSite() {
  return (
    <div className="font-sans text-slate-800 bg-white">
      {/* Meta-like tags for SEO (ignored in preview, useful in Next.js/HTML) */}
      {/* <Head>
        <title>Raynu — {brand.tagline}</title>
        <meta name="description" content="Raynu: organización que impulsa educación, salud y comunidad." />
        <meta property="og:title" content="Raynu — {brand.tagline}" />
        <meta property="og:description" content="Raynu: organización que impulsa educación, salud y comunidad." />
        <meta property="og:image" content="/og.jpg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head> */}

      <Nav />
      <Hero />
      <League />
      <About />
      <Stats />
      <Programs />
      <Events />
      <Gallery />
      <Team />
      <Partners />
      <CTA />
      <Contact />
      <Footer />
    </div>
  );
}
