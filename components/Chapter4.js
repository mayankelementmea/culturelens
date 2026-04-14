'use client'
import { useState } from 'react'
import { S } from './styles'

const DRIFT = [
  {id:'authority',l:'Concentrated in one person',r:'Distributed across the organisation'},
  {id:'risk',l:'Preserve capital, avoid risk',r:'Invest boldly, accept calculated failure'},
  {id:'loyalty',l:'Tenure and personal loyalty',r:'Performance and demonstrated impact'},
  {id:'growth',l:'Organic, measured, self-funded',r:'Aggressive, leveraged, acquisition-driven'},
  {id:'trust',l:'Trust earned over years',r:'Trust extended by default'},
  {id:'external',l:'We solve our own problems',r:'We bring in the best, wherever they are'},
]

export default function Chapter4({ token, onComplete }) {
  const [step, setStep] = useState(0)
  const [stories, setStories] = useState({})
  const [driftOrig, setDriftOrig] = useState({})
  const [driftNow, setDriftNow] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const totalSteps = 6

  const canGo = () => {
    if(step===0) return true
    if(step===1) return (stories.founding||'').trim().length>20
    if(step===2) return (stories.positive||'').trim().length>20
    if(step===3) return (stories.negative||'').trim().length>20
    if(step===4) return (stories.institutional||'').trim().length>10
    if(step===5) return Object.keys(driftOrig).length===6 && Object.keys(driftNow).length===6
    return false
  }

  const submit = async () => {
    setSubmitting(true)
    try {
      const data = {...stories,drift_original:driftOrig,drift_current:driftNow}
      const r = await fetch('/api/submit',{method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({token,chapter:'ch4',data})})
      const result = await r.json()
      if(result.success) onComplete?.(result)
    } catch(e){console.error(e)}
    setSubmitting(false)
  }

  return (
    <div style={S.page}><div style={S.inner}>
      <div style={S.progress}>{Array.from({length:totalSteps},(_,i)=><div key={i} style={S.bar(i<=step)}/>)}</div>

      {step===0 && <div>
        <p style={S.label}>Module 4 of 6</p>
        <h2 style={{...S.h2,fontSize:26}}>Organisational narrative and legacy</h2>
        <p style={S.body}>Stories encode assumptions the teller is not aware they are expressing. This module captures the founding legend, critical incidents, and institutional memory — then measures how far the organisation has drifted from its origins.</p>
        <div style={S.note}>Estimated time: 10 minutes. Four narrative prompts and one drift analysis.</div>
      </div>}

      {step===1 && <div>
        <p style={S.label}>Founding legend</p>
        <h2 style={S.h2}>What is the story that best explains why this organisation operates the way it does today?</h2>
        <p style={S.sub}>Every organisation has an origin story — the founding decision, the crisis that forged its character, or the principle the founder never compromised on.</p>
        <textarea style={S.textarea} placeholder="Share the founding story..." maxLength={2000}
          value={stories.founding||''} onChange={e=>setStories(p=>({...p,founding:e.target.value}))}/>
        <p style={S.count}>{(stories.founding||'').length}/2000 characters</p>
      </div>}

      {step===2 && <div>
        <p style={S.label}>Culture as strategic advantage</p>
        <h2 style={S.h2}>Describe a moment when the culture directly contributed to an exceptional outcome.</h2>
        <p style={S.sub}>A specific situation where the way things work here was the enabler, not the obstacle.</p>
        <textarea style={S.textarea} placeholder="Describe the incident..." maxLength={1500}
          value={stories.positive||''} onChange={e=>setStories(p=>({...p,positive:e.target.value}))}/>
      </div>}

      {step===3 && <div>
        <p style={S.label}>Culture as obstacle</p>
        <h2 style={S.h2}>Describe a situation where the way this organisation operates actively prevented a good outcome.</h2>
        <p style={S.sub}>Where the culture was the obstacle, not the enabler.</p>
        <textarea style={S.textarea} placeholder="Describe the situation..." maxLength={1500}
          value={stories.negative||''} onChange={e=>setStories(p=>({...p,negative:e.target.value}))}/>
      </div>}

      {step===4 && <div>
        <p style={S.label}>Institutional knowledge</p>
        <h2 style={S.h2}>What is the single most important thing a new senior hire must understand about this organisation?</h2>
        <p style={S.sub}>Something that would never appear in any onboarding document.</p>
        <textarea style={{...S.textarea,minHeight:80}} placeholder="The one thing they need to know..." maxLength={800}
          value={stories.institutional||''} onChange={e=>setStories(p=>({...p,institutional:e.target.value}))}/>
      </div>}

      {step===5 && <div>
        <p style={S.label}>Values drift analysis</p>
        <h2 style={S.h2}>How has this organisation changed from its origins?</h2>
        <p style={S.sub}>For each dimension, position where the organisation was originally (faded) and where it is now (solid).</p>
        {DRIFT.map(d=>(
          <div key={d.id} style={{marginBottom:28}}>
            <div style={{fontSize:13,fontWeight:500,color:'#0A0A0A',marginBottom:10}}>{d.id.charAt(0).toUpperCase()+d.id.slice(1)}</div>
            <div style={{marginBottom:8}}>
              <div style={{fontSize:11,color:'#9B9690',marginBottom:4}}>Originally: {driftOrig[d.id]??'—'}</div>
              <input type="range" min="0" max="10" step="1" value={driftOrig[d.id]??5}
                onChange={e=>setDriftOrig(p=>({...p,[d.id]:parseInt(e.target.value)}))} style={{width:'100%',opacity:0.5}}/>
            </div>
            <div>
              <div style={{fontSize:11,color:'#2C5282',marginBottom:4}}>Now: {driftNow[d.id]??'—'}</div>
              <input type="range" min="0" max="10" step="1" value={driftNow[d.id]??5}
                onChange={e=>setDriftNow(p=>({...p,[d.id]:parseInt(e.target.value)}))} style={{width:'100%'}}/>
            </div>
            <div style={S.specPoles}><span style={S.specPole}>{d.l}</span><span style={S.specPole}>{d.r}</span></div>
          </div>
        ))}
      </div>}

      <div style={S.nav}>
        {step>0 && <button onClick={()=>setStep(s=>s-1)} style={S.btnS}>Back</button>}
        <div style={{flex:1}}/>
        {step<totalSteps-1 ? (
          <button onClick={()=>setStep(s=>s+1)} disabled={!canGo()} style={S.btnP(canGo())}>
            {step===0?'Begin module':'Continue'}</button>
        ) : (
          <button onClick={submit} disabled={!canGo()||submitting} style={S.btnP(canGo())}>
            {submitting?'Processing...':'Complete module'}</button>
        )}
      </div>
    </div></div>
  )
}
