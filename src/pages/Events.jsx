// src/pages/Events.jsx
import { useMemo, useState } from "react";
import {
  Trophy,
  CalendarDays,
  Users,
  Mic2,
  Monitor,
  Award,
  Star,
  ArrowRight,
  ChevronDown,
  Filter as FilterIcon,
  Joystick,
} from "lucide-react";
import { Link } from "react-router-dom";

/* ===================== DATA ===================== */
const TAGS = [
  { id: "all", label: "Todos", icon: <FilterIcon size={14} /> },
  { id: "dota2", label: "Dota 2", icon: <Trophy size={14} /> },
  { id: "l4d", label: "Left 4 Dead", icon: <Joystick size={14} /> },
  { id: "minecraft", label: "Minecraft", icon: <Users size={14} /> },
  { id: "vtubers", label: "VTubers", icon: <Mic2 size={14} /> },
];

const EVENTS = [
  {
    id: "raynu-league",
    title: "Raynu League — Dota 2",
    year: "2025",
    type: "Liga / Torneo",
    prize: "S/. 1,500",
    summary:
      "Liga competitiva con fase regular y playoffs. Seguimiento de MMR, posiciones y calificación pública.",
    bullets: ["16+ equipos", "Ranking MMR", "Cobertura y resultados públicos"],
    tags: ["dota2"],
    cta: { label: "Ver ranking", to: "/league" },
    cover: "league", // placeholder gráfico
  },
  {
    id: "vtuber-datings",
    title: "VTuber Datings Edición 1",
    year: "2024–2025",
    type: "Activación con creadores",
    prize: "—",
    summary:
      "Formato de entretenimiento: VTubers compiten en dinámicas en vivo para conquistar a un invitado.",
    bullets: ["2 ediciones", "Clips y cobertura social", "Host + co-host"],
    tags: ["vtubers"],
    cover: "vtubers",
  },
  {
    id: "vtuber-datings",
    title: "VTuber Datings Edición 2",
    year: "2024–2025",
    type: "Activación con creadores",
    prize: "—",
    summary:
      "Formato de entretenimiento: VTubers compiten en dinámicas en vivo para conquistar a un invitado.",
    bullets: ["2 ediciones", "Clips y cobertura social", "Host + co-host"],
    tags: ["vtubers"],
    cover: "vtubers",
  },
  {
    id: "calamar",
    title: "Juega con mi calamar",
    year: "2024",
    type: "Evento temático — Minecraft",
    prize: "S/. 500",
    summary:
      "Serie de minijuegos inspirada en ‘El juego del calamar’. Eliminatorias rápidas con premios y highlights.",
    bullets: ["Retos por rondas", "Premios", "Resumen post-evento"],
    tags: ["minecraft"],
    cover: "minecraft",
  },
];

