'use client'
import { useState } from 'react'
import { S } from './styles'

const STEPS = [
  { id:'intro', type:'intro' },
  { id:'decision_architecture', type:'single', label:'Decision architecture',
    q:'When a significant strategic decision needs to be made, which of these most accurately describes how it happens here?',
    opts:[
      {id:'a',t:'One or two individuals decide. Others are informed afterwards.'},
      {id:'b',t:'A small leadership group deliberates. The most senior person has the final call.'},
      {id:'c',t:'Cross-functional input is gathered, but decision authority is clearly assigned.'},
      {id:'d',t:'Decisions emerge through consensus. It can take time, but most people have a voice.'},
      {id:'e',t:'It depends entirely on who is involved and what the issue is. There is no consistent pattern.'},
    ]},
  { id:'information_flow', type:'single', label:'Information architecture',
    q:'How does critical business information — financial performance, strategic priorities, client issues — typically flow through the organisation?',
    opts:[
      {id:'a',t:'Leadership holds information closely. It reaches people on a need-to-know basis.'},
      {id:'b',t:'Formal channels exist (town halls, reports) but real information travels through informal networks.'},
      {id:'c',t:'Information is shared systematically through defined channels. Most people are reasonably well-informed.'},
      {id:'d',t:'Radical transparency. Financials, strategy, and challenges are shared openly with everyone.'},
      {id:'e',t:'Information flow is inconsistent. Some teams are well-informed, others operate in the dark.'},
    ]},
  { id:'crisis_response', type:'single', label:'Crisis behaviour',
    q:'When the organisation faces an unexpected crisis — a major client loss, a market shift, a critical failure — what actually happens?',
    opts:[
      {id:'a',t:'The founder or CEO takes personal control. Normal processes are suspended until it is resolved.'},
      {id:'b',t:'A war room forms. The right people are pulled in quickly regardless of hierarchy.'},
      {id:'c',t:'Existing processes and escalation paths are followed. The system handles it.'},
      {id:'d',t:'Blame is assigned before the problem is solved. People focus on self-protection.'},
      {id:'e',t:'Paralysis. People wait for direction that comes slowly or not at all.'},
    ]},
  { id:'talent_philosophy', type:'single', label:'Talent philosophy',
    q:'Which of these best describes how this organisation thinks about its people?',
    opts:[
      {id:'a',t:'People are loyal family members. Tenure and relationships matter most. We rarely let anyone go.'},
      {id:'b',t:'People are the engine. We invest heavily in development and expect high performance in return.'},
      {id:'c',t:'People are resources deployed against objectives. Performance is measured; underperformers are managed out.'},
      {id:'d',t:'People are professionals trusted to manage themselves. Autonomy is high; oversight is light.'},
      {id:'e',t:'It varies dramatically by department. There is no consistent people philosophy.'},
    ]},
  { id:'spectrums', type:'spectrums', label:'Strategic dimensions',
    q:'Position your organisation on each of these strategic dimensions.',
    sub:'These are not good/bad scales — every position has strategic implications.',
    items:[
      {id:'centralisation',l:'All authority sits at the top',r:'Authority is distributed to teams'},
      {id:'speed_rigour',l:'Move slowly but get things right',r:'Move fast and course-correct'},
      {id:'orientation',l:'Inward-looking, trust our own expertise',r:'Externally oriented, bring in outside input'},
      {id:'stability_change',l:'Protect what works. Continuity valued.',r:'Continuously reinvent. Disruption is the norm.'},
      {id:'individual_collective',l:'Individual stars rewarded and celebrated',r:'Team success recognised above individual'},
      {id:'knowledge',l:'Knowledge lives in people\'s heads',r:'Knowledge is documented and systemised'},
    ]},
  { id:'capability_gaps', type:'multi', label:'Strategic capability gaps', max:5,
    q:'If you could strengthen any five organisational capabilities overnight, which would most accelerate this organisation\'s strategic position?',
    opts:['Decision speed at all levels','Ability to retain high performers','Cross-functional collaboration',
      'Innovation and new revenue streams','Leadership succession depth','Customer intelligence and responsiveness',
      'Clear accountability and follow-through','Ability to execute strategic change','Knowledge transfer and institutional memory',
      'Performance differentiation and management','Employer brand and talent attraction','Technology adoption and digital capability',
      'Middle management capability','Governance and risk management','Cultural clarity and alignment'].map((t,i)=>({id:'c'+i,t}))},
  { id:'unwritten_rules', type:'multi', label:'Unwritten operating rules', max:99,
    q:'Which of these unwritten rules operate in this organisation?',
    sub:'The informal rules every new employee learns within their first three months.',
    opts:[
      {id:'r1',t:'Don\'t challenge a decision once it\'s been made by senior leadership'},
      {id:'r2',t:'Relationships and loyalty matter more than formal qualifications'},
      {id:'r3',t:'Being visibly present matters — perception of effort counts'},
      {id:'r4',t:'Bad news is filtered before it reaches the top'},
      {id:'r5',t:'Never go to your boss with a problem unless you have a solution'},
      {id:'r6',t:'The formal process is slow — the real way to get things done is to know the right people'},
      {id:'r7',t:'Taking a risk that fails is career-limiting, even if the logic was sound'},
      {id:'r8',t:'Tenure and seniority carry more weight than competence in promotions'},
      {id:'r9',t:'Stay in your lane — cross-departmental initiative is not rewarded'},
      {id:'r10',t:'There is a "right way" to do things here, established long ago, that is rarely questioned'},
      {id:'r11',t:'Overpromise and figure it out later — saying no is not acceptable'},
      {id:'none',t:'None of these apply — the organisation operates largely as formally stated'},
    ]},
]

