'use client'
import { useState } from 'react'
import { S } from './styles'

const POS_VALUES = ['Trust','Innovation','Accountability','Collaboration','Transparency','Empowerment','Customer obsession','Continuous learning','Integrity','Excellence','Agility','Recognition','Inclusion','Purpose','Mentoring','Ownership','Courage','Quality','Creativity','Wellbeing']
const LIM_VALUES = ['Blame','Bureaucracy','Control','Fear','Silos','Politics','Micromanagement','Short-termism','Complacency','Overwork']
const ALL_VALUES = [...POS_VALUES,...LIM_VALUES]

const CVF = [
  {id:'clan',label:'The collaborative enterprise',desc:'Loyalty, mentoring, team cohesion, tradition, internal development.'},
  {id:'adhocracy',label:'The innovation engine',desc:'Experimentation, calculated risk, agility, vision-driven, first-mover.'},
  {id:'market',label:'The performance machine',desc:'Results orientation, competitive drive, achievement, market responsiveness.'},
  {id:'hierarchy',label:'The precision system',desc:'Process excellence, efficiency, consistency, governance, scalability.'},
]

const ORIGINS = ['The founder — present from day one','The owning family — reflects family beliefs','The industry — standard operating norm','Current leadership — brought by this management team','The employees — emerged organically','Cannot be traced — it has always been here']

