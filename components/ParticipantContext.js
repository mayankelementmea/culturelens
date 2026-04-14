'use client'
import { useState } from 'react'
import { S } from './styles'

const ROLES = [
  { id:'owner', label:'Owner / founder', desc:'You founded or own this business.' },
  { id:'board', label:'Board member / family principal', desc:'Governance role. Strategic oversight.' },
  { id:'ceo', label:'Chief executive / managing director', desc:'Operational and strategic leadership.' },
  { id:'senior', label:'Senior executive (C-suite / VP / director)', desc:'Lead a major function or business unit.' },
  { id:'middle', label:'Middle management', desc:'Manage teams and translate strategy into execution.' },
  { id:'team_lead', label:'Team leader / supervisor', desc:'Direct team leadership.' },
  { id:'ic', label:'Individual contributor / specialist', desc:'Professional contributor without direct reports.' },
  { id:'external', label:'External stakeholder / advisor', desc:'Board advisor, consultant, or strategic partner.' },
]

const DEPTS = ['Operations','Finance','HR','Sales / Business Development','Marketing','Technology / IT','Strategy','Legal','Supply Chain','Project Management','Administration','Other']

const TENURE = [
  { id:'under1', label:'Under 1 year' },
  { id:'1to3', label:'1-3 years' },
  { id:'3to5', label:'3-5 years' },
  { id:'5to10', label:'5-10 years' },
  { id:'10to15', label:'10-15 years' },
  { id:'15plus', label:'15+ years' },
  { id:'founding', label:'Since founding' },
]

export default function ParticipantContext({ onComplete }) {
  const [role, setRole] = useState(null)
  const [dept, setDept] = useState('')
  const [tenure, setTenure] = useState(null)

  const canGo = role && dept && tenure

  return (
    <div style={S.page}><div style={S.inner}>
      <p style={S.label}>Before we begin</p>
      <h2 style={{...S.h2, fontSize:26}}>Help us understand the perspective you bring</h2>
      <p style={S.sub}>Your role, function, and tenure determine how your responses are contextualised within the diagnostic. This information is used for segmentation only and is never attributed to you individually.</p>

      <p style={{...S.label, marginTop:32}}>Your role in this organisation</p>
      {ROLES.map(r => (
        <button key={r.id} onClick={() => setRole(r.id)} style={S.opt(role===r.id)}>
          <div style={{fontWeight:500, marginBottom:2}}>{r.label}</div>
          <div style={{fontSize:12, color:'#9B9690'}}>{r.desc}</div>
        </button>
      ))}

      <p style={{...S.label, marginTop:32}}>Department / function</p>
      <select value={dept} onChange={e => setDept(e.target.value)}
        style={{...S.input, cursor:'pointer', color: dept?'#3D3A36':'#9B9690'}}>
        <option value="">Select your department</option>
        {DEPTS.map(d => <option key={d} value={d}>{d}</option>)}
      </select>

      <p style={{...S.label, marginTop:32}}>Tenure at this organisation</p>
      <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:6}}>
        {TENURE.map(t => (
          <button key={t.id} onClick={() => setTenure(t.id)} style={{
            background: tenure===t.id ? '#F0F4F8' : '#fff',
            border: tenure===t.id ? '1.5px solid #2C5282' : '1px solid #E8E5E0',
            borderRadius:6, padding:'10px 8px', textAlign:'center', cursor:'pointer',
            fontSize:12, fontWeight: tenure===t.id ? 500 : 400,
            color: tenure===t.id ? '#1E3A5F' : '#6B6660',
          }}>{t.label}</button>
        ))}
      </div>

      <div style={S.nav}>
        <div style={{flex:1}} />
        <button onClick={() => canGo && onComplete({role, department:dept, tenure})}
          disabled={!canGo} style={S.btnP(canGo)}>Begin assessment</button>
      </div>
    </div></div>
  )
}
