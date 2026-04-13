import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { token, chapter, data } = await request.json()
    
    // Import dynamically to avoid build errors
    const { findParticipant, updateParticipant, createResponse, createStory, createNetworkEdges } = await import('@/lib/airtable')
    const { scoreCh1, scoreCh2, scoreCh3, scoreCh6 } = await import('@/lib/scoring')
    
    const participant = await findParticipant(token)
    if (!participant) return NextResponse.json({ error: 'Participant not found' }, { status: 404 })
    
    let scores = {}
    switch (chapter) {
      case 'ch1': scores = scoreCh1(data); break
      case 'ch2': scores = scoreCh2(data); break
      case 'ch3': scores = scoreCh3(data); break
      case 'ch6': scores = scoreCh6(data); break
      default: scores = data
    }
    
    await createResponse({
      participant_link: [participant.id],
      chapter: chapter.toUpperCase(),
      raw_data: JSON.stringify(data),
      submitted_at: new Date().toISOString(),
      ...scores,
    })
    
    if (chapter === 'ch4') {
      const prompts = [
        { field: 'origin_story', type: 'Origin' },
        { field: 'best_story', type: 'Best' },
        { field: 'blocker_story', type: 'Blocker' },
        { field: 'unwritten_rule', type: 'Unwritten Rule' },
      ]
      for (const sp of prompts) {
        if (data[sp.field]?.trim()) {
          await createStory({
            participant_link: [participant.id],
            prompt_type: sp.type,
            story_text: data[sp.field],
            department: participant.department,
          })
        }
      }
    }
    
    if (chapter === 'ch5') {
      const edges = []
      for (const type of ['knowledge', 'trust', 'energy']) {
        for (let n = 1; n <= 3; n++) {
          const name = data[`${type}_name_${n}`]
          if (name?.trim()) {
            edges.push({
              from_participant: [participant.id],
              to_name: name,
              to_department: data[`${type}_dept_${n}`] || '',
              network_type: type.charAt(0).toUpperCase() + type.slice(1),
            })
          }
        }
      }
      if (edges.length) await createNetworkEdges(edges)
    }
    
    const newCount = (participant.chapters_completed || 0) + 1
    const updateFields = { chapters_completed: newCount }
    if (newCount >= 6) updateFields.completed_at = new Date().toISOString()
    await updateParticipant(participant.id, updateFields)
    
    const chapters = ['ch1','ch2','ch3','ch4','ch5','ch6']
    const nextIdx = chapters.indexOf(chapter)
    
    return NextResponse.json({
      success: true,
      chapters_completed: newCount,
      next_chapter: nextIdx < 5 ? chapters[nextIdx + 1] : null,
      profile_ready: newCount >= 6,
    })
  } catch (error) {
    console.error('Submission error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
