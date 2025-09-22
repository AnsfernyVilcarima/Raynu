// src/pages/Nosotros.jsx
import {
  Users,
  ShieldCheck,
  Sparkles,
  HeartHandshake,
  Globe,
  Rocket,
  Target,
  Trophy,
  ArrowRight,
} from "lucide-react";

const logoUrl = `${import.meta.env.BASE_URL}logo-raynu.png`;

const KPIS = [
  { kpi: "201", label: "Miembros activos" },
  { kpi: "6", label: "Eventos / año" },
  { kpi: "+25K", label: "Vistas acumuladas" },
  { kpi: "8", label: "Partners" },
];

const VALORES = [
  {
    icon: <Users size={18} />,
    title: "Comunidad primero",
    desc: "Escuchamos a jugadores y creadores para construir formatos que de verdad disfrutan.",
  },
  {
    icon: <ShieldCheck size={18} />,
    title: "Juego limpio",
    desc: "Reglas claras, moderación y resultados públicos: la competencia es prioridad.",
  },
  {
    icon: <Sparkles size={18} />,
    title: "Creatividad",
    desc: "Probamos ideas nuevas: Datings con VTubers, retos temáticos y miniseries.",
  },
  {
    icon: <HeartHandshake size={18} />,
    title: "Colaboración",
    desc: "Trabajamos con talentos, marcas y comunidades para crecer juntos.",
  },
];

const HISTORIA = [
  {
    year: "2024",
    title: "Nace Raynu",
    bullets: ["Primeros showmatches", "Comunidad Discord"],
  },
  {
    year: "2024",
    title: "Juega con mi calamar",
    bullets: ["Evento temático en Minecraft", "Retos por rondas con premio"],
  },
  {
    year: "2024–2025",
    title: "VTuber Datings",
    bullets: ["2 ediciones", "Clips y cobertura social"],
  },
  {
    year: "2025",
    title: "Raynu League",
    bullets: ["Liga Dota 2 con MMR y playoff", "Tablas públicas y ranking"],
  },
];

const TEAM = [
  { name: "Ansferny", role: "Fundador / Host", handle: "@ansferny", link: "https://kick.com/" },
  { name: "Producción", role: "Operaciones & Reglas", handle: "@ops", link: "#" },
  { name: "Comunidad", role: "Partners & Talentos", handle: "@community", link: "#" },
];

const PARTNERS = ["Kuntur", "Sumak", "Wayra", "Muyu", "Nakama", "PixelLab"];

