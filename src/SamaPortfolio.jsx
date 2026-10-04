import { useState, useEffect, useMemo, useCallback } from "react";
import "./SamaPortfolio.css";

const EMAIL = "samapatnaik22@gmail.com";
const IMG = `${process.env.PUBLIC_URL}/images`;
const PAGES = ["Home", "About", "Work", "Resume", "Contact"];
const RESUME = `${process.env.PUBLIC_URL}/SamaPatnaik_Resume_2026.pdf`;

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sama-patnaik-191319229/" },
  { label: "GitHub", href: "https://github.com/SamaPatnaik" },
  { label: "Devpost", href: "https://devpost.com/samapatnaik22" },
];

const services = [
  { title: "Data Analysis", desc: "Turning messy, real-world datasets into clean, trustworthy answers to the questions that matter." },
  { title: "Machine Learning", desc: "Forecasting and classification models, tuned, benchmarked and explained in plain language." },
  { title: "Dashboards", desc: "Interactive R Shiny, Tableau and Power BI dashboards that people actually come back to." },
  { title: "Data Engineering", desc: "Automated ETL end to end pipelines, big data processing, modeling and AWS" },
];

const tools = [
  "Python", "R", "SQL", "JavaScript", "HTML/CSS", "Tableau", "R Shiny", "Power BI",
  "XGBoost", "Optuna", "RAG / LLMs", "React", "Flask", "Git", "AWS", "Databricks", "Excel",
];

// badge: "Featured" | "In progress". Links with an empty href are hidden until filled in.
const projects = [
  {
    cats: ["Machine Learning"],
    tag: "Forecasting",
    title: "Canada Extreme Heat Forecast",
    stat: "Flagged the 2021 BC heat dome at 97%",
    badge: "Featured",
    desc: "Forecasts extreme heat risk 1–3 days ahead at Canadian weather stations from 150 years of climate data, and flagged the 2021 BC heat dome at 97% the day before.",
    stack: [],
    links: [
      { label: "Live app", href: "https://canadaclimateforecast.streamlit.app/" },
      { label: "GitHub", href: "https://github.com/SamaPatnaik/CanadaClimateForecast" },
    ],
  },
  {
    cats: ["Hackathons"],
    tag: "Databricks × Rogers Datathon",
    title: "TermSync",
    stat: "UBC bus-bay planner",
    badge: "Featured",
    desc: "A UBC bus-bay planner that tests whether sending a scheduled bus to a quieter bay would cut waiting.",
    stack: ["Databricks"],
    links: [
      { label: "Live app", href: "" },
      { label: "GitHub", href: "" },
      { label: "EDA & slides", href: "https://drive.google.com/file/d/18YxIjykxGpB_2NZl4qKN_GZjQ6YlKptz/view" },
    ],
  },
  {
    cats: ["Machine Learning", "In Progress"],
    tag: "MLOps",
    title: "Patient Drift",
    stat: "~101k encounters",
    badge: "In progress",
    desc: "Predicts 30-day hospital readmission (~101k encounters) in an AWS MLOps pipeline that detects population shift and retrains itself.",
    stack: ["AWS", "MLOps"],
    links: [],
  },
  {
    cats: ["In Progress"],
    tag: "Climate Risk",
    title: "Climate Risk Stress Testing",
    stat: "OSFI B-15 · NGFS",
    badge: "In progress",
    desc: "Estimates expected loss on a loan portfolio under climate scenarios, framed on OSFI B-15 and NGFS.",
    stack: [],
    links: [],
  },
  {
    cats: ["Dashboards"],
    tag: "R Shiny",
    title: "UBC Graduate Enrolment Dashboard",
    stat: "Program · year · demographics",
    desc: "Explore enrolment by program, year and demographics.",
    stack: ["R Shiny"],
    links: [{ label: "Open", href: "https://myapps1234.shinyapps.io/Enrollment-app/" }],
  },
  {
    cats: ["Dashboards"],
    tag: "R Shiny",
    title: "Urban Oceans",
    stat: "20+ Vancouver regions",
    desc: "Phytoplankton, temperature and salinity across 20+ Vancouver regions, built for the Pelagic Ecosystems Lab.",
    stack: ["R Shiny"],
    links: [{ label: "Open", href: "https://myapps1234.shinyapps.io/PelagicUO/" }],
  },
  {
    cats: ["Machine Learning"],
    tag: "Regression",
    title: "Pricing Budapest",
    stat: "Two-night Airbnb stays",
    desc: "Predicts the price of a two-night Airbnb stay in Budapest.",
    stack: ["R", "LASSO", "OLS"],
    links: [{ label: "GitHub", href: "https://github.com/SamaPatnaik/STAT301-GroupProject" }],
  },
  {
    cats: ["Dashboards"],
    tag: "Tableau",
    title: "British Airways Reviews",
    stat: "Customer review dashboard",
    desc: "An interactive dashboard of British Airways customer reviews.",
    stack: ["Tableau"],
    links: [{ label: "Open", href: "https://public.tableau.com/app/profile/sama.patnaik/viz/dashboard_17482246850980/Dashboard1" }],
  },
  {
    cats: ["Dashboards", "Hackathons"],
    tag: "BOLT UBC First Byte 2025",
    title: "Vancouver City FC Case Study",
    stat: "Revenue growth plan",
    desc: "A revenue growth plan for a soccer club, built for BOLT UBC First Byte 2025.",
    stack: ["Power BI"],
    links: [{ label: "GitHub", href: "https://github.com/ONIGIRIIII/Vancouver-City-FC-Case-Study" }],
  },
  {
    cats: ["Hackathons"],
    tag: "Computer Vision",
    title: "SquatSense",
    stat: "Real-time form feedback",
    desc: "Real-time feedback on squat form using computer vision.",
    stack: ["OpenCV", "Python"],
    links: [{ label: "Devpost", href: "https://devpost.com/software/squatsense-ai-personal-trainer" }],
  },
  {
    cats: ["Machine Learning", "Hackathons"],
    tag: "WaffleHacks",
    title: "We'llChat",
    stat: "RAG-powered matching",
    desc: "A chatbot that matches students with health professionals and peers, built with Priyadarshan and Akshaya.",
    stack: ["React", "RAG"],
    links: [{ label: "Devpost", href: "https://devpost.com/software/we-llchat" }, { label: "GitHub", href: "" }],
  },
];
const FILTERS = ["All", "Machine Learning", "Dashboards", "Hackathons", "In Progress"];

