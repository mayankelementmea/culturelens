/**
 * CultureLens — Scoring Engine
 * Computes derived scores from raw exercise data for each chapter
 */

// ── Chapter 1: My Space ──
export function scoreCh1(data) {
  const { workspace_type, openness, energy, formality, pace, warmth, desk_items, reactions } = data
  
  const escapeItems = ['Privacy screen', 'Noise-cancelling headphones', 'Quiet corner', 'Door / private space']
  const positiveReactions = ['Proud', 'Energised', 'Calm', 'Inspired', 'Connected', 'Motivated', 'Grateful']
  
  const escape_signal_count = desk_items.filter(i => escapeItems.includes(i)).length
  const positive_count = reactions.filter(r => positiveReactions.includes(r)).length
  const sentiment_ratio = +(positive_count / 3).toFixed(2)
  
  // Category counts
  const categories = {
    autonomy: desk_items.filter(i => ['Standing desk', 'Dual monitor / premium tech'].includes(i)).length,
    collaboration: desk_items.filter(i => ['Whiteboard', 'Team table', 'Coffee / snack area'].includes(i)).length,
    wellbeing: desk_items.filter(i => ['Plant / nature', 'Ergonomic chair', 'Quiet corner'].includes(i)).length,
    status: desk_items.filter(i => ['Door / private space', 'Awards / recognition wall'].includes(i)).length,
    development: desk_items.filter(i => ['Bookshelf / learning resources'].includes(i)).length,
  }
  
  return {
    workspace_type: Array.isArray(workspace_type) ? workspace_type.join(', ') : workspace_type,
    openness_score: openness * 10,
    energy_score: energy * 10,
    formality_score: formality * 10,
    pace_score: pace * 10,
    warmth_score: warmth * 10,
    escape_signal_count,
    escape_signal_alert: escape_signal_count >= 3,
    sentiment_ratio,
    workspace_need_type: Object.entries(categories).sort((a,b) => b[1] - a[1])[0][0],
    desk_items: desk_items.join(', '),
    reactions: reactions.join(', '),
  }
}

// ── Chapter 2: How We Move ──
export function scoreCh2(data) {
  const { scenarios, timeline } = data
  
  // Aggregate assumption scores across 4 scenarios
  const dimensions = {
    voice_safety: 0, risk_tolerance: 0, collaboration: 0, hierarchy_comfort: 0,
    accountability: 0, innovation_drive: 0, conflict_approach: 0, people_vs_results: 0,
  }
  
  // Each scenario choice maps to dimension adjustments (defined in SCENARIO_SCORING)
  for (const s of scenarios) {
    const scores = SCENARIO_SCORING[s.scenario]?.[s.choice] || {}
    for (const [dim, val] of Object.entries(scores)) {
      if (dimensions[dim] !== undefined) dimensions[dim] += val
    }
  }
  
  // Normalise timeline to percentages
  const total = Object.values(timeline).reduce((a, b) => a + b, 0) || 1
  const timeNorm = {}
  for (const [k, v] of Object.entries(timeline)) {
    timeNorm[`time_${k}_pct`] = +((v / total) * 100).toFixed(1)
  }
  
  return {
    ...dimensions,
    ...timeNorm,
    meeting_to_focus: +((timeline.meetings || 0) / Math.max(timeline.focus || 1, 1)).toFixed(2),
    admin_to_creative: +((timeline.admin || 0) / Math.max(timeline.creative || 1, 1)).toFixed(2),
    firefighting_pct: +((timeline.firefighting || 0) / total * 100).toFixed(1),
  }
}

