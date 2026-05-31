import React, { useState, useRef, useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ReferenceLine, LineChart, Line,
} from "recharts";
import {
  Leaf, FileText, Clock, Newspaper, SlidersHorizontal, Sun, Moon, Download,
  Search, ChevronRight, GripVertical, X, Check, TrendingDown, CheckCircle2,
  Circle, CircleDot, Bookmark, ArrowUpRight, Users, Target, Factory, Zap, Truck,
  Video, MapPin, FileSpreadsheet, File, Pencil, RotateCcw, CalendarDays, Eye,
  UploadCloud, Trash2,
  Gauge, Activity, Route, Sprout, Trees, Boxes, Database, ListChecks, Star, Scale,
  ListTodo, MessageSquare, PoundSterling, Award, BookOpen, TrendingUp, Send, Mail,
} from "lucide-react";

const LOGO = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MCA0MCI+CjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjE2IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMEFDQTAiIHN0cm9rZS13aWR0aD0iMi42Ii8+CjxwYXRoIGQ9Ik0yMCAyOSBMMjAgMTYuNSIgc3Ryb2tlPSIjMDBBQ0EwIiBzdHJva2Utd2lkdGg9IjIuNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxwYXRoIGQ9Ik0yMCAxOSBDMjAgMTMuNSAyNCAxMC41IDI5LjUgMTAuNSBDMjkuNSAxNiAyNS41IDE5IDIwIDE5IFoiIGZpbGw9IiMwMEFDQTAiLz4KPHBhdGggZD0iTTIwIDIzLjUgQzIwIDE5IDE2IDE2IDEwLjUgMTYgQzEwLjUgMjEuNSAxNC41IDIzLjUgMjAgMjMuNSBaIiBmaWxsPSIjMDBBQ0EwIi8+Cjwvc3ZnPgo=";

/* ------------------------------------------------------------------ */
/*  Theme + design tokens                                              */
/* ------------------------------------------------------------------ */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500&family=Archivo:wght@400;500;600;700&family=Spline+Sans+Mono:wght@400;500;600&display=swap');

.dash, .dash * { box-sizing: border-box; }
.dash {
  --brand:#00ACA0; --brand-deep:#0A7D77;
  --bg:#EEF4F3; --bg2:#E2EDEB; --surface:#FFFFFF; --surface2:#F1F7F6;
  --ink:#13302E; --ink2:#3E5A57; --muted:#7E938F;
  --line:rgba(19,48,46,.10); --line2:rgba(19,48,46,.20);
  --shadow:0 1px 2px rgba(19,48,46,.05), 0 16px 36px -22px rgba(19,48,46,.40);
  --positive:#149169; --warn:#C68A1E; --danger:#C8513C;
  --scope1:#E2725B; --scope2:#EBB13E; --scope3:#00ACA0;
  --sans:'Archivo',system-ui,sans-serif; --serif:'Fraunces',Georgia,serif; --mono:'Spline Sans Mono',monospace;
  font-family:var(--sans); color:var(--ink);
  min-height:100vh; width:100%;
  background:
    radial-gradient(900px 500px at 12% -8%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 60%),
    radial-gradient(700px 600px at 108% 8%, color-mix(in srgb, var(--scope2) 14%, transparent), transparent 55%),
    var(--bg);
  -webkit-font-smoothing:antialiased;
}
.dash[data-theme="dark"] {
  --brand:#19BFB3; --brand-deep:#0A7D77;
  --bg:#07201F; --bg2:#04100F; --surface:#0E2B29; --surface2:#143734;
  --ink:#E8F1EF; --ink2:#A8C0BC; --muted:#6E8A86;
  --line:rgba(232,241,239,.12); --line2:rgba(232,241,239,.24);
  --shadow:0 1px 2px rgba(0,0,0,.45), 0 22px 46px -24px rgba(0,0,0,.85);
  --positive:#4FC39B; --warn:#E6BC5C; --danger:#E58068;
  --scope1:#EC8A74; --scope2:#EFC368; --scope3:#2BC2B5;
}
.dash .serif { font-family:var(--serif); }
.dash .mono { font-family:var(--mono); font-feature-settings:"tnum" 1; }

.card {
  background:var(--surface); border:1px solid var(--line); border-radius:18px;
  box-shadow:var(--shadow); position:relative; overflow:hidden;
}
.rise { opacity:0; animation:rise .6s cubic-bezier(.2,.7,.2,1) forwards; }
@keyframes rise { from{opacity:0; transform:translateY(14px);} to{opacity:1; transform:none;} }
.slidein { animation:slidein .32s cubic-bezier(.2,.7,.2,1); }
@keyframes slidein { from{transform:translateX(110%);} to{transform:none;} }
.fade { animation:fade .3s ease; }
@keyframes fade { from{opacity:0;} to{opacity:1;} }

.chip {
  font-family:var(--sans); font-size:12.5px; font-weight:600; letter-spacing:.01em;
  border:1px solid var(--line2); background:transparent; color:var(--ink2);
  padding:5px 11px; border-radius:999px; cursor:pointer; transition:.16s; white-space:nowrap;
}
.chip:hover { border-color:var(--accent); color:var(--ink); }
.chip.on { background:var(--accent); border-color:var(--accent); color:var(--accent-contrast); }

.iconbtn {
  display:inline-flex; align-items:center; justify-content:center; cursor:pointer;
  border:1px solid var(--line2); background:var(--surface); color:var(--ink2);
  border-radius:11px; width:38px; height:38px; transition:.16s;
}
.iconbtn:hover { color:var(--ink); border-color:var(--accent); transform:translateY(-1px); }

.widget { transition:box-shadow .2s, transform .2s, opacity .2s; }
.widget:hover { box-shadow:0 1px 2px rgba(0,0,0,.05), 0 24px 50px -26px rgba(27,42,32,.5); }
.widget.dragging { opacity:.35; }
.widget.over { outline:2px dashed var(--accent); outline-offset:3px; }
.grip { cursor:grab; color:var(--muted); display:inline-flex; padding:2px; border-radius:6px; }
.grip:active { cursor:grabbing; }
.grip:hover { color:var(--ink); background:color-mix(in srgb, var(--accent) 14%, transparent); }

