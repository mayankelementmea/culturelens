# CultureLens — Gamified Culture Diagnostic Platform

**By element | Strategic HR Consulting**

CultureLens is a digital culture diagnostic that replaces traditional surveys with 18 visual, gamified exercises across 6 chapters. It measures organisational culture across 7 diagnostic layers using hidden assessment, projective techniques, and third-person framing — producing a Culture Truth Map for leadership and a personal Culture Profile for every participant.

## Quick Start

### 1. Clone and install
```bash
git clone https://github.com/YOUR_USERNAME/culturelens.git
cd culturelens
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual keys:
- **AIRTABLE_API_KEY**: Get from https://airtable.com/create/tokens
- **AIRTABLE_BASE_ID**: Create a base called "CultureLens" and copy the base ID from the URL
- **ANTHROPIC_API_KEY**: Get from https://console.anthropic.com

### 3. Set up Airtable
Create these 6 tables in your CultureLens base:

| Table | Key Fields |
|-------|-----------|
| **Organisations** | org_id (auto), org_name, industry, employee_count, geography, owner_type, contact_email, status |
| **Participants** | participant_id (auto), org_link (link), email, name, department, level, tenure_band, chapters_completed (number), unique_token, invited_at, completed_at |
| **Responses** | response_id (auto), participant_link (link), chapter, raw_data (long text), submitted_at, + score fields per chapter |
| **Stories** | story_id (auto), participant_link (link), prompt_type, story_text, ai_themes, ai_valence, ai_schein_level, ai_values_referenced, ai_founding_theme, department (lookup) |
| **NetworkEdges** | edge_id (auto), from_participant (link), to_name, to_department, network_type, org_link (link) |
| **TruthMaps** | truthmap_id (auto), org_link (link), generated_at, executive_summary, findings_json, contradictions_json, priorities_json, full_narrative |

### 4. Run locally
```bash
npm run dev
```

Visit http://localhost:3000

### 5. Deploy to Vercel
```bash
npm i -g vercel
vercel
```

Or connect your GitHub repo to [vercel.com](https://vercel.com) for automatic deployments.

## Architecture

```
culturelens/
├── app/
│   ├── layout.js          # Root layout with metadata
│   ├── page.js            # Landing page (participant-facing)
│   ├── globals.css         # Element brand system
│   ├── api/
│   │   └── submit/route.js # Form submission API (all chapters)
│   └── chapter/
│       └── page.js         # Chapter router
├── components/
│   └── Chapter1.js         # Ch1: My Space (fully interactive)
├── lib/
│   ├── airtable.js         # Database operations
│   ├── scoring.js          # All scoring formulas
│   └── claude.js           # AI analysis + Truth Map generation
└── public/
    └── landing-preview.html # Standalone landing page
```

## The 7 Diagnostic Layers

| Layer | Framework | What it uncovers |
|-------|-----------|-----------------|
| L1: Depth | Schein (1984) | Gap between artifacts, values, and assumptions |
| L2: Typology | Cameron & Quinn CVF (1999) | Clan/Adhocracy/Market/Hierarchy blend |
| L3: Values | Barrett CTT (1998) | Cultural entropy, values alignment |
| L4: Strategy | Denison DOCS (1990) | Culture-to-strategy fit |
| L5: Power | Cross & Parker ONA (2004) | Hidden connectors, bottlenecks |
| L6: Safety | Edmondson (1999) | Psychological safety by team |
| L7: Generational | Schein + Gersick (1997) | Founder values, drift, legacy |

## Building Remaining Chapters

Chapter 1 is fully built as a reference implementation. To build Chapters 2-6, create new components following the same pattern:

- **Chapter2.js**: 4 branching scenarios (use state machine for branching) + timeline sliders
- **Chapter3.js**: Value card selector (3 rounds) + coin allocation + four-worlds rating + origin tracing
- **Chapter4.js**: Story text inputs (origin, best, blocker, unwritten rule) + drift dual-sliders
- **Chapter5.js**: 3 sets of 3 name input fields with department
- **Chapter6.js**: 6 safety scenario selectors + 6 Denison sliders + one-word input

Each chapter submits to the same `/api/submit` endpoint with `chapter: 'ch2'` etc. The scoring functions are already defined in `lib/scoring.js`.

## Monthly Cost

| Tool | Cost |
|------|------|
| Vercel (hosting) | Free |
| Airtable (database) | $20/mo |
| Claude API (analysis) | ~$5/diagnostic |
| **Total** | **~$25/mo** |

## Revenue Model

- Per diagnostic: $10-25K
- Monthly tool cost: ~$25
- First diagnostic ROI: >400x

---

Built with the CultureLens master model — 7 diagnostic layers, 3 extraction principles, 16 interaction types, 5 convergence rules. See the full methodology documentation in the element brand system.

**element** | Strategic HR Consulting | elementmea.com
