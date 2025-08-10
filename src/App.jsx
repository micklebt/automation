import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2,
  Workflow,
  Bot,
  PhoneCall,
  Database,
  Rocket,
  ArrowRight,
  Mail,
  Clock,
  ShieldCheck,
  Link as LinkIcon,
  CreditCard,
  Send,
  Volume2,
} from "lucide-react";

// Process section images
import discoveryImg from "../media/discovery.png";
import workflowDesignImg from "../media/workflow_design.png";
import integrationImg from "../media/integration.png";
import testingImg from "../media/testing.png";
import deploymentImg from "../media/deployment.png";
import optimizationImg from "../media/optimization.png";

/**
 * ============================
 *  CONFIG — EDIT THESE LATER
 * ============================
 * 1) WEBHOOK_URL: Replace with your Make.com or Pipedream endpoint
 * 2) SIMULATION_MODE: Set to false once you have a live webhook
 * 3) FIELD KEYS: If you change field names, update buildPayload()
 */
const WEBHOOK_URL = "https://example.com/webhook/demo"; // TODO: Replace with your Make.com/Pipedream URL
const SIMULATION_MODE = true; // TODO: Set to false when using a real webhook

/** Example payload (for reference only)
 * We send minimal PII. Adjust to your schema as needed.
 */
const DEMO_PAYLOAD_EXAMPLE = {
  source: "website-demo",
  submitted_at: new Date().toISOString(),
  contact: {
    name: "Ada Lovelace",
    email: "ada@example.com",
  },
  intent: {
    first_automation: "I want calls and web forms to create jobs automatically.",
  },
  metadata: {
    page: "/#contact",
    utm: {},
  },
};

// Brand: SmallBiz AI Works — smallbizaiworks.com (suggested)
// Palette: blues, light gray, white. Boutique capacity; gear-cluster model.

export default function Site() {
  const sections = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "workflow", label: "Workflow" },
    { id: "process", label: "Process" },
    { id: "case-studies", label: "Case Studies" },
    { id: "playbooks", label: "Playbooks" },
    { id: "tooling", label: "Tooling" },
    { id: "contact", label: "Demo" },
  ];

  useEffect(() => {
    const id = window.location.hash?.replace('#','');
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div className="min-h-screen text-slate-800 bg-gradient-to-b from-white via-slate-50 to-slate-100">
      <Header sections={sections} onNav={scrollTo} />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Hero onCta={() => scrollTo('contact')} />
        <About />
        <Services />
        <WorkflowSection />
        <Process />
        <CaseStudies />
        <Playbooks />
        <Tooling />
        <Results />
        <FAQ />
        <Contact />
      </main>
      <Footer onNav={scrollTo} sections={sections} />
    </div>
  );
}

function ListenBadge({ n }) {
  return (
    <div className="flex flex-col items-center ml-3 shrink-0">
      <Volume2 className="h-5 w-5 text-slate-600" />
      <a href={`/media/section_S${n}.mp3`} className="text-[10px] text-blue-700 hover:underline">S{n} Listen</a>
    </div>
  );
}

function Header({ sections, onNav }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 shadow-md" />
          <div className="font-semibold text-slate-900">SmallBiz AI Works</div>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          {sections.map((s) => (
            <button key={s.id} onClick={() => onNav(s.id)} className="text-sm text-slate-600 hover:text-slate-900">
              {s.label}
            </button>
          ))}
          <Button onClick={() => onNav('contact')} className="rounded-2xl">Try the Demo</Button>
        </nav>
      </div>
    </header>
  );
}

function Hero({ onCta }) {
  return (
    <section id="home" className="py-16 sm:py-24">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
          Double Your Output & Cut Stress in Half  Without Hiring Anyone          </motion.h1>
          <p className="mt-4 text-slate-600 text-lg">
            40+ years building business systems. We work with one or two clients at a time so your project gets near‑exclusive attention.
          </p>
          <div className="mt-6 flex gap-3">
            <Button size="lg" onClick={onCta} className="rounded-2xl">Submit the demo form</Button>
            <Button size="lg" variant="secondary" onClick={() => document.getElementById('workflow')?.scrollIntoView({behavior:'smooth'})} className="rounded-2xl">
              See the gears turn <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <p className="mt-3 text-sm text-slate-500 flex items-center gap-2"><ShieldCheck className="h-4 w-4"/> No fluff. Clear scope, measurable results, weekly demos.</p>
        </div>
        {/* Illustration: Unsplash photo with overlay gears */}
        <motion.div initial={{ opacity: 0, scale: .98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .6, delay: .1 }} className="relative">
          <HeroArt />
        </motion.div>
      </div>
    </section>
  );
}