.row { display:flex; align-items:center; }
.listrow { border-top:1px solid var(--line); transition:background .15s; }
.listrow:hover { background:color-mix(in srgb, var(--accent) 6%, transparent); }
.dash input.search {
  font-family:var(--sans); font-size:13.5px; color:var(--ink); background:var(--surface2);
  border:1px solid var(--line); border-radius:10px; padding:8px 11px 8px 32px; width:100%; outline:none;
}
.dash input.search:focus { border-color:var(--accent); }
.dash input.nameedit {
  font-family:var(--serif); font-size:clamp(26px,4vw,38px); font-weight:600; color:var(--ink);
  background:transparent; border:none; border-bottom:2px solid var(--accent); outline:none; padding:0 2px; width:min(420px,70vw);
}
.softbtn {
  font-family:var(--sans); font-size:12.5px; font-weight:600; cursor:pointer;
  border:1px solid var(--line2); background:transparent; color:var(--ink2);
  padding:6px 11px; border-radius:9px; transition:.16s; display:inline-flex; align-items:center; gap:6px;
}
.softbtn:hover { border-color:var(--accent); color:var(--ink); }
.softbtn.solid { background:var(--accent); border-color:var(--accent); color:var(--accent-contrast); }
.scrollbar::-webkit-scrollbar { width:8px; height:8px; }
.scrollbar::-webkit-scrollbar-thumb { background:var(--line2); border-radius:8px; }
.tl-dot { width:13px; height:13px; border-radius:50%; flex:none; }
.bar-track { height:7px; border-radius:99px; background:var(--surface2); overflow:hidden; }
.bar-fill { height:100%; border-radius:99px; background:var(--accent); }
@media (max-width:900px){ .grid2 { grid-template-columns:1fr !important; } .wide { grid-column:auto !important; } }
`;

const ACCENTS = {
  Teal:        { main: "#00ACA0", contrast: "#FFFFFF" },
  "Deep teal": { main: "#0A7D77", contrast: "#FFFFFF" },
  Ocean:       { main: "#1F6F8B", contrast: "#FFFFFF" },
  Forest:      { main: "#2E7D52", contrast: "#FFFFFF" },
  Slate:       { main: "#42596A", contrast: "#FFFFFF" },
};

/* ------------------------------------------------------------------ */
/*  Sample data (illustrative placeholder content)                     */
/* ------------------------------------------------------------------ */
const EMISSIONS = [
  { year: "2021", s1: 4200, s2: 3100, s3: 12800 },
  { year: "2022", s1: 3950, s2: 2700, s3: 12100 },
  { year: "2023", s1: 3600, s2: 2200, s3: 11200 },
  { year: "2024", s1: 3300, s2: 1700, s3: 10400 },
  { year: "2025", s1: 3050, s2: 1250, s3: 9600 },
].map(d => ({ ...d, total: d.s1 + d.s2 + d.s3 }));

const BASELINE = EMISSIONS[0].total;
const CURRENT = EMISSIONS[EMISSIONS.length - 1].total;
const PRIOR = EMISSIONS[EMISSIONS.length - 2].total;
const TARGET_2030 = Math.round(BASELINE * 0.58); // 42% reduction pathway

const SCOPE_META = [
  { key: "s1", label: "Scope 1 · Direct", colour: "var(--scope1)", Icon: Factory },
  { key: "s2", label: "Scope 2 · Energy", colour: "var(--scope2)", Icon: Zap },
  { key: "s3", label: "Scope 3 · Value chain", colour: "var(--scope3)", Icon: Truck },
];

const REPORTS = [
  { id: "r1", title: "2025 GHG Inventory Report", status: "In Review", due: "12 Jun 2026", progress: 82, note: "Verification queries from assurance team being resolved." },
  { id: "r2", title: "SBTi Near-Term Target Submission", status: "Draft", due: "30 Jun 2026", progress: 45, note: "Awaiting board sign-off on the 42% reduction pathway." },
  { id: "r3", title: "TCFD Climate Risk Disclosure", status: "In Progress", due: "18 Jul 2026", progress: 60, note: "Scenario analysis drafted, financial impact under review." },
  { id: "r4", title: "CDP Climate Questionnaire", status: "Draft", due: "31 Jul 2026", progress: 30, note: "Response template populated from the inventory dataset." },
  { id: "r5", title: "Supplier Engagement Summary", status: "Final", due: "Completed", progress: 100, note: "Issued to procurement and the executive committee." },
];
const REPORT_STATUS = ["All", "Draft", "In Progress", "In Review", "Final"];
const STATUS_COLOUR = {
  "Draft": "var(--muted)", "In Progress": "var(--warn)",
  "In Review": "var(--accent)", "Final": "var(--positive)",
};

const TIMELINE = [
  { label: "Data collection", date: "Mar 2026", state: "done" },
  { label: "Emissions baseline verified", date: "Apr 2026", state: "done" },
  { label: "Reduction targets modelled", date: "May 2026", state: "done" },
  { label: "Draft report prepared", date: "Jun 2026", state: "active" },
  { label: "Client review", date: "Jul 2026", state: "next" },
  { label: "Assurance and verification", date: "Aug 2026", state: "next" },
  { label: "Final submission", date: "Sep 2026", state: "next" },
];

const MEETINGS = [
  { id: "m1", title: "Quarterly Progress Review", date: "Tue 3 Jun 2026", time: "10:00 BST", mode: "Video call", people: 6 },
  { id: "m2", title: "SBTi Target Workshop", date: "Thu 12 Jun 2026", time: "14:00 BST", mode: "Video call", people: 4 },
  { id: "m3", title: "Supplier Data Deep-Dive", date: "Mon 23 Jun 2026", time: "09:30 BST", mode: "Onsite, London", people: 8 },
  { id: "m4", title: "Board Sustainability Briefing", date: "Wed 2 Jul 2026", time: "11:00 BST", mode: "Hybrid", people: 11 },
];

const DOCS = [
  { id: "d1", name: "2025_GHG_Inventory_Draft_v3.pdf", cat: "Report", size: "2.4 MB", date: "28 May 2026", kind: "pdf" },
  { id: "d2", name: "Emissions_Calculation_Model.xlsx", cat: "Data", size: "5.1 MB", date: "26 May 2026", kind: "sheet" },
  { id: "d3", name: "Scope3_Supplier_Survey.csv", cat: "Data", size: "880 KB", date: "20 May 2026", kind: "sheet" },
  { id: "d4", name: "Methodology_Statement.docx", cat: "Reference", size: "340 KB", date: "14 May 2026", kind: "doc" },
  { id: "d5", name: "Carbon_Reduction_Roadmap.pdf", cat: "Strategy", size: "1.7 MB", date: "9 May 2026", kind: "pdf" },
  { id: "d6", name: "Assurance_Engagement_Letter.pdf", cat: "Governance", size: "210 KB", date: "2 May 2026", kind: "pdf" },
];
const DOC_CATS = ["All", "Report", "Data", "Strategy", "Reference", "Governance"];

const NEWS = [
  { id: "n1", cat: "Policy", title: "CSRD reporting requirements continue phased roll-out for large undertakings", source: "Regulatory brief", time: "2h ago" },
  { id: "n2", cat: "Standards", title: "Updated guidance published for corporate net-zero target setting", source: "Standards body", time: "Yesterday" },
  { id: "n3", cat: "Markets", title: "Renewable power purchase agreements reshape Scope 2 procurement strategies", source: "Market watch", time: "2 days ago" },
  { id: "n4", cat: "Science", title: "Latest synthesis underscores the narrowing window for near-term mitigation", source: "Research digest", time: "4 days ago" },
  { id: "n5", cat: "Standards", title: "Sustainability disclosure standards adoption widens across jurisdictions", source: "Standards body", time: "5 days ago" },
  { id: "n6", cat: "Markets", title: "Voluntary carbon market shifts toward integrity and high-quality credits", source: "Market watch", time: "1 week ago" },
];
const NEWS_CATS = ["All", "Policy", "Standards", "Markets", "Science"];

const fmt = (n) => n.toLocaleString("en-GB");

/* ---- data for the additional widgets ---- */
const INTENSITY = [
  { label: "Per £m revenue", value: 12.4, prior: 14.1, unit: "tCO₂e" },
  { label: "Per employee (FTE)", value: 5.6, prior: 6.3, unit: "tCO₂e" },
  { label: "Per m² floor area", value: 38, prior: 44, unit: "kgCO₂e" },
  { label: "Per unit produced", value: 0.82, prior: 0.95, unit: "tCO₂e" },
];
const ROADMAP = [
  { year: "2021", actual: 20100, pathway: 20100 },
  { year: "2023", actual: 17000, pathway: 16400 },
  { year: "2025", actual: 13900, pathway: 14200 },
  { year: "2030", actual: null, pathway: 11658 },
  { year: "2040", actual: null, pathway: 5000 },
  { year: "2050", actual: null, pathway: 1000 },
];
const INITIATIVES = [
  { name: "Rooftop solar and on-site generation", status: "In delivery", expect: 1250, done: 410, cost: "£2.1m", payback: "6.2 yr" },
  { name: "Fleet electrification (phase 1)", status: "In delivery", expect: 680, done: 240, cost: "£1.4m", payback: "5.1 yr" },
  { name: "Renewable electricity PPA", status: "Live", expect: 1900, done: 1900, cost: "n/a", payback: "n/a" },
  { name: "LED and HVAC retrofit", status: "Complete", expect: 320, done: 320, cost: "£480k", payback: "3.4 yr" },
  { name: "Supplier decarbonisation programme", status: "Scoping", expect: 2400, done: 0, cost: "TBC", payback: "TBC" },
  { name: "Business travel reduction policy", status: "Live", expect: 210, done: 150, cost: "£0", payback: "Immediate" },
];
const INIT_COLOUR = { "Live": "var(--positive)", "In delivery": "var(--warn)", "Complete": "var(--accent)", "Scoping": "var(--muted)" };
const OFFSET_SPLIT = [
  { label: "Nature-based removals", pct: 45, colour: "var(--scope3)" },
  { label: "Engineered removals", pct: 15, colour: "var(--accent)" },
  { label: "Avoidance credits", pct: 40, colour: "var(--scope2)" },
];
const OFFSET_HOLDINGS = [
  { name: "Afforestation, Kenya", type: "Removal", vol: "1,800 t", vintage: "2024" },
  { name: "Biochar carbon removal", type: "Removal", vol: "600 t", vintage: "2025" },
  { name: "Improved cookstoves", type: "Avoidance", vol: "1,800 t", vintage: "2023" },
];
const DATA_SITES = [
  { name: "London HQ", state: "Submitted" },
  { name: "Manchester plant", state: "Submitted" },
  { name: "Bristol depot", state: "In review" },
  { name: "Leeds office", state: "Outstanding" },
  { name: "Glasgow site", state: "Outstanding" },
];
const DATA_STATE_C = { "Submitted": "var(--positive)", "In review": "var(--warn)", "Outstanding": "var(--danger)" };
const S3_CATS = [
  { label: "Purchased goods and services", pct: 46 },
  { label: "Use of sold products", pct: 22 },
  { label: "Capital goods", pct: 12 },
  { label: "Upstream transport", pct: 9 },
  { label: "Business travel", pct: 6 },
  { label: "Employee commuting", pct: 5 },
];
const COMPLIANCE = [
  { name: "SECR annual report", deadline: "30 Sep 2026", status: "On track" },
  { name: "CDP Climate disclosure", deadline: "31 Jul 2026", status: "In progress" },
  { name: "UK ETS surrender", deadline: "30 Apr 2027", status: "On track" },
  { name: "CSRD readiness (FY2025)", deadline: "31 Mar 2027", status: "In progress" },
  { name: "ESOS Phase 4", deadline: "5 Dec 2027", status: "Not started" },
];
const COMP_C = { "On track": "var(--positive)", "In progress": "var(--warn)", "Not started": "var(--muted)" };
const FRAMEWORKS = [
  { name: "TCFD", pct: 85 },
  { name: "CDP", pct: 78 },
  { name: "GRI Standards", pct: 70 },
  { name: "ISSB (IFRS S2)", pct: 62 },
  { name: "CSRD (ESRS)", pct: 48 },
];
const RATINGS = [
  { name: "CDP Climate", value: "B", prior: "C", note: "Management band" },
  { name: "EcoVadis", value: "68", prior: "61", note: "Silver medal" },
  { name: "MSCI ESG", value: "AA", prior: "A", note: "Leader" },
  { name: "Sustainalytics", value: "18.4", prior: "22.1", note: "Low risk" },
];
const ACTION_ITEMS = [
  { id: "a1", text: "Approve the −42% near-term target pathway", due: "6 Jun", pri: "High" },
  { id: "a2", text: "Upload Q2 utility data for Leeds and Glasgow", due: "13 Jun", pri: "High" },
  { id: "a3", text: "Review and sign off the GHG Inventory draft", due: "20 Jun", pri: "Medium" },
  { id: "a4", text: "Nominate a Scope 3 data owner in procurement", due: "27 Jun", pri: "Medium" },
  { id: "a5", text: "Confirm attendees for the board briefing", due: "30 Jun", pri: "Low" },
];
const PRI_C = { High: "var(--danger)", Medium: "var(--warn)", Low: "var(--muted)" };
const TEAM = [
  { name: "Dr. Amara Okafor", role: "Principal Consultant", init: "AO", email: "amara.okafor@terralume.co" },
  { name: "Tom Whitfield", role: "Carbon Analyst", init: "TW", email: "tom.whitfield@terralume.co" },
];
const ACHIEVEMENTS = [
  { name: "ISO 14001", note: "Certified 2024", state: "held" },
  { name: "Carbon Trust Standard", note: "Held", state: "held" },
  { name: "CDP B score", note: "Achieved 2025", state: "held" },
  { name: "Science-based target", note: "Submitted", state: "progress" },
  { name: "ISO 50001", note: "In progress", state: "progress" },
  { name: "B Corp", note: "Target 2027", state: "target" },
];
const ACH_C = { held: "var(--positive)", progress: "var(--warn)", target: "var(--muted)" };
const GUIDES = [
  "Understanding Scope 1, 2 and 3",
  "How we calculate your footprint",
  "Setting science-based targets",
  "Preparing for CSRD",
];
const GLOSSARY = [
  { t: "tCO₂e", d: "Tonnes of carbon dioxide equivalent, a common unit covering all greenhouse gases." },
  { t: "SBTi", d: "The Science Based Targets initiative, which validates corporate emissions targets." },
  { t: "GHG Protocol", d: "The most widely used standard for measuring and reporting emissions." },
  { t: "Net zero", d: "Cutting emissions as far as possible and neutralising any residual amount." },
  { t: "CBAM", d: "The EU Carbon Border Adjustment Mechanism, a charge applied to certain imports." },
];

/* ------------------------------------------------------------------ */
/*  Small shared pieces                                                */
/* ------------------------------------------------------------------ */
function Badge({ status }) {
  const c = STATUS_COLOUR[status] || "var(--muted)";
  return (
    <span className="row mono" style={{
      gap: 6, fontSize: 11, fontWeight: 600, color: c, padding: "3px 9px", borderRadius: 999,
      background: "color-mix(in srgb, " + c + " 14%, transparent)",
    }}>
      <span style={{ width: 6, height: 6, borderRadius: 99, background: c }} /> {status}
    </span>
  );
}

function CardHead({ Icon, title, sub, meta, arm, onHide, children }) {
  return (
    <div className="row" style={{ justifyContent: "space-between", padding: "16px 18px 12px", gap: 10 }}>
      <div className="row" style={{ gap: 11, minWidth: 0 }}>
        <span
          className="grip"
          title="Drag to reorder"
          onMouseDown={() => arm && arm(true)}
          onMouseUp={() => arm && arm(false)}
        >
          <GripVertical size={16} />
        </span>
        <span style={{
          width: 34, height: 34, borderRadius: 10, flex: "none", display: "grid", placeItems: "center",
          background: "color-mix(in srgb, var(--accent) 14%, transparent)", color: "var(--accent)",
        }}>
          <Icon size={17} />
        </span>
        <div style={{ minWidth: 0 }}>
          <div className="serif" style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.1 }}>{title}</div>
          {sub && <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{sub}</div>}
        </div>
      </div>
      <div className="row" style={{ gap: 8 }}>
        {children}
        {meta}
        {onHide && (
          <button className="iconbtn" title="Hide widget" style={{ width: 30, height: 30, borderRadius: 9 }} onClick={onHide}>
            <Eye size={14} />
          </button>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Widget: GHG emissions                                              */
/* ------------------------------------------------------------------ */
function EmissionsWidget(props) {
  const [scopes, setScopes] = useState({ s1: true, s2: true, s3: true });
  const [view, setView] = useState("stacked");
  const toggle = (k) => setScopes(s => ({ ...s, [k]: !s[k] }));

  const last = EMISSIONS[EMISSIONS.length - 1];
  const splitTotal = SCOPE_META.reduce((a, m) => a + (scopes[m.key] ? last[m.key] : 0), 0) || 1;
  let acc = 0;
  const stops = SCOPE_META.filter(m => scopes[m.key]).map(m => {
    const start = (acc / splitTotal) * 360; acc += last[m.key];
    const end = (acc / splitTotal) * 360;
    return `${m.colour} ${start}deg ${end}deg`;
  }).join(", ");

  const Tip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;
    const row = EMISSIONS.find(e => e.year === label);
    return (
      <div className="card mono" style={{ padding: "10px 12px", fontSize: 12, boxShadow: "var(--shadow)" }}>
        <div className="serif" style={{ fontSize: 14, marginBottom: 6 }}>{label}</div>
        {SCOPE_META.map(m => scopes[m.key] && (
          <div key={m.key} className="row" style={{ gap: 8, justifyContent: "space-between" }}>
            <span style={{ color: m.colour }}>{m.label.split(" · ")[0]}</span>
            <span>{fmt(row[m.key])}</span>
          </div>
        ))}
        <div className="row" style={{ gap: 8, justifyContent: "space-between", marginTop: 4, borderTop: "1px solid var(--line)", paddingTop: 4 }}>
          <span style={{ color: "var(--muted)" }}>Total</span><span>{fmt(row.total)}</span>
        </div>
      </div>
    );
  };

  return (
    <div className={"card widget wide " + (props.cls || "")} style={{ gridColumn: "span 2", ...props.frame }}
      {...props.dnd}>
      <CardHead Icon={Leaf} title="Greenhouse gas emissions" sub="tCO₂e by reporting year"
        arm={props.arm} onHide={props.onHide}>
        <button className="chip" onClick={() => setView(v => v === "stacked" ? "trend" : "stacked")}>
          {view === "stacked" ? "Trend view" : "Scope view"}
        </button>
      </CardHead>

      <div className="row" style={{ gap: 8, padding: "0 18px 6px", flexWrap: "wrap" }}>
        {SCOPE_META.map(m => (
          <button key={m.key} className={"chip" + (scopes[m.key] ? " on" : "")}
            onClick={() => toggle(m.key)}
            style={scopes[m.key] ? { background: m.colour, borderColor: m.colour, color: "#fff" } : {}}>
            <span className="row" style={{ gap: 6 }}><m.Icon size={12} /> {m.label.split(" · ")[0]}</span>
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.7fr 1fr", gap: 8, padding: "4px 12px 16px" }} className="grid2">
        <div style={{ height: 270 }}>
          <ResponsiveContainer width="100%" height="100%">
            {view === "stacked" ? (
              <BarChart data={EMISSIONS} margin={{ top: 16, right: 8, left: -8, bottom: 0 }} barCategoryGap="26%">
                <CartesianGrid vertical={false} stroke="var(--line)" />
                <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fill: "var(--muted)", fontSize: 12, fontFamily: "var(--mono)" }} />
                <YAxis tickLine={false} axisLine={false} width={48} tick={{ fill: "var(--muted)", fontSize: 11, fontFamily: "var(--mono)" }} tickFormatter={(v) => v / 1000 + "k"} />
                <Tooltip content={<Tip />} cursor={{ fill: "color-mix(in srgb, var(--accent) 9%, transparent)" }} />
                {scopes.s3 && <Bar dataKey="s3" stackId="a" fill="var(--scope3)" radius={[0, 0, 0, 0]} />}
                {scopes.s2 && <Bar dataKey="s2" stackId="a" fill="var(--scope2)" />}
                {scopes.s1 && <Bar dataKey="s1" stackId="a" fill="var(--scope1)" radius={[6, 6, 0, 0]} />}
                <ReferenceLine y={TARGET_2030} stroke="var(--accent)" strokeDasharray="5 4"
                  label={{ value: `2030 target · ${fmt(TARGET_2030)}`, position: "insideTopRight", fill: "var(--accent)", fontSize: 11, fontFamily: "var(--mono)" }} />
              </BarChart>
            ) : (
              <LineChart data={EMISSIONS} margin={{ top: 16, right: 12, left: -8, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="var(--line)" />
                <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fill: "var(--muted)", fontSize: 12, fontFamily: "var(--mono)" }} />
                <YAxis tickLine={false} axisLine={false} width={48} tick={{ fill: "var(--muted)", fontSize: 11, fontFamily: "var(--mono)" }} tickFormatter={(v) => v / 1000 + "k"} />
                <Tooltip content={<Tip />} cursor={{ stroke: "var(--accent)", strokeDasharray: "4 4" }} />
                <Line type="monotone" dataKey="total" stroke="var(--accent)" strokeWidth={3} dot={{ r: 4, fill: "var(--accent)" }} activeDot={{ r: 6 }} />
                <ReferenceLine y={TARGET_2030} stroke="var(--muted)" strokeDasharray="5 4"
                  label={{ value: "2030 target", position: "insideTopRight", fill: "var(--muted)", fontSize: 11, fontFamily: "var(--mono)" }} />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, padding: "8px 6px" }}>
          <div style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".08em", fontWeight: 600 }}>
            FY2025 split
          </div>
          <div style={{ position: "relative", width: 132, height: 132 }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: stops ? `conic-gradient(${stops})` : "var(--surface2)" }} />
            <div style={{ position: "absolute", inset: 18, borderRadius: "50%", background: "var(--surface)", display: "grid", placeItems: "center" }}>
              <div style={{ textAlign: "center" }}>
                <div className="serif" style={{ fontSize: 22, fontWeight: 600 }}>{fmt(splitTotal)}</div>
                <div className="mono" style={{ fontSize: 10, color: "var(--muted)" }}>tCO₂e</div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5, width: "100%" }}>
            {SCOPE_META.map(m => (
              <div key={m.key} className="row" style={{ justifyContent: "space-between", gap: 8, opacity: scopes[m.key] ? 1 : .4 }}>
                <span className="row" style={{ gap: 7, fontSize: 12, color: "var(--ink2)" }}>
                  <span style={{ width: 9, height: 9, borderRadius: 3, background: m.colour }} />{m.label.split(" · ")[1]}
                </span>
                <span className="mono" style={{ fontSize: 12 }}>{Math.round((last[m.key] / last.total) * 100)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Widget: draft reports                                              */
/* ------------------------------------------------------------------ */
function ReportsWidget(props) {
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState(null);
  const list = REPORTS.filter(r => filter === "All" || r.status === filter);
  return (
    <div className={"card widget " + (props.cls || "")} style={props.frame} {...props.dnd}>
      <CardHead Icon={FileText} title="Draft reports" sub={`${REPORTS.filter(r => r.status !== "Final").length} in progress`}
        arm={props.arm} onHide={props.onHide} />
      <div className="scrollbar row" style={{ gap: 7, padding: "0 18px 10px", overflowX: "auto" }}>
        {REPORT_STATUS.map(s => (
          <button key={s} className={"chip" + (filter === s ? " on" : "")} onClick={() => setFilter(s)}>{s}</button>
        ))}
      </div>
      <div>
        {list.map(r => (
          <div key={r.id} className="listrow" style={{ padding: "12px 18px", cursor: "pointer" }}
            onClick={() => setOpen(o => o === r.id ? null : r.id)}>
            <div className="row" style={{ justifyContent: "space-between", gap: 10 }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.title}</div>
                <div className="row mono" style={{ gap: 8, fontSize: 11.5, color: "var(--muted)", marginTop: 4 }}>
                  <Clock size={12} /> Due {r.due}
                </div>
              </div>
              <div className="row" style={{ gap: 10, flex: "none" }}>
                <Badge status={r.status} />
                <ChevronRight size={16} style={{ color: "var(--muted)", transform: open === r.id ? "rotate(90deg)" : "none", transition: ".2s" }} />
              </div>
            </div>
            {open === r.id && (
              <div className="fade" style={{ marginTop: 11 }}>
                <div className="row" style={{ justifyContent: "space-between", marginBottom: 5 }}>
                  <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>Completion</span>
                  <span className="mono" style={{ fontSize: 11 }}>{r.progress}%</span>
                </div>
                <div className="bar-track"><div className="bar-fill" style={{ width: r.progress + "%" }} /></div>
                <p style={{ margin: "10px 0 4px", fontSize: 12.5, color: "var(--ink2)", lineHeight: 1.5 }}>{r.note}</p>
                <button className="softbtn" style={{ marginTop: 4 }} onClick={(e) => e.stopPropagation()}>
                  <FileText size={13} /> Open draft
                </button>
              </div>
            )}
          </div>
        ))}
        {list.length === 0 && <div style={{ padding: 24, textAlign: "center", color: "var(--muted)", fontSize: 13 }}>No reports in this status.</div>}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Widget: project timeline                                           */
/* ------------------------------------------------------------------ */
function TimelineWidget(props) {
  const doneCount = TIMELINE.filter(t => t.state === "done").length;
  const pct = Math.round((doneCount / TIMELINE.length) * 100);
  return (
    <div className={"card widget " + (props.cls || "")} style={props.frame} {...props.dnd}>
      <CardHead Icon={Target} title="Project timeline" sub={`${pct}% of milestones complete`}
        arm={props.arm} onHide={props.onHide}
        meta={<span className="mono" style={{ fontSize: 13, fontWeight: 600, color: "var(--accent)" }}>{doneCount}/{TIMELINE.length}</span>} />
      <div style={{ padding: "6px 20px 18px" }}>
        {TIMELINE.map((t, i) => {
          const colour = t.state === "done" ? "var(--positive)" : t.state === "active" ? "var(--accent)" : "var(--muted)";
          const Ico = t.state === "done" ? CheckCircle2 : t.state === "active" ? CircleDot : Circle;
          return (
            <div key={i} className="row" style={{ gap: 13, alignItems: "stretch" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Ico size={18} style={{ color: colour, flex: "none" }} />
                {i < TIMELINE.length - 1 && <div style={{ width: 2, flex: 1, minHeight: 16, background: t.state === "done" ? "var(--positive)" : "var(--line2)" }} />}
              </div>
              <div style={{ paddingBottom: i < TIMELINE.length - 1 ? 14 : 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: t.state === "active" ? 700 : 500, color: t.state === "next" ? "var(--ink2)" : "var(--ink)" }}>
                  {t.label}
                </div>
                <div className="mono" style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>
                  {t.date}{t.state === "active" && " · current stage"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Widget: meetings                                                   */
/* ------------------------------------------------------------------ */
function MeetingsWidget(props) {
  const [rsvp, setRsvp] = useState({});
  const set = (id, v) => setRsvp(r => ({ ...r, [id]: r[id] === v ? null : v }));
  return (
    <div className={"card widget " + (props.cls || "")} style={props.frame} {...props.dnd}>
      <CardHead Icon={CalendarDays} title="Upcoming meetings" sub={`Next: ${MEETINGS[0].date}`}
        arm={props.arm} onHide={props.onHide} />
      <div>
        {MEETINGS.map(m => {
          const status = rsvp[m.id];
          return (
            <div key={m.id} className="listrow" style={{ padding: "13px 18px" }}>
              <div className="row" style={{ gap: 13 }}>
                <div style={{
                  flex: "none", width: 46, textAlign: "center", borderRadius: 10, padding: "6px 0",
                  background: "color-mix(in srgb, var(--accent) 12%, transparent)",
                }}>
                  <div className="mono" style={{ fontSize: 10, color: "var(--accent)", textTransform: "uppercase" }}>{m.date.split(" ")[1]}</div>
                  <div className="serif" style={{ fontSize: 19, fontWeight: 600, lineHeight: 1, color: "var(--accent)" }}>{m.date.split(" ")[2]}</div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{m.title}</div>
                  <div className="row mono" style={{ gap: 12, fontSize: 11.5, color: "var(--muted)", marginTop: 3, flexWrap: "wrap" }}>
                    <span className="row" style={{ gap: 5 }}><Clock size={12} />{m.time}</span>
                    <span className="row" style={{ gap: 5 }}>{m.mode.includes("Onsite") ? <MapPin size={12} /> : <Video size={12} />}{m.mode}</span>
                    <span className="row" style={{ gap: 5 }}><Users size={12} />{m.people}</span>
                  </div>
                </div>
              </div>
              <div className="row" style={{ gap: 8, marginTop: 10, paddingLeft: 59 }}>
                <button className={"softbtn" + (status === "yes" ? " solid" : "")} onClick={() => set(m.id, "yes")}>
                  <Check size={13} /> Attend
                </button>
                <button className="softbtn" style={status === "no" ? { borderColor: "var(--danger)", color: "var(--danger)" } : {}} onClick={() => set(m.id, "no")}>
                  <X size={13} /> Decline
                </button>
                {status && <span className="mono fade" style={{ fontSize: 11, color: status === "yes" ? "var(--positive)" : "var(--danger)" }}>
                  {status === "yes" ? "Confirmed" : "Declined"}
                </span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Widget: documents                                                  */
/* ------------------------------------------------------------------ */
function DocsWidget(props) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [docs, setDocs] = useState(DOCS);
  const [uploads, setUploads] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);
  const idc = useRef(0);

  const KindIcon = { pdf: FileText, sheet: FileSpreadsheet, doc: File };
  const list = docs.filter(d =>
    (cat === "All" || d.cat === cat) &&
    d.name.toLowerCase().includes(q.toLowerCase()));

  const humanSize = (b) =>
    b >= 1048576 ? (b / 1048576).toFixed(1) + " MB" : b >= 1024 ? Math.round(b / 1024) + " KB" : (b || 0) + " B";
  const kindFor = (name) => {
    const e = (name.split(".").pop() || "").toLowerCase();
    if (["xlsx", "xls", "csv"].includes(e)) return "sheet";
    if (e === "pdf") return "pdf";
    if (["doc", "docx", "txt", "rtf"].includes(e)) return "doc";
    return "file";
  };
  const catFor = (k) => (k === "pdf" ? "Report" : k === "doc" ? "Reference" : "Data");

  const addFiles = (fileList) => {
    Array.from(fileList).forEach((f) => {
      const id = "up_" + (++idc.current);
      const kind = kindFor(f.name);
      const rec = { id, name: f.name, size: humanSize(f.size), kind, cat: catFor(kind) };
      setUploads(u => [...u, { ...rec, progress: 6 }]);
      const tick = setInterval(() => {
        setUploads(u => {
          const cur = u.find(x => x.id === id);
          if (!cur) { clearInterval(tick); return u; }
          const next = cur.progress + Math.random() * 24 + 12;
          if (next >= 100) {
            clearInterval(tick);
            setDocs(d => [{ ...rec, date: "Just now", isNew: true }, ...d]);
            return u.filter(x => x.id !== id);
          }
          return u.map(x => x.id === id ? { ...x, progress: next } : x);
        });
      }, 240);
    });
  };

  const removeDoc = (id) => setDocs(d => d.filter(x => x.id !== id));

  return (
    <div className={"card widget " + (props.cls || "")} style={props.frame} {...props.dnd}>
      <CardHead Icon={FileText} title="Documents" sub={`${docs.length} files in this engagement`}
        arm={props.arm} onHide={props.onHide} />

      <div style={{ padding: "0 18px 12px" }}>
        <div
          onClick={() => inputRef.current && inputRef.current.click()}
          onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setDragActive(true); }}
          onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); setDragActive(true); }}
          onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setDragActive(false); }}
          onDrop={(e) => { e.preventDefault(); e.stopPropagation(); setDragActive(false); addFiles(e.dataTransfer.files); }}
          style={{
            border: "1.5px dashed " + (dragActive ? "var(--accent)" : "var(--line2)"),
            background: dragActive ? "color-mix(in srgb, var(--accent) 12%, transparent)" : "var(--surface2)",
            borderRadius: 13, padding: "16px 14px", textAlign: "center", cursor: "pointer", transition: ".18s",
          }}>
          <span style={{
            width: 38, height: 38, borderRadius: 11, display: "inline-grid", placeItems: "center", marginBottom: 6,
            background: "color-mix(in srgb, var(--accent) 16%, transparent)", color: "var(--accent)",
          }}>
            <UploadCloud size={19} />
          </span>
          <div style={{ fontSize: 13.5, fontWeight: 600 }}>
            Drag files here, or <span style={{ color: "var(--accent)", textDecoration: "underline" }}>browse</span>
          </div>
          <div className="mono" style={{ fontSize: 10.5, color: "var(--muted)", marginTop: 3 }}>
            Spreadsheets, CSV, PDF and documents
          </div>
          <input ref={inputRef} type="file" multiple style={{ display: "none" }}
            onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />
        </div>

        {uploads.map(u => {
          const Ico = KindIcon[u.kind] || File;
          return (
            <div key={u.id} className="fade" style={{ marginTop: 9 }}>
              <div className="row" style={{ gap: 9, justifyContent: "space-between" }}>
                <span className="row mono" style={{ gap: 8, fontSize: 12, minWidth: 0 }}>
                  <Ico size={15} style={{ color: "var(--accent)", flex: "none" }} />
                  <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{u.name}</span>
                </span>
                <span className="mono" style={{ fontSize: 11, color: "var(--muted)", flex: "none" }}>{Math.min(100, Math.round(u.progress))}%</span>
              </div>
              <div className="bar-track" style={{ marginTop: 5 }}>
                <div className="bar-fill" style={{ width: Math.min(100, u.progress) + "%", transition: "width .2s" }} />
              </div>
            </div>
          );
        })}

        <div style={{ position: "relative", margin: "12px 0 9px" }}>
          <Search size={15} style={{ position: "absolute", left: 10, top: 10, color: "var(--muted)" }} />
          <input className="search" placeholder="Search documents" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="scrollbar row" style={{ gap: 7, overflowX: "auto" }}>
          {DOC_CATS.map(c => <button key={c} className={"chip" + (cat === c ? " on" : "")} onClick={() => setCat(c)}>{c}</button>)}
        </div>
      </div>

      <div>
        {list.map(d => {
          const Ico = KindIcon[d.kind] || File;
          return (
            <div key={d.id} className="listrow row" style={{ padding: "11px 18px", justifyContent: "space-between", gap: 10 }}>
              <div className="row" style={{ gap: 11, minWidth: 0 }}>
                <span style={{ flex: "none", color: "var(--accent)" }}><Ico size={18} /></span>
                <div style={{ minWidth: 0 }}>
                  <div className="row" style={{ gap: 7 }}>
                    <span className="mono" style={{ fontSize: 12.5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{d.name}</span>
                    {d.isNew && <span className="mono" style={{ fontSize: 9.5, fontWeight: 600, color: "var(--positive)", background: "color-mix(in srgb, var(--positive) 16%, transparent)", padding: "1px 6px", borderRadius: 999, flex: "none" }}>NEW</span>}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{d.cat} · {d.size} · {d.date}</div>
                </div>
              </div>
              <div className="row" style={{ gap: 4, flex: "none" }}>
                {d.isNew && (
                  <button className="iconbtn" title="Remove upload" style={{ width: 32, height: 32, borderRadius: 9 }} onClick={() => removeDoc(d.id)}>
                    <Trash2 size={14} />
                  </button>
                )}
                <button className="iconbtn" title="Download" style={{ width: 32, height: 32, borderRadius: 9 }}>
                  <Download size={15} />
                </button>
              </div>
            </div>
          );
        })}
        {list.length === 0 && <div style={{ padding: 24, textAlign: "center", color: "var(--muted)", fontSize: 13 }}>No matching documents.</div>}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Widget: news                                                       */
/* ------------------------------------------------------------------ */
function NewsWidget(props) {
  const [cat, setCat] = useState("All");
  const [saved, setSaved] = useState({});
  const list = NEWS.filter(n => cat === "All" || n.cat === cat);
  return (
    <div className={"card widget " + (props.cls || "")} style={props.frame} {...props.dnd}>
      <CardHead Icon={Newspaper} title="Sustainability news" sub="Curated climate and policy briefing"
        arm={props.arm} onHide={props.onHide} />
      <div className="scrollbar row" style={{ gap: 7, padding: "0 18px 10px", overflowX: "auto" }}>
        {NEWS_CATS.map(c => <button key={c} className={"chip" + (cat === c ? " on" : "")} onClick={() => setCat(c)}>{c}</button>)}
      </div>
      <div>
        {list.map(n => (
          <div key={n.id} className="listrow row" style={{ padding: "13px 18px", gap: 12, alignItems: "flex-start", justifyContent: "space-between" }}>
            <div style={{ minWidth: 0 }}>
              <span className="mono" style={{ fontSize: 10, fontWeight: 600, color: "var(--accent)", textTransform: "uppercase", letterSpacing: ".06em" }}>{n.cat}</span>
              <div style={{ fontSize: 13.5, fontWeight: 500, lineHeight: 1.35, margin: "3px 0 4px" }}>{n.title}</div>
              <div className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>{n.source} · {n.time}</div>
            </div>
            <div className="row" style={{ gap: 4, flex: "none" }}>
              <button className="iconbtn" title="Save" style={{ width: 30, height: 30, borderRadius: 8 }}
                onClick={() => setSaved(s => ({ ...s, [n.id]: !s[n.id] }))}>
                <Bookmark size={14} style={{ fill: saved[n.id] ? "var(--accent)" : "transparent", color: saved[n.id] ? "var(--accent)" : "var(--ink2)" }} />
              </button>
              <button className="iconbtn" title="Read" style={{ width: 30, height: 30, borderRadius: 8 }}><ArrowUpRight size={14} /></button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: "9px 18px 14px", fontSize: 11, color: "var(--muted)", borderTop: "1px solid var(--line)" }}>
        Sample feed shown. Connect a live source to populate this section automatically.
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Customise panel                                                    */
/* ------------------------------------------------------------------ */
function CustomisePanel({ open, onClose, theme, setTheme, accent, setAccent, order, hidden, toggleHidden, reset }) {
  if (!open) return null;
  return (
    <div className="fade" style={{ position: "fixed", inset: 0, zIndex: 60, background: "rgba(8,12,8,.4)" }} onClick={onClose}>
      <div className="slidein scrollbar" onClick={(e) => e.stopPropagation()} style={{
        position: "absolute", top: 0, right: 0, height: "100%", width: "min(360px,92vw)", overflowY: "auto",
        background: "var(--surface)", borderLeft: "1px solid var(--line)", boxShadow: "var(--shadow)", padding: 22,
      }}>
        <div className="row" style={{ justifyContent: "space-between", marginBottom: 20 }}>
          <div className="serif" style={{ fontSize: 22, fontWeight: 600 }}>Customise</div>
          <button className="iconbtn" onClick={onClose}><X size={18} /></button>
        </div>

        <div style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 10 }}>Appearance</div>
        <div className="row" style={{ gap: 8, marginBottom: 18 }}>
          <button className={"softbtn" + (theme === "light" ? " solid" : "")} style={{ flex: 1, justifyContent: "center" }} onClick={() => setTheme("light")}><Sun size={14} /> Light</button>
          <button className={"softbtn" + (theme === "dark" ? " solid" : "")} style={{ flex: 1, justifyContent: "center" }} onClick={() => setTheme("dark")}><Moon size={14} /> Dark</button>
        </div>

        <div style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 10 }}>Accent colour</div>
        <div className="row" style={{ gap: 10, marginBottom: 22, flexWrap: "wrap" }}>
          {Object.entries(ACCENTS).map(([name, v]) => (
            <button key={name} title={name} onClick={() => setAccent(name)} style={{
              width: 38, height: 38, borderRadius: 11, cursor: "pointer", background: v.main,
              border: accent === name ? "3px solid var(--ink)" : "3px solid transparent",
              display: "grid", placeItems: "center", transition: ".15s",
            }}>
              {accent === name && <Check size={16} color={v.contrast} />}
            </button>
          ))}
        </div>

        <div style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 10 }}>Widgets</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
          {order.map(id => {
            const w = WIDGETS[id]; const on = !hidden[id];
            return (
              <button key={id} onClick={() => toggleHidden(id)} className="row" style={{
                justifyContent: "space-between", padding: "11px 13px", borderRadius: 11, cursor: "pointer",
                border: "1px solid var(--line2)", background: on ? "color-mix(in srgb, var(--accent) 8%, transparent)" : "transparent",
              }}>
                <span className="row" style={{ gap: 10 }}>
                  <w.icon size={16} style={{ color: on ? "var(--accent)" : "var(--muted)" }} />
                  <span style={{ fontSize: 13.5, fontWeight: 600, color: on ? "var(--ink)" : "var(--muted)" }}>{w.title}</span>
                </span>
                <span style={{
                  width: 38, height: 22, borderRadius: 99, position: "relative", transition: ".2s",
                  background: on ? "var(--accent)" : "var(--line2)",
                }}>
                  <span style={{ position: "absolute", top: 2, left: on ? 18 : 2, width: 18, height: 18, borderRadius: 99, background: "#fff", transition: ".2s" }} />
                </span>
              </button>
            );
          })}
        </div>

        <button className="softbtn" style={{ width: "100%", justifyContent: "center" }} onClick={reset}>
          <RotateCcw size={14} /> Reset layout
        </button>
        <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 14, lineHeight: 1.5 }}>
          Drag any widget by its handle to reorder the dashboard. Toggle widgets on or off above.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Widget: target tracker                                             */
/* ------------------------------------------------------------------ */
function TargetsWidget(props) {
  const achieved = +(((BASELINE - CURRENT) / BASELINE) * 100).toFixed(1);
  const targetPct = 42;
  const toTarget = Math.round((achieved / targetPct) * 100);
  const requiredToDate = +(targetPct * (4 / 9)).toFixed(1);
  const ahead = achieved >= requiredToDate;
  const ahColour = ahead ? "var(--positive)" : "var(--warn)";
  const ring = `conic-gradient(var(--accent) 0 ${toTarget}%, var(--surface2) ${toTarget}% 100%)`;
  const commitments = [
    { label: "Near-term · SBTi 1.5°C", detail: "−42% by 2030", status: "On track", colour: "var(--positive)" },
    { label: "Long-term · Net zero", detail: "Net zero by 2050", status: "Committed", colour: "var(--accent)" },
  ];
  return (
    <div className={"card widget " + (props.cls || "")} style={props.frame} {...props.dnd}>
      <CardHead Icon={Gauge} title="Target tracker" sub="Progress toward science-based goals" arm={props.arm} onHide={props.onHide} />
      <div style={{ padding: "4px 18px 18px" }}>
        <div className="row" style={{ gap: 18, alignItems: "center" }}>
          <div style={{ position: "relative", width: 116, height: 116, flex: "none" }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: ring }} />
            <div style={{ position: "absolute", inset: 14, borderRadius: "50%", background: "var(--surface)", display: "grid", placeItems: "center" }}>
              <div style={{ textAlign: "center" }}>
                <div className="serif" style={{ fontSize: 25, fontWeight: 600, lineHeight: 1 }}>{toTarget}%</div>
                <div className="mono" style={{ fontSize: 9, color: "var(--muted)", marginTop: 3 }}>to 2030 target</div>
              </div>
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="row" style={{ gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
              <span className="serif" style={{ fontSize: 22, fontWeight: 600 }}>−{achieved}%</span>
              <span className="mono" style={{ fontSize: 10.5, fontWeight: 600, color: ahColour, background: "color-mix(in srgb, " + ahColour + " 16%, transparent)", padding: "3px 8px", borderRadius: 999 }}>
                {ahead ? "Ahead of pathway" : "Behind pathway"}
              </span>
            </div>
            <div style={{ fontSize: 12.5, color: "var(--ink2)", lineHeight: 1.5 }}>
              {achieved}% achieved against {requiredToDate}% required by now on the linear path to −42% by 2030.
            </div>
          </div>
        </div>
        <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
          {commitments.map((c, i) => (
            <div key={i} className="row" style={{ justifyContent: "space-between", padding: "10px 12px", borderRadius: 11, background: "var(--surface2)" }}>
              <div><div style={{ fontSize: 13, fontWeight: 600 }}>{c.label}</div>
                <div className="mono" style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{c.detail}</div></div>
              <span className="mono" style={{ fontSize: 11, fontWeight: 600, color: c.colour, background: "color-mix(in srgb, " + c.colour + " 16%, transparent)", padding: "3px 9px", borderRadius: 999, flex: "none" }}>{c.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Widget: emissions intensity                                        */
/* ------------------------------------------------------------------ */
function IntensityWidget(props) {
  return (
    <div className={"card widget " + (props.cls || "")} style={props.frame} {...props.dnd}>
      <CardHead Icon={Activity} title="Emissions intensity" sub="Normalised performance metrics" arm={props.arm} onHide={props.onHide} />
      <div>
        {INTENSITY.map((m, i) => {
          const change = +(((m.value - m.prior) / m.prior) * 100).toFixed(1);
          const down = change <= 0;
          const c = down ? "var(--positive)" : "var(--danger)";
          return (
            <div key={i} className="listrow row" style={{ padding: "13px 18px", justifyContent: "space-between" }}>
              <div><div style={{ fontSize: 13, fontWeight: 600 }}>{m.label}</div>
                <div className="mono" style={{ fontSize: 11, color: "var(--muted)", marginTop: 3 }}>prior {m.prior} {m.unit}</div></div>
              <div className="row" style={{ gap: 12 }}>
                <span className="serif" style={{ fontSize: 21, fontWeight: 600 }}>{m.value}<span className="mono" style={{ fontSize: 10, color: "var(--muted)", marginLeft: 4 }}>{m.unit}</span></span>
                <span className="row mono" style={{ gap: 4, fontSize: 11.5, fontWeight: 600, color: c, background: "color-mix(in srgb, " + c + " 15%, transparent)", padding: "4px 8px", borderRadius: 999, minWidth: 62, justifyContent: "center" }}>
                  {down ? <TrendingDown size={13} /> : <TrendingUp size={13} />}{Math.abs(change)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Widget: net-zero roadmap (wide)                                    */
/* ------------------------------------------------------------------ */
function RoadmapWidget(props) {
  const Tip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;
    return (
      <div className="card mono" style={{ padding: "9px 11px", fontSize: 12 }}>
        <div className="serif" style={{ fontSize: 13, marginBottom: 4 }}>{label}</div>
        {payload.filter(pp => pp.value != null).map(pp => (
          <div key={pp.dataKey} className="row" style={{ gap: 12, justifyContent: "space-between" }}>
            <span style={{ color: pp.color, textTransform: "capitalize" }}>{pp.dataKey}</span><span>{fmt(pp.value)}</span>
          </div>
        ))}
      </div>
    );
  };
  const milestones = [{ y: "2030", t: "−42% near-term" }, { y: "2040", t: "−75% interim" }, { y: "2050", t: "Net zero" }];
  return (
    <div className={"card widget wide " + (props.cls || "")} style={{ gridColumn: "span 2", ...props.frame }} {...props.dnd}>
      <CardHead Icon={Route} title="Net-zero roadmap" sub="Decarbonisation trajectory to 2050" arm={props.arm} onHide={props.onHide} />
      <div style={{ height: 230, padding: "6px 14px 4px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={ROADMAP} margin={{ top: 16, right: 18, left: -6, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="var(--line)" />
            <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fill: "var(--muted)", fontSize: 12, fontFamily: "var(--mono)" }} />
            <YAxis tickLine={false} axisLine={false} width={48} tick={{ fill: "var(--muted)", fontSize: 11, fontFamily: "var(--mono)" }} tickFormatter={(v) => v / 1000 + "k"} />
            <Tooltip content={<Tip />} />
            <Line type="monotone" dataKey="pathway" stroke="var(--muted)" strokeWidth={2} strokeDasharray="5 4" dot={{ r: 3 }} connectNulls />
            <Line type="monotone" dataKey="actual" stroke="var(--accent)" strokeWidth={3} dot={{ r: 4, fill: "var(--accent)" }} connectNulls={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="row" style={{ gap: 8, padding: "0 18px 16px", flexWrap: "wrap" }}>
        {milestones.map((m, i) => (
          <span key={i} className="row mono" style={{ gap: 7, fontSize: 11.5, padding: "5px 11px", borderRadius: 999, background: "var(--surface2)", color: "var(--ink2)" }}>
            <span style={{ color: "var(--accent)", fontWeight: 600 }}>{m.y}</span> {m.t}
          </span>
        ))}
        <span className="row mono" style={{ gap: 6, fontSize: 11, color: "var(--muted)", marginLeft: "auto" }}>
          <span style={{ width: 16, borderTop: "3px solid var(--accent)", display: "inline-block" }} /> Actual
          <span style={{ width: 16, borderTop: "2px dashed var(--muted)", display: "inline-block", marginLeft: 6 }} /> Pathway
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Widget: reduction initiatives (wide)                               */
/* ------------------------------------------------------------------ */
function InitiativesWidget(props) {
  const totalExpect = INITIATIVES.reduce((a, i) => a + i.expect, 0);
  const totalDone = INITIATIVES.reduce((a, i) => a + i.done, 0);
  return (
    <div className={"card widget wide " + (props.cls || "")} style={{ gridColumn: "span 2", ...props.frame }} {...props.dnd}>
      <CardHead Icon={Sprout} title="Reduction initiatives" sub="Active decarbonisation projects" arm={props.arm} onHide={props.onHide}
        meta={<span className="mono" style={{ fontSize: 12, color: "var(--ink2)" }}>{fmt(totalDone)} / {fmt(totalExpect)} tCO₂e</span>} />
      <div>
        {INITIATIVES.map((it, i) => {
          const pct = Math.round((it.done / it.expect) * 100) || 0;
          const c = INIT_COLOUR[it.status];
          return (
            <div key={i} className="listrow" style={{ padding: "12px 18px" }}>
              <div className="row" style={{ justifyContent: "space-between", gap: 10, marginBottom: 7 }}>
                <span className="row" style={{ gap: 9, minWidth: 0 }}>
                  <span style={{ fontSize: 13.5, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{it.name}</span>
                  <span className="mono" style={{ flex: "none", fontSize: 10.5, fontWeight: 600, color: c, background: "color-mix(in srgb, " + c + " 15%, transparent)", padding: "2px 8px", borderRadius: 999 }}>{it.status}</span>
                </span>
                <span className="mono" style={{ fontSize: 11.5, color: "var(--muted)", flex: "none" }}>{it.cost} · {it.payback}</span>
              </div>
              <div className="row" style={{ gap: 10 }}>
                <div className="bar-track" style={{ flex: 1 }}><div className="bar-fill" style={{ width: pct + "%", background: c }} /></div>
                <span className="mono" style={{ fontSize: 11, color: "var(--ink2)", flex: "none", width: 156, textAlign: "right" }}>{fmt(it.done)} of {fmt(it.expect)} tCO₂e/yr</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Widget: offsets and removals                                       */
/* ------------------------------------------------------------------ */
function OffsetsWidget(props) {
  let acc = 0;
  const stops = OFFSET_SPLIT.map(sl => { const a = acc; acc += sl.pct; return `${sl.colour} ${a * 3.6}deg ${acc * 3.6}deg`; }).join(", ");
  return (
    <div className={"card widget " + (props.cls || "")} style={props.frame} {...props.dnd}>
      <CardHead Icon={Trees} title="Offsets and removals" sub="Credits retired this year" arm={props.arm} onHide={props.onHide}
        meta={<span className="serif" style={{ fontSize: 16, fontWeight: 600, color: "var(--accent)" }}>4,200 t</span>} />
      <div className="row" style={{ gap: 16, padding: "6px 18px 12px", alignItems: "center" }}>
        <div style={{ position: "relative", width: 100, height: 100, flex: "none" }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: `conic-gradient(${stops})` }} />
          <div style={{ position: "absolute", inset: 15, borderRadius: "50%", background: "var(--surface)", display: "grid", placeItems: "center" }}>
            <Trees size={25} style={{ color: "var(--accent)" }} />
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 7 }}>
          {OFFSET_SPLIT.map((sl, i) => (
            <div key={i} className="row" style={{ justifyContent: "space-between", gap: 8 }}>
              <span className="row" style={{ gap: 7, fontSize: 12, color: "var(--ink2)" }}><span style={{ width: 9, height: 9, borderRadius: 3, background: sl.colour }} />{sl.label}</span>
              <span className="mono" style={{ fontSize: 12 }}>{sl.pct}%</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        {OFFSET_HOLDINGS.map((h, i) => (
          <div key={i} className="listrow row" style={{ padding: "10px 18px", justifyContent: "space-between" }}>
            <div><div style={{ fontSize: 12.5, fontWeight: 600 }}>{h.name}</div>
              <div className="mono" style={{ fontSize: 10.5, color: "var(--muted)", marginTop: 2 }}>{h.type} · vintage {h.vintage}</div></div>
            <span className="mono" style={{ fontSize: 12, color: "var(--accent)" }}>{h.vol}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Widget: data collection                                            */
/* ------------------------------------------------------------------ */
function DataWidget(props) {
  const completeness = 86, primary = 64;
  const outstanding = DATA_SITES.filter(sl => sl.state === "Outstanding").length;
  return (
    <div className={"card widget " + (props.cls || "")} style={props.frame} {...props.dnd}>
      <CardHead Icon={Database} title="Data collection" sub={`${outstanding} submissions outstanding`} arm={props.arm} onHide={props.onHide} />
      <div style={{ padding: "4px 18px 12px" }}>
        <div className="row" style={{ justifyContent: "space-between", marginBottom: 6 }}>
          <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>Overall completeness</span>
          <span className="serif" style={{ fontSize: 18, fontWeight: 600 }}>{completeness}%</span>
        </div>
        <div className="bar-track" style={{ height: 9 }}><div className="bar-fill" style={{ width: completeness + "%" }} /></div>
        <div className="mono" style={{ fontSize: 11, color: "var(--muted)", margin: "12px 0 4px" }}>Primary {primary}% · Estimated {100 - primary}%</div>
        <div className="row" style={{ height: 8, borderRadius: 99, overflow: "hidden" }}>
          <div style={{ width: primary + "%", background: "var(--scope3)" }} />
          <div style={{ width: (100 - primary) + "%", background: "var(--surface2)" }} />
        </div>
      </div>
      <div>
        {DATA_SITES.map((sl, i) => (
          <div key={i} className="listrow row" style={{ padding: "10px 18px", justifyContent: "space-between" }}>
            <span style={{ fontSize: 13, fontWeight: 500 }}>{sl.name}</span>
            <span className="row mono" style={{ gap: 7, fontSize: 11.5, fontWeight: 600, color: DATA_STATE_C[sl.state] }}>
              <span style={{ width: 7, height: 7, borderRadius: 99, background: DATA_STATE_C[sl.state] }} />{sl.state}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Widget: Scope 3 and suppliers                                      */
/* ------------------------------------------------------------------ */
function Scope3Widget(props) {
  const max = Math.max(...S3_CATS.map(c => c.pct));
  const tiles = [{ k: "142 / 410", l: "Suppliers engaged" }, { k: "58%", l: "Spend with data" }, { k: "22%", l: "Primary data" }];
  return (
    <div className={"card widget " + (props.cls || "")} style={props.frame} {...props.dnd}>
      <CardHead Icon={Boxes} title="Scope 3 and suppliers" sub="Value chain hotspots and engagement" arm={props.arm} onHide={props.onHide} />
      <div className="row" style={{ gap: 9, padding: "2px 18px 12px" }}>
        {tiles.map((x, i) => (
          <div key={i} style={{ flex: 1, background: "var(--surface2)", borderRadius: 11, padding: "9px 11px" }}>
            <div className="serif" style={{ fontSize: 16, fontWeight: 600 }}>{x.k}</div>
            <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 2 }}>{x.l}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: "0 18px 16px", display: "flex", flexDirection: "column", gap: 9 }}>
        {S3_CATS.map((c, i) => (
          <div key={i}>
            <div className="row" style={{ justifyContent: "space-between", marginBottom: 3 }}>
              <span style={{ fontSize: 12, color: "var(--ink2)" }}>{c.label}</span>
              <span className="mono" style={{ fontSize: 11.5 }}>{c.pct}%</span>
            </div>
            <div className="bar-track"><div className="bar-fill" style={{ width: (c.pct / max * 100) + "%", background: i === 0 ? "var(--scope1)" : "var(--scope3)" }} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Widget: compliance deadlines                                       */
/* ------------------------------------------------------------------ */
function ComplianceWidget(props) {
  return (
    <div className={"card widget " + (props.cls || "")} style={props.frame} {...props.dnd}>
      <CardHead Icon={Scale} title="Compliance deadlines" sub="Statutory and disclosure obligations" arm={props.arm} onHide={props.onHide} />
      <div>
        {COMPLIANCE.map((c, i) => (
          <div key={i} className="listrow row" style={{ padding: "12px 18px", justifyContent: "space-between", gap: 10 }}>
            <div className="row" style={{ gap: 11, minWidth: 0 }}>
              <span style={{ width: 9, height: 9, borderRadius: 99, background: COMP_C[c.status], flex: "none" }} />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{c.name}</div>
                <div className="row mono" style={{ gap: 6, fontSize: 11, color: "var(--muted)", marginTop: 2 }}><Clock size={11} />{c.deadline}</div>
              </div>
            </div>
            <span className="mono" style={{ fontSize: 11, fontWeight: 600, color: COMP_C[c.status], flex: "none" }}>{c.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Widget: disclosure readiness                                       */
/* ------------------------------------------------------------------ */
function FrameworksWidget(props) {
  const readyLabel = (pp) => pp >= 80 ? "Ready" : pp >= 60 ? "Developing" : "Early";
  return (
    <div className={"card widget " + (props.cls || "")} style={props.frame} {...props.dnd}>
      <CardHead Icon={ListChecks} title="Disclosure readiness" sub="Alignment across reporting frameworks" arm={props.arm} onHide={props.onHide} />
      <div style={{ padding: "6px 18px 18px", display: "flex", flexDirection: "column", gap: 13 }}>
        {FRAMEWORKS.map((f, i) => (
          <div key={i}>
            <div className="row" style={{ justifyContent: "space-between", marginBottom: 5 }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{f.name}</span>
              <span className="mono" style={{ fontSize: 11.5, color: "var(--muted)" }}>{readyLabel(f.pct)} · {f.pct}%</span>
            </div>
            <div className="bar-track" style={{ height: 8 }}><div className="bar-fill" style={{ width: f.pct + "%" }} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Widget: ESG ratings                                                */
/* ------------------------------------------------------------------ */
function RatingsWidget(props) {
  return (
    <div className={"card widget " + (props.cls || "")} style={props.frame} {...props.dnd}>
      <CardHead Icon={Star} title="ESG ratings" sub="External scores and trend" arm={props.arm} onHide={props.onHide} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--line)" }}>
        {RATINGS.map((r, i) => (
          <div key={i} style={{ background: "var(--surface)", padding: "14px 16px" }}>
            <div className="row" style={{ justifyContent: "space-between" }}>
              <span style={{ fontSize: 11.5, color: "var(--muted)", fontWeight: 600 }}>{r.name}</span>
              <span style={{ color: "var(--positive)" }}><TrendingUp size={14} /></span>
            </div>
            <div className="serif" style={{ fontSize: 27, fontWeight: 600, marginTop: 4, lineHeight: 1 }}>{r.value}</div>
            <div className="mono" style={{ fontSize: 10.5, color: "var(--muted)", marginTop: 4 }}>{r.note} · was {r.prior}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Widget: your action items                                          */
/* ------------------------------------------------------------------ */
function ActionsWidget(props) {
  const [done, setDone] = useState({});
  const completed = Object.values(done).filter(Boolean).length;
  return (
    <div className={"card widget " + (props.cls || "")} style={props.frame} {...props.dnd}>
      <CardHead Icon={ListTodo} title="Your action items" sub={`${ACTION_ITEMS.length - completed} outstanding`} arm={props.arm} onHide={props.onHide}
        meta={<span className="mono" style={{ fontSize: 12, color: "var(--accent)" }}>{completed}/{ACTION_ITEMS.length}</span>} />
      <div>
        {ACTION_ITEMS.map(a => {
          const on = !!done[a.id];
          return (
            <div key={a.id} className="listrow row" style={{ padding: "12px 18px", gap: 12, cursor: "pointer" }} onClick={() => setDone(d => ({ ...d, [a.id]: !d[a.id] }))}>
              <span style={{ flex: "none", width: 20, height: 20, borderRadius: 6, border: "2px solid " + (on ? "var(--accent)" : "var(--line2)"), background: on ? "var(--accent)" : "transparent", display: "grid", placeItems: "center", transition: ".15s" }}>
                {on && <Check size={13} color="var(--accent-contrast)" />}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: on ? "var(--muted)" : "var(--ink)", textDecoration: on ? "line-through" : "none" }}>{a.text}</div>
                <div className="mono" style={{ fontSize: 10.5, color: "var(--muted)", marginTop: 2 }}>Due {a.due}</div>
              </div>
              <span className="mono" style={{ flex: "none", fontSize: 10, fontWeight: 600, color: PRI_C[a.pri], background: "color-mix(in srgb, " + PRI_C[a.pri] + " 15%, transparent)", padding: "2px 8px", borderRadius: 999 }}>{a.pri}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Widget: your team (direct line)                                    */
/* ------------------------------------------------------------------ */
function ContactWidget(props) {
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);
  const send = () => { if (!msg.trim()) return; setSent(true); setMsg(""); setTimeout(() => setSent(false), 2600); };
  return (
    <div className={"card widget " + (props.cls || "")} style={props.frame} {...props.dnd}>
      <CardHead Icon={MessageSquare} title="Your team" sub="Direct line to your consultants" arm={props.arm} onHide={props.onHide} />
      <div style={{ padding: "2px 18px 8px", display: "flex", flexDirection: "column", gap: 6 }}>
        {TEAM.map((t, i) => (
          <div key={i} className="row" style={{ gap: 11, padding: "8px 0" }}>
            <span className="mono" style={{ width: 40, height: 40, borderRadius: 12, flex: "none", display: "grid", placeItems: "center", background: "var(--accent)", color: "var(--accent-contrast)", fontWeight: 700, fontSize: 14 }}>{t.init}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13.5, fontWeight: 600 }}>{t.name}</div>
              <div style={{ fontSize: 11.5, color: "var(--muted)" }}>{t.role}</div>
            </div>
            <a href={"mailto:" + t.email} onClick={(e) => e.stopPropagation()} className="iconbtn" style={{ width: 34, height: 34, textDecoration: "none", flex: "none" }}><Mail size={15} /></a>
          </div>
        ))}
      </div>
      <div style={{ padding: "8px 18px 18px" }}>
        <textarea value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Send a quick message to your team" rows={2}
          style={{ width: "100%", resize: "none", fontFamily: "var(--sans)", fontSize: 13, color: "var(--ink)", background: "var(--surface2)", border: "1px solid var(--line)", borderRadius: 10, padding: "9px 11px", outline: "none" }} />
        <div className="row" style={{ justifyContent: "space-between", marginTop: 8 }}>
          <span className="mono fade" style={{ fontSize: 11, color: "var(--positive)", visibility: sent ? "visible" : "hidden" }}>Message sent to your team</span>
          <button className="softbtn solid" onClick={send}><Send size={13} /> Send</button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Widget: cost and value                                             */
/* ------------------------------------------------------------------ */
function FinanceWidget(props) {
  const budget = 640, spent = 372;
  const pct = Math.round((spent / budget) * 100);
  const tiles = [
    { k: "£210k", l: "Annual efficiency savings" },
    { k: "£85", l: "Internal carbon price / t" },
    { k: "£1.18m", l: "Carbon cost exposure / yr" },
  ];
  return (
    <div className={"card widget " + (props.cls || "")} style={props.frame} {...props.dnd}>
      <CardHead Icon={PoundSterling} title="Cost and value" sub="Programme spend and carbon exposure" arm={props.arm} onHide={props.onHide} />
      <div style={{ padding: "4px 18px 12px" }}>
        <div className="row" style={{ justifyContent: "space-between", marginBottom: 6 }}>
          <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>Programme budget</span>
          <span className="mono" style={{ fontSize: 12.5 }}>£{spent}k / £{budget}k</span>
        </div>
        <div className="bar-track" style={{ height: 9 }}><div className="bar-fill" style={{ width: pct + "%" }} /></div>
      </div>
      <div className="row" style={{ gap: 9, padding: "4px 18px 18px" }}>
        {tiles.map((t, i) => (
          <div key={i} style={{ flex: 1, background: "var(--surface2)", borderRadius: 11, padding: "11px 12px" }}>
            <div className="serif" style={{ fontSize: 17, fontWeight: 600 }}>{t.k}</div>
            <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 3, lineHeight: 1.3 }}>{t.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Widget: certifications                                             */
/* ------------------------------------------------------------------ */
function AchievementsWidget(props) {
  return (
    <div className={"card widget " + (props.cls || "")} style={props.frame} {...props.dnd}>
      <CardHead Icon={Award} title="Certifications" sub="Standards held and in progress" arm={props.arm} onHide={props.onHide} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--line)" }}>
        {ACHIEVEMENTS.map((a, i) => (
          <div key={i} className="row" style={{ background: "var(--surface)", padding: "13px 15px", gap: 11 }}>
            <span style={{ width: 34, height: 34, borderRadius: 10, flex: "none", display: "grid", placeItems: "center", background: "color-mix(in srgb, " + ACH_C[a.state] + " 16%, transparent)", color: ACH_C[a.state] }}>
              <Award size={17} />
            </span>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.name}</div>
              <div className="mono" style={{ fontSize: 10, color: "var(--muted)", marginTop: 2 }}>{a.note}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Widget: resource library                                           */
/* ------------------------------------------------------------------ */
function LibraryWidget(props) {
  const [tab, setTab] = useState("guides");
  const [open, setOpen] = useState(null);
  return (
    <div className={"card widget " + (props.cls || "")} style={props.frame} {...props.dnd}>
      <CardHead Icon={BookOpen} title="Resource library" sub="Guides and glossary for your team" arm={props.arm} onHide={props.onHide} />
      <div className="row" style={{ gap: 7, padding: "0 18px 8px" }}>
        <button className={"chip" + (tab === "guides" ? " on" : "")} onClick={() => setTab("guides")}>Guides</button>
        <button className={"chip" + (tab === "glossary" ? " on" : "")} onClick={() => setTab("glossary")}>Glossary</button>
      </div>
      {tab === "guides" ? (
        <div>
          {GUIDES.map((g, i) => (
            <div key={i} className="listrow row" style={{ padding: "12px 18px", justifyContent: "space-between", cursor: "pointer" }}>
              <span className="row" style={{ gap: 10, fontSize: 13, fontWeight: 500 }}><BookOpen size={15} style={{ color: "var(--accent)" }} />{g}</span>
              <ArrowUpRight size={15} style={{ color: "var(--muted)" }} />
            </div>
          ))}
        </div>
      ) : (
        <div>
          {GLOSSARY.map((g, i) => (
            <div key={i} className="listrow" style={{ padding: "12px 18px", cursor: "pointer" }} onClick={() => setOpen(o => o === i ? null : i)}>
              <div className="row" style={{ justifyContent: "space-between" }}>
                <span className="mono" style={{ fontSize: 13, fontWeight: 600, color: "var(--accent)" }}>{g.t}</span>
                <ChevronRight size={15} style={{ color: "var(--muted)", transform: open === i ? "rotate(90deg)" : "none", transition: ".2s" }} />
              </div>
              {open === i && <p className="fade" style={{ margin: "7px 0 0", fontSize: 12.5, color: "var(--ink2)", lineHeight: 1.5 }}>{g.d}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Widget registry                                                    */
/* ------------------------------------------------------------------ */
const WIDGETS = {
  emissions:    { title: "GHG emissions", icon: Leaf, Comp: EmissionsWidget },
  targets:      { title: "Target tracker", icon: Gauge, Comp: TargetsWidget },
  intensity:    { title: "Emissions intensity", icon: Activity, Comp: IntensityWidget },
  roadmap:      { title: "Net-zero roadmap", icon: Route, Comp: RoadmapWidget },
  initiatives:  { title: "Reduction initiatives", icon: Sprout, Comp: InitiativesWidget },
  offsets:      { title: "Offsets and removals", icon: Trees, Comp: OffsetsWidget },
  scope3:       { title: "Scope 3 and suppliers", icon: Boxes, Comp: Scope3Widget },
  data:         { title: "Data collection", icon: Database, Comp: DataWidget },
  frameworks:   { title: "Disclosure readiness", icon: ListChecks, Comp: FrameworksWidget },
  ratings:      { title: "ESG ratings", icon: Star, Comp: RatingsWidget },
  compliance:   { title: "Compliance deadlines", icon: Scale, Comp: ComplianceWidget },
  reports:      { title: "Draft reports", icon: FileText, Comp: ReportsWidget },
  timeline:     { title: "Project timeline", icon: Target, Comp: TimelineWidget },
  actions:      { title: "Your action items", icon: ListTodo, Comp: ActionsWidget },
  meetings:     { title: "Upcoming meetings", icon: CalendarDays, Comp: MeetingsWidget },
  contact:      { title: "Your team", icon: MessageSquare, Comp: ContactWidget },
  finance:      { title: "Cost and value", icon: PoundSterling, Comp: FinanceWidget },
  achievements: { title: "Certifications", icon: Award, Comp: AchievementsWidget },
  documents:    { title: "Documents", icon: FileText, Comp: DocsWidget },
  news:         { title: "Sustainability news", icon: Newspaper, Comp: NewsWidget },
  library:      { title: "Resource library", icon: BookOpen, Comp: LibraryWidget },
};
const DEFAULT_ORDER = ["emissions", "targets", "intensity", "roadmap", "initiatives", "offsets", "scope3", "data", "frameworks", "ratings", "compliance", "reports", "timeline", "actions", "meetings", "contact", "finance", "achievements", "documents", "news", "library"];

/* ------------------------------------------------------------------ */
/*  KPI strip                                                          */
/* ------------------------------------------------------------------ */
function Kpi({ label, value, unit, sub, Icon, tone }) {
  return (
    <div className="card" style={{ padding: "15px 17px", flex: "1 1 200px", minWidth: 180 }}>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <span style={{ fontSize: 11.5, color: "var(--muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".05em" }}>{label}</span>
        <span style={{ color: tone || "var(--accent)" }}><Icon size={17} /></span>
      </div>
      <div className="serif" style={{ fontSize: 30, fontWeight: 600, marginTop: 8, lineHeight: 1 }}>
        {value}<span className="mono" style={{ fontSize: 13, fontWeight: 500, color: "var(--muted)", marginLeft: 5 }}>{unit}</span>
      </div>
      <div style={{ fontSize: 11.5, color: "var(--ink2)", marginTop: 6 }}>{sub}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  App                                                                */
/* ------------------------------------------------------------------ */
export default function App() {
  const [theme, setTheme] = useState("light");
  const [accent, setAccent] = useState("Teal");
  const [order, setOrder] = useState(DEFAULT_ORDER);
  const [hidden, setHidden] = useState({});
  const [panel, setPanel] = useState(false);
  const [client, setClient] = useState("Northwind Group");
  const [editName, setEditName] = useState(false);

  const [dragId, setDragId] = useState(null);
  const [overId, setOverId] = useState(null);
  const armed = useRef(false);

  const reorder = (from, to) => {
    setOrder(prev => {
      const a = [...prev];
      const fi = a.indexOf(from), ti = a.indexOf(to);
      if (fi < 0 || ti < 0 || fi === ti) return prev;
      a.splice(ti, 0, a.splice(fi, 1)[0]);
      return a;
    });
  };

  const reductionVsBaseline = (((BASELINE - CURRENT) / BASELINE) * 100).toFixed(1);
  const reductionYoY = (((PRIOR - CURRENT) / PRIOR) * 100).toFixed(1);
  const activeReports = REPORTS.filter(r => r.status !== "Final").length;
  const accentVars = useMemo(() => ({
    "--accent": ACCENTS[accent].main,
    "--accent-contrast": ACCENTS[accent].contrast,
  }), [accent]);

  return (
    <div className="dash scrollbar" data-theme={theme} style={accentVars}>
      <style>{STYLES}</style>

      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "26px clamp(14px,3vw,34px) 60px" }}>

        {/* Top bar */}
        <div className="row" style={{ justifyContent: "space-between", gap: 14, marginBottom: 22 }}>
          <div className="row" style={{ gap: 12 }}>
            <div style={{
              width: 46, height: 46, borderRadius: 13, flex: "none", display: "grid", placeItems: "center",
              background: "#FFFFFF", border: "1px solid var(--line)", boxShadow: "var(--shadow)", overflow: "hidden",
            }}>
              <img src={LOGO} alt="Terralume" width={40} height={40} style={{ display: "block", borderRadius: 9 }} />
            </div>
            <div>
              <div className="serif" style={{ fontSize: 17, fontWeight: 600, lineHeight: 1 }}>Terralume</div>
              <div className="mono" style={{ fontSize: 11, color: "var(--muted)", marginTop: 3 }}>Client portal · Carbon and sustainability programme</div>
            </div>
          </div>
          <div className="row" style={{ gap: 9 }}>
            <button className="iconbtn" title="Toggle theme" onClick={() => setTheme(t => t === "light" ? "dark" : "light")}>
              {theme === "light" ? <Moon size={17} /> : <Sun size={17} />}
            </button>
            <button className="softbtn solid" onClick={() => setPanel(true)} style={{ height: 38, padding: "0 14px" }}>
              <SlidersHorizontal size={15} /> Customise
            </button>
          </div>
        </div>

        {/* Greeting */}
        <div style={{ marginBottom: 22 }}>
          <div className="mono" style={{ fontSize: 12, color: "var(--accent)", fontWeight: 600, letterSpacing: ".03em" }}>
            {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </div>
          <div className="row" style={{ gap: 10, marginTop: 6 }}>
            {editName ? (
              <input className="nameedit" autoFocus value={client}
                onChange={(e) => setClient(e.target.value)}
                onBlur={() => setEditName(false)}
                onKeyDown={(e) => e.key === "Enter" && setEditName(false)} />
            ) : (
              <h1 className="serif" style={{ fontSize: "clamp(26px,4vw,38px)", fontWeight: 600, margin: 0, lineHeight: 1.05 }}>
                Welcome back, {client}
              </h1>
            )}
            <button className="iconbtn" title="Edit organisation name" style={{ width: 32, height: 32, borderRadius: 9 }} onClick={() => setEditName(v => !v)}>
              <Pencil size={14} />
            </button>
          </div>
          <p style={{ fontSize: 14, color: "var(--ink2)", margin: "8px 0 0", maxWidth: 640 }}>
            Here is the latest on your decarbonisation programme. Rearrange or hide any panel to suit how you like to review progress.
          </p>
        </div>

        {/* KPI strip */}
        <div className="row" style={{ gap: 13, flexWrap: "wrap", marginBottom: 22 }}>
          <Kpi label="FY2025 emissions" value={fmt(CURRENT)} unit="tCO₂e" Icon={Leaf}
            sub={`Down ${reductionYoY}% on the previous year`} />
          <Kpi label="Vs 2021 baseline" value={`-${reductionVsBaseline}`} unit="%" Icon={TrendingDown} tone="var(--positive)"
            sub="On track toward the -42% by 2030 pathway" />
          <Kpi label="Active reports" value={activeReports} unit="" Icon={FileText} tone="var(--warn)"
            sub="One report currently in review" />
          <Kpi label="Next meeting" value="3" unit="days" Icon={CalendarDays}
            sub="Quarterly Progress Review, 3 Jun" />
        </div>

        {/* Widget grid */}
        <div className="grid2" style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 16, gridAutoFlow: "dense" }}>
          {order.filter(id => !hidden[id]).map((id, i) => {
            const { Comp } = WIDGETS[id];
            const dnd = {
              draggable: true,
              onDragStart: (e) => {
                if (!armed.current) { e.preventDefault(); return; }
                setDragId(id);
                e.dataTransfer.effectAllowed = "move";
              },
              onDragEnter: () => { if (dragId && dragId !== id) { setOverId(id); reorder(dragId, id); } },
              onDragOver: (e) => e.preventDefault(),
              onDragEnd: () => { armed.current = false; setDragId(null); setOverId(null); },
            };
            const cls = "rise" + (dragId === id ? " dragging" : "") + (overId === id ? " over" : "");
            return (
              <Comp key={id}
                arm={(v) => { armed.current = v; }}
                onHide={() => setHidden(h => ({ ...h, [id]: true }))}
                dnd={dnd}
                frame={{ animationDelay: `${i * 70}ms` }}
                cls={cls}
              />
            );
          })}
        </div>

        {order.filter(id => !hidden[id]).length === 0 && (
          <div className="card" style={{ padding: 40, textAlign: "center" }}>
            <p style={{ color: "var(--muted)", marginBottom: 14 }}>All widgets are hidden.</p>
            <button className="softbtn solid" onClick={() => setPanel(true)} style={{ margin: "0 auto" }}>
              <SlidersHorizontal size={14} /> Open customise panel
            </button>
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: 34, fontSize: 11.5, color: "var(--muted)" }} className="mono">
          Terralume client portal · Figures shown are illustrative sample data
        </div>
      </div>

      <CustomisePanel
        open={panel} onClose={() => setPanel(false)}
        theme={theme} setTheme={setTheme}
        accent={accent} setAccent={setAccent}
        order={order} hidden={hidden}
        toggleHidden={(id) => setHidden(h => ({ ...h, [id]: !h[id] }))}
        reset={() => { setOrder(DEFAULT_ORDER); setHidden({}); }}
      />
    </div>
  );
}