export default function Chapter3({ token, onComplete, onUpdate }) {
  const [step, setStep] = useState(0)
  const [current, setCurrent] = useState([])
  const [desired, setDesired] = useState([])
  const [weights, setWeights] = useState({})
  const [cvfNow, setCvfNow] = useState({})
  const [cvfIdeal, setCvfIdeal] = useState({})
  const [origins, setOrigins] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const totalSteps = 6

  const toggleVal = (arr, set, id, max) => {
    if(arr.includes(id)) set(arr.filter(x=>x!==id))
    else if(arr.length<max) set([...arr,id])
  }

  const topDesired = desired.slice(0,5)

  const canGo = () => {
    if(step===0) return true
    if(step===1) return current.length>=3
    if(step===2) return desired.length>=3
    if(step===3) return topDesired.length>0 && Object.keys(weights).length===topDesired.length
    if(step===4) return Object.keys(cvfNow).length===4 && Object.keys(cvfIdeal).length===4
    if(step===5) return Object.keys(origins).length>=Math.min(current.length,5)
    return false
  }

  const submit = async () => {
    setSubmitting(true)
    try {
      const data = {current_values:current,desired_values:desired,weights,cvf_current:cvfNow,cvf_desired:cvfIdeal,origins}
      const r = await fetch('/api/submit',{method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({token,chapter:'ch3',data})})
      const result = await r.json()
      onComplete?.(result)
    } catch(e){console.error(e);onComplete?.({success:true,demo:true})}
    setSubmitting(false)
  }

  return (
    <div style={S.page}><div style={S.inner}>
      <div style={S.progress}>{Array.from({length:totalSteps},(_,i)=><div key={i} style={S.bar(i<=step)}/>)}</div>

      {step===0 && <div>
        <p style={S.label}>Module 3 of 6</p>
        <h2 style={{...S.h2,fontSize:26}}>Values architecture and origins</h2>
        <p style={S.body}>This module maps the values system operating beneath the stated culture — what is actually reinforced, what is desired, where the entropy sits, and where each value came from.</p>
        <div style={S.note}>Estimated time: 8 minutes. Five exercises in sequence.</div>
      </div>}

      {step===1 && <div>
        <p style={S.label}>Current operating values</p>
        <h2 style={S.h2}>Which values are genuinely operating in this organisation today?</h2>
        <p style={S.sub}>Not what is on the website. What is actually reinforced through behaviour. Select up to 10.</p>
        <p style={{fontSize:11,color:'#0D9488',fontWeight:500,marginBottom:8}}>Positive values</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:4,marginBottom:12}}>
          {POS_VALUES.map(v=>{const sel=current.includes(v);return(
            <button key={v} onClick={()=>toggleVal(current,setCurrent,v,10)} style={{
              background:sel?'var(--bg-elevated)':'var(--bg-card)',border:sel?'1px solid var(--accent-teal)':'1px solid var(--border)',
              borderRadius:4,padding:'8px 4px',fontSize:11,color:sel?'var(--accent-teal)':'var(--text-secondary)',
              cursor:'pointer',fontWeight:sel?500:400,opacity:!sel&&current.length>=10?.35:1,
            }}>{v}</button>
          )})}
        </div>
        <p style={{fontSize:11,color:'#DC2626',fontWeight:500,marginBottom:8}}>Limiting values</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:4}}>
          {LIM_VALUES.map(v=>{const sel=current.includes(v);return(
            <button key={v} onClick={()=>toggleVal(current,setCurrent,v,10)} style={{
              background:sel?'var(--bg-elevated)':'var(--bg-card)',border:sel?'1px solid var(--accent-coral)':'1px solid var(--border)',
              borderRadius:4,padding:'8px 4px',fontSize:11,color:sel?'var(--accent-coral)':'var(--text-secondary)',
              cursor:'pointer',fontWeight:sel?500:400,opacity:!sel&&current.length>=10?.35:1,
            }}>{v}</button>
          )})}
        </div>
        <p style={S.count}>{current.length} of 10 selected</p>
      </div>}

      {step===2 && <div>
        <p style={S.label}>Desired transformation values</p>
        <h2 style={S.h2}>If you could design the operating culture from scratch, which values would define it?</h2>
        <p style={S.sub}>Select up to 10 from the same list.</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:4}}>
          {ALL_VALUES.map(v=>{const sel=desired.includes(v);const isLim=LIM_VALUES.includes(v);return(
            <button key={v} onClick={()=>toggleVal(desired,setDesired,v,10)} style={{
              background:sel?'#F0F4F8':'#fff',border:sel?'1.5px solid #2C5282':'1px solid #E8E5E0',
              borderRadius:4,padding:'8px 4px',fontSize:11,color:sel?'#1E3A5F':isLim?'#9B9690':'#6B6660',
              cursor:'pointer',fontWeight:sel?500:400,opacity:!sel&&desired.length>=10?.35:1,
            }}>{v}</button>
          )})}
        </div>
        <p style={S.count}>{desired.length} of 10 selected</p>
      </div>}

      {step===3 && <div>
        <p style={S.label}>Priority weighting</p>
        <h2 style={S.h2}>Distribute 100 points across your top desired values</h2>
        <p style={S.sub}>Invest more in what matters most for the strategy.</p>
        {topDesired.map(v=>(
          <div key={v} style={{marginBottom:16}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
              <span style={{fontSize:13,fontWeight:500}}>{v}</span>
              <span style={{fontSize:13,fontWeight:500,color:'#2C5282'}}>{weights[v]||0} pts</span>
            </div>
            <input type="range" min="0" max="60" step="5" value={weights[v]||0}
              onChange={e=>setWeights(p=>({...p,[v]:parseInt(e.target.value)}))} style={{width:'100%'}}/>
          </div>
        ))}
        <div style={{textAlign:'center',fontSize:14,fontWeight:500,
          color:Math.abs(Object.values(weights).reduce((s,v)=>s+v,0)-100)<20?'#0D9488':'#DC2626'}}>
          Total: {Object.values(weights).reduce((s,v)=>s+v,0)} / 100 points
        </div>
      </div>}

      {step===4 && <div>
        <p style={S.label}>Organisational typology</p>
        <h2 style={S.h2}>Rate how well each model describes this organisation</h2>
        <p style={S.sub}>Two ratings per type: how it IS today (0-10) and how it SHOULD be (0-10).</p>
        {CVF.map(c=>(
          <div key={c.id} style={{background:'#fff',border:'1px solid #E8E5E0',borderRadius:8,padding:'14px 16px',marginBottom:8}}>
            <div style={{fontWeight:500,fontSize:14,marginBottom:2}}>{c.label}</div>
            <div style={{fontSize:12,color:'#9B9690',marginBottom:12}}>{c.desc}</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
              <div>
                <div style={{fontSize:11,color:'#9B9690',marginBottom:4}}>Today: {cvfNow[c.id]??'—'}/10</div>
                <input type="range" min="0" max="10" step="1" value={cvfNow[c.id]??5}
                  onChange={e=>setCvfNow(p=>({...p,[c.id]:parseInt(e.target.value)}))} style={{width:'100%'}}/>
              </div>
              <div>
                <div style={{fontSize:11,color:'#2C5282',marginBottom:4}}>Ideal: {cvfIdeal[c.id]??'—'}/10</div>
                <input type="range" min="0" max="10" step="1" value={cvfIdeal[c.id]??5}
                  onChange={e=>setCvfIdeal(p=>({...p,[c.id]:parseInt(e.target.value)}))} style={{width:'100%'}}/>
              </div>
            </div>
          </div>
        ))}
      </div>}

      {step===5 && <div>
        <p style={S.label}>Values origin tracing</p>
        <h2 style={S.h2}>Where did each operating value come from?</h2>
        <p style={S.sub}>For each value you identified as currently operating, select its most likely origin.</p>
        {current.slice(0,5).map(v=>(
          <div key={v} style={{marginBottom:16}}>
            <div style={{fontSize:14,fontWeight:500,marginBottom:8,color:'#0A0A0A'}}>{v}</div>
            <select value={origins[v]||''} onChange={e=>setOrigins(p=>({...p,[v]:e.target.value}))}
              style={{...S.input,cursor:'pointer',color:origins[v]?'#3D3A36':'#9B9690'}}>
              <option value="">Select origin</option>
              {ORIGINS.map(o=><option key={o} value={o}>{o}</option>)}
            </select>
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
