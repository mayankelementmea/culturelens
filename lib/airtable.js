/**
 * CultureLens — Airtable Database Integration
 * Tables: Organisations, Participants, Responses, Stories, NetworkEdges, TruthMaps
 */
import Airtable from 'airtable'

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID)

// ── Participants ──
export async function findParticipant(token) {
  const records = await base('Participants')
    .select({ filterByFormula: `{unique_token} = "${token}"`, maxRecords: 1 })
    .firstPage()
  return records.length ? { id: records[0].id, ...records[0].fields } : null
}

export async function updateParticipant(recordId, fields) {
  return base('Participants').update(recordId, fields)
}

export async function createParticipants(rows) {
  // Batch create from CSV import — rows = [{name, email, department, level, tenure_band, org_id}]
  const batches = []
  for (let i = 0; i < rows.length; i += 10) {
    batches.push(rows.slice(i, i + 10))
  }
  const results = []
  for (const batch of batches) {
    const created = await base('Participants').create(
      batch.map(r => ({
        fields: {
          name: r.name,
          email: r.email,
          department: r.department,
          level: r.level,
          tenure_band: r.tenure_band,
          org_link: [r.org_id],
          unique_token: `${r.email.split('@')[0]}_${Date.now().toString(36)}`,
          chapters_completed: 0,
          invited_at: new Date().toISOString(),
        }
      }))
    )
    results.push(...created)
  }
  return results
}

// ── Responses ──
export async function createResponse(data) {
  return base('Responses').create([{ fields: data }])
}

// ── Stories ──
export async function createStory(data) {
  return base('Stories').create([{ fields: data }])
}

export async function getUnprocessedStories() {
  return base('Stories')
    .select({ filterByFormula: `{ai_themes} = ""`, maxRecords: 50 })
    .firstPage()
}

export async function updateStory(recordId, fields) {
  return base('Stories').update(recordId, fields)
}

// ── Network Edges ──
export async function createNetworkEdges(edges) {
  const batches = []
  for (let i = 0; i < edges.length; i += 10) {
    batches.push(edges.slice(i, i + 10))
  }
  for (const batch of batches) {
    await base('NetworkEdges').create(batch.map(e => ({ fields: e })))
  }
}

// ── Truth Maps ──
export async function createTruthMap(data) {
  return base('TruthMaps').create([{ fields: data }])
}

// ── Organisations ──
export async function getOrgResponses(orgId) {
  return base('Responses')
    .select({ filterByFormula: `SEARCH("${orgId}", ARRAYJOIN({org_link}))` })
    .all()
}

export async function getOrgStories(orgId) {
  return base('Stories')
    .select({ filterByFormula: `SEARCH("${orgId}", ARRAYJOIN({org_link}))` })
    .all()
}

export async function getOrgParticipants(orgId) {
  return base('Participants')
    .select({ filterByFormula: `SEARCH("${orgId}", ARRAYJOIN({org_link}))` })
    .all()
}
