/**
 * CultureLens — Claude API Integration
 * Lazy initialization to avoid build-time errors
 */

function getClient() {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('Claude API not configured — add ANTHROPIC_API_KEY to environment variables')
  }
  const Anthropic = require('@anthropic-ai/sdk').default
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
}

export async function analyseStory(storyText, promptType) {
  const client = getClient()
  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1000,
    messages: [{
      role: 'user',
      content: `You are a senior organisational culture analyst. Analyse this anonymised workplace story.

Story type: ${promptType}
Story text: "${storyText}"

Respond ONLY with valid JSON:
{"themes":[],"emotional_valence":"positive|negative|mixed","schein_level":"artifact|value|assumption","values_referenced":[],"friction_category":"none","founding_theme":null,"summary":""}`
    }]
  })
  try { return JSON.parse(response.content[0].text) }
  catch { return { themes: [], emotional_valence: 'mixed', schein_level: 'value', values_referenced: [], friction_category: 'none', founding_theme: null, summary: '' } }
}

export async function generateTruthMap(orgName, findings, contradictions, founderLegacy) {
  const client = getClient()
  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 6000,
    messages: [{
      role: 'user',
      content: `You are a senior partner at element. Write the Culture Truth Map for ${orgName}. Findings: ${JSON.stringify(findings)}. Contradictions: ${JSON.stringify(contradictions)}. Founder legacy: ${JSON.stringify(founderLegacy)}. Structure: 1. Executive Summary 2. Culture Today 3. Where It Fractures 4. Founder Legacy 5. Contradictions 6. Business Cost 7. Priorities.`
    }]
  })
  return response.content[0].text
}