function HeroArt() {
  return (
    <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative">
      <img
        src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1600&auto=format&fit=crop"
        alt="Calm blue abstract"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-blue-600/20" />
      <div className="absolute inset-0 p-6 flex items-center justify-center">
        <GearCanvas />
      </div>
    </div>
  );
}

function GearCanvas() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 400 240" className="w-full h-full">
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#60a5fa"/>
            <stop offset="100%" stopColor="#1d4ed8"/>
          </linearGradient>
        </defs>
        <Gear cx={110} cy={120} r={40} teeth={10} speed={6} label="Trigger" />
        <Gear cx={200} cy={120} r={28} teeth={10} speed={-9} label="Decide" />
        <Gear cx={270} cy={90} r={22} teeth={8} speed={12} label="Act" />
        <Gear cx={300} cy={150} r={18} teeth={8} speed={-14} label="Notify" />
        <Arrow x1={60} y1={120} x2={90} y2={120} />
        <text x={40} y={124} className="fill-slate-800" style={{fontSize:12}}>Form / Call / Event</text>
      </svg>
    </div>
  );
}

function Gear({ cx, cy, r, teeth, speed, label }) {
  const teethPath = [];
  const inner = r * 0.75;
  for (let i=0; i<teeth; i++) {
    const a0 = (i/teeth) * Math.PI * 2;
    const a1 = ((i+0.5)/teeth) * Math.PI * 2;
    const a2 = ((i+1)/teeth) * Math.PI * 2;
    teethPath.push(`M ${cx + inner*Math.cos(a0)} ${cy + inner*Math.sin(a0)} L ${cx + r*Math.cos(a1)} ${cy + r*Math.sin(a1)} L ${cx + inner*Math.cos(a2)} ${cy + inner*Math.sin(a2)} Z`);
  }
  return (
    <g>
      <motion.g animate={{ rotate: 360 }} transition={{ repeat: Infinity, ease: "linear", duration: speed<0 ? -speed : speed }} style={{ originX: cx, originY: cy }}>
        {teethPath.map((d, i) => (
          <path key={i} d={d} fill="url(#g1)" opacity={0.85} />
        ))}
        <circle cx={cx} cy={cy} r={inner*0.9} fill="white" stroke="#93c5fd" />
      </motion.g>
      <text x={cx} y={cy+4} textAnchor="middle" className="fill-slate-800" style={{fontSize:12}}>{label}</text>
    </g>
  );
}

function Arrow({ x1, y1, x2, y2 }) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#60a5fa" strokeWidth={3} />
      <polygon points={`${x2},${y2} ${x2-8},${y2-5} ${x2-8},${y2+5}`} fill="#60a5fa" />
    </g>
  );
}

function Pill({ icon: Icon, children }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 text-blue-700 px-3 py-1 text-xs border border-blue-100">
      <Icon className="h-3.5 w-3.5" /> {children}
    </div>
  );
}

