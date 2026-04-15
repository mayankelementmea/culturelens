'use client'
import { useState, useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'

const ParticipantContext = dynamic(() => import('@/components/ParticipantContext'), { ssr: false })
const PhaseIdentity = dynamic(() => import('@/components/PhaseIdentity'), { ssr: false })
const Chapter1 = dynamic(() => import('@/components/Chapter1'), { ssr: false })
const Chapter2 = dynamic(() => import('@/components/Chapter2'), { ssr: false })
const Chapter3 = dynamic(() => import('@/components/Chapter3'), { ssr: false })
const Chapter4 = dynamic(() => import('@/components/Chapter4'), { ssr: false })
const Chapter5 = dynamic(() => import('@/components/Chapter5'), { ssr: false })
const Chapter6 = dynamic(() => import('@/components/Chapter6'), { ssr: false })
const CultureCanvas = dynamic(() => import('@/components/CultureCanvas'), { ssr: false })
const AssessmentClose = dynamic(() => import('@/components/AssessmentClose'), { ssr: false })

const FLOW = ['context','identity','ch1','ch2','ch3','ch4','ch5','ch6','canvas','close']
const PHASE_MAP = { identity:1, ch1:2, ch2:3, ch3:4, ch4:5, ch5:6, ch6:6, canvas:7 }

function AssessmentFlow() {
  const params = useSearchParams()
  const token = params.get('token') || 'demo'
  const [phase, setPhase] = useState('context')
  const [canvasData, setCanvasData] = useState({})

  const advance = useCallback(() => {
    const idx = FLOW.indexOf(phase)
    if (idx < FLOW.length - 1) setPhase(FLOW[idx + 1])
  }, [phase])

  const updateCanvas = useCallback((partialData) => {
    setCanvasData(prev => ({ ...prev, ...partialData }))
  }, [])

  const submitAndAdvance = useCallback(async (chapter, data) => {
    try {
      await fetch('/api/submit', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, chapter, data })
      })
    } catch (e) { console.error(e) }
    advance()
  }, [token, advance])

  // Context screen — full width, no canvas
  if (phase === 'context') {
    return <ParticipantContext onComplete={(ctx) => {
      updateCanvas(ctx)
      submitAndAdvance('context', ctx)
    }} />
  }

  // Final interactive canvas — full width
  if (phase === 'canvas') {
    return <CanvasFullScreen data={canvasData} onContinue={advance} />
  }

  // Close screen — full width
  if (phase === 'close') {
    return <AssessmentClose token={token} />
  }

  // Split screen: questions left, canvas right
  const currentPhase = PHASE_MAP[phase] || 1
  const showCanvas = phase !== 'context'

  return (
    <div style={{
      minHeight: '100vh', background: '#F8F7F4',
      display: 'grid', gridTemplateColumns: showCanvas ? '1fr 380px' : '1fr',
      fontFamily: "'Poppins', sans-serif",
    }}>
      {/* LEFT: Questions */}
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '48px 24px', width: '100%' }}>
        {phase === 'identity' && (
          <PhaseIdentity
            onUpdate={(d) => updateCanvas(d)}
            onComplete={(d) => {
              updateCanvas(d)
              submitAndAdvance('identity', d)
            }}
          />
        )}
        {phase === 'ch1' && (
          <Chapter1 token={token}
            onUpdate={(d) => updateCanvas(d)}
            onComplete={() => advance()}
          />
        )}
        {phase === 'ch2' && (
          <Chapter2 token={token}
            onUpdate={(d) => updateCanvas(d)}
            onComplete={() => advance()}
          />
        )}
        {phase === 'ch3' && (
          <Chapter3 token={token}
            onUpdate={(d) => updateCanvas(d)}
            onComplete={() => advance()}
          />
        )}
        {phase === 'ch4' && (
          <Chapter4 token={token}
            onUpdate={(d) => updateCanvas(d)}
            onComplete={() => advance()}
          />
        )}
        {phase === 'ch5' && (
          <Chapter5 token={token}
            onUpdate={(d) => updateCanvas(d)}
            onComplete={() => advance()}
          />
        )}
        {phase === 'ch6' && (
          <Chapter6 token={token}
            onUpdate={(d) => updateCanvas(d)}
            onComplete={() => advance()}
          />
        )}
      </div>

      {/* RIGHT: Culture Canvas */}
      {showCanvas && (
        <div style={{ padding: '24px 16px 24px 0', borderLeft: '1px solid #E8E5E0' }}>
          <CultureCanvas data={canvasData} phase={currentPhase} />
        </div>
      )}
    </div>
  )
}