// ── Chapter 3: What We Stand For ──
export function scoreCh3(data) {
  const { r1_current, r2_desired, r3_personal, auction, four_worlds_current, four_worlds_ideal, value_origins } = data
  
  const limitingValues = ['Blame', 'Bureaucracy', 'Control', 'Fear', 'Silos', 'Politics', 'Micromanagement', 'Short-termism', 'Complacency', 'Overwork']
  
  const limitingInR1 = r1_current.filter(v => limitingValues.includes(v)).length
  const entropy = r1_current.length > 0 ? +((limitingInR1 / r1_current.length) * 100).toFixed(1) : 0
  
  const r1r2_overlap = r1_current.filter(v => r2_desired.includes(v)).length
  const values_gap = 10 - r1r2_overlap
  
  const r1r3_overlap = r1_current.filter(v => r3_personal.includes(v)).length
  const personal_fit = r1r3_overlap
  
  const r2r3_overlap = r2_desired.filter(v => r3_personal.includes(v)).length
  const r1r2r3_overlap = r1_current.filter(v => r2_desired.includes(v) && r3_personal.includes(v)).length
  const champion_index = r2r3_overlap - r1r2r3_overlap
  
  // CVF from four worlds
  const fwcTotal = Object.values(four_worlds_current).reduce((a,b) => a+b, 0) || 1
  const fwiTotal = Object.values(four_worlds_ideal).reduce((a,b) => a+b, 0) || 1
  
  // Founder attribution
  const founderSources = ['The founder', 'The owning family']
  const founder_pct = value_origins
    ? +((value_origins.filter(v => founderSources.includes(v)).length / Math.max(value_origins.length, 1)) * 100).toFixed(0)
    : 0
  const unknown_pct = value_origins
    ? +((value_origins.filter(v => v === "Don't know").length / Math.max(value_origins.length, 1)) * 100).toFixed(0)
    : 0
  
  return {
    entropy_score: entropy,
    values_gap,
    personal_fit,
    champion_index,
    top_current: r1_current.slice(0, 5).join(', '),
    top_desired: r2_desired.slice(0, 5).join(', '),
    cvf_clan_current: +((four_worlds_current.clan / fwcTotal) * 100).toFixed(1),
    cvf_adhocracy_current: +((four_worlds_current.adhocracy / fwcTotal) * 100).toFixed(1),
    cvf_market_current: +((four_worlds_current.market / fwcTotal) * 100).toFixed(1),
    cvf_hierarchy_current: +((four_worlds_current.hierarchy / fwcTotal) * 100).toFixed(1),
    founder_attribution_pct: +founder_pct,
    unknown_attribution_pct: +unknown_pct,
    auction_distribution: JSON.stringify(auction),
  }
}

// ── Chapter 6: Truth Mirror ──
export function scoreCh6(data) {
  const { safety_scenarios, denison_spectrums, one_word } = data
  
  const safetyScoreMap = { A: 4, B: 3, C: 2, D: 1 }
  const safetyScores = safety_scenarios.map(s => safetyScoreMap[s] || 2)
  const safety_index = +(safetyScores.reduce((a,b) => a+b, 0) / safetyScores.length).toFixed(1)
  
  return {
    safety_index,
    safety_voice: safetyScoreMap[safety_scenarios[0]] || 0,
    safety_error: safetyScoreMap[safety_scenarios[1]] || 0,
    safety_inclusion: safetyScoreMap[safety_scenarios[2]] || 0,
    safety_dissent: safetyScoreMap[safety_scenarios[3]] || 0,
    safety_upward: safetyScoreMap[safety_scenarios[4]] || 0,
    safety_crossfunc: safetyScoreMap[safety_scenarios[5]] || 0,
    denison_strategy: denison_spectrums[0] * 10,
    denison_adaptability: denison_spectrums[1] * 10,
    denison_customer: denison_spectrums[2] * 10,
    denison_coordination: denison_spectrums[3] * 10,
    denison_capability: denison_spectrums[4] * 10,
    denison_vision: denison_spectrums[5] * 10,
    one_word,
  }
}

// ── Scenario scoring maps ──
const SCENARIO_SCORING = {
  s1_quality_flag: {
    A: { voice_safety: -2, accountability: 1, collaboration: -1 },
    B: { voice_safety: 3, accountability: 2, hierarchy_comfort: -1 },
    C: { risk_tolerance: 3, accountability: -3, people_vs_results: 2 },
    D: { collaboration: 1, accountability: -1, voice_safety: -1 },
  },
  s2_new_idea: {
    A: { innovation_drive: 3, voice_safety: 2, collaboration: 2 },
    B: { hierarchy_comfort: 2, innovation_drive: 1, risk_tolerance: -1 },
    C: { innovation_drive: -3, voice_safety: -3 },
    D: { collaboration: 1, risk_tolerance: -1, innovation_drive: 1 },
  },
  s3_the_clash: {
    A: { collaboration: 3, conflict_approach: 3 },
    B: { hierarchy_comfort: 3, accountability: -1 },
    C: { collaboration: -2, conflict_approach: -2 },
    D: { collaboration: -1, conflict_approach: -1, risk_tolerance: 2 },
  },
  s4_the_crunch: {
    A: { people_vs_results: -2, risk_tolerance: 2, accountability: -1 },
    B: { accountability: 2, people_vs_results: 1, risk_tolerance: -1 },
    C: { people_vs_results: 3, accountability: 1 },
    D: { voice_safety: 2, accountability: 2, hierarchy_comfort: -2 },
  },
}
