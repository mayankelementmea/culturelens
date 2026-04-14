'use client'
import { useState } from 'react'

const WORKSPACES = [
  { id:'bullpen', label:'Open plan', desc:'Shared desks in open rows. High visibility. Minimal barriers between teams.' },
  { id:'maze', label:'Partitioned', desc:'Cubicle or partition layout. Semi-private spaces. Moderate team interaction.' },
  { id:'hive', label:'Activity-based', desc:'Mixed zones — collaboration spaces, focus pods, standing areas. Flexible seating.' },
  { id:'fortress', label:'Private offices', desc:'Individual offices. Space allocated by seniority. Meetings by appointment.' },
  { id:'hybrid', label:'Hybrid model', desc:'Hot-desking with bookable rooms. Some days remote, some onsite.' },
  { id:'home', label:'Fully remote', desc:'Work from home or distributed locations. Digital-first communication.' },
]

const SPECTRUMS = [
  { id:'openness', label:'Transparency', left:'Information is closely held', right:'Information flows freely' },
  { id:'energy', label:'Organisational energy', left:'Measured and reserved', right:'Visibly high-energy' },
  { id:'formality', label:'Operating formality', left:'Formal protocols and hierarchy', right:'Informal and flat' },
  { id:'pace', label:'Decision velocity', left:'Deliberate and cautious', right:'Rapid and decisive' },
  { id:'warmth', label:'Interpersonal climate', left:'Transactional and professional', right:'Warm and relationship-driven' },
]

const DESK_ITEMS = [
  { id:'standing', label:'Height-adjustable desk' },
  { id:'privacy', label:'Privacy screen or partition' },
  { id:'plant', label:'Natural elements' },
  { id:'whiteboard', label:'Collaboration surface' },
  { id:'photos', label:'Personal items on display' },
  { id:'headphones', label:'Noise isolation' },
  { id:'coffee', label:'Refreshment area nearby' },
  { id:'monitors', label:'Premium technology setup' },
  { id:'chair', label:'Ergonomic seating' },
  { id:'door', label:'Closeable private space' },
  { id:'teamtable', label:'Shared team workspace' },
  { id:'deadlines', label:'Visual task management' },
  { id:'awards', label:'Recognition display' },
  { id:'quiet', label:'Designated quiet zone' },
  { id:'books', label:'Learning resources' },
]

const REACTIONS = [
  { id:'proud', label:'Proud', pos:true },
  { id:'energised', label:'Energised', pos:true },
  { id:'frustrated', label:'Frustrated', pos:false },
  { id:'calm', label:'Focused', pos:true },
  { id:'inspired', label:'Inspired', pos:true },
  { id:'bored', label:'Disengaged', pos:false },
  { id:'connected', label:'Connected', pos:true },
  { id:'isolated', label:'Isolated', pos:false },
  { id:'motivated', label:'Driven', pos:true },
  { id:'stuck', label:'Constrained', pos:false },
  { id:'grateful', label:'Valued', pos:true },
  { id:'anxious', label:'Under pressure', pos:false },
]

