import { Trophy, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

const BASE = import.meta.env.BASE_URL;

const sponsors = [
  { name: "Kick",    logo: "https://dummyimage.com/120x40/0b1220/9fe/fff.png&text=KICK" },
  { name: "HyperX",  logo: "https://dummyimage.com/120x40/0b1220/9fe/fff.png&text=HYPERX" },
  { name: "MSI",     logo: "https://dummyimage.com/120x40/0b1220/9fe/fff.png&text=MSI" },
  { name: "NimoTV",  logo: "https://dummyimage.com/120x40/0b1220/9fe/fff.png&text=NIMOTV" },
  { name: "AOC",     logo: "https://dummyimage.com/120x40/0b1220/9fe/fff.png&text=AOC" },
  { name: "Logi",    logo: "https://dummyimage.com/120x40/0b1220/9fe/fff.png&text=LOGI" },
];

const servicios = [
  { title: "Raynu League — Dota 2", desc: "Liga con ranking MMR, posiciones y calificación.", cta: "/league" },
  { title: "Left 4 Dead Cups", desc: "Copas rápidas con formatos arcade y play-offs.", cta: "#contacto" },
  { title: "Eventos especiales", desc: "“Citas de Vtubers”, trivias, retos temáticos.", cta: "#contacto" },
  { title: "Minecraft Sitop — Squid Games", desc: "Minijuegos por temporadas con premios.", cta: "#contacto" },
];

const testimonios = [
  { who: "Caster Pro", role: "Host Dota 2", text: "Raynu sube el nivel competitivo sin perder el espíritu de comunidad." },
  { who: "Team Andes", role: "Capitán", text: "La organización y la cobertura fueron impecables. Queremos la próxima temporada ya." },
  { who: "Vtuber X", role: "Streamer", text: "La activación de ‘Citas de Vtubers’ fue 🔥 — divertida y bien producida." },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero" id="">
        <div className="backdrop"></div>
        <div className="ring"></div>
        <div className="glow"></div>

        <div className="container" style={{ position: "relative" }}>
          <div style={{ maxWidth: 860 }}>
            <h1 className="text-gradient" style={{ fontSize: "clamp(42px, 7vw, 72px)", lineHeight: 1.05, fontWeight: 800 }}>
              Ligas y eventos con ADN competitivo
            </h1>
            <p style={{ marginTop: 14, color: `rgb(var(--text-1))`, fontSize: 18 }}>
              Torneos de Dota 2, Left 4 Dead y más — impulsados por la comunidad Raynu.
            </p>
            <div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link to="/league" className="btn-primary">Ver Raynu League</Link>
              <a href={`${BASE}#servicios`} className="btn-outline">Nuestros servicios</a>
            </div>
            <div style={{ marginTop: 22 }}>
              <span className="chip"><Trophy className="w-4 h-4" /> En vivo</span>
            </div>
          </div>
        </div>
      </section>

      {/* ELL@s CONFÍAN EN NOSOTROS */}
      <section className="section" id="clientes">
        <div className="container">
          <h2 style={{ fontSize: "clamp(24px,3.5vw,34px)", fontWeight: 800, margin: "0 0 16px" }}>
            Ellos confían en nosotros
          </h2>
          <div className="panel" style={{ padding: 18 }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
              gap: 18, alignItems: "center",
              filter: "grayscale(100%)", opacity: .85
            }}>
              {sponsors.map(s => (
                <img key={s.name} src={s.logo} alt={s.name} style={{ width: "100%", height: 40, objectFit: "contain" }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="section" id="servicios">
        <div className="container">
          <h2 style={{ fontSize: "clamp(24px,3.5vw,34px)", fontWeight: 800, margin: "0 0 16px" }}>
            Nuestros servicios (eventos)
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {servicios.map((s) => (
              <div key={s.title} className="panel" style={{ padding: 18 }}>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>{s.title}</h3>
                <p style={{ margin: "8px 0 12px", color: "rgb(var(--text-1))" }}>{s.desc}</p>
                {s.cta.startsWith("#") ? (
                  <a className="btn-outline" href={`${BASE}${s.cta}`}>Más info <ArrowRight size={16} /></a>
                ) : (
                  <Link className="btn-outline" to={s.cta}>Más info <ArrowRight size={16} /></Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE NOSOTROS */}
      <section className="section" id="nosotros">
        <div className="container">
          <div className="panel" style={{ padding: 24 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.2fr .8fr", gap: 24 }}>
              <div>
                <h2 style={{ fontSize: "clamp(24px,3.5vw,34px)", fontWeight: 800, marginTop: 0 }}>Sobre nosotros</h2>
                <p style={{ color: "rgb(var(--text-1))" }}>
                  Raynu es una organización de esports y comunidad. Creamos experiencias competitivas y
                  entretenidas con producción ligera, reglas claras y datos públicos (tablas, MMR y posiciones).
                </p>
                <ul style={{ margin: "12px 0 0", paddingLeft: 18, color: "rgb(var(--text-1))" }}>
                  <li>Operación transparente con rankings abiertos.</li>
                  <li>Eventos temáticos y activaciones con creadores.</li>
                  <li>Integraciones simples: Google Sheets / Supabase.</li>
                </ul>
              </div>
              <div className="panel" style={{ padding: 18 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
                  <Stat kpi="+120" label="Jugadores activos" />
                  <Stat kpi="6" label="Torneos/año" />
                  <Stat kpi="+25K" label="views acumuladas" />
                  <Stat kpi="8" label="patrocinadores" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="section" id="testimonios">
        <div className="container">
          <h2 style={{ fontSize: "clamp(24px,3.5vw,34px)", fontWeight: 800, margin: "0 0 16px" }}>
            Nuestros clientes nos recomiendan
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {testimonios.map((t, i) => (
              <div key={i} className="panel" style={{ padding: 18 }}>
                <div style={{ display: "flex", gap: 6, color: "var(--raynu-cyan)" }}>
                  <Star size={16} /><Star size={16} /><Star size={16} /><Star size={16} /><Star size={16} />
                </div>
                <p style={{ margin: "10px 0", color: "rgb(var(--text-1))" }}>{t.text}</p>
                <div style={{ fontWeight: 700 }}>{t.who}</div>
                <div style={{ color: "rgb(var(--text-1))", fontSize: 13 }}>{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="section-surface" id="contacto">
        <div className="container">
          <div className="panel" style={{ padding: 24 }}>
            <h2 style={{ marginTop: 0, fontSize: "clamp(24px,3.5vw,34px)", fontWeight: 800 }}>Contáctanos</h2>
            <p style={{ color: "rgb(var(--text-1))" }}>¿Tienes una idea o quieres patrocinar? Escríbenos.</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 12 }}>
              <a className="btn-primary" href="mailto:hola@raynu.org">hola@raynu.org</a>
              <Link className="btn-outline" to="/league">Ver ranking Raynu League</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ kpi, label }) {
  return (
    <div className="panel" style={{ padding: 14, textAlign: "center" }}>
      <div style={{ fontSize: 26, fontWeight: 800 }}>{kpi}</div>
      <div style={{ color: "rgb(var(--text-1))", fontSize: 13 }}>{label}</div>
    </div>
  );
}
