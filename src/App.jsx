import { useEffect, useMemo, useState } from "react";
import { Trophy, Search } from "lucide-react";

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1mJQKC7i55bOqzgp_O0amSvhfeW03ojSQJEV6p5SnHOk/export?format=csv&gid=0";

const logoUrl = `${import.meta.env.BASE_URL}logo-raynu.png`;

function parseCSV(text) {
  const out = []; let i=0, field="", row=[], inQuotes=false;
  if (text && text.charCodeAt(0)===0xfeff) text=text.slice(1);
  while (i<text.length) {
    const c=text[i];
    if (c === '"') { if (inQuotes && text[i+1]==='"'){ field+='"'; i++; } else { inQuotes=!inQuotes; } }
    else if (c === "," && !inQuotes) { row.push(field); field=""; }
    else if ((c === "\n" || c === "\r") && !inQuotes) { if (field!=="" || row.length){ row.push(field); out.push(row); row=[]; field=""; } }
    else { field += c; }
    i++;
  }
  if (field!=="" || row.length){ row.push(field); out.push(row); }
  return out;
}
const get = (v)=> (v??"").trim();
function normalize(raw){
  if (!raw || !raw.length) return [];
  const headers = raw[0].map(h=>h.trim().toLowerCase());
  const idx = (n)=> headers.indexOf(n.toLowerCase());
  const iName = idx("jugador") !== -1 ? idx("jugador") : idx("player");
  const iMMR  = idx("mmr");
  const iKick = idx("kick") !== -1 ? idx("kick") : idx("canal");
  const iTeam = idx("equipo");
  const iRole = idx("rol") !== -1 ? idx("rol") : idx("pos");
  return raw.slice(1).map(r=>({
    nombre: get(r[iName]),
    mmr: Number(get(r[iMMR]).replace(/[^0-9.]/g,"")) || 0,
    kick: get(r[iKick]),
    equipo: get(r[iTeam]),
    rol: get(r[iRole]),
  })).filter(r=>r.nombre);
}

export default function App(){
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState("");
  const [sortKey, setSortKey] = useState("MMR");
  const [sortDir, setSortDir] = useState("desc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load(){
    try {
      setLoading(true); setError("");
      const res = await fetch(SHEET_CSV_URL, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      const raw = parseCSV(text);
      setRows(normalize(raw));
    } catch (e) {
      console.error(e);
      setError("No se pudo cargar el CSV. Verifica que la hoja esté 'Publicada en la web' y el gid coincida.");
    } finally { setLoading(false); }
  }
  useEffect(()=>{ load(); },[]);

  const filtered = useMemo(()=>{
    const qq = q.toLowerCase();
    const base = !qq ? rows : rows.filter(r =>
      r.nombre.toLowerCase().includes(qq) ||
      (r.equipo||"").toLowerCase().includes(qq) ||
      (r.kick||"").toLowerCase().includes(qq)
    );
    const dir = sortDir === "asc" ? 1 : -1;
    return [...base].sort((a,b)=>{
      if (sortKey === "MMR") return (a.mmr - b.mmr) * dir;
      return a.nombre.localeCompare(b.nombre) * dir;
    });
  },[rows,q,sortKey,sortDir]);

  return (
    <div className="min-h-screen">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 bg-black/60 backdrop-blur border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <img src={logoUrl} alt="Raynu League" className="w-9 h-9 rounded-lg object-cover"/>
            <span className="text-white font-extrabold tracking-wide text-lg">RAYNU</span>
          </a>
          <nav className="hidden md:flex items-center gap-4">
            <a href="#league" className="text-[color:rgb(var(--text-1))] hover:text-white">Raynu League</a>
            <a href="#contacto" className="btn-outline">Contacto</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="pt-28 section">
        <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gradient">Raynu League</h1>
            <p className="mt-4 text-[color:rgb(var(--text-1))]">
              Torneos y eventos e-sports con estilo propio. Dota 2, Left 4 Dead, y más.
            </p>
            <div className="mt-8 flex gap-3">
              <a href="#league" className="btn-primary">Ver ranking</a>
              <a href="#contacto" className="btn-outline">Unirme</a>
            </div>
          </div>
          <div className="panel p-6">
            <div className="chip">En vivo</div>
            <p className="mt-3 text-sm text-[color:rgb(var(--text-1))]">
              Sección conectada al Google Sheet publicado (solo lectura).
            </p>
          </div>
        </div>
      </section>

      {/* LEAGUE */}
      <section id="league" className="section">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
            <h2 className="text-3xl md:text-4xl font-extrabold">Ranking & Jugadores</h2>
            <div className="flex items-center gap-2 text-sm">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[color:rgb(var(--text-1))]" />
                <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar jugador, equipo o canal" className="input pl-9 md:w-80"/>
              </div>
              <span className="text-[color:rgb(var(--text-1))]">Ordenar</span>
              <select value={sortKey} onChange={e=>setSortKey(e.target.value)} className="select">
                <option value="MMR">MMR</option>
                <option value="Nombre">Nombre</option>
              </select>
              <button onClick={()=>setSortDir(d=>d==="asc"?"desc":"asc")} className="btn-outline">
                {sortDir === "asc" ? "Asc" : "Desc"}
              </button>
            </div>
          </div>

          {loading && <p className="text-sm text-[color:rgb(var(--text-1))]">Cargando jugadores…</p>}
          {error   && <p className="text-sm text-red-400">{error}</p>}

          <div className="panel p-0 overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th><th>Jugador</th><th>Equipo</th><th>Rol</th><th>MMR</th><th>Kick</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i)=>(
                  <tr key={`${r.nombre}-${i}`}>
                    <td className="rank">{i+1}</td>
                    <td className="text-[color:rgb(var(--text-0))] font-semibold">{r.nombre}</td>
                    <td>{r.equipo || "-"}</td>
                    <td>{r.rol || "-"}</td>
                    <td className="text-[color:rgb(var(--text-0))] font-semibold">{r.mmr.toLocaleString()}</td>
                    <td>{r.kick ? <a className="text-cyan-300 hover:underline" href={r.kick.startsWith("http")? r.kick : `https://kick.com/${r.kick}`} target="_blank" rel="noreferrer">{r.kick}</a> : "-"}</td>
                  </tr>
                ))}
                {!loading && !error && filtered.length === 0 && (
                  <tr><td colSpan={6} className="p-6 text-center text-[color:rgb(var(--text-1))]">Sin resultados.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="divider-neon my-6"></div>
          <p className="mt-3 text-xs text-[color:rgb(var(--text-1))]">
            Tip: si no carga, publica la hoja en la web y usa el <code>gid</code> de la pestaña correcta.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="section-surface">
        <div className="mx-auto max-w-7xl px-4 text-[color:rgb(var(--text-1))]">
          © {new Date().getFullYear()} Raynu. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