export default function Chapter1({ token, onComplete }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const cur = STEPS[step]

  const setSingle = (id) => setAnswers(p=>({...p,[cur.id]:id}))
  const toggleMulti = (id) => {
    setAnswers(p => {
      const arr = p[cur.id]||[]
      if(id==='none') return {...p,[cur.id]:arr.includes('none')?[]:['none']}
      const w = arr.filter(x=>x!=='none')
      if(w.includes(id)) return {...p,[cur.id]:w.filter(x=>x!==id)}
      if(cur.max && cur.max<99 && w.length>=cur.max) return p
      return {...p,[cur.id]:[...w,id]}
    })
  }
  const setSpec = (id,val) => setAnswers(p=>({...p,spectrums:{...(p.spectrums||{}),[id]:parseInt(val)}}))

  const canGo = () => {
    if(cur.type==='intro') return true
    if(cur.type==='single') return !!answers[cur.id]
    if(cur.type==='spectrums') return Object.keys(answers.spectrums||{}).length===cur.items.length
    if(cur.type==='multi') return (answers[cur.id]||[]).length>0
    return false
  }

  const submit = async () => {
    setSubmitting(true)
    try {
      const r = await fetch('/api/submit',{method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({token,chapter:'ch1',data:answers})})
      const result = await r.json()
      onComplete?.(result)
    } catch(e){console.error(e);onComplete?.({success:true,demo:true})}
    setSubmitting(false)
  }

  return (
    <div style={S.page}><div style={S.inner}>
      <div style={S.progress}>{STEPS.map((_,i)=><div key={i} style={S.bar(i<=step)}/>)}</div>

      {cur.type==='intro' && <div>
        <p style={S.label}>Module 1 of 6</p>
        <h2 style={{...S.h2,fontSize:26}}>How your organisation operates</h2>
        <p style={S.body}>This module examines the operating model beneath the surface — how decisions are actually made, how information moves, how the organisation responds to pressure, and where authority truly sits.</p>
        <div style={S.note}>Estimated time: 8 minutes. All responses are anonymised and reported only at the aggregate level.</div>
      </div>}

      {cur.type==='single' && <div>
        <p style={S.label}>{cur.label}</p>
        <h2 style={S.h2}>{cur.q}</h2>
        <div style={{marginTop:20}}>{cur.opts.map(o=>(
          <button key={o.id} onClick={()=>setSingle(o.id)} style={S.opt(answers[cur.id]===o.id)}>{o.t}</button>
        ))}</div>
      </div>}

      {cur.type==='spectrums' && <div>
        <p style={S.label}>{cur.label}</p>
        <h2 style={S.h2}>{cur.q}</h2>
        <p style={S.sub}>{cur.sub}</p>
        {cur.items.map(sp=>(
          <div key={sp.id} style={S.specRow}>
            <input type="range" min="0" max="10" step="1"
              value={answers.spectrums?.[sp.id]??5}
              onChange={e=>setSpec(sp.id,e.target.value)} style={{width:'100%'}}/>
            <div style={S.specPoles}>
              <span style={S.specPole}>{sp.l}</span>
              <span style={S.specPole}>{sp.r}</span>
            </div>
          </div>
        ))}
      </div>}

      {cur.type==='multi' && <div>
        <p style={S.label}>{cur.label}</p>
        <h2 style={S.h2}>{cur.q}</h2>
        {cur.sub && <p style={S.sub}>{cur.sub}</p>}
        <div style={{display:'grid',gridTemplateColumns:cur.max<=5?'repeat(3,1fr)':'1fr',gap:6}}>
          {cur.opts.map(o=>{
            const sel=(answers[cur.id]||[]).includes(o.id)
            const cnt=(answers[cur.id]||[]).filter(x=>x!=='none').length
            return <button key={o.id} onClick={()=>toggleMulti(o.id)}
              style={S.multiOpt(sel,cur.max<99?cur.max:999,cnt)}>{o.t}</button>
          })}
        </div>
        {cur.max<99 && <p style={S.count}>{(answers[cur.id]||[]).length} of {cur.max} selected</p>}
      </div>}

      <div style={S.nav}>
        {step>0 && <button onClick={()=>setStep(s=>s-1)} style={S.btnS}>Back</button>}
        <div style={{flex:1}}/>
        {step<STEPS.length-1 ? (
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
