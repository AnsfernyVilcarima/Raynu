import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";

/* ====== Supabase ====== */
const SUPABASE_URL  = "https://tqhosxpgeyimtercgkje.supabase.co";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxaG9zeHBnZXlpbXRlcmNna2plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzMjkzMDgsImV4cCI6MjA3MzkwNTMwOH0.lPCI0SkWIHhSAnuUjl1HiydfG62ahYfZwGiqrYHWYQI";
const API_URL = `${SUPABASE_URL}/rest/v1/raynu_players?select=*`;

/* ====== CSV fallback (opcional) ====== */
const CSV_URL_RAW   = "https://raw.githubusercontent.com/AnsfernyVilcarima/Raynu/main/data/jugadores.csv";
const CSV_URL_LOCAL = `${import.meta.env.BASE_URL}data/jugadores.csv`;

const get = (v) => (v ?? "").toString().trim();
const hasHttp = (s) => /^https?:\/\//i.test(s);

function normalizeFromSupabase(list){
  return (list||[]).map(r=>{
    const miembros = get(r.miembros ?? r.Miembros ?? r.nombre ?? r.Jugador ?? r.Player);
    const mmr = Number(get(r.mmr ?? r.MMR).replace(/[^0-9.-]/g,"")) || 0;
    let plataforma = get(r.plataforma ?? r["Plataforma (URL STREAM)"] ?? r.kick ?? r.canal ?? r.URL);
    if (plataforma && !hasHttp(plataforma)) plataforma = `https://kick.com/${plataforma}`;
    const posicion = get(r.posicion ?? r["posición"] ?? r.rol ?? r.pos ?? r.Role);
    const calificacion = get(r.calificacion ?? r["Calificación"] ?? r.rating ?? r.puntaje);
    return miembros ? { miembros, plataforma, mmr, posicion, calificacion } : null;
  }).filter(Boolean);
}

/* CSV helpers */
function parseCSV(text){
  if (text && text.charCodeAt(0)===0xfeff) text=text.slice(1);
  const first = (text.split(/\r?\n/)[0]||"");
  const delim = (first.match(/;/g)||[]).length > (first.match(/,/g)||[]).length ? ";" : ",";
  const out=[]; let i=0, field="", row=[], inQ=false;
  while(i<text.length){
    const c=text[i];
    if(c==='"'){ if(inQ && text[i+1]==='"'){ field+='"'; i++; } else inQ=!inQ; }
    else if(c===delim && !inQ){ row.push(field); field=""; }
    else if((c==="\n"||c==="\r") && !inQ){ if(field!=="" || row.length){ row.push(field); out.push(row); row=[]; field=""; } }
    else field+=c; i++;
  }
  if(field!==""||row.length){ row.push(field); out.push(row); }
  return out;
}
const clean=(s)=>get(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\(.*?\)/g,"").replace(/[^a-z0-9 ]+/g,"").replace(/\s+/g," ").trim();
function fromCSV(raw){
  if(!raw?.length) return [];
  const H=raw[0].map(clean);
  const find=(...n)=>{const t=n.map(clean);return H.findIndex(h=>t.includes(h));};
  const iM=find("miembros","jugador","player","nombre");
  const iP=find("plataforma url stream","plataforma","kick","canal","url");
  const iMMR=find("mmr"); const iPos=find("posicion","posición","rol","pos"); const iCal=find("calificacion","calificación","rating","puntaje");
  const rows=[];
  for(let r=1;r<raw.length;r++){
    const miembros=get(raw[r][iM]); if(!miembros) continue;
    let plataforma=get(raw[r][iP]); if(plataforma && !hasHttp(plataforma)) plataforma=`https://kick.com/${plataforma}`;
    const mmr=Number(get(raw[r][iMMR]).replace(/[^0-9.]/g,""))||0;
    rows.push({ miembros, plataforma, mmr, posicion:get(raw[r][iPos]), calificacion:get(raw[r][iCal]) });
  }
  return rows;
}

