'use client'
import { useState } from 'react'
import { S } from './styles'

const SAFETY = [
  {id:'voice',scene:'A team member identifies a significant flaw in a strategy endorsed by senior leadership.',
    opts:[{id:'a',t:'Raises it directly in the meeting.',s:4},{id:'b',t:'Raises it privately with their manager after.',s:3},{id:'c',t:'Discusses with peers but never tells leadership.',s:2},{id:'d',t:'Says nothing.',s:1}]},
  {id:'error',scene:'A well-intentioned strategic initiative fails and costs significant resources.',
    opts:[{id:'a',t:'Treated as learning; post-mortem conducted.',s:4},{id:'b',t:'Quietly absorbed; no formal discussion.',s:3},{id:'c',t:'Responsible person identified and held accountable.',s:2},{id:'d',t:'Failure covered up or rewritten as a success.',s:1}]},
  {id:'dissent',scene:'During a leadership discussion, one member strongly disagrees with the emerging consensus.',
    opts:[{id:'a',t:'Dissent valued; decision paused for analysis.',s:4},{id:'b',t:'Acknowledged but group proceeds.',s:3},{id:'c',t:'Dissenting member faces social consequences.',s:2},{id:'d',t:'People learn not to dissent here.',s:1}]},
  {id:'feedback',scene:'A direct report gives their manager substantive critical feedback on leadership effectiveness.',
    opts:[{id:'a',t:'Manager thanks them and makes visible changes.',s:4},{id:'b',t:'Manager listens but nothing changes.',s:3},{id:'c',t:'Manager becomes defensive or distant.',s:2},{id:'d',t:'Person faces consequences for speaking up.',s:1}]},
  {id:'external',scene:'An external advisor recommends a fundamental change to how a core function operates.',
    opts:[{id:'a',t:'Recommendation seriously evaluated on merits.',s:4},{id:'b',t:'Adapted to "how we do things" until unrecognisable.',s:3},{id:'c',t:'Politely received and quietly shelved.',s:2},{id:'d',t:'External input viewed with suspicion and resisted.',s:1}]},
  {id:'boundary',scene:'A middle manager takes initiative on a problem that crosses departmental boundaries without formal approval.',
    opts:[{id:'a',t:'Celebrated for initiative regardless of outcome.',s:4},{id:'b',t:'Outcome appreciated but told to follow process next time.',s:3},{id:'c',t:'Criticised for overstepping regardless of outcome.',s:2},{id:'d',t:'People learn not to cross boundaries here.',s:1}]},
]

const DENISON = [
  {id:'clarity',l:'People cannot articulate how their work connects to strategy',r:'Everyone understands strategic priorities and their role'},
  {id:'adaptability',l:'Slow to respond to market changes',r:'Adapts rapidly and effectively to external shifts'},
  {id:'customer',l:'Internally focused; customer is an afterthought',r:'Customer insight drives every significant decision'},
  {id:'coordination',l:'Departments operate as independent entities',r:'Seamless collaboration across all boundaries'},
  {id:'capability',l:'No systematic investment in building capability',r:'Continuous, strategic investment in people and systems'},
  {id:'conviction',l:'Widespread cynicism about direction',r:'Deep shared belief in where the organisation is heading'},
]

export default function Chapter6({ token, onComplete, onUpdate }) {
  const [step, setStep] = useState(0) // 0=intro, 1-6=safety, 7=denison, 8=word
  const [safety, setSafety] = useState({})
  const [denison, setDenison] = useState({})
  const [word, setWord] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const totalSteps = 9

  const canGo = () => {
    if(step===0) return true
    if(step>=1 && step<=6) return !!safety[SAFETY[step-1].id]
    if(step===7) return Object.keys(denison).length===6
    if(step===8) return word.trim().length>0
    return false
  }

  const submit = async () => {
    setSubmitting(true)
    try {
      const data = {safety_scores:safety,denison_scores:denison,identity_word:word.trim()}
      const r = await fetch('/api/submit',{method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({token,chapter:'ch6',data})})
      const result = await r.json()
      onComplete?.(result)
    } catch(e){console.error(e);onComplete?.({success:true,demo:true})}
    setSubmitting(false)
  }

  return (
    <div style={S.page}><div style={S.inner}>
      <div style={S.progress}>{Array.from({length:totalSteps},(_,i)=><div key={i} style={S.bar(i<=step)}/>)}</div>

      {step===0 && <div>
        <p style={S.label}>Module 6 of 6</p>
        <h2 style={{...S.h2,fontSize:26}}>Organisational honesty</h2>
        <p style={S.body}>The final module. Measures psychological safety through third-person scenarios, strategy-culture alignment through six dimensions, and collective identity through one word.</p>
        <div style={S.note}>Estimated time: 8 minutes. The third-person framing produces more honest data than direct questions.</div>
      </div>}

      {step>=1 && step<=6 && (() => {
        const sc = SAFETY[step-1]
        return <div>
          <p style={S.label}>Safety scenario {step} of 6</p>
          <div style={S.scene}><div style={S.sceneLabel}>Situation</div>{sc.scene}</div>
          <h2 style={S.h2}>In this organisation, what would most people actually do?</h2>
          <p style={{fontSize:12,color:'#9B9690',marginBottom:16}}>Not what they should do — what they would do.</p>
          {sc.opts.map(o=>(
            <button key={o.id} onClick={()=>setSafety(p=>({...p,[sc.id]:o.id}))}
              style={S.opt(safety[sc.id]===o.id)}>{o.t}</button>
          ))}
        </div>
      })()}

      {step===7 && <div>
        <p style={S.label}>Strategy-culture alignment</p>
        <h2 style={S.h2}>Position this organisation on each dimension</h2>
        <p style={S.sub}>Based on your direct observation.</p>
        {DENISON.map(d=>(
          <div key={d.id} style={S.specRow}>
            <input type="range" min="0" max="10" step="1" value={denison[d.id]??5}
              onChange={e=>setDenison(p=>({...p,[d.id]:parseInt(e.target.value)}))} style={{width:'100%'}}/>
            <div style={S.specPoles}><span style={S.specPole}>{d.l}</span><span style={S.specPole}>{d.r}</span></div>
          </div>
        ))}
      </div>}

      {step===8 && <div>
        <p style={S.label}>Organisational identity</p>
        <h2 style={{...S.h2,fontSize:28}}>In one word, what defines this organisation's culture at its core?</h2>
        <p style={S.sub}>After reflecting on the full assessment, distil your perception into a single word.</p>
        <input style={{...S.input,fontSize:24,textAlign:'center',padding:'20px',fontWeight:500}}
          placeholder="One word" maxLength={30}
          value={word} onChange={e=>setWord(e.target.value)}/>
      </div>}

      <div style={S.nav}>
        {step>0 && <button onClick={()=>setStep(s=>s-1)} style={S.btnS}>Back</button>}
        <div style={{flex:1}}/>
        {step<totalSteps-1 ? (
          <button onClick={()=>setStep(s=>s+1)} disabled={!canGo()} style={S.btnP(canGo())}>
            {step===0?'Begin module':'Continue'}</button>
        ) : (
          <button onClick={submit} disabled={!canGo()||submitting} style={S.btnP(canGo())}>
            {submitting?'Processing...':'Complete assessment'}</button>
        )}
      </div>
    </div></div>
  )
}