function About() {
  return (
    <section id="about" className="py-16">
      <div className="flex items-start justify-between">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Put Your Business On Autopilot—End‑to‑End</h2>
        <ListenBadge n={1} />
      </div>
      <div className="grid lg:grid-cols-3 gap-8 items-start mt-6">
        <div className="lg:col-span-2">
          <p className="mt-4 text-slate-600">
            We turn messy, manual work into crisp, repeatable process flows that make  important things happen on their own. You work directly with a senior builder—clear scope, weekly demos, measurable wins.
          Effortlessly. Flawlessly. Constantly</p>
          <p className="mt-4 text-slate-600">
            We don't just do "AI" or "automation"—we study YOUR business WITH you and then build real, repeatable systems that perform value-addedmove on their own.
          </p>
          <p className="mt-4 text-slate-600">
            What kind of work? Typically, it's the stuff you put off, neglect, or just Plain don't do. Because it's too tedious. Or time-consuming. Or frustrating. Or all of the above.
          </p>
          <div className="mt-4">
            <ul className="list-disc ml-5 text-slate-700 text-sm space-y-1">
              <li>Customer fills a form → job created, text sent, calendar updated.</li>
              <li>Caller chooses "leak" → ticket opens, technician alerted automatically.</li>
              <li>Invoice paid → receipt sent, records updated, next steps scheduled.</li>
            </ul>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Pill icon={Clock}>One or two clients at a time</Pill>
            <Pill icon={CheckCircle2}>Weekly progress demos</Pill>
            <Pill icon={ShieldCheck}>Plain‑language docs</Pill>
          </div>
        </div>
        <Card className="rounded-2xl shadow-sm border-slate-200 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop" alt="Team planning with sticky notes" className="w-full h-36 object-cover"/>
          <CardHeader>
            <CardTitle className="text-slate-900">What clients value</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-600 space-y-3">
            <div className="flex gap-3"><Bot className="h-5 w-5 text-blue-600"/><span>One intake, many actions: a call or form instantly creates the job, routes tasks, and sends confirmations—no bottlenecks.</span></div>
            <div className="flex gap-3"><Workflow className="h-5 w-5 text-blue-600"/><span>Every job runs the same winning play—clear steps, zero dropped balls, predictable outcomes end‑to‑end.</span></div>
            <div className="flex gap-3"><Database className="h-5 w-5 text-blue-600"/><span>Clean, structured data at the source: customers submit once; your systems stay in sync for billing, reporting, and decisions.</span></div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function Services() {
  const items = [
    { icon: PhoneCall, title: "Voice, SMS, and IVR", body: "Smart call intake, texting, and phone trees that collect the right info and start work without delay." },
    { icon: Workflow, title: "Workflow Automation", body: "Event‑driven flows where one action triggers many: updates, emails, tasks, invoices, and alerts." },
    { icon: Database, title: "Data & Systems Integration", body: "Tie forms, CRMs, accounting, and storage together so the same data moves cleanly across tools." },
    { icon: Bot, title: "AI Assistance", body: "Transcription, intent parsing, summaries, and decision support embedded in your daily work." },
  ];
  return (
    <section id="services" className="py-16">
      <div className="flex items-start justify-between">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Services</h2>
        <ListenBadge n={2} />
      </div>
      <p className="mt-3 text-slate-600">We keep the list short so the work stays sharp.</p>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((s, i) => (
          <Card key={i} className="rounded-2xl border-slate-200 hover:shadow-md transition overflow-hidden">
            <img src={`https://images.unsplash.com/photo-15${i%2?"87":"03"}76166102-3a29ace6c8f8?q=80&w=1200&auto=format&fit=crop`} alt="Service illustration" className="w-full h-28 object-cover"/>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900"><s.icon className="h-5 w-5 text-blue-600"/>{s.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-600">{s.body}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function WorkflowSection() {
  const steps = [
    { title: "Trigger", body: "A form, call, or payment starts the flow." },
    { title: "Intake", body: "We collect clean, structured details." },
    { title: "Decide", body: "Rules & AI help route and choose next actions." },
    { title: "Act", body: "Create jobs, tasks, tickets, or invoices." },
    { title: "Notify", body: "Update staff and customers by text or email." },
    { title: "Measure", body: "Dashboards show progress and blockers." },
  ];
  return (
    <section id="workflow" className="py-16">
      <div className="flex items-baseline justify-between">
        <div className="flex items-start gap-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">The Gear‑Cluster Model</h2>
          <ListenBadge n={3} />
        </div>
        <div className="text-sm text-slate-500">One action drives many others</div>
      </div>
      <p className="mt-3 text-slate-600 max-w-3xl">Think of your business as a set of gears. When the first gear turns—say a customer fills a form—the motion transfers to the others: jobs get created, people get notified, records get updated. No extra cranking.</p>
      <div className="mt-8 grid md:grid-cols-3 gap-5">
        {steps.map((s, i) => (
          <Card key={i} className="rounded-2xl border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-900">{i+1}. {s.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-600">{s.body}</CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-6">
        <Button className="rounded-2xl" onClick={() => document.getElementById('process')?.scrollIntoView({behavior:'smooth'})}>See how we run projects <ArrowRight className="ml-2 h-4 w-4"/></Button>
      </div>
    </section>
  );
}

function Process() {
  const phases = [
    { title: "Discovery", body: "Map your current path. Define success in plain numbers and simple outcomes." },
    { title: "Design", body: "Sketch the gear‑cluster: inputs, rules, outputs. Quick mockups to agree on flow." },
    { title: "Build", body: "Short, weekly sprints. Working demos, not slide decks." },
    { title: "Pilot", body: "Test with real data and adjust to fit how people actually work." },
    { title: "Launch", body: "Cutover with a checklist. Support on call." },
    { title: "Iterate", body: "Tight feedback loops keep the gears smooth." },
  ];
  const phaseImages = [
    discoveryImg,
    workflowDesignImg,
    integrationImg,
    testingImg,
    deploymentImg,
    optimizationImg,
  ];
  return (
    <section id="process" className="py-16">
      <div className="flex items-start justify-between">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Process</h2>
        <ListenBadge n={4} />
      </div>
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {phases.map((p, i) => (
          <Card key={i} className="rounded-2xl border-slate-200 overflow-hidden">
            <img src={phaseImages[i]} alt={p.title} className="w-full h-48 sm:h-64 lg:h-72 object-contain"/>
            <CardHeader>
              <CardTitle className="text-slate-900">{i+1}. {p.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-600">{p.body}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function CaseStudies() {
  const cases = [
    {
      title: "43°N 171° Storage — hands‑off rentals",
      url: "https://43n171storage.com/",
      summary: "Customer picks size and unit; Stripe confirms payment; Airtable stores record; unit is assigned and access granted instantly — no staff touch.",
      img: "https://images.unsplash.com/photo-1593941707874-ef25b8b4a92f?q=80&w=1200&auto=format&fit=crop",
      notes: ["Self‑serve selection", "Instant Stripe confirmation", "Airtable record + permissions"],
    },
    {
      title: "NEO Drain Cleaning — instant ops",
      url: "https://NEOdraincleaning.com/",
      summary: "Form submission creates customer and invoice in QuickBooks Online; all confirmations and comms are automated and fast.",
      img: "https://images.unsplash.com/photo-1581090465345-8f5260c972e9?q=80&w=1200&auto=format&fit=crop",
      link2: { label: "Job Form", url: "https://form.jotform.com/neodraincleaning/job" },
      notes: ["Auto customer + invoice (QBO)", "Email/SMS confirmations", "Zero manual entry"],
    },
  ];
  return (
    <section id="case-studies" className="py-16">
      <div className="flex items-start justify-between">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Case Studies</h2>
        <ListenBadge n={5} />
      </div>
      <p className="mt-3 text-slate-600">Real examples of one action spinning many gears.</p>
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        {cases.map((c, i) => (
          <Card key={i} className="rounded-2xl border-slate-200 overflow-hidden">
            <img src={c.img} alt={c.title} className="w-full h-40 object-cover"/>
            <CardHeader>
              <CardTitle className="text-slate-900">{c.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-600 space-y-3">
              <p>{c.summary}</p>
              <ul className="text-sm list-disc ml-5 space-y-1">
                {c.notes.map((n, idx) => <li key={idx}>{n}</li>)}
              </ul>
              <div className="flex flex-wrap gap-3 pt-2">
                <a className="inline-flex items-center gap-2 text-blue-700 hover:underline" href={c.url} target="_blank" rel="noreferrer"><LinkIcon className="h-4 w-4"/> Visit site</a>
                {c.link2 && (
                  <a className="inline-flex items-center gap-2 text-blue-700 hover:underline" href={c.link2.url} target="_blank" rel="noreferrer"><LinkIcon className="h-4 w-4"/> {c.link2.label}</a>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function Playbooks() {
  const plays = [
    { title: "Quote → Invoice → Payment", lines: ["Capture details once", "Create QBO customer + invoice", "Send pay link", "Post payment to ledger"] },
    { title: "Call Intake → Job Ticket", lines: ["Capture caller intent", "Validate address", "Create job in Airtable", "Notify crew via SMS"] },
    { title: "Form → Storage Access", lines: ["Check availability", "Assign unit", "Confirm payment", "Send access instructions"] },
  ];
  return (
    <section id="playbooks" className="py-16">
      <div className="flex items-start justify-between">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Playbooks</h2>
        <ListenBadge n={6} />
      </div>
      <p className="mt-3 text-slate-600">Reusable patterns that keep work moving without busywork.</p>
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {plays.map((p, i) => (
          <Card key={i} className="rounded-2xl border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-900">{p.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-600">
              <ul className="list-disc ml-5 space-y-1 text-sm">
                {p.lines.map((l, idx) => <li key={idx}>{l}</li>)}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function Tooling() {
  const tools = [
    { name: "Make.com", sub: "Automate workflows.", bullets: [
      "Your business runs itself while you sleep — every tedious task from follow-up emails to spreadsheet updates happens automatically",
      "One customer order triggers everything — inventory updates, thank-you emails, invoices, and delivery scheduling all fire instantly without you touching anything",
      "Reclaim your weekends — the difference between Sunday paperwork and Sunday family time",
    ] },
    { name: "Pipedream", sub: "Connect applications.", bullets: [
      "Your business's digital nervous system — instantly detects every lead, complaint, and payment, then triggers perfect responses across all your systems in milliseconds",
      "PhD-level operations manager — orchestrates hundreds of micro-tasks that used to devour your evenings and weekends",
      "Never takes sick days, never makes mistakes — costs less than your monthly coffee budget but works 24/7 with perfect precision",
    ] },
    { name: "Twilio", sub: "SMS, voice, text, data, more.", bullets: [
      "Pain: missed calls, phone tag, frustrated customers. Solution: intelligent IVR and SMS callbacks route to the right person and confirm updates automatically",
      "Pain: call notes everywhere, 'big picture' lost. Solution: calls and texts are transcribed with intent, then synced to tickets, jobs, and CRM instantly",
      "Pain: missed calls become missed sales opportunities. Solution: 24/7 'smart' receptionist transcribes calls initiates sale in real time",
    ] },
    { name: "Database (Airtable)", sub: "Raw materials.", bullets: [
      "Your single source of truth — clean tables, linked records, and views everyone understands at a glance",
      "Reuse.Enter once and it flows everywhere — forms force structure. Capture and store what YOU need",
      "Management clarity on demand — dashboards and filters show workload, backlog, and bottlenecks in minutes, not meetings",
    ] },
    { name: "OpenAI", sub: "Extract insights.", desc: "Transcription, summarization, and intent parsing." },
    { name: "QuickBooks", sub: "Accounting in your pocket.", bullets: [
      "Send invoices instantly from anywhere — create, email, or text invoices from your phone; customers pay online in seconds",
      "Get paid faster with instant payments — automatic reconciliation posts to the right accounts without manual entry",
      "Real‑time books for management — live P&L, cash flow, and A/R so decisions are made on current numbers, not last month’s",
    ] },
  ];
  const [expanded, setExpanded] = useState({});
  const toggleExpanded = (idx) => setExpanded((prev) => ({ ...prev, [idx]: !prev[idx] }));
  return (
    <section id="tooling" className="py-16">
      <div className="flex items-start justify-between">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Tools we use</h2>
        <ListenBadge n={7} />
      </div>
      <p className="mt-3 text-slate-600">We pick the simplest stack that gets the job done.</p>
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tools.map((t, i) => (
          <Card
            key={i}
            onClick={() => toggleExpanded(i)}
            className="rounded-2xl border-slate-200 overflow-hidden cursor-pointer"
          >
            <img src={
              t.name === "Twilio"
                ? "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='220'><rect width='800' height='220' fill='%23fee2e2'/><circle cx='140' cy='110' r='40' fill='%23ef4444'/><path d='M120 110a20 20 0 0 1 40 0' stroke='%23ffffff' stroke-width='6' fill='none'/><path d='M112 110a28 28 0 0 1 56 0' stroke='%23ffffff' stroke-width='4' fill='none' opacity='0.7'/><rect x='220' y='50' width='540' height='120' fill='%23ffffff' stroke='%23fecaca'/><line x1='220' y1='90' x2='760' y2='90' stroke='%23fecaca'/><line x1='220' y1='120' x2='760' y2='120' stroke='%23fecaca'/></svg>"
                : t.name === "Make.com"
                ? "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='220'><rect width='800' height='220' fill='%23ede9fe'/><g transform='translate(140,110)'><circle r='42' fill='%238a5cf6'/><circle r='22' fill='%23ffffff'/></g><g transform='translate(260,110)'><circle r='28' fill='%238a5cf6'/><circle r='12' fill='%23ffffff'/></g><g transform='translate(340,110)'><rect x='0' y='0' width='420' height='80' rx='8' fill='%23ffffff' stroke='%23c7d2fe'/><rect x='20' y='20' width='240' height='12' fill='%238a5cf6'/><rect x='20' y='44' width='180' height='12' fill='%23c7d2fe'/></g></svg>"
                : t.name === "Pipedream"
                ? "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='220'><rect width='800' height='220' fill='%23e0f2fe'/><rect x='40' y='50' width='200' height='120' rx='8' fill='%23ffffff' stroke='%23bae6fd'/><rect x='300' y='50' width='200' height='120' rx='8' fill='%23ffffff' stroke='%23bae6fd'/><rect x='560' y='50' width='200' height='120' rx='8' fill='%23ffffff' stroke='%23bae6fd'/><path d='M240 110 L300 110' stroke='%230ea5e9' stroke-width='6' marker-end='url(%23a)'/><path d='M500 110 L560 110' stroke='%230ea5e9' stroke-width='6' marker-end='url(%23a)'/><defs><marker id='a' markerWidth='10' markerHeight='10' refX='6' refY='3' orient='auto'><polygon points='0 0, 6 3, 0 6' fill='%230ea5e9'/></marker></defs></svg>"
                : t.name === "Database (Airtable)"
                ? "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='220'><rect width='800' height='220' fill='%23ffffff'/><rect x='20' y='20' width='760' height='180' fill='%23ffffff' stroke='%23cbd5e1'/><rect x='20' y='20' width='760' height='30' fill='%23f1f5f9'/><rect x='20' y='170' width='760' height='30' fill='%23fef9c3'/><line x1='20' y1='50' x2='780' y2='50' stroke='%23e2e8f0'/><line x1='20' y1='80' x2='780' y2='80' stroke='%23e2e8f0'/><line x1='20' y1='110' x2='780' y2='110' stroke='%23e2e8f0'/><line x1='20' y1='140' x2='780' y2='140' stroke='%23e2e8f0'/><line x1='20' y1='170' x2='780' y2='170' stroke='%23e2e8f0'/><line x1='20' y1='200' x2='780' y2='200' stroke='%23e2e8f0'/><line x1='220' y1='20' x2='220' y2='200' stroke='%23e2e8f0'/><line x1='320' y1='20' x2='320' y2='200' stroke='%23e2e8f0'/><line x1='460' y1='20' x2='460' y2='200' stroke='%23e2e8f0'/><line x1='600' y1='20' x2='600' y2='200' stroke='%23e2e8f0'/><text x='30' y='40' font-family='Arial' font-size='14' fill='%2337424d'>Item</text><text x='230' y='40' font-family='Arial' font-size='14' fill='%2337424d'>Qty</text><text x='330' y='40' font-family='Arial' font-size='14' fill='%2337424d'>Unit</text><text x='470' y='40' font-family='Arial' font-size='14' fill='%2337424d'>Line Notes</text><text x='610' y='40' font-family='Arial' font-size='14' fill='%2337424d'>Total</text><text x='30' y='72' font-family='Arial' font-size='13' fill='%23475569'>Valve, 3/4\'' steel</text><text x='230' y='72' font-family='Arial' font-size='13' fill='%23475569'>6</text><text x='330' y='72' font-family='Arial' font-size='13' fill='%23475569'>$29.00</text><text x='470' y='72' font-family='Arial' font-size='13' fill='%23475569'>Rush order</text><text x='610' y='72' font-family='Arial' font-size='13' fill='%23475569'>$174.00</text><text x='30' y='102' font-family='Arial' font-size='13' fill='%23475569'>PVC Elbow 90°</text><text x='230' y='102' font-family='Arial' font-size='13' fill='%23475569'>12</text><text x='330' y='102' font-family='Arial' font-size='13' fill='%23475569'>$4.50</text><text x='470' y='102' font-family='Arial' font-size='13' fill='%23475569'>Warehouse A</text><text x='610' y='102' font-family='Arial' font-size='13' fill='%23475569'>$54.00</text><text x='30' y='132' font-family='Arial' font-size='13' fill='%23475569'>Install labor (hr)</text><text x='230' y='132' font-family='Arial' font-size='13' fill='%23475569'>3</text><text x='330' y='132' font-family='Arial' font-size='13' fill='%23475569'>$95.00</text><text x='470' y='132' font-family='Arial' font-size='13' fill='%23475569'>Crew 2</text><text x='610' y='132' font-family='Arial' font-size='13' fill='%23475569'>$285.00</text><text x='30' y='162' font-family='Arial' font-size='13' fill='%23475569'>Shop supplies</text><text x='230' y='162' font-family='Arial' font-size='13' fill='%23475569'>1</text><text x='330' y='162' font-family='Arial' font-size='13' fill='%23475569'>$12.00</text><text x='470' y='162' font-family='Arial' font-size='13' fill='%23475569'>—</text><text x='610' y='162' font-family='Arial' font-size='13' fill='%23475569'>$12.00</text><text x='30' y='190' font-family='Arial' font-weight='bold' font-size='13' fill='%231f2937'>Subtotal</text><text x='610' y='190' font-family='Arial' font-weight='bold' font-size='13' fill='%231f2937'>$525.00</text></svg>"
                : t.name === "OpenAI"
                ? "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='220'><rect width='800' height='220' fill='%23ecfeff'/><g stroke='%2306b6d4' fill='%2306b6d4'><circle cx='140' cy='110' r='8'/><circle cx='220' cy='70' r='8'/><circle cx='220' cy='150' r='8'/><circle cx='300' cy='110' r='8'/><line x1='148' y1='110' x2='212' y2='70' stroke-width='2'/><line x1='148' y1='110' x2='212' y2='150' stroke-width='2'/><line x1='228' y1='70' x2='292' y2='110' stroke-width='2'/><line x1='228' y1='150' x2='292' y2='110' stroke-width='2'/></g><rect x='360' y='50' width='380' height='120' rx='8' fill='%23ffffff' stroke='%23cffafe'/><rect x='380' y='70' width='200' height='12' fill='%2306b6d4'/><rect x='380' y='94' width='260' height='12' fill='%2381e6f9'/></svg>"
                : t.name === "QuickBooks"
                ? "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='220'><rect width='800' height='220' fill='%23ecfdf5'/><rect x='80' y='100' width='40' height='60' fill='%2310b981'/><rect x='150' y='70' width='40' height='90' fill='%2315c79a'/><rect x='220' y='40' width='40' height='120' fill='%2322c55e'/><rect x='290' y='110' width='40' height='50' fill='%2399f6e4'/><polyline points='80,100 170,70 240,40 310,110' fill='none' stroke='%23065f46' stroke-width='3'/><rect x='370' y='50' width='360' height='120' rx='8' fill='%23ffffff' stroke='%23bbf7d0'/><rect x='390' y='70' width='220' height='12' fill='%2310b981'/><rect x='390' y='94' width='180' height='12' fill='%23bbf7d0'/></svg>"
                : "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='220'><rect width='800' height='220' fill='%23f8fafc'/><rect x='40' y='50' width='720' height='120' rx='8' fill='%23ffffff' stroke='%23e2e8f0'/><rect x='60' y='70' width='280' height='12' fill='%2360a5fa'/><rect x='60' y='94' width='220' height='12' fill='%2393c5fd'/></svg>"
            } alt="Tools" className="w-full h-28 object-cover"/>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-slate-900 sm:text-lg lg:text-xl">{t.name}</CardTitle>
                <div className="flex flex-col items-center ml-3 shrink-0">
                  <Volume2 className="h-5 w-5 text-slate-600" />
                  <a
                    href={`/media/audio_${i+1}.mp3`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-[10px] text-blue-700 hover:underline"
                  >
                    {i+1}. Listen
                  </a>
                </div>
              </div>
              {t.sub && (
                <div className="text-sm sm:text-base lg:text-lg font-semibold text-slate-700 sm:text-slate-800">{t.sub}</div>
              )}
            </CardHeader>
            <CardContent className={`text-slate-600 sm:text-slate-700 text-sm sm:text-base lg:text-lg ${expanded[i] ? 'block' : 'hidden sm:block'}` }>
              {Array.isArray(t.bullets) ? (
                <ul className="list-disc ml-5 space-y-1 text-sm sm:text-base lg:text-lg">
                  {t.bullets.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              ) : (
                t.desc
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function Results() {
  const bullets = [
    "Shorten handoffs and reduce double entry.",
    "Give customers fast, clear updates.",
    "Make billing and reporting easier.",
  ];
  return (
    <section id="results" className="py-16">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <div className="flex items-start justify-between">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">What tends to happen</h2>
            <ListenBadge n={8} />
          </div>
          <ul className="mt-4 space-y-2 text-slate-700">
            {bullets.map((b, i) => (
              <li key={i} className="flex gap-3 items-start"><CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5"/> {b}</li>
            ))}
          </ul>
          <div className="mt-6 flex gap-3">
            <Button className="rounded-2xl" onClick={() => document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})}><Rocket className="h-4 w-4 mr-2"/>Try the live demo</Button>
            <Button variant="secondary" className="rounded-2xl" onClick={() => document.getElementById('case-studies')?.scrollIntoView({behavior:'smooth'})}>See case studies</Button>
          </div>
        </div>
        <Card className="rounded-2xl border-slate-200 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop" alt="Results" className="w-full h-36 object-cover"/>
          <CardHeader>
            <CardTitle className="text-slate-900">Client notes (anonymized)</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-600 space-y-3">
            <p>“We finally trust our job data. The team isn’t re‑typing everything.”</p>
            <p>“The phone bot books the right jobs and sends clean info upstream.”</p>
            <p>“Our weekly meeting moved from blame to numbers.”</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function FAQ() {
  const qas = [
    { q: "How many clients do you work with?", a: "One or two at a time. That focus is the point." },
    { q: "How do projects start?", a: "We map the current process, pick a small win, and ship that first." },
    { q: "Do you build websites?", a: "Yes, but the website is the front door. The real work is the workflow behind it." },
    { q: "How do we communicate?", a: "Weekly demos and a shared task board. Plain language updates." },
  ];
  return (
    <section id="faq" className="py-16">
      <div className="flex items-start justify-between">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">FAQ</h2>
        <ListenBadge n={9} />
      </div>
      <div className="mt-6 grid sm:grid-cols-2 gap-5">
        {qas.map((qa, i) => (
          <Card key={i} className="rounded-2xl border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-900">{qa.q}</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-600">{qa.a}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [steps, setSteps] = useState([]);
  const [error, setError] = useState(null);

  const demoSteps = [
    { icon: Send, text: "Confirmation email/SMS queued", key: "notify" },
    { icon: Database, text: "Record created in Airtable", key: "db" },
    { icon: Workflow, text: "Task created on the team board", key: "task" },
    { icon: CreditCard, text: "(Optional) Payment link generated", key: "pay" },
    { icon: Bot, text: "AI summary drafted for the team", key: "ai" },
  ];

  function buildPayload() {
    // EDIT FIELD NAMES HERE if your webhook expects different keys
    return {
      source: "website-demo",
      submitted_at: new Date().toISOString(),
      contact: { name, email },
      intent: { first_automation: message },
      metadata: { page: "/#contact" },
    };
  }

  async function simulateProgress() {
    setSteps([]);
    for (let i = 0; i < demoSteps.length; i++) {
      await new Promise((r) => setTimeout(r, 500 + i * 350));
      setSteps((prev) => [...prev, { ...demoSteps[i], status: "done" }]);
    }
  }

  async function postToWebhook(payload) {
    // Functional prototype: try POST; if it fails (because placeholder), fall back to simulate
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json().catch(() => ({}));
      // If your webhook returns step info, map it here; otherwise simulate
      if (Array.isArray(data?.steps)) {
        setSteps(data.steps.map((s) => ({ text: s.label || s.text, status: s.status || "done", icon: Send })));
      } else {
        await simulateProgress();
      }
    } catch (err) {
      await simulateProgress();
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const payload = buildPayload();
    if (SIMULATION_MODE || /example\.com/.test(WEBHOOK_URL)) {
      await simulateProgress();
    } else {
      await postToWebhook(payload);
    }
    setLoading(false);
  };

  return (
    <section id="contact" className="py-16">
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div>
          <div className="flex items-start justify-between">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Live demo: one action → many results</h2>
            <ListenBadge n={10} />
          </div>
          <p className="mt-3 text-slate-600">Fill this form to see the gears turn. In production, this wires to Make.com or Pipedream and runs the real flow.</p>
          <div className="mt-4 text-sm text-slate-500 flex items-center gap-2"><Mail className="h-4 w-4"/> brian@mickley.net</div>
        </div>
        <Card className="rounded-2xl border-slate-200 form-card-bg">
          <CardHeader>
            <CardTitle className="text-slate-900">Try it</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
              <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Textarea placeholder="What would you automate first?" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} required />
              <div className="flex items-center justify-between">
                <div className="text-xs text-slate-500">We’ll reply in one business day.</div>
                <Button type="submit" className="rounded-2xl" disabled={loading}>
                  {loading ? "Running demo…" : "Submit & Trigger Demo"}
                </Button>
              </div>
            </form>

            {/* Demo timeline results */}
            {steps.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold text-slate-900 mb-2">Demo actions executed:</h4>
                <ul className="space-y-2 text-slate-700">
                  {steps.map((a, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <a.icon className="h-4 w-4 text-blue-600 mt-0.5"/>
                      <span>{a.text}</span>
                      {a.status === "done" && <CheckCircle2 className="h-4 w-4 text-blue-600 ml-2 mt-0.5"/>}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Developer note section (visible only to devs if you gate by env) */}
            <div className="mt-6 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
              <div className="font-semibold mb-1">Developer notes</div>
              <ul className="list-disc ml-5 space-y-1">
                <li><b>WEBHOOK_URL</b>: {WEBHOOK_URL} (edit at top of file)</li>
                <li><b>SIMULATION_MODE</b>: {String(SIMULATION_MODE)} — set to <code>false</code> for live webhook</li>
                <li><b>Payload</b>: see <code>buildPayload()</code> and <code>DEMO_PAYLOAD_EXAMPLE</code> at top</li>
              </ul>
            </div>

          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function Footer({ sections, onNav }) {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-slate-600">© {new Date().getFullYear()} SmallBiz AI Works</div>
        <div className="flex flex-wrap gap-4">
          {sections.map(s => (
            <button key={s.id} onClick={() => onNav(s.id)} className="text-sm text-slate-600 hover:text-slate-900">{s.label}</button>
          ))}
        </div>
      </div>
    </footer>
  );
}