export default function League(){
  const [rows,setRows]=useState([]);
  const [q,setQ]=useState("");
  const [sortKey,setSortKey]=useState("MMR");
  const [sortDir,setSortDir]=useState("desc");
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");

  async function load(){
    setLoading(true); setError("");
    try{
      const r=await fetch(API_URL,{ headers:{ apikey:SUPABASE_ANON, Authorization:`Bearer ${SUPABASE_ANON}`, Accept:"application/json","Cache-Control":"no-store" }, cache:"no-store", mode:"cors" });
      const txt=await r.text(); if(!r.ok) throw new Error(`Supabase ${r.status}: ${txt}`);
      setRows(normalizeFromSupabase(JSON.parse(txt)));
    }catch(e1){
      try{
        const r2=await fetch(CSV_URL_RAW,{cache:"no-store"}); if(!r2.ok) throw 0;
        setRows(fromCSV(parseCSV(await r2.text())));
      }catch{
        try{
          const r3=await fetch(CSV_URL_LOCAL,{cache:"no-store"}); if(!r3.ok) throw 0;
          setRows(fromCSV(parseCSV(await r3.text())));
        }catch(e3){
          console.error(e1||e3); setError("No se pudo cargar datos. Revisa Supabase o /data/jugadores.csv");
        }
      }
    }finally{ setLoading(false); }
  }
  useEffect(()=>{ load(); },[]);

  const filtered = useMemo(()=>{
    const s=q.toLowerCase();
    const base=!s?rows:rows.filter(r=>r.miembros.toLowerCase().includes(s)||(r.posicion||"").toLowerCase().includes(s)||(r.plataforma||"").toLowerCase().includes(s));
    const dir=sortDir==="asc"?1:-1;
    return [...base].sort((a,b)=> sortKey==="MMR" ? (a.mmr-b.mmr)*dir : a.miembros.localeCompare(b.miembros)*dir );
  },[rows,q,sortKey,sortDir]);

  return (
    <section className="section">
      <div className="container">
        <div style={{display:'flex', gap:12, rowGap:12, flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', marginBottom:24}}>
          <h2 style={{fontSize:'clamp(28px,4vw,40px)', fontWeight:800, margin:0}}>Raynu League — Ranking & Jugadores</h2>
          <div style={{display:'flex', alignItems:'center', gap:8}}>
            <div style={{position:'relative'}}>
              <Search style={{position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', opacity:.6}} size={16}/>
              <input className="input" style={{paddingLeft:36, width:280}} placeholder="Buscar miembro, posición o plataforma"
                     value={q} onChange={e=>setQ(e.target.value)} />
            </div>
            <span style={{color:`rgb(var(--text-1))`}}>Ordenar</span>
            <select className="select" value={sortKey} onChange={e=>setSortKey(e.target.value)}>
              <option value="MMR">MMR</option>
              <option value="Miembros">Miembros</option>
            </select>
            <button className="btn-outline" onClick={()=>setSortDir(d=>d==="asc"?"desc":"asc")}>
              {sortDir==="asc" ? "Asc" : "Desc"}
            </button>
          </div>
        </div>

        <div className="panel" style={{padding:0, overflowX:'auto'}}>
          <table className="table">
            <colgroup>
              <col style={{width:64}} />
              <col style={{width:'26%'}} />
              <col style={{width:'32%'}} />
              <col style={{width:'14%'}} />
              <col style={{width:'18%'}} />
              <col style={{width:'10%'}} />
            </colgroup>
            <thead>
              <tr>
                <th>#</th>
                <th>Miembros</th>
                <th>Plataforma (URL STREAM)</th>
                <th>MMR</th>
                <th>posición</th>
                <th>Calificación</th>
              </tr>
            </thead>
            <tbody>
              {loading && (<tr><td colSpan={6} style={{padding:24, color:'rgb(var(--text-1))'}}>Cargando jugadores…</td></tr>)}
              {error && !loading && (<tr><td colSpan={6} style={{padding:24, color:'#ff7a7a'}}>{error}</td></tr>)}
              {!loading && !error && filtered.map((r,i)=>(
                <tr key={r.miembros+i}>
                  <td className="rank">{i+1}</td>
                  <td style={{color:`rgb(var(--text-0))`, fontWeight:700}}>{r.miembros}</td>
                  <td>{r.plataforma ? <a href={r.plataforma} target="_blank" rel="noreferrer" style={{color:'var(--raynu-cyan)'}}>{r.plataforma.replace(/^https?:\/\/(www\.)?/i,'')}</a> : "-"}</td>
                  <td style={{color:`rgb(var(--text-0))`, fontWeight:700}}>{Number(r.mmr||0).toLocaleString()}</td>
                  <td>{r.posicion || "-"}</td>
                  <td>{get(r.calificacion) || "-"}</td>
                </tr>
              ))}
              {!loading && !error && filtered.length===0 && (
                <tr><td colSpan={6} style={{padding:24, color:'rgb(var(--text-1))'}}>Sin resultados.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
