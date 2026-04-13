/**
 * CultureLens — Claude API Integration
 * Story theme extraction + Triangulation + Truth Map narrative
 */
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// ── Story Theme Extraction ──
export async function analyseStory(storyText, promptType) {
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1000,
    messages: [{
      role: 'user',
      content: `You are a senior organisational culture analyst. Analyse this anonymised workplace story and extract structured cultural insights.

Story type: ${promptType}
Story text: "${storyText}"

Respond ONLY with a valid JSON object (no markdown, no preamble):
{
  "themes": ["theme1", "theme2"],
  "emotional_valence": "positive|negative|mixed",
  "schein_level": "artifact|value|assumption",
  "values_referenced": ["value1", "value2"],
  "friction_category": "decision-making|communication|innovation|accountability|recognition|safety|hierarchy|collaboration|none",
  "founding_theme": "the core founding value encoded, or null if not origin story",
  "summary": "one sentence cultural insight"
}`
    }]
  })
  
  try {
    return JSON.parse(response.content[0].text)
  } catch {
    return { themes: [], emotional_valence: 'mixed', schein_level: 'value', values_referenced: [], friction_category: 'none', founding_theme: null, summary: storyText.slice(0, 100) }
  }
}

// ── Triangulation + Finding Validation ──
export async function triangulateFindings(orgData) {
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4000,
    messages: [{
      role: 'user',
      content: `You are a senior organisational culture diagnostic consultant for element, a strategic HR consultancy. Identify VALIDATED FINDINGS (2+ sources), CONTRADICTIONS, and HYPOTHESES (single-source).

ORGANISATION: ${orgData.org_name}, ${orgData.industry}, ${orgData.employee_count} employees, ${orgData.owner_type}

QUANTITATIVE DATA:
- Entropy: ${orgData.entropy_avg}% (dept breakdown: ${JSON.stringify(orgData.dept_entropy)})
- Safety index: ${orgData.safety_avg}/4.0 (dept breakdown: ${JSON.stringify(orgData.dept_safety)})
- CVF profile: Clan ${orgData.cvf_clan}%, Adhocracy ${orgData.cvf_adhocracy}%, Market ${orgData.cvf_market}%, Hierarchy ${orgData.cvf_hierarchy}%
- Denison: ${JSON.stringify(orgData.denison)}
- Values drift avg: ${orgData.drift_avg}
- Founder attribution: ${orgData.founder_pct}%
- Top current values: ${orgData.top_current}
- Top desired values: ${orgData.top_desired}
- Escape signal density by dept: ${JSON.stringify(orgData.escape_signals)}
- Time allocation: meeting ${orgData.meeting_pct}%, focus ${orgData.focus_pct}%, admin ${orgData.admin_pct}%, firefighting ${orgData.firefight_pct}%

QUALITATIVE (story themes): ${JSON.stringify(orgData.story_themes)}

NETWORK: Top connectors: ${orgData.top_connectors}. Isolated depts: ${orgData.isolated_depts}

Apply: (1) 2+ source validation (2) Behavioural beats self-report (3) Contradictions = highest priority (4) Segment by dept (5) Connect to business impact

Respond ONLY with valid JSON:
{
  "validated_findings": [{"finding": "...", "evidence_sources": ["..."], "business_impact": "...", "severity": "critical|high|moderate|low"}],
  "contradictions": [{"description": "...", "source_a": "...", "source_b": "...", "interpretation": "..."}],
  "hypotheses": [{"theme": "...", "single_source": "...", "recommendation": "..."}],
  "founder_legacy": {"strengths": ["..."], "constraints": ["..."], "drift_insights": "..."}
}`
    }]
  })
  
  try {
    return JSON.parse(response.content[0].text)
  } catch {
    return { validated_findings: [], contradictions: [], hypotheses: [], founder_legacy: { strengths: [], constraints: [], drift_insights: '' } }
  }
}

// ── Truth Map Narrative ──
export async function generateTruthMap(orgName, findings, contradictions, founderLegacy) {
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 6000,
    messages: [{
      role: 'user',
      content: `You are a senior partner at element, a strategic HR consultancy. Write the Culture Truth Map narrative for the CEO/CHRO of ${orgName}.

Validated findings: ${JSON.stringify(findings)}
Contradictions: ${JSON.stringify(contradictions)}
Founder legacy: ${JSON.stringify(founderLegacy)}

Write in element's style: direct, evidence-based, business-first. No generic consulting language. Every statement backed by data. Write for a CEO with 15 minutes.

Structure:
1. EXECUTIVE SUMMARY (3-5 headline findings, one sentence each with the key number)
2. THE CULTURE TODAY (current state across all 7 layers, 2-3 paragraphs)
3. WHERE IT FRACTURES (subculture analysis, department-level findings)
4. THE FOUNDER'S LEGACY (what generational values protect and constrain)
5. THE CONTRADICTIONS (where stated vs actual culture diverge)
6. WHAT THIS IS COSTING YOU (business impact quantification)
7. THE TRANSFORMATION PRIORITIES (top 3-5 interventions with 90-day quick wins)

Tone: warm but unflinching. The owner hired element to see clearly, not to be reassured.`
    }]
  })
  
  return response.content[0].text
}
