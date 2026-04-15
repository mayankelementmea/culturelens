'use client'
import { useState } from 'react'
import { S } from './styles'

const NETWORKS = [
  {id:'knowledge', label:'Knowledge authority',
    q:'You need an informed perspective on a complex strategic issue that crosses multiple parts of the business. Who are the three people whose judgment you would seek out?'},
  {id:'influence', label:'Decision influence',
    q:'A significant organisational change is being considered. Regardless of formal authority, whose support would be essential for it to succeed? Who are the three people without whose buy-in no major change actually sticks?'},
  {id:'energy', label:'Organisational energy',
    q:'Think about the people who raise the performance and morale of everyone around them. Who are the three people who contribute most to the organisation\'s energy and cohesion?'},
]

export default function Chapter5({ token, onComplete, onUpdate }) {
  const [step, setStep] = useState(0)
  const [data, setData] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const canGo = () => {
    if(step===0) return true
    const net = NETWORKS[step-1]
    if(!net) return false
    const d = data[net.id]||{}
    return (d.name1||'').trim() && (d.name2||'').trim() && (d.name3||'').trim()
  }

  const setField = (netId,field,val) => {
    setData(p=>({...p,[netId]:{...(p[netId]||{}),[field]:val}}))
  }

  const submit = async () => {
    setSubmitting(true)
    try {
      const r = await fetch('/api/submit',{method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({token,chapter:'ch5',data})})
      const result = await r.json()
      onComplete?.(result)
    } catch(e){console.error(e);onComplete?.({success:true,demo:true})}
    setSubmitting(false)
  }

  return (
    <div style={S.page}><div style={S.inner}>
      <div style={S.progress}>{[0,1,2,3].map(i=><div key={i} style={S.bar(i<=step)}/>)}</div>

      {step===0 && <div>
        <p style={S.label}>Module 5 of 6</p>
        <h2 style={{...S.h2,fontSize:26}}>Authority and influence mapping</h2>
        <p style={S.body}>Three questions that map the informal organisation — who actually holds influence, knowledge, and cultural authority regardless of title. Your nominations are anonymised and aggregated to produce network graphs.</p>
        <div style={S.note}>Estimated time: 5 minutes.</div>
      </div>}

      {step>=1 && step<=3 && (() => {
        const net = NETWORKS[step-1]
        const d = data[net.id]||{}
        return <div>
          <p style={S.label}>{net.label}</p>
          <h2 style={S.h2}>{net.q}</h2>
          <p style={S.sub}>Name three people. Use initials if you prefer. Include their department or function.</p>
          {[1,2,3].map(n=>(
            <div key={n} style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:12}}>
              <input style={S.input} placeholder={`Person ${n} — name or initials`}
                value={d['name'+n]||''} onChange={e=>setField(net.id,'name'+n,e.target.value)}/>
              <input style={S.input} placeholder="Department / function"
                value={d['dept'+n]||''} onChange={e=>setField(net.id,'dept'+n,e.target.value)}/>
            </div>
          ))}
        </div>
      })()}

      <div style={S.nav}>
        {step>0 && <button onClick={()=>setStep(s=>s-1)} style={S.btnS}>Back</button>}
        <div style={{flex:1}}/>
        {step<3 ? (
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
