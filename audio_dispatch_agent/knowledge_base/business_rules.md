# Dump Truck Industry — Business Rules & Terminology

This file is the AI's reference for industry-specific language, business logic,
and operational rules. Add to this file as you encounter new terms, edge cases,
or rules that the AI should know.

---

## Key Terminology

### Parties
- **Broker**: Middleman who connects customers needing hauling with drivers/trucks. Holds contracts, manages dispatch, takes a margin.
- **Sub-broker**: Another broker who receives loads from the primary broker. Has their own driver pool. Takes a cut between the broker's rate and the driver's rate.
- **Owner-operator (O/O)**: Driver who owns their own truck. Operates as independent contractor. Sets their own availability.
- **Company driver**: Driver employed by a trucking company (not independent). Dispatched by their company, not directly by the broker.
- **GC (General Contractor)**: Common customer type. Manages construction sites, orders materials and hauling.
- **End client**: The ultimate customer paying for the work. May be a GC, developer, homeowner, municipality, etc.

### Job Types
- **Haul**: Transport material from point A to point B
- **Delivery**: Bring material TO a site (typically from a quarry, pit, or yard)
- **Removal / Haul-off**: Take material AWAY from a site (demo debris, spoils, excess dirt)
- **Spread**: Deliver AND spread material on site (requires specific truck — belly dump, slinger, etc.)
- **Import / Export**: Construction terms — "import" = bring material in, "export" = take material out
- **Standby / Waiting time**: Driver is on site but not actively loading/dumping. Usually billed hourly.

### Materials (common)
- **Gravel / Crushed stone**: Sized by specification (#57, #3, #4, ABC, GAB, crush-and-run)
- **Topsoil**: Screened or unscreened
- **Fill dirt**: Unprocessed earth for filling. Cheap but heavy.
- **Sand**: Mason sand, concrete sand, fill sand — different grades
- **Asphalt / Millings**: Hot-mix asphalt (HMA) or reclaimed asphalt pavement (RAP/millings)
- **Demo debris / C&D**: Construction and demolition waste. May require special dump permits.
- **Concrete**: Broken concrete for recycling or riprap
- **Spoils**: Excavated soil, may contain rocks, roots, debris
- **Riprap**: Large stone for erosion control

### Truck Types
- **Tri-axle dump**: Standard 3-axle dump truck. ~16-18 tons capacity.
- **Tandem**: 2-axle dump truck. ~12-14 tons. More maneuverable, smaller loads.
- **Quad-axle**: 4-axle dump. ~20-22 tons. Heavier capacity.
- **Transfer dump**: Truck + pup trailer. Double capacity per trip.
- **Belly dump**: Bottom-discharge trailer. Good for spreading on roads.
- **End dump trailer**: Tractor-trailer combination. ~22-24 tons.
- **Slinger truck**: Conveyor-equipped truck that can place material precisely.
- **Water truck**: For dust control on site. Billed hourly.
- **Lowboy**: Flatbed trailer for hauling equipment, not material.

### Rate Structures
- **Per load**: Flat rate per truckload regardless of material weight
- **Per ton**: Rate based on scale ticket weight
- **Per hour**: Hourly rate (common for standby, spreading, short-haul loops)
- **Round trip**: Rate covers pickup, delivery, and return to origin
- **Day rate**: Flat rate for a full day of work (8-10 hours typically)

### Operational Terms
- **Scale ticket**: Weight receipt from a certified scale. Proof of tonnage delivered.
- **Load count**: Number of individual truckloads delivered. Tracked for per-load billing.
- **Cycle time**: Round-trip time from load to dump and back. Determines daily productivity.
- **Tailgate time**: Time from arrival at dump site to completion of dumping.
- **Layover / Dead-head**: Driving without a load (empty return trip). Some rates compensate for this.
- **Hot plant**: Asphalt production facility. Jobs from hot plants are time-sensitive (material cools).
- **Pit / Quarry**: Source location for raw materials.
- **Dump site / Fill site**: Destination for removed material.

---

## Business Rules

### Rate Confidentiality
- NEVER include the broker's margin in any dispatch message
- Driver sees only THEIR rate
- Sub-broker sees only THEIR rate from the broker
- End client rate is broker-internal only

### Compliance Requirements
- All drivers must carry valid COI (Certificate of Insurance) on file
- DOT number required for interstate or over-26,000 lb GVWR
- Some dump sites require specific permits (especially C&D / demo debris)
- Scale tickets must be retained for billing reconciliation
- Some municipalities require flaggers or traffic control plans for public road access

### Dispatch Timing Norms
- **ASAP / Hot jobs**: Expect driver response within 15 minutes
- **Next day**: Dispatch the evening before or early morning (5-6am)
- **Scheduled project**: Can dispatch 24-48 hours ahead
- **Multi-day**: Confirm each day's schedule the evening before

### Common Edge Cases the AI Should Handle
- "I need 3 trucks" = 3 separate driver dispatches, not 1 dispatch for 3 loads
- "Bring me 100 tons" = calculate loads based on truck type (~6 tri-axle loads)
- "Same as last time" = look up customer's most recent job in history
- "Send me somebody" = customer doesn't care which driver, broker picks best available
- "He knows where it is" = driver has been to this site before, still include address
- "DOT job" = government/municipal project, may have prevailing wage or special requirements
- "Rain day" = job may be weather-dependent, confirm morning-of
