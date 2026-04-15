'use client'
import { useMemo } from 'react'

const C = {
  canvas: { position:'sticky', top:24, padding:'20px 16px', background:'var(--bg-card)', borderRadius:12, border:'1px solid var(--border)', minHeight:400, fontFamily:"'Poppins',sans-serif", overflow:'hidden' },
  section: { marginBottom:16 },
  label: { fontSize:9, fontWeight:500, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--text-muted)', marginBottom:4 },
  identity: { fontSize:18, fontWeight:600, fontStyle:'italic', color:'var(--text-primary)', lineHeight:1.3, textAlign:'center', padding:'8px 0', fontFamily:"Georgia,serif" },
  dualBox: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:6 },
  box: (bg) => ({ background:bg||'#fff', border:'1px solid var(--border)', borderRadius:8, padding:'8px 10px' }),
  boxTitle: { fontSize:10, fontWeight:600, color:'var(--text-primary)', marginBottom:3 },
  boxText: { fontSize:10, color:'var(--text-secondary)', lineHeight:1.5 },
  emotionPill: (c) => ({ display:'inline-block', fontSize:9, padding:'2px 8px', borderRadius:12, background:c==='positive'?'#E1F5EE':c==='negative'?'#FCEBEB':'#F1EFE8', color:c==='positive'?'#085041':c==='negative'?'#791F1F':'#444441', marginRight:3, marginBottom:3 }),
  ring: { width:120, height:120, margin:'0 auto', display:'block' },
  gapRow: { display:'flex', alignItems:'center', gap:4, marginBottom:6, fontSize:10 },
  gapLabel: { minWidth:70, color:'var(--text-secondary)', fontWeight:500 },
  gapBar: { flex:1, height:10, background:'rgba(255,255,255,0.06)', borderRadius:4, position:'relative', overflow:'hidden' },
  gapFill: (w, c) => ({ position:'absolute', left:0, top:0, height:'100%', width:`${w}%`, background:c, borderRadius:4 }),
  gapMark: (l) => ({ position:'absolute', top:-1, left:`${l}%`, width:2, height:12, background:'#2C5282', borderRadius:1 }),
  originBar: { display:'flex', gap:2, marginTop:4, fontSize:9, borderRadius:4, overflow:'hidden' },
  originSeg: (w, bg, c) => ({ width:`${w}%`, background:bg, color:c, padding:'3px 4px', textAlign:'center', minWidth:40 }),
  dim: { display:'flex', justifyContent:'space-between', padding:'3px 0', borderBottom:'1px solid var(--border)', fontSize:10 },
  dimLabel: { fontWeight:500, color:'var(--text-primary)' },
  dimVal: { color:'var(--text-muted)' },
  entropy: { textAlign:'center', padding:'6px 0' },
  entropyNum: { fontSize:28, fontWeight:600, color:'var(--text-primary)' },
  entropyLabel: { fontSize:10, color:'var(--text-muted)' },
  safety: { textAlign:'center', padding:'6px 0' },
  safetyNum: { fontSize:28, fontWeight:600 },
  placeholder: { padding:'12px', textAlign:'center', fontSize:11, color:'#D4D0C8', fontStyle:'italic' },
  fade: { opacity:0.3 },
}

function CVFRing({ data }) {
  if (!data) return null
  const total = (data.clan||0) + (data.adhocracy||0) + (data.market||0) + (data.hierarchy||0)
  if (total === 0) return null
  const pct = (v) => ((v||0)/total)*100
  const segs = [
    { val: pct(data.clan), color:'#F5C4B3', label:'Clan' },
    { val: pct(data.adhocracy), color:'#AFA9EC', label:'Adhoc' },
    { val: pct(data.market), color:'#9FE1CB', label:'Market' },
    { val: pct(data.hierarchy), color:'#B5D4F4', label:'Hier' },
  ]
  let offset = 0
  const r = 50, cx = 60, cy = 60, sw = 10
  const circ = 2 * Math.PI * r
  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={sw} />
      {segs.map((s, i) => {
        const dash = (s.val / 100) * circ
        const el = <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={s.color} strokeWidth={sw}
          strokeDasharray={`${dash} ${circ - dash}`} strokeDashoffset={-offset}
          transform={`rotate(-90 ${cx} ${cy})`} />
        offset += dash
        return el
      })}
      {segs.filter(s => s.val > 15).map((s, i) => {
        const midAngle = (segs.slice(0, i).reduce((a, x) => a + x.val, 0) + s.val / 2) / 100 * 360 - 90
        const rad = midAngle * Math.PI / 180
        const tx = cx + (r) * Math.cos(rad)
        const ty = cy + (r) * Math.sin(rad)
        return <text key={`t${i}`} x={tx} y={ty} textAnchor="middle" dominantBaseline="central" fontSize="8" fill="#6B6660" fontFamily="Poppins">{s.label}</text>
      })}
      <text x={cx} y={cy-4} textAnchor="middle" fontSize="11" fontWeight="500" fill="#0A0A0A" fontFamily="Poppins">
        {segs.reduce((best, s) => s.val > best.val ? s : best, segs[0]).label}
      </text>
      <text x={cx} y={cy+10} textAnchor="middle" fontSize="8" fill="#9B9690" fontFamily="Poppins">dominant</text>
    </svg>
  )
}

