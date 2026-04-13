/**
 * CultureLens — Airtable Database Integration
 * Lazy initialization to avoid build-time errors when env vars aren't set
 */

function getBase() {
  if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
    throw new Error('Airtable not configured — add AIRTABLE_API_KEY and AIRTABLE_BASE_ID to environment variables')
  }
  const Airtable = require('airtable')
  return new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID)
}

export async function findParticipant(token) {
  const base = getBase()
  const records = await base('Participants')
    .select({ filterByFormula: `{unique_token} = "${token}"`, maxRecords: 1 })
    .firstPage()
  return records.length ? { id: records[0].id, ...records[0].fields } : null
}

export async function updateParticipant(recordId, fields) {
  return getBase()('Participants').update(recordId, fields)
}

export async function createResponse(data) {
  return getBase()('Responses').create([{ fields: data }])
}

export async function createStory(data) {
  return getBase()('Stories').create([{ fields: data }])
}

export async function createNetworkEdges(edges) {
  const base = getBase()
  const batches = []
  for (let i = 0; i < edges.length; i += 10) batches.push(edges.slice(i, i + 10))
  for (const batch of batches) await base('NetworkEdges').create(batch.map(e => ({ fields: e })))
}

export async function createTruthMap(data) {
  return getBase()('TruthMaps').create([{ fields: data }])
}