const experience = [
  {
    org: "Environment and Climate Change Canada",
    role: "Data & Tool Developer Co-op",
    period: "May – Aug 2026",
    desc: "Built FIFAFx, a Python GUI that automates data parsing, Excel reports and slides for FIFA World Cup 2026 forecasts. Built Python ETL over 10 years of air-quality bulletins for Power BI verification dashboards. Cut manual errors by 40%.",
  },
  {
    org: "UBC Graduate School",
    role: "Data & Survey Analyst",
    period: "May 2025 – Apr 2026",
    desc: "Automated Python ETL with REST APIs across 20,000+ records, reducing manual work by 25%. Built Tableau and R Shiny dashboards for the Graduate Career Outcomes Study.",
  },
  {
    org: "UBC Pelagic Ecosystems Lab",
    role: "Environmental Data Scientist (WLIURA)",
    period: "May – Aug 2024",
    desc: "Built an R Shiny dashboard across 50+ regions for 10+ researchers, and wrote the data documentation.",
  },
  {
    org: "UBC Data Science Club",
    role: "Outreach Coordinator",
    period: "2023 – Now",
    desc: "Organizes industry events with speakers from Google, Microsoft and TELUS.",
  },
];

/* ---------- hooks ---------- */

// Pacific time, labelled PST or PDT depending on daylight saving.
function useClock() {
  const fmt = useMemo(() => new Intl.DateTimeFormat("en-US", {
    hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23",
    timeZone: "America/Vancouver", timeZoneName: "short",
  }), []);
  const read = useCallback(() => {
    const parts = fmt.formatToParts(new Date());
    const get = type => parts.find(p => p.type === type)?.value;
    return `${get("hour")}:${get("minute")}:${get("second")} ${get("timeZoneName")}`;
  }, [fmt]);
  const [now, setNow] = useState(read);
  useEffect(() => {
    const id = setInterval(() => setNow(read()), 1000);
    return () => clearInterval(id);
  }, [read]);
  return now;
}