const S = {
  page: { minHeight:'100vh',background:'#F8F7F4',color:'#3D3A36',fontFamily:"'Poppins', sans-serif" },
  inner: { maxWidth:640,margin:'0 auto',padding:'40px 24px' },
  progress: { display:'flex',gap:3,marginBottom:48 },
  bar: (active) => ({ flex:1,height:2,borderRadius:1,background:active?'#0A0A0A':'#E8E5E0',transition:'background 0.3s' }),
  label: { fontSize:11,fontWeight:500,letterSpacing:'0.12em',textTransform:'uppercase',color:'#9B9690',marginBottom:16 },
  h2: { fontSize:24,fontWeight:600,letterSpacing:'-0.02em',color:'#0A0A0A',marginBottom:8 },
  sub: { fontSize:15,color:'#9B9690',marginBottom:32,lineHeight:1.6 },
  grid: { display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:8 },
  grid3: { display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8 },
  optBtn: (sel) => ({
    background: sel ? '#fff' : '#fff',
    border: sel ? '2px solid #2C5282' : '1px solid #E8E5E0',
    borderRadius:8, padding:'20px 16px', textAlign:'left', cursor:'pointer',
    transition:'all 0.2s', color:'#3D3A36',
    boxShadow: sel ? '0 1px 8px rgba(44,82,130,0.1)' : 'none',
  }),
  optTitle: { fontSize:14,fontWeight:600,color:'#0A0A0A',marginBottom:4 },
  optDesc: { fontSize:12,color:'#9B9690',lineHeight:1.5 },
  specRow: { marginBottom:28 },
  specLabel: (set) => ({ fontSize:13,fontWeight:500,color: set ? '#2C5282' : '#0A0A0A',marginBottom:8 }),
  specPoles: { display:'flex',justifyContent:'space-between',marginTop:6 },
  specPole: { fontSize:11,color:'#9B9690',maxWidth:'40%' },
  tagBtn: (sel,pos) => ({
    background: sel ? (pos ? '#F0FDF4' : '#FEF2F2') : '#fff',
    border: sel ? `1.5px solid ${pos ? '#16A34A' : '#DC2626'}` : '1px solid #E8E5E0',
    borderRadius:6, padding:'10px 8px', textAlign:'center', cursor:'pointer',
    fontSize:13, fontWeight:500, color: sel ? (pos ? '#15803D' : '#B91C1C') : '#6B6660',
    transition:'all 0.15s',
    opacity: !sel && 'max' === 'max' ? 1 : 1,
  }),
  navRow: { display:'flex',justifyContent:'space-between',marginTop:48,paddingBottom:40 },
  btnPrimary: (ok) => ({
    background: ok ? '#0A0A0A' : '#E8E5E0', color: ok ? '#fff' : '#9B9690',
    border:'none', padding:'12px 28px', borderRadius:6, cursor: ok ? 'pointer' : 'default',
    fontFamily:"'Poppins'", fontSize:14, fontWeight:500, transition:'all 0.2s',
  }),
  btnSec: { background:'none',border:'1px solid #D4D0C8',color:'#6B6660',padding:'12px 24px',borderRadius:6,cursor:'pointer',fontFamily:"'Poppins'",fontSize:14 },
  count: { fontSize:12,color:'#9B9690',marginTop:8 },
}