function CanvasFullScreen({ data, onContinue }) {
  const d = data || {}

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg-deep)', fontFamily:"'Poppins',sans-serif" }}>
      <div style={{ maxWidth:960, margin:'0 auto', padding:'40px 24px' }}>
        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <div style={{ marginBottom:8 }}>
            <span style={{fontSize:11,fontWeight:500,color:'#CBFD50',background:'var(--accent)',padding:'3px 8px',borderRadius:4}}>e</span>
            <span style={{fontSize:11,fontWeight:500,color:'var(--text-muted)',marginLeft:6}}>Your Culture Canvas</span>
          </div>
          <h1 style={{ fontSize:28, fontWeight:600, color:'var(--text-primary)', letterSpacing:'-0.02em', marginBottom:8 }}>
            This is your organisation's culture
          </h1>
          <p style={{ fontSize:14, color:'var(--text-muted)', maxWidth:540, margin:'0 auto' }}>
            Built from your responses. Click any section to refine. This is your culture, articulated.
          </p>
        </div>

        {/* Identity Statement */}
        <div style={{ textAlign:'center', padding:'24px 0', marginBottom:24 }}>
          <div style={{ fontSize:24, fontWeight:600, fontStyle:'italic', color:'var(--text-primary)', lineHeight:1.3, fontFamily:'Georgia,serif', maxWidth:600, margin:'0 auto' }}>
            "{d.identity_sentence || 'Your culture identity'}"
          </div>
        </div>

        {/* Main grid */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:24 }}>
          {/* What we are */}
          <div style={{ background:'rgba(52,211,153,0.08)', border:'1px solid rgba(52,211,153,0.2)', borderRadius:12, padding:'16px 18px', cursor:'pointer' }}>
            <div style={{ fontSize:12, fontWeight:600, color:'var(--accent-teal)', marginBottom:6 }}>What we are, absolutely</div>
            <div style={{ fontSize:13, color:'rgba(52,211,153,0.8)', lineHeight:1.6 }}>{d.proud_of || '...'}</div>
            {d.never_compromise && (
              <div style={{ marginTop:8, padding:'8px 10px', background:'rgba(52,211,153,0.06)', borderRadius:6, fontSize:11, color:'var(--accent-teal)' }}>
                <strong>Never compromise:</strong> {d.never_compromise}
              </div>
            )}
          </div>
          {/* What we are not */}
          <div style={{ background:'rgba(248,113,113,0.08)', border:'1px solid rgba(248,113,113,0.2)', borderRadius:12, padding:'16px 18px', cursor:'pointer' }}>
            <div style={{ fontSize:12, fontWeight:600, color:'var(--accent-coral)', marginBottom:6 }}>What we are not — and never want to become</div>
            <div style={{ fontSize:13, color:'rgba(248,113,113,0.8)', lineHeight:1.6 }}>{d.never_become || '...'}</div>
            {d.keeps_up_at_night && (
              <div style={{ marginTop:8, padding:'8px 10px', background:'rgba(248,113,113,0.06)', borderRadius:6, fontSize:11, color:'var(--accent-coral)' }}>
                <strong>What keeps us up:</strong> {d.keeps_up_at_night}
              </div>
            )}
          </div>
        </div>

        {/* Emotional signature */}
        {d.emotion_words && d.emotion_words.length > 0 && (
          <div style={{ textAlign:'center', marginBottom:24 }}>
            <div style={{ fontSize:10, fontWeight:500, color:'var(--text-muted)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:6 }}>Emotional signature</div>
            <div style={{ display:'flex', justifyContent:'center', gap:8 }}>
              {d.emotion_words.map((w, i) => (
                <span key={i} style={{ fontSize:14, fontWeight:500, padding:'6px 16px', borderRadius:20, background:'var(--bg-card)', border:'1px solid var(--border)', color:'var(--text-primary)' }}>{w}</span>
              ))}
            </div>
          </div>
        )}

        {/* Operating dimensions + CVF */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:24 }}>
          {d.spectrums && (
            <div style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:12, padding:'16px 18px' }}>
              <div style={{ fontSize:10, fontWeight:500, color:'var(--text-muted)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:10 }}>Operating model</div>
              {Object.entries(d.spectrums).map(([k, v]) => (
                <div key={k} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'4px 0', borderBottom:'1px solid var(--border)' }}>
                  <span style={{ fontSize:11, fontWeight:500, color:'var(--text-primary)' }}>{k.replace(/_/g, ' ')}</span>
                  <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                    <div style={{ width:60, height:4, background:'#E8E5E0', borderRadius:2, position:'relative' }}>
                      <div style={{ position:'absolute', left:0, top:0, height:'100%', width:`${v*10}%`, background:'#2C5282', borderRadius:2 }} />
                    </div>
                    <span style={{ fontSize:10, color:'var(--text-muted)', minWidth:20 }}>{v}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Values gap */}
          {d.current_values && d.desired_values && (
            <div style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:12, padding:'16px 18px' }}>
              <div style={{ fontSize:10, fontWeight:500, color:'var(--text-muted)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:10 }}>Culture gap: today vs needed</div>
              {d.desired_values.slice(0, 6).map(v => {
                const has = d.current_values.includes(v)
                return (
                  <div key={v} style={{ display:'flex', alignItems:'center', gap:6, padding:'4px 0', borderBottom:'1px solid var(--border)' }}>
                    <span style={{ fontSize:11, fontWeight:500, color:'var(--text-primary)', minWidth:80 }}>{v}</span>
                    <div style={{ flex:1, height:8, background:'#E8E5E0', borderRadius:3, position:'relative', overflow:'hidden' }}>
                      <div style={{ position:'absolute', left:0, top:0, height:'100%', width: has?'65%':'15%', background: has?'#9FE1CB':'#F09595', borderRadius:3 }} />
                      <div style={{ position:'absolute', top:-1, left:'70%', width:2, height:10, background:'#2C5282', borderRadius:1 }} />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Origin + Unwritten rules */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:24 }}>
          {d.origins && Object.keys(d.origins).length > 0 && (
            <div style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:12, padding:'16px 18px' }}>
              <div style={{ fontSize:10, fontWeight:500, color:'var(--text-muted)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:10 }}>How this culture came into being</div>
              {(() => {
                const counts = {}
                Object.values(d.origins).forEach(o => { const k = o.split(' — ')[0]||o; counts[k]=(counts[k]||0)+1 })
                const total = Object.values(counts).reduce((s,v)=>s+v,0)
                const colors = ['#FAECE7','#EEEDFE','#E1F5EE','#FAEEDA']
                const textColors = ['#712B13','#3C3489','#085041','#633806']
                return Object.entries(counts).map(([k,v],i) => (
                  <div key={k} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
                    <div style={{ width:Math.max(Math.round(v/total*200), 40), height:24, background:colors[i%4], borderRadius:4, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:500, color:textColors[i%4] }}>
                      {Math.round(v/total*100)}%
                    </div>
                    <span style={{ fontSize:11, color:'var(--text-secondary)' }}>{k}</span>
                  </div>
                ))
              })()}
            </div>
          )}

          {d.unwritten_rules && d.unwritten_rules.length > 0 && d.unwritten_rules[0] !== 'none' && (
            <div style={{ background:'rgba(251,191,36,0.06)', border:'1px solid rgba(251,191,36,0.15)', borderRadius:12, padding:'16px 18px' }}>
              <div style={{ fontSize:10, fontWeight:500, color:'var(--accent-amber)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:10 }}>Unwritten rules operating here</div>
              {d.unwritten_rules.map((r, i) => (
                <div key={i} style={{ fontSize:11, color:'var(--accent-amber)', padding:'4px 0', borderBottom:'1px solid #FED7AA', lineHeight:1.5 }}>{r}</div>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div style={{ textAlign:'center', padding:'32px 0' }}>
          <p style={{ fontSize:13, color:'var(--text-muted)', marginBottom:16 }}>
            This is your culture, articulated. You can now use this canvas in board meetings, strategy sessions, and transformation planning.
          </p>
          <button onClick={onContinue} style={{
            background:'var(--accent)', color:'var(--bg-deep)', border:'none', padding:'14px 32px',
            borderRadius:8, fontFamily:"'Poppins'", fontSize:14, fontWeight:500, cursor:'pointer'
          }}>
            Continue to close
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ChapterPage() {
  return (
    <Suspense fallback={<div style={{minHeight:'100vh',background:'var(--bg-deep)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Poppins'",color:'var(--text-muted)'}}>Loading CultureLens...</div>}>
      <AssessmentFlow />
    </Suspense>
  )
}
