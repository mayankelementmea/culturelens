'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import ParticipantContext from '@/components/ParticipantContext'
import Chapter1 from '@/components/Chapter1'
import Chapter2 from '@/components/Chapter2'
import Chapter3 from '@/components/Chapter3'
import Chapter4 from '@/components/Chapter4'
import Chapter5 from '@/components/Chapter5'
import Chapter6 from '@/components/Chapter6'
import AssessmentClose from '@/components/AssessmentClose'

function AssessmentFlow() {
  const params = useSearchParams()
  const token = params.get('token') || 'demo'
  const [phase, setPhase] = useState('context') // context -> ch1 -> ch2 -> ch3 -> ch4 -> ch5 -> ch6 -> close

  const advance = (result) => {
    const flow = ['context','ch1','ch2','ch3','ch4','ch5','ch6','close']
    const idx = flow.indexOf(phase)
    if (idx < flow.length - 1) setPhase(flow[idx + 1])
  }

  const onContextComplete = (ctx) => {
    // Store context in session for segmentation
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('cl_context', JSON.stringify(ctx))
    }
    // Submit context to API
    fetch('/api/submit', {
      method: 'POST', headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ token, chapter: 'context', data: ctx })
    }).catch(()=>{})
    setPhase('ch1')
  }

  switch(phase) {
    case 'context': return <ParticipantContext onComplete={onContextComplete} />
    case 'ch1': return <Chapter1 token={token} onComplete={advance} />
    case 'ch2': return <Chapter2 token={token} onComplete={advance} />
    case 'ch3': return <Chapter3 token={token} onComplete={advance} />
    case 'ch4': return <Chapter4 token={token} onComplete={advance} />
    case 'ch5': return <Chapter5 token={token} onComplete={advance} />
    case 'ch6': return <Chapter6 token={token} onComplete={advance} />
    case 'close': return <AssessmentClose token={token} />
    default: return <ParticipantContext onComplete={onContextComplete} />
  }
}

export default function ChapterPage() {
  return (
    <Suspense fallback={<div style={{minHeight:'100vh',background:'#F8F7F4',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Poppins'",color:'#9B9690'}}>Loading assessment...</div>}>
      <AssessmentFlow />
    </Suspense>
  )
}
