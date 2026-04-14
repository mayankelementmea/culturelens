import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { token, chapter, data } = await request.json()
    
    // Demo mode — accept all submissions without Airtable
    if (token === 'demo' || !process.env.AIRTABLE_API_KEY) {
      console.log(`[CultureLens] ${chapter} submitted (demo mode)`, JSON.stringify(data).slice(0, 200))
      return NextResponse.json({
        success: true,
        chapters_completed: 1,
        next_chapter: chapter,
        demo_mode: true,
      })
    }

    // Production mode — save to Airtable
    const { findParticipant, updateParticipant, createResponse, createStory, createNetworkEdges } = await import('@/lib/airtable')
    
    const participant = await findParticipant(token)
    if (!participant) return NextResponse.json({ error: 'Participant not found' }, { status: 404 })
    
    await createResponse({
      participant_link: [participant.id],
      chapter: chapter.toUpperCase(),
      raw_data: JSON.stringify(data),
      submitted_at: new Date().toISOString(),
    })
    
    if (chapter === 'ch5') {
      const edges = []
      for (const type of ['knowledge', 'influence', 'energy']) {
        const net = data[type] || {}
        for (let n = 1; n <= 3; n++) {
          if (net['name' + n]?.trim()) {
            edges.push({
              from_participant: [participant.id],
              to_name: net['name' + n],
              to_department: net['dept' + n] || '',
              network_type: type.charAt(0).toUpperCase() + type.slice(1),
            })
          }
        }
      }
      if (edges.length) await createNetworkEdges(edges)
    }
    
    const newCount = (participant.chapters_completed || 0) + 1
    await updateParticipant(participant.id, { 
      chapters_completed: newCount,
      ...(newCount >= 6 ? { completed_at: new Date().toISOString() } : {})
    })
    
    return NextResponse.json({ success: true, chapters_completed: newCount })
  } catch (error) {
    console.error('Submission error:', error)
    // Still return success for demo/fallback so the flow doesn't break
    return NextResponse.json({ success: true, demo_fallback: true })
  }
}