export default function Nosotros() {
  return (
    <>
      {/* HERO */}
      <section className="hero hero--compact">
        <div className="backdrop" />
        <div className="ring" />
        <div className="glow" />
        <div className="container" style={{ position: "relative" }}>
          <div style={{ maxWidth: 980 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <img src={logoUrl} alt="Raynu" width={40} height={40} style={{ borderRadius: 10 }} />
              <span className="chip">Desde 2024</span>
              <span className="chip">Gaming & e-sports</span>
              <span className="chip">Comunidad</span>
            </div>
            <h1 className="text-gradient" style={{ fontSize: "clamp(40px,6.5vw,68px)", lineHeight: 1.05, fontWeight: 800 }}>
              Somos Raynu
            </h1>
            <p style={{ marginTop: 12, color: "rgb(var(--text-1))", fontSize: 18 }}>
              Organizamos ligas y experiencias en vivo que combinan competencia, entretenimiento y comunidad.
              Dota 2, Left 4 Dead, Minecraft y activaciones con creadores.
            </p>
            <div style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a href="/Raynu/#/eventos" className="btn-primary">Ver eventos <ArrowRight size={16} /></a>
              <a href="mailto:hola@raynu.org" className="btn-outline">Hablemos</a>
            </div>
          </div>
        </div>
      </section>

      {/* KPI */}
      <section className="section section--tight">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 12 }}>
            {KPIS.map((k) => (
              <div key={k.label} className="panel" style={{ padding: 16, textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 800 }}>{k.kpi}</div>
                <div className="muted" style={{ fontSize: 13 }}>{k.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROPÓSITO / VALORES */}
      <section className="section" id="valores">
        <div className="container">
          <div className="panel" style={{ padding: 22 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <h2 className="section-title" style={{ marginTop: 0 }}>Nuestro propósito</h2>
                <p className="muted">
                  Hacer que competir sea divertido y transparente. Diseñamos reglas simples, publicamos resultados y
                  cuidamos a la comunidad para que siempre quiera volver.
                </p>
                <ul className="steps" style={{ marginTop: 12 }}>
                  <li className="step">
                    <div className="num">1</div>
                    <div className="content">
                      <div className="title"><Target size={16}/> Enfoque</div>
                      <div className="desc">Formatos claros y metas medibles.</div>
                    </div>
                  </li>
                  <li className="step">
                    <div className="num">2</div>
                    <div className="content">
                      <div className="title"><Globe size={16}/> Comunidad</div>
                      <div className="desc">Convocatorias abiertas y comunicación cercana.</div>
                    </div>
                  </li>
                  <li className="step">
                    <div className="num">3</div>
                    <div className="content">
                      <div className="title"><Trophy size={16}/> Competencia</div>
                      <div className="desc">Juego limpio y visibilidad del desempeño.</div>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 style={{ margin: "0 0 10px", fontWeight: 800 }}>Valores</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {VALORES.map((v) => (
                    <div key={v.title} className="panel" style={{ padding: 14 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 800 }}>
                        <span style={{ color: "var(--raynu-cyan)" }}>{v.icon}</span> {v.title}
                      </div>
                      <p className="muted" style={{ margin: "6px 0 0" }}>{v.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HISTORIA (timeline) */}
      <section className="section" id="historia">
        <div className="container">
          <h2 className="section-title">Nuestra historia</h2>
          <div className="timeline">
            {HISTORIA.map((h, i) => (
              <article key={i} className="timeline-item panel">
                <div className="timeline-meta">
                  <div className="dot" />
                  <div className="year">{h.year}</div>
                </div>
                <div className="content">
                  <div className="head">
                    <div className="title" style={{ fontWeight: 800 }}>
                      <Rocket size={18} style={{ color: "var(--raynu-cyan)", marginRight: 8 }} />
                      {h.title}
                    </div>
                    <div className="meta"><span className="badge">Hito</span></div>
                  </div>
                  <ul className="bullets">
                    {h.bullets.map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EQUIPO */}
      <section className="section" id="equipo">
        <div className="container">
          <h2 className="section-title">Equipo</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 14 }}>
            {TEAM.map((t) => (
              <div key={t.name} className="panel" style={{ padding: 14, textAlign: "center" }}>
                <div
                  style={{
                    width: 96, height: 96, borderRadius: 20, margin: "0 auto 10px",
                    border: "1px solid rgba(255,255,255,.08)",
                    background:
                      "linear-gradient(135deg, rgba(0,229,255,.18), rgba(255,59,92,.12))",
                  }}
                />
                <div style={{ fontWeight: 800 }}>{t.name}</div>
                <div className="muted" style={{ fontSize: 13 }}>{t.role}</div>
                <a className="btn-outline" style={{ marginTop: 10 }} href={t.link} target="_blank" rel="noreferrer">
                  {t.handle}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="section" id="partners">
        <div className="container">
          <h2 className="section-title">Nuestros Partners</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, minmax(0,1fr))", gap: 12 }}>
            {PARTNERS.map((p) => (
              <div key={p} className="panel" style={{
                padding: 18, display: "grid", placeItems: "center",
                minHeight: 72, fontWeight: 800, opacity: .9
              }}>
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="panel" style={{
            padding: 22, display: "grid",
            gridTemplateColumns: "1.2fr .8fr", gap: 16, alignItems: "center"
          }}>
            <div>
              <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>
                ¿Nos aliamos para tu próximo evento?
              </h3>
              <p className="muted" style={{ marginTop: 8 }}>
                Activaciones con creadores, ligas y experiencias temáticas con métricas públicas.
              </p>
              <a className="btn-primary" href="mailto:hola@raynu.org">Contáctanos <ArrowRight size={16} /></a>
            </div>
            <ul className="muted" style={{ margin: 0, paddingLeft: 18 }}>
              <li>Diseño de formato y reglas</li>
              <li>Producción y moderación</li>
              <li>Landing + resultados</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
