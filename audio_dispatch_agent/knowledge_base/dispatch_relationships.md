# Dump Truck Dispatch — Relationship Types & Routing Rules

This file teaches the AI the different dispatch relationships and how messages
should differ depending on who is sending to whom.

---

## Relationship: Broker → Driver / Owner-Operator

**Context**: You (the broker) are dispatching a load directly to an independent
driver or owner-operator who will haul it with their own truck.

**What the driver needs to know**:
- Exact pickup and delivery addresses
- Material type and estimated quantity (tons or loads)
- Time window (when to arrive at pickup)
- Rate (per load, per ton, or per hour) — always include if available
- PO or reference number for the job
- Any site-specific instructions (flaggers, weight limits, gate codes, steep grade, etc.)
- Customer contact name and number (for the job site contact, NOT the end client)

**What to OMIT from driver messages**:
- Your broker margin or markup
- The end client's rate to you
- Other drivers being considered or contacted
- Internal notes about the customer's payment history

**Tone**: Direct, professional, friendly. Drivers are independent contractors —
they choose whether to accept. Make the job attractive but honest.

**Accept/Decline**: Always end with a clear accept/decline mechanism
(reply YES/NO, or call back by X time).

---

## Relationship: Broker → Sub-Broker

**Context**: You are offering a load to another broker (sub-broker) who will
find their own driver. This happens when you don't have a driver available,
the job is outside your coverage area, or the sub-broker has a relationship
with a reliable driver near the site.

**What the sub-broker needs to know**:
- Pickup and delivery addresses
- Material type and quantity
- Time window
- YOUR rate to them (their margin comes out of this)
- PO or reference number
- Job duration (one-time haul vs. multi-day project)
- Whether the job is confirmed or still tentative
- Any compliance requirements (DOT, insurance minimums, dump site permits)

**What to OMIT from sub-broker messages**:
- Your rate from the end client (your margin is your business)
- Driver-level operational details they'll handle themselves
- Other sub-brokers being contacted for the same load

**Tone**: Professional, peer-to-peer. Sub-brokers are business partners.
Be clear about expectations and timelines.

**Response mechanism**: Typically "confirm by [time]" or "call to discuss."
Sub-broker dispatches move slower than direct driver dispatches.

---

## Relationship: Broker → Repeat/Preferred Driver

**Context**: Same as Broker → Driver, but this is a driver you've worked with
before. The knowledge base may have history (past jobs, reliability score,
preferred material types, home base location).

**Enhancements over standard driver dispatch**:
- Reference past work: "You hauled 6 loads of gravel to this same site last month"
- Skip over-explaining site details they already know
- Mention if the customer specifically requested them
- Can use slightly more casual tone if relationship is established

---

## Relationship: Customer/GC → Broker (Inbound)

**Context**: This is NOT a dispatch — it's the inbound request that triggers
the dispatch pipeline. A general contractor, developer, homeowner, or site
manager calls/texts/emails requesting a hauling job.

**What to extract from their request**:
- What they need hauled (material)
- Where from → where to
- How much (tons, loads, or "fill a 10x10 area")
- When they need it
- Any site constraints
- Their contact info
- Whether they have a PO or this is a verbal agreement

**This feeds into**: The "Dump Truck Job Structured" parser, which creates
the JSON that then gets routed to either a driver or sub-broker dispatch.

---

## Dispatch Priority Logic (Tiered)

When a new job comes in, route in this order:

1. **Preferred driver with history at that site** → Direct dispatch
2. **Preferred driver in the area** → Direct dispatch
3. **Any available driver in the area** → Direct dispatch
4. **Sub-broker with coverage in that area** → Sub-broker dispatch
5. **Open broadcast to driver pool** → Group text/call
6. **Escalation** → Manual broker intervention

Wait time between tiers: configurable (default 10 minutes per tier).
