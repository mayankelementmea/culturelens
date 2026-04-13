/**
 * POST /api/submit
 * Handles all chapter form submissions
 * Body: { token, chapter, data }
 */
import { NextResponse } from 'next/server'
import { findParticipant, updateParticipant, createResponse, createStory, createNetworkEdges } from '@/lib/airtable'
import { scoreCh1, scoreCh2, scoreCh3, scoreCh6 } from '@/lib/scoring'
import { analyseStory } from '@/lib/claude'

export async function POST(request) {
  try {
    const { token, chapter, data } = await request.json()
    
    // 1. Find participant
    const participant = await findParticipant(token)
    if (!participant) {
      return NextResponse.json({ error: 'Participant not found' }, { status: 404 })
    }
    
    // 2. Compute scores based on chapter
    let scores = {}
    switch (chapter) {
      case 'ch1': scores = scoreCh1(data); break
      case 'ch2': scores = scoreCh2(data); break
      case 'ch3': scores = scoreCh3(data); break
      case 'ch6': scores = scoreCh6(data); break
      default: scores = data
    }
    
    // 3. Write to Responses table
    await createResponse({
      participant_link: [participant.id],
      chapter: chapter.toUpperCase(),
      raw_data: JSON.stringify(data),
      submitted_at: new Date().toISOString(),
      ...scores,
    })
    
    // 4. Handle special chapter processing
    if (chapter === 'ch4') {
      // Create story records and trigger AI analysis
      const storyPrompts = [
        { field: 'origin_story', type: 'Origin' },
        { field: 'best_story', type: 'Best' },
        { field: 'blocker_story', type: 'Blocker' },
        { field: 'unwritten_rule', type: 'Unwritten Rule' },
      ]
      for (const sp of storyPrompts) {
        if (data[sp.field]?.trim()) {
          // Create story record
          const storyRecord = await createStory({
            participant_link: [participant.id],
            prompt_type: sp.type,
            story_text: data[sp.field],
            department: participant.department,
          })
          // AI analysis (async — doesn't block the response)
          analyseStory(data[sp.field], sp.type).then(async (analysis) => {
            // Update story with AI analysis results
            // In production, use a queue for this
          }).catch(console.error)
        }
      }
    }
    
    if (chapter === 'ch5') {
      // Create network edge records
      const edges = []
      const types = ['Knowledge', 'Trust', 'Energy']
      for (let t = 0; t < 3; t++) {
        for (let n = 1; n <= 3; n++) {
          const name = data[`${types[t].toLowerCase()}_name_${n}`]
          const dept = data[`${types[t].toLowerCase()}_dept_${n}`]
          if (name?.trim()) {
            edges.push({
              from_participant: [participant.id],
              to_name: name,
              to_department: dept || '',
              network_type: types[t],
            })
          }
        }
      }
      if (edges.length) await createNetworkEdges(edges)
    }
    
    // 5. Update participant progress
    const newCount = (participant.chapters_completed || 0) + 1
    const updateFields = { chapters_completed: newCount }
    if (newCount >= 6) {
      updateFields.completed_at = new Date().toISOString()
    }
    await updateParticipant(participant.id, updateFields)
    
    // 6. Return success with next chapter info
    const chapterOrder = ['ch1', 'ch2', 'ch3', 'ch4', 'ch5', 'ch6']
    const currentIdx = chapterOrder.indexOf(chapter)
    const nextChapter = currentIdx < 5 ? chapterOrder[currentIdx + 1] : null
    
    return NextResponse.json({
      success: true,
      chapters_completed: newCount,
      next_chapter: nextChapter,
      profile_ready: newCount >= 6,
    })
    
  } catch (error) {
    console.error('Submission error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