export default function CultureCanvas({ data, phase }) {
  const d = data || {}
  const hasIdentity = d.identity_sentence || d.proud_of || d.never_compromise
  const hasOperating = d.decision_architecture || d.spectrums
  const hasValues = d.current_values && d.current_values.length > 0
  const hasNarrative = d.founding_story
  const hasSafety = d.safety_scores
  const entropy = useMemo(() => {
    if (!d.current_values || d.current_values.length === 0) return null
    const limiting = ['Blame','Bureaucracy','Control','Fear','Silos','Politics','Micromanagement','Short-termism','Complacency','Overwork']
    const limCount = d.current_values.filter(v => limiting.includes(v)).length
    return Math.round((limCount / d.current_values.length) * 100)
  }, [d.current_values])

  const cvfData = useMemo(() => {
    if (!d.cvf_current) return null
    return d.cvf_current
  }, [d.cvf_current])

  return (
    <div style={C.canvas}>
      <div style={{textAlign:'center', marginBottom:12}}>
        <span style={{fontSize:10, fontWeight:500, color:'#CBFD50', background:'#0A0A0A', padding:'2px 6px', borderRadius:4}}>e</span>
        <span style={{fontSize:10, fontWeight:500, color:'var(--text-muted)', marginLeft:4}}>Culture canvas</span>
      </div>

      {/* IDENTITY */}
      <div style={C.section}>
        {d.identity_sentence ? (
          <div style={C.identity}>"{d.identity_sentence}"</div>
        ) : (
          <div style={{...C.identity, ...C.fade, fontSize:13}}>Your culture identity will appear here</div>
        )}
      </div>

      {/* PRIDE + BOUNDARIES */}
      {(d.proud_of || d.never_become) && (
        <div style={{...C.section, ...C.dualBox}}>
          <div style={C.box('#F0FDF4')}>
            <div style={{...C.boxTitle, color:'#15803D'}}>What we are</div>
            <div style={C.boxText}>{d.proud_of || '...'}</div>
            {d.never_compromise && <div style={{...C.boxText, marginTop:4, fontStyle:'italic'}}>Never compromise: {d.never_compromise}</div>}
          </div>
          <div style={C.box('#FEF2F2')}>
            <div style={{...C.boxTitle, color:'#B91C1C'}}>What we are not</div>
            <div style={C.boxText}>{d.never_become || '...'}</div>
          </div>
        </div>
      )}

      {/* EMOTIONAL SIGNATURE */}
      {d.emotion_words && d.emotion_words.length > 0 && (
        <div style={C.section}>
          <div style={C.label}>Emotional signature</div>
          <div>{d.emotion_words.map((w, i) => <span key={i} style={C.emotionPill('neutral')}>{w}</span>)}</div>
        </div>
      )}

      {/* CVF RING + OPERATING DIMS */}
      {(cvfData || d.spectrums) && (
        <div style={{...C.section, ...C.dualBox}}>
          <div>
            {cvfData && <CVFRing data={cvfData} />}
            {entropy !== null && (
              <div style={C.entropy}>
                <div style={{...C.entropyNum, color: entropy > 30 ? '#DC2626' : entropy > 20 ? '#B8860B' : '#0D9488'}}>{entropy}%</div>
                <div style={C.entropyLabel}>cultural entropy</div>
              </div>
            )}
          </div>
          <div>
            {d.spectrums && Object.entries(d.spectrums).map(([k, v]) => (
              <div key={k} style={C.dim}>
                <span style={C.dimLabel}>{k.replace(/_/g, ' ')}</span>
                <span style={C.dimVal}>{v}/10</span>
              </div>
            ))}
            {d.safety_index && (
              <div style={{...C.safety, marginTop:8}}>
                <div style={{...C.safetyNum, color: d.safety_index >= 3 ? '#0D9488' : d.safety_index >= 2.5 ? '#B8860B' : '#DC2626'}}>{d.safety_index}</div>
                <div style={C.entropyLabel}>safety index / 4.0</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VALUES GAP */}
      {d.current_values && d.desired_values && (
        <div style={C.section}>
          <div style={C.label}>Culture gap: today vs needed</div>
          {d.desired_values.slice(0, 5).map(v => {
            const isCurrent = d.current_values.includes(v)
            return (
              <div key={v} style={C.gapRow}>
                <span style={C.gapLabel}>{v}</span>
                <div style={C.gapBar}>
                  <div style={C.gapFill(isCurrent ? 65 : 15, isCurrent ? '#9FE1CB' : '#F09595')} />
                  <div style={C.gapMark(75)} />
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* ORIGIN */}
      {d.origins && Object.keys(d.origins).length > 0 && (
        <div style={C.section}>
          <div style={C.label}>How this culture came into being</div>
          {(() => {
            const counts = {}
            Object.values(d.origins).forEach(o => { const k = o.split(' — ')[0] || o.split(' –')[0] || o; counts[k] = (counts[k]||0)+1 })
            const total = Object.values(counts).reduce((s,v)=>s+v,0)
            const colors = [['#FAECE7','#712B13'],['#EEEDFE','#3C3489'],['#E1F5EE','#085041'],['#FAEEDA','#633806']]
            return (
              <div style={C.originBar}>
                {Object.entries(counts).slice(0,4).map(([k,v],i) => (
                  <div key={k} style={C.originSeg(Math.round(v/total*100), colors[i][0], colors[i][1])}>
                    {k.slice(0,12)} {Math.round(v/total*100)}%
                  </div>
                ))}
              </div>
            )
          })()}
        </div>
      )}

      {/* FOUNDING STORY */}
      {d.founding_story && (
        <div style={C.section}>
          <div style={C.label}>Founding story</div>
          <div style={{fontSize:10, color:'var(--text-secondary)', lineHeight:1.5, fontStyle:'italic'}}>
            "{d.founding_story.slice(0, 150)}{d.founding_story.length > 150 ? '...' : ''}"
          </div>
        </div>
      )}

      {/* RESOURCE ALLOCATION */}
      {d.resource_allocation && (
        <div style={C.section}>
          <div style={C.label}>Where attention actually goes</div>
          {Object.entries(d.resource_allocation).sort((a,b) => b[1]-a[1]).slice(0,4).map(([k,v]) => (
            <div key={k} style={C.gapRow}>
              <span style={{...C.gapLabel, minWidth:90}}>{k.split(' ').slice(0,2).join(' ')}</span>
              <div style={C.gapBar}>
                <div style={C.gapFill(v, v > 25 ? '#2C5282' : '#9B9690')} />
              </div>
              <span style={{fontSize:9, color:'var(--text-secondary)', minWidth:24}}>{v}%</span>
            </div>
          ))}
        </div>
      )}

      {/* UNWRITTEN RULES */}
      {d.unwritten_rules && d.unwritten_rules.length > 0 && d.unwritten_rules[0] !== 'none' && (
        <div style={C.section}>
          <div style={C.label}>Unwritten rules operating</div>
          {d.unwritten_rules.slice(0,4).map((r, i) => (
            <div key={i} style={{fontSize:9, color:'var(--text-muted)', padding:'2px 0', borderBottom:'1px solid var(--border)'}}>{r}</div>
          ))}
        </div>
      )}

      {/* PROGRESS INDICATOR */}
      <div style={{marginTop:12, textAlign:'center'}}>
        <div style={{display:'flex', gap:3, justifyContent:'center'}}>
          {[1,2,3,4,5,6].map(i => (
            <div key={i} style={{width:24, height:3, borderRadius:2, background: i <= phase ? '#0A0A0A' : 'rgba(255,255,255,0.06)'}} />
          ))}
        </div>
        <div style={{fontSize:9, color:'var(--text-muted)', marginTop:4}}>Phase {phase} of 6</div>
      </div>
    </div>
  )
}
