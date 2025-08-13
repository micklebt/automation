import React, { useEffect, useMemo, useState } from "react";

export default function MicroOfficeAutomationApp() {
  // --- Variant handling (A/B + mobile-optimized B) ---
  const [variant, setVariant] = useState("a");
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const v = params.get("variant") || localStorage.getItem("variant") || "a";
      setVariant(v);
      localStorage.setItem("variant", v);
      document.title =
        "Office Automation for Small Business | Micro Office Automation";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          "content",
          "From busywork to business growth. Survey-based office automation for small businesses across Canton, Akron, Cleveland, Pittsburgh, Alliance & Columbus. Free plan in 3 minutes."
        );
      }
      // Inject schema once
      if (!document.getElementById("schema-localbusiness")) {
        const s = document.createElement("script");
        s.type = "application/ld+json";
        s.id = "schema-localbusiness";
        s.text = JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Micro Office Automation",
          image:
            "https://www.microofficeautomation.com/assets/og-automation.jpg",
          url: "https://www.microofficeautomation.com/",
          telephone: "+1-330-919-5744",
          email: "info@microofficeautomation.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "3094 South Nickel Plate",
            addressLocality: "Louisville",
            addressRegion: "OH",
            postalCode: "44641",
            addressCountry: "US",
          },
          areaServed: [
            { "@type": "Place", name: "Canton, OH" },
            { "@type": "Place", name: "Akron, OH" },
            { "@type": "Place", name: "Cleveland, OH" },
            { "@type": "Place", name: "Pittsburgh, PA" },
            { "@type": "Place", name: "Alliance, OH" },
            { "@type": "Place", name: "Columbus, OH" },
          ],
        });
        document.body.appendChild(s);
      }
    } catch {}
  }, []);

  // --- ROI calculator ---
  const [hours, setHours] = useState(5);
  const [rate, setRate] = useState(30);
  const [people, setPeople] = useState(2);
  const [overhead, setOverhead] = useState(1.2);
  const savings = useMemo(() => Math.round(hours * rate * people * 4.33 * overhead), [hours, rate, people, overhead]);
  const tier = savings > 4000 ? "Pro" : savings > 1500 ? "Growth" : "Starter";

  // --- Survey state ---
  const [step, setStep] = useState(1);
  const [areas, setAreas] = useState<string[]>([]);
  const [tools, setTools] = useState("");
  const [team, setTeam] = useState(5);
  const [industry, setIndustry] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const percent = ((step - 1) / 3) * 100;
  const recommendation = useMemo(() => {
    const a = new Set(areas);
    if (a.has("Approvals & hand-offs")) return "Pro";
    if (a.has("Leads & CRM") || a.has("Follow-ups") || a.has("Documents & e-sign")) return "Growth";
    return "Starter";
  }, [areas]);

  const planText = `Hi ${name || ""}, based on your answers we recommend the ${recommendation} package.\n\nFocus areas: ${
    areas.join(", ") || "—"
  }\nTools: ${tools}\nTeam size: ${team}\nIndustry: ${industry}\n\nNext step: 20-minute consult to finalize scope.`;

  const mailtoHref = `mailto:info@microofficeautomation.com?subject=Automation%20Plan%20Request&body=${encodeURIComponent(
    planText + "\n\nContact: " + name + " | " + email + " | " + phone
  )}`;

  // --- UI helpers ---
  const toggleArea = (val: string) =>
    setAreas((prev) => (prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]));

  // Mobile-optimized tweaks on variant B
  const heroTitle = variant === "b" ? "Make Work Flow. Grow Profits on Autopilot." : "From Busywork to Business Growth.";
  const heroCTA = variant === "b" ? "Start Your Free Automation Plan" : "Start the 3‑Minute Automation Survey";

  return (
    <div className="text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-blue-700 text-white">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="font-bold">Micro Office Automation</div>
          <nav className="hidden sm:flex items-center gap-4">
            <a href="#how" className="hover:underline">How it works</a>
            <a href="#offer" className="hover:underline">Services</a>
            <a href="#survey" className="bg-orange-500 px-3 py-2 rounded-lg font-semibold">Start Survey</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className={`bg-gradient-to-br from-blue-700 to-blue-900 text-white ${variant === "b" ? "py-10" : "py-16"}`}>
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="inline-block bg-blue-100/20 rounded-full px-2.5 py-1 text-xs font-bold tracking-wide">
              Serving Canton • Akron • Cleveland • Pittsburgh • Alliance • Columbus
            </span>
            <h1 className={`mt-3 font-extrabold leading-tight ${variant === "b" ? "text-3xl" : "text-4xl"}`}>{heroTitle}</h1>
            <p className="mt-3 text-white/90 md:max-w-[48ch]">
              Office automation for small businesses in Northeast Ohio. Qualify leads faster, reduce admin, and keep your pipeline humming.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href="#survey" className="bg-orange-500 hover:bg-orange-600 px-4 py-3 rounded-xl font-bold inline-block">
                {heroCTA}
              </a>
              <a href="tel:13309195744" className="bg-white text-blue-800 px-4 py-3 rounded-xl font-bold inline-block border border-white/30">
                Call 330‑919‑5744
              </a>
            </div>
            <div className="mt-3 text-sm opacity-95 flex items-center gap-4">
              <span>✔️ Local. Responsive. Done‑for‑you setup.</span>
              <span>✔️ Works with Google, Microsoft, Zapier, CRM.</span>
            </div>
          </div>
          <div className="hidden md:block">
            {/* Simple inline illustration */}
            <svg viewBox="0 0 480 320" className="w-full h-auto drop-shadow-xl" role="img" aria-label="Automation dashboard illustration">
              <rect x="0" y="0" width="480" height="320" rx="16" fill="#0ea5e9" />
              <rect x="24" y="24" width="432" height="60" rx="10" fill="#fff" opacity=".95" />
              <rect x="24" y="100" width="200" height="180" rx="10" fill="#fff" opacity=".95" />
              <rect x="240" y="100" width="216" height="80" rx="10" fill="#fff" opacity=".95" />
              <rect x="240" y="192" width="216" height="88" rx="10" fill="#fff" opacity=".95" />
            </svg>
          </div>
        </div>
      </section>

      {/* Pain */}
      <section id="pain" className="py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold">The bottlenecks we eliminate</h2>
          <div className="mt-4 grid md:grid-cols-3 gap-4">
            <div className="rounded-2xl border p-4"><b>Manual data entry</b><p>Copy‑pasting between email, spreadsheets, and CRM.</p></div>
            <div className="rounded-2xl border p-4"><b>No‑show appointments</b><p>Inconsistent reminders and confirmations.</p></div>
            <div className="rounded-2xl border p-4"><b>Lead leakage</b><p>Unassigned inquiries and slow follow‑ups.</p></div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-14 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold">How it works</h2>
          <p className="text-slate-600">A simple survey funnel informs a personalized plan and no‑stress implementation.</p>
          <div className="mt-4 grid md:grid-cols-3 gap-4">
            <div className="rounded-2xl border p-4"><b>1) Map the busywork</b><p>We audit bottlenecks across leads, scheduling, docs, and follow‑ups.</p></div>
            <div className="rounded-2xl border p-4"><b>2) Design & connect</b><p>We connect your tools and build automation with guardrails.</p></div>
            <div className="rounded-2xl border p-4"><b>3) Launch, measure, improve</b><p>We track results and optimize in the first month.</p></div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="offer" className="py-14">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-6 items-start">
          <div>
            <h2 className="text-2xl font-bold">Office Automation for Small Business</h2>
            <ul className="list-disc pl-5 mt-3 space-y-1">
              <li>Lead capture + instant routing to CRM</li>
              <li>Appointment scheduling & reminders</li>
              <li>Quote/estimate workflows & e‑signatures</li>
              <li>Document intake & approvals</li>
              <li>Task/follow‑up sequences for sales</li>
              <li>KPI dashboards & weekly summaries</li>
            </ul>
            <a href="#survey" className="mt-4 inline-block bg-orange-500 text-white px-4 py-3 rounded-xl font-bold">Find out what you can automate</a>
          </div>
          <div className="rounded-2xl border p-5">
            <h3 className="font-bold">Packages (most popular →)</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><b>Starter:</b> Lead capture, calendar, email basics</li>
              <li><b>Growth:</b> CRM automation, quotes, e‑sign, reminders</li>
              <li><b>Pro:</b> Custom workflows, dashboards, priority support</li>
            </ul>
            <p className="text-slate-600 mt-2">All plans include implementation, training, and 30‑day optimization.</p>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section id="roi" className="py-14 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-6 items-start">
          <div className="rounded-2xl border p-5">
            <h2 className="text-2xl font-bold">ROI Calculator</h2>
            <p className="text-slate-600">Estimate your monthly savings from automation.</p>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <label className="text-sm">Hours saved/week
                <input type="number" min={0} value={hours} onChange={(e)=>setHours(parseInt(e.target.value||"0"))} className="mt-1 w-full border rounded-lg p-2" />
              </label>
              <label className="text-sm">Avg hourly cost ($)
                <input type="number" min={0} value={rate} onChange={(e)=>setRate(parseInt(e.target.value||"0"))} className="mt-1 w-full border rounded-lg p-2" />
              </label>
              <label className="text-sm"># of people affected
                <input type="number" min={1} value={people} onChange={(e)=>setPeople(parseInt(e.target.value||"1"))} className="mt-1 w-full border rounded-lg p-2" />
              </label>
              <label className="text-sm">Overhead multiplier
                <select value={overhead} onChange={(e)=>setOverhead(parseFloat(e.target.value))} className="mt-1 w-full border rounded-lg p-2">
                  <option value={1.2}>1.2 (typical)</option>
                  <option value={1.4}>1.4</option>
                  <option value={1.6}>1.6</option>
                </select>
              </label>
            </div>
            <p className="mt-3 font-bold">Estimated monthly savings: ${savings.toLocaleString()}</p>
            <p className="italic">Recommended: {tier}</p>
          </div>
          <div className="rounded-2xl border p-5">
            <h3 className="font-bold">Why this works</h3>
            <p>
              Automation shines on repetitive, rules‑based tasks. Start with lead capture & scheduling, then layer reminders, document flows, and CRM updates. Keep humans for judgment calls.
            </p>
            <a href="#survey" className="mt-3 inline-block bg-orange-500 text-white px-4 py-3 rounded-xl font-bold">Get a personalized automation plan</a>
          </div>
        </div>
      </section>

      {/* Proof */}
      <section id="proof" className="py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold">Local results & social proof</h2>
          <div className="grid md:grid-cols-3 gap-4 mt-3">
            <div className="rounded-2xl border p-4 italic">“Our intake is tidy and follow‑ups happen like clockwork.”<div className="not-italic">— Owner, accounting firm in Canton</div></div>
            <div className="rounded-2xl border p-4 italic">“Scheduling + reminders alone paid for the project in month one.”<div className="not-italic">— Practice manager, healthcare clinic in Akron</div></div>
            <div className="rounded-2xl border p-4 italic">“Leads route instantly to the right rep. No more inbox chaos.”<div className="not-italic">— Sales lead, services company in Columbus</div></div>
          </div>
          <p className="text-slate-600 mt-2">Anonymous summaries used with permission. Detailed case studies available on request.</p>
        </div>
      </section>

      {/* Survey */}
      <section id="survey" className="py-14 bg-slate-50">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-2xl font-bold">3‑Minute Automation Survey</h2>
          {/* Progress */}
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden mt-2" aria-label="progress">
            <div className="h-full bg-orange-500" style={{ width: `${percent}%` }} />
          </div>

          {/* Steps */}
          {step === 1 && (
            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              {[
                "Leads & CRM",
                "Scheduling",
                "Documents & e-sign",
                "Approvals & hand-offs",
                "Follow-ups",
              ].map((label) => (
                <label key={label} className={`border rounded-xl p-3 cursor-pointer ${areas.includes(label) ? "ring-2 ring-orange-500" : ""}`}>
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={areas.includes(label)}
                    onChange={() => toggleArea(label)}
                  />
                  {label}
                </label>
              ))}
              <div className="sm:col-span-2 flex gap-3 mt-1">
                <button onClick={() => setStep(2)} className="bg-orange-500 text-white px-4 py-2 rounded-xl font-bold">
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="mt-4">
              <label className="block text-sm">What tools do you use today?
                <input value={tools} onChange={(e)=>setTools(e.target.value)} placeholder="e.g., Gmail, Microsoft 365, QuickBooks, HubSpot" className="mt-1 w-full border rounded-lg p-2" />
              </label>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <label className="text-sm">Team size
                  <input type="number" min={1} value={team} onChange={(e)=>setTeam(parseInt(e.target.value||"1"))} className="mt-1 w-full border rounded-lg p-2" />
                </label>
                <label className="text-sm">Industry
                  <input value={industry} onChange={(e)=>setIndustry(e.target.value)} placeholder="e.g., services, healthcare, legal" className="mt-1 w-full border rounded-lg p-2" />
                </label>
              </div>
              <div className="flex gap-3 mt-3">
                <button onClick={() => setStep(1)} className="px-4 py-2 rounded-xl font-bold border">Back</button>
                <button onClick={() => setStep(3)} className="bg-orange-500 text-white px-4 py-2 rounded-xl font-bold">Next</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="mt-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <label className="text-sm">Name
                  <input value={name} onChange={(e)=>setName(e.target.value)} required className="mt-1 w-full border rounded-lg p-2" />
                </label>
                <label className="text-sm">Email
                  <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required className="mt-1 w-full border rounded-lg p-2" />
                </label>
              </div>
              <label className="text-sm mt-3 block">Phone
                <input value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="330-919-5744" className="mt-1 w-full border rounded-lg p-2" />
              </label>
              <div className="flex gap-3 mt-3">
                <button onClick={() => setStep(2)} className="px-4 py-2 rounded-xl font-bold border">Back</button>
                <a href={mailtoHref} className="bg-orange-500 text-white px-4 py-2 rounded-xl font-bold">Email My Plan</a>
              </div>
              {/* Preview of the plan */}
              <div className="mt-4 border rounded-2xl p-4 bg-white">
                <h3 className="font-bold">Your personalized plan</h3>
                <pre className="whitespace-pre-wrap text-sm mt-2">{planText}</pre>
                <p className="mt-2 italic">Recommendation: {recommendation}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA bottom */}
      <section className="py-14 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-2xl font-bold">Ready to make work flow?</h2>
          <p className="text-slate-600 mt-1">Start with the 3‑minute survey. We'll send a plan you can act on this week.</p>
          <a href="#survey" className="mt-4 inline-block bg-orange-500 text-white px-5 py-3 rounded-xl font-bold">Start Your Free Productivity Survey</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-700 text-white">
        <div className="mx-auto max-w-6xl px-4 py-8 grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-bold text-lg">Micro Office Automation</h3>
            <p>A trade name and a division of Brian T. Mickley, Inc.</p>
            <p>3094 South Nickel Plate, Louisville, Ohio 44641</p>
            <p>
              Phone: <a href="tel:13309195744" className="underline">330‑919‑5744</a> • Email: <a className="underline" href="mailto:info@microofficeautomation.com">info@microofficeautomation.com</a>
            </p>
          </div>
          <div>
            <h4 className="font-bold">Links</h4>
            <p className="space-x-2">
              <a href="#how" className="underline">How it works</a>
              <a href="#offer" className="underline">Services</a>
              <a href="#roi" className="underline">ROI</a>
              <a href="#survey" className="underline">Survey</a>
              <a href="#proof" className="underline">Results</a>
            </p>
          </div>
          <div>
            <h4 className="font-bold">Hours</h4>
            <p>Mon–Fri 9:00–5:00 ET</p>
            <p>Serving Ohio & nearby regions</p>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 py-3 border-t border-white/30">
          <small>© {new Date().getFullYear()} Micro Office Automation. All rights reserved.</small>
        </div>
      </footer>
    </div>
  );
}