const pageFromHash = () => {
  const h = window.location.hash.replace(/^#\/?/, "").toLowerCase();
  return PAGES.find(p => p.toLowerCase() === h) || "Home";
};

/* ---------- pixel transition ---------- */

// Milliseconds. cover: pixels fill the screen; hold: fully covered while the page swaps; reveal: pixels clear.
const PIXEL_TIMING = { cover: 900, hold: 200, reveal: 1100 };

function PixelTransition({ phase }) {
  const cols = 24;
  const rows = Math.max(8, Math.round(cols * (window.innerHeight / window.innerWidth)));
  // fresh random delays for every phase so the dissolve pattern changes
  const delays = useMemo(
    () => Array.from({ length: cols * rows }, () => Math.random()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [phase, rows]
  );
  if (!phase) return null;
  const span = phase === "in" ? PIXEL_TIMING.cover : PIXEL_TIMING.reveal;
  return (
    <div className={`sp-pixels ${phase}`} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}>
      {delays.map((d, i) => <div key={i} style={{ animationDelay: `${Math.round(d * span)}ms` }} />)}
    </div>
  );
}

/* ---------- chrome ---------- */

function Header({ page, go }) {
  const time = useClock();
  return (
    <header className="sp-header">
      <a className="sp-mail" href={`mailto:${EMAIL}`}>{EMAIL} ↗</a>
      <nav className="sp-nav">
        {PAGES.map(p => (
          <button key={p} className={p === page ? "active" : ""} onClick={() => go(p)}>{p}</button>
        ))}
      </nav>
      <span className="sp-clock">{time}</span>
    </header>
  );
}

/* ---------- pages ---------- */

function Home({ go }) {
  return (
    <>
      <section className="sp-home sp-enter">
        <p className="sp-home-left">I like analyzing messy data and uncovering patterns.</p>
        <div className="sp-home-center">
          <img className="sp-avatar" src={`${IMG}/me-wink.webp`} alt="Sama winking" />
          <h1 className="sp-hero-title">I'M SAMA<span>.</span></h1>
          <span className="sp-hero-sub">Statistics @ UBC · Data Scientist</span>
        </div>
        <div className="sp-home-right">
          {services.map(s => (
            <a key={s.title} href="#/work" onClick={e => { e.preventDefault(); go("Work"); }}>{s.title}</a>
          ))}
        </div>
      </section>
      <footer className="sp-footer">
        <span>Vancouver, BC</span>
        <span className="sp-status">Open to full-time opportunities / internships</span>
        <span>© {new Date().getFullYear()} Sama</span>
      </footer>
    </>
  );
}

function About() {
  return (
    <main className="sp-page sp-enter">
      <h1 className="sp-page-title">SAMA</h1>
      <p className="sp-lede">
        I'm Sama, a final-year Statistics student at UBC and graduating May 2027, looking for full time
        opportunities and internships. I use data to solve real-world problems, whether that's forecasting
        tools, analyzing data or building ML models. Lately I've been building things end to end - you'll
        find more under Work. Fun fact: that is my cat Charlie on your screen.
      </p>
      <div className="sp-socials">
        {socials.map(s => <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>)}
      </div>
      <img className="sp-portrait" src={`${IMG}/me-look.webp`} alt="Sama Patnaik" />

      <h2 className="sp-h2">TOOLKIT</h2>
      <div className="sp-tools">
        {tools.map(t => <span key={t} className="sp-tool">{t}</span>)}
      </div>

      <h2 className="sp-h2">EXPERIENCE</h2>
      <div className="sp-rows">
        {experience.map(e => (
          <div key={e.org} className="sp-row">
            <span className="sp-row-org">{e.org}</span>
            <span className="sp-row-role">{e.role}</span>
            <span className="sp-row-period">{e.period}</span>
            <span className="sp-row-desc">{e.desc}</span>
          </div>
        ))}
      </div>

      <h2 className="sp-h2">WHAT I DO</h2>
      <div className="sp-cards">
        {services.map(s => (
          <div key={s.title} className="sp-card">
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

function Work() {
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? projects : projects.filter(p => p.cats.includes(filter));
  return (
    <main className="sp-page sp-enter">
      <h1 className="sp-page-title">WORK</h1>
      <p className="sp-lede">A selection of projects across forecasting, machine learning, dashboards and hackathons, including a few still in progress.</p>
      <div className="sp-filters">
        {FILTERS.map(f => (
          <button key={f} className={f === filter ? "active" : ""} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>
      <div className="sp-work">
        {shown.map(p => (
          <article key={p.title} className="sp-proj sp-enter">
            <div className="sp-proj-cover">
              <div className="grid-bg" />
              {p.badge && <span className="sp-badge">{p.badge}</span>}
              <span className="stat">{p.tag}</span>
              <span className="big">{p.title}</span>
              <span className="stat">{p.stat}</span>
            </div>
            <div className="sp-proj-meta">
              <span>{p.title}</span>
              <span>{p.tag}</span>
            </div>
            <p className="sp-proj-desc">{p.desc}</p>
            {p.stack.length > 0 && <div className="sp-stack">{p.stack.map(s => <span key={s}>{s}</span>)}</div>}
            {p.links.some(l => l.href) && (
              <div className="sp-links">
                {p.links.filter(l => l.href).map(l => (
                  <a key={l.label} className="sp-link" href={l.href} target="_blank" rel="noopener noreferrer">{l.label} ↗</a>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </main>
  );
}

function Resume() {
  return (
    <main className="sp-page sp-enter">
      <h1 className="sp-page-title">RESUME</h1>
      <p className="sp-lede">Statistics @ UBC, graduating May 2027. The one-page version of everything on this site.</p>
      <div className="sp-resume-actions">
        <a className="sp-btn" href={RESUME} download>Download PDF ↓</a>
        <a className="sp-btn ghost" href={RESUME} target="_blank" rel="noopener noreferrer">Open in new tab ↗</a>
      </div>
      <div className="sp-resume-frame">
        <iframe src={`${RESUME}#view=FitH&toolbar=0`} title="Sama Patnaik resume" />
      </div>
    </main>
  );
}

// Web3Forms access key (https://web3forms.com). It is meant to be public: it can only
// deliver messages to the inbox it was created for. Leave empty to fall back to mailto.
const WEB3FORMS_KEY = "";

const EMPTY_FORM = { name: "", email: "", topic: "", message: "", botcheck: false };

function Contact() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const submit = async e => {
    e.preventDefault();
    const subject = `${form.topic || "Hello"} — from ${form.name}`;
    if (!WEB3FORMS_KEY) {
      // No form service configured: hand the message to the visitor's own mail client.
      const body = `${form.message}\n\n${form.name}\n${form.email}`;
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio: ${subject}`,
          from_name: "Sama's portfolio",
          name: form.name,
          email: form.email,
          topic: form.topic || "—",
          message: form.message,
          botcheck: form.botcheck,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setStatus("sent");
      setForm(EMPTY_FORM);
    } catch {
      setStatus("error");
    }
  };
  return (
    <main className="sp-page sp-enter">
      <h1 className="sp-page-title">CONTACT</h1>
      <p className="sp-lede">Have a role, project or dataset in mind? Tell me a little about it and I'll get back to you.</p>
      <form className="sp-form" onSubmit={submit}>
        <div className="sp-field">
          <label htmlFor="c-name">Name</label>
          <input id="c-name" required placeholder="Your Name" value={form.name} onChange={set("name")} />
        </div>
        <div className="sp-field">
          <label htmlFor="c-email">Email</label>
          <input id="c-email" type="email" required placeholder="Your Email" value={form.email} onChange={set("email")} />
        </div>
        <div className="sp-field full">
          <label htmlFor="c-topic">Topic</label>
          <select id="c-topic" value={form.topic} onChange={set("topic")}>
            <option value="">Select a topic...</option>
            <option>Full-time role / Internship</option>
            <option>Project collaboration</option>
            <option>Just saying hi</option>
          </select>
        </div>
        <div className="sp-field full">
          <label htmlFor="c-msg">Message</label>
          <textarea id="c-msg" required placeholder="Tell me about your project..." value={form.message} onChange={set("message")} />
        </div>
        {/* honeypot: hidden from people, bots tick it and get dropped by Web3Forms */}
        <input type="checkbox" className="sp-hp" aria-hidden="true" tabIndex={-1} autoComplete="off" checked={form.botcheck} onChange={set("botcheck")} />
        <button className="sp-submit" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "Send Message ↗"}
        </button>
        {status === "sent" && <p className="sp-form-note ok" role="status">Message sent ✓ Thanks, I'll get back to you soon.</p>}
        {status === "error" && (
          <p className="sp-form-note err" role="alert">
            Something went wrong. Please email me directly at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
          </p>
        )}
      </form>
      <p className="sp-direct">
        or reach me directly at <a href={`mailto:${EMAIL}`}>{EMAIL}</a><br />
        {socials.map((s, i) => (
          <span key={s.label}>{i > 0 && " · "}<a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a></span>
        ))}
      </p>
    </main>
  );
}

/* ---------- root ---------- */

export default function Portfolio() {
  const [page, setPage] = useState(pageFromHash);
  const [phase, setPhase] = useState(null);

  const go = useCallback(next => {
    if (next === page || phase) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      window.location.hash = `/${next.toLowerCase()}`;
      return;
    }
    setPhase("in");
    setTimeout(() => {
      window.location.hash = `/${next.toLowerCase()}`;
      setPhase("out");
      setTimeout(() => setPhase(null), PIXEL_TIMING.reveal + 50);
    }, PIXEL_TIMING.cover + PIXEL_TIMING.hold);
  }, [page, phase]);

  useEffect(() => {
    const onHash = () => { setPage(pageFromHash()); window.scrollTo(0, 0); };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    document.title = page === "Home" ? "Sama Patnaik — Data Scientist" : `${page} — Sama Patnaik`;
  }, [page]);

  return (
    <div className="sp">
      <Header page={page} go={go} />
      {page === "Home" && <Home go={go} />}
      {page === "About" && <About />}
      {page === "Work" && <Work />}
      {page === "Resume" && <Resume />}
      {page === "Contact" && <Contact />}
      <PixelTransition phase={phase} />
    </div>
  );
}