export default function Chapter1({ token, onComplete }) {
  const [step, setStep] = useState(0)
  const [workspace, setWorkspace] = useState([])
  const [spectrums, setSpectrums] = useState({})
  const [deskItems, setDeskItems] = useState([])
  const [reactions, setReactions] = useState([])
  const [submitting, setSubmitting] = useState(false)

  const toggle = (arr, set, id, max) => {
    if (arr.includes(id)) set(arr.filter(x => x !== id))
    else if (arr.length < max) set([...arr, id])
  }

  const canGo = () => {
    if (step === 0) return true
    if (step === 1) return workspace.length > 0
    if (step === 2) return Object.keys(spectrums).length === 5
    if (step === 3) return deskItems.length === 5
    if (step === 4) return reactions.length === 3
    return false
  }

  const submit = async () => {
    setSubmitting(true)
    try {
      const r = await fetch('/api/submit', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ token, chapter:'ch1', data:{
          workspace_type: workspace.map(id => WORKSPACES.find(w=>w.id===id)?.label),
          openness: spectrums.openness||5, energy: spectrums.energy||5,
          formality: spectrums.formality||5, pace: spectrums.pace||5, warmth: spectrums.warmth||5,
          desk_items: deskItems.map(id => DESK_ITEMS.find(d=>d.id===id)?.label),
          reactions: reactions.map(id => REACTIONS.find(r=>r.id===id)?.label),
        }})
      })
      const result = await r.json()
      if (result.success) onComplete?.(result)
    } catch(e) { console.error(e) }
    setSubmitting(false)
  }

  return (
    <div style={S.page}>
      <div style={S.inner}>
        <div style={S.progress}>
          {[0,1,2,3,4].map(i => <div key={i} style={S.bar(i <= step)} />)}
        </div>

        {step === 0 && (
          <div className="fade-up">
            <p style={S.label}>Module 1 of 6</p>
            <h2 style={S.h2}>Environment and workspace analysis</h2>
            <p style={S.sub}>This module captures the physical and environmental layer of your organisational culture — workspace design, operating climate, environmental priorities, and affective response. Four exercises, approximately seven minutes.</p>
            <p style={{fontSize:13,color:'#9B9690',lineHeight:1.7,padding:'16px 20px',background:'#fff',borderRadius:8,border:'1px solid #E8E5E0'}}>Your individual responses are anonymised and never shared. Only aggregate patterns at the department or organisational level are reported.</p>
          </div>
        )}

        {step === 1 && (
          <div className="fade-up">
            <p style={S.label}>Exercise 1 of 4</p>
            <h2 style={S.h2}>Workspace configuration</h2>
            <p style={S.sub}>Select the description that most closely matches your primary work environment. You may select up to two for hybrid arrangements.</p>
            <div style={S.grid}>
              {WORKSPACES.map(w => (
                <button key={w.id} onClick={() => toggle(workspace, setWorkspace, w.id, 2)} style={S.optBtn(workspace.includes(w.id))}>
                  <div style={S.optTitle}>{w.label}</div>
                  <div style={S.optDesc}>{w.desc}</div>
                </button>
              ))}
            </div>
            <p style={S.count}>{workspace.length} of 2 selected</p>
          </div>
        )}

        {step === 2 && (
          <div className="fade-up">
            <p style={S.label}>Exercise 2 of 4</p>
            <h2 style={S.h2}>Operating climate assessment</h2>
            <p style={S.sub}>Position your organisation on each dimension based on your direct experience.</p>
            {SPECTRUMS.map(sp => (
              <div key={sp.id} style={S.specRow}>
                <div style={S.specLabel(spectrums[sp.id] !== undefined)}>{sp.label}</div>
                <input type="range" min="0" max="10" step="1"
                  value={spectrums[sp.id] ?? ''} 
                  onChange={e => setSpectrums(p => ({...p,[sp.id]:parseInt(e.target.value)}))}
                  style={{width:'100%'}} />
                <div style={S.specPoles}>
                  <span style={S.specPole}>{sp.left}</span>
                  <span style={S.specPole}>{sp.right}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {step === 3 && (
          <div className="fade-up">
            <p style={S.label}>Exercise 3 of 4</p>
            <h2 style={S.h2}>Environment priorities</h2>
            <p style={S.sub}>If you could design your ideal work environment, which five elements would make the most significant difference to your effectiveness?</p>
            <div style={S.grid3}>
              {DESK_ITEMS.map(d => (
                <button key={d.id} onClick={() => toggle(deskItems, setDeskItems, d.id, 5)}
                  style={{
                    background: deskItems.includes(d.id) ? '#EFF6FF' : '#fff',
                    border: deskItems.includes(d.id) ? '1.5px solid #2C5282' : '1px solid #E8E5E0',
                    borderRadius:6, padding:'12px 10px', textAlign:'center', cursor:'pointer',
                    fontSize:12, fontWeight:500, color: deskItems.includes(d.id) ? '#1E40AF' : '#6B6660',
                    transition:'all 0.15s',
                    opacity: !deskItems.includes(d.id) && deskItems.length >= 5 ? 0.35 : 1,
                  }}>
                  {d.label}
                </button>
              ))}
            </div>
            <p style={S.count}>{deskItems.length} of 5 selected</p>
          </div>
        )}

        {step === 4 && (
          <div className="fade-up">
            <p style={S.label}>Exercise 4 of 4</p>
            <h2 style={S.h2}>Affective response</h2>
            <p style={S.sub}>Select the three descriptors that most accurately characterise your day-to-day experience in this environment.</p>
            <div style={S.grid3}>
              {REACTIONS.map(r => (
                <button key={r.id} onClick={() => toggle(reactions, setReactions, r.id, 3)}
                  style={{
                    ...S.tagBtn(reactions.includes(r.id), r.pos),
                    opacity: !reactions.includes(r.id) && reactions.length >= 3 ? 0.35 : 1,
                  }}>
                  {r.label}
                </button>
              ))}
            </div>
            <p style={S.count}>{reactions.length} of 3 selected</p>
          </div>
        )}

        <div style={S.navRow}>
          {step > 0 && <button onClick={() => setStep(s=>s-1)} style={S.btnSec}>Back</button>}
          <div style={{flex:1}} />
          {step < 4 ? (
            <button onClick={() => setStep(s=>s+1)} disabled={!canGo()} style={S.btnPrimary(canGo())}>
              {step === 0 ? 'Begin assessment' : 'Continue'}
            </button>
          ) : (
            <button onClick={submit} disabled={!canGo()||submitting} style={S.btnPrimary(canGo())}>
              {submitting ? 'Processing...' : 'Complete module'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