/* ===================== PAGE ===================== */
export default function Events() {
  const [activeTag, setActiveTag] = useState("all");
  const [expanded, setExpanded] = useState(null);

  const filtered = useMemo(() => {
    const list =
      activeTag === "all"
        ? EVENTS
        : EVENTS.filter((e) => e.tags.includes(activeTag));
    // ordenar por año (toma el primer número que encuentre)
    return [...list].sort((a, b) => {
      const ay = parseInt((a.year.match(/\d{4}/) || ["0"])[0], 10);
      const by = parseInt((b.year.match(/\d{4}/) || ["0"])[0], 10);
      return by - ay;
    });
  }, [activeTag]);

  return (
    <>
      {/* HERO */}
      <section className="hero hero--compact">
        <div className="backdrop"></div>
        <div className="ring"></div>
        <div className="glow"></div>

        <div className="container" style={{ position: "relative" }}>
          <div style={{ maxWidth: 960 }}>
            <h1
              className="text-gradient"
              style={{ fontSize: "clamp(40px, 6.5vw, 68px)", lineHeight: 1.05, fontWeight: 800 }}
            >
              Eventos Raynu
            </h1>
            <p style={{ marginTop: 14, color: "rgb(var(--text-1))", fontSize: 18 }}>
              Ligas y activaciones con ADN competitivo: <b>Dota 2</b>, <b>Left 4 Dead</b>, <b>Minecraft</b> y
              especiales con <b>VTubers</b>. Cobertura ligera, reglas claras y resultados públicos.
            </p>

            <div style={{ marginTop: 18, display: "flex", gap: 8, flexWrap: "wrap" }}>
              {TAGS.map((t) => {
                const active = activeTag === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTag(t.id)}
                    className="chip"
                    aria-pressed={active}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "8px 12px",
                      borderRadius: 999,
                      border: active
                        ? "1px solid rgba(0,229,255,.45)"
                        : "1px solid rgba(255,255,255,.12)",
                      background: active
                        ? "linear-gradient(90deg, rgba(0,229,255,.15), rgba(255,59,92,.10))"
                        : "rgba(255,255,255,.02)",
                      cursor: "pointer",
                    }}
                  >
                    {t.icon}
                    {t.label}
                  </button>
                );
              })}
            </div>

            <div style={{ marginTop: 20 }}>
              <span className="chip">
                <CalendarDays size={16} /> Agenda abierta
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="section section--tight" id="realizados">
        <div className="container">
          <h2 className="section-title">Eventos realizados</h2>

          <div className="timeline">
            {filtered.map((ev, idx) => {
              const isOpen = expanded === ev.id;
              return (
                <article key={ev.id} className="timeline-item panel">
                  {/* Punto/Año */}
                  <div className="timeline-meta">
                    <div className="dot" />
                    <div className="year">{ev.year}</div>
                  </div>

                  {/* Contenido */}
                  <div className="content">
                    <header className="head">
                      <div className="title">
                        <Award size={18} style={{ color: "var(--raynu-cyan)" }} />
                        <strong>{ev.title}</strong>
                      </div>
                      <div className="meta">
                        <span className="badge">{ev.type}</span>
                        {ev.prize && <span className="badge">Prize: {ev.prize}</span>}
                      </div>
                    </header>

                    <div className="grid">
                      {/* Cover/arte minimal sin imágenes externas */}
                      <div className={`cover cover-${ev.cover}`} aria-hidden />
                      {/* Texto */}
                      <div>
                        <p className="muted">{ev.summary}</p>
                        <ul className="bullets">
                          {ev.bullets.map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>

                        <div className="actions">
                          {ev.cta ? (
                            ev.cta.to?.startsWith("/") ? (
                              <Link className="btn-primary" to={ev.cta.to}>
                                {ev.cta.label} <ArrowRight size={16} />
                              </Link>
                            ) : (
                              <a className="btn-primary" href={ev.cta.to}>
                                {ev.cta.label} <ArrowRight size={16} />
                              </a>
                            )
                          ) : (
                            <a className="btn-primary" href="mailto:hola@raynu.org">
                              Quiero este formato <ArrowRight size={16} />
                            </a>
                          )}

                          <button
                            className="btn-outline"
                            onClick={() => setExpanded(isOpen ? null : ev.id)}
                            style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
                          >
                            {isOpen ? "Ocultar detalles" : "Ver detalles"}
                            <ChevronDown
                              size={16}
                              style={{ transform: `rotate(${isOpen ? 180 : 0}deg)`, transition: "transform .2s" }}
                            />
                          </button>
                        </div>

                        {/* Bloque expandible */}
                        {isOpen && (
                          <div className="expand">
                            <div className="kpis">
                              <KPI kpi="+120" label="Jugadores activos" />
                              <KPI kpi="6" label="Torneos/año" />
                              <KPI kpi="+25K" label="Views acumuladas" />
                              <KPI kpi="8" label="Patrocinadores" />
                            </div>
                            <p className="muted" style={{ marginTop: 8 }}>
                              Testimonio: “Raynu eleva el nivel competitivo manteniendo el espíritu de comunidad.”
                            </p>
                            <div className="stars">
                              <Star size={16} /><Star size={16} /><Star size={16} /><Star size={16} /><Star size={16} />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="section">
        <div className="container">
          <div
            className="panel"
            style={{
              padding: 22,
              display: "grid",
              gridTemplateColumns: "1.2fr .8fr",
              gap: 16,
              alignItems: "center",
            }}
          >
            <div>
              <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>
                ¿Listo para activar tu comunidad?
              </h3>
              <p className="muted" style={{ marginTop: 8 }}>
                Producimos torneos y especiales con métricas públicas y cobertura ligera.
              </p>
              <a className="btn-primary" href="mailto:hola@raynu.org">
                Hablemos <ArrowRight size={16} />
              </a>
            </div>
            <ul className="muted" style={{ margin: 0, paddingLeft: 18 }}>
              <li>Reglamento y arbitraje</li>
              <li>Landing + resultados públicos</li>
              <li>Talentos invitados y activaciones</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

/* ===================== SUBCOMPONENTES ===================== */
function KPI({ kpi, label }) {
  return (
    <div className="panel" style={{ padding: 14, textAlign: "center" }}>
      <div style={{ fontSize: 26, fontWeight: 800 }}>{kpi}</div>
      <div className="muted" style={{ fontSize: 13 }}>{label}</div>
    </div>
  );
}
