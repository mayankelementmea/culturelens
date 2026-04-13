'use client'
import { useState } from 'react'

const WORKSPACES = [
  { id: 'bullpen', label: 'The bullpen', desc: 'Open rows. No dividers. Everyone visible.', emoji: '🏢' },
  { id: 'maze', label: 'The maze', desc: 'Cubicles and partitions. Semi-private.', emoji: '🧱' },
  { id: 'hive', label: 'The hive', desc: 'Modern clusters. Standing desks. Bean bags.', emoji: '🐝' },
  { id: 'fortress', label: 'The fortress', desc: 'Private offices. Closed doors. Status-based.', emoji: '🏰' },
  { id: 'hybrid', label: 'The hybrid hub', desc: 'Hot-desking. Bookable focus rooms.', emoji: '🔄' },
  { id: 'home', label: 'The home office', desc: 'Remote setup. Personal workspace.', emoji: '🏠' },
]

const SPECTRUMS = [
  { id: 'openness', label: 'Openness', left: 'Closed & secretive', right: 'Transparent & accessible' },
  { id: 'energy', label: 'Energy', left: 'Quiet & low-energy', right: 'Buzzing & high-energy' },
  { id: 'formality', label: 'Formality', left: 'Formal & traditional', right: 'Casual & relaxed' },
  { id: 'pace', label: 'Pace', left: 'Slow & deliberate', right: 'Fast & urgent' },
  { id: 'warmth', label: 'Warmth', left: 'Cold & transactional', right: 'Warm & connected' },
]

const DESK_ITEMS = [
  { id: 'standing', label: 'Standing desk', cat: 'autonomy', escape: false },
  { id: 'privacy', label: 'Privacy screen', cat: 'escape', escape: true },
  { id: 'plant', label: 'Plant / nature', cat: 'wellbeing', escape: false },
  { id: 'whiteboard', label: 'Whiteboard', cat: 'collaboration', escape: false },
  { id: 'photos', label: 'Personal photos', cat: 'identity', escape: false },
  { id: 'headphones', label: 'Headphones', cat: 'escape', escape: true },
  { id: 'coffee', label: 'Coffee area', cat: 'collaboration', escape: false },
  { id: 'monitors', label: 'Dual monitors', cat: 'autonomy', escape: false },
  { id: 'chair', label: 'Ergo chair', cat: 'wellbeing', escape: false },
  { id: 'door', label: 'Private space', cat: 'status', escape: true },
  { id: 'teamtable', label: 'Team table', cat: 'collaboration', escape: false },
  { id: 'deadlines', label: 'Task board', cat: 'accountability', escape: false },
  { id: 'awards', label: 'Awards wall', cat: 'status', escape: false },
  { id: 'quiet', label: 'Quiet corner', cat: 'wellbeing', escape: true },
  { id: 'books', label: 'Bookshelf', cat: 'development', escape: false },
]

const REACTIONS = [
  { id: 'proud', label: 'Proud', positive: true },
  { id: 'energised', label: 'Energised', positive: true },
  { id: 'frustrated', label: 'Frustrated', positive: false },
  { id: 'calm', label: 'Calm', positive: true },
  { id: 'inspired', label: 'Inspired', positive: true },
  { id: 'bored', label: 'Bored', positive: false },
  { id: 'connected', label: 'Connected', positive: true },
  { id: 'isolated', label: 'Isolated', positive: false },
  { id: 'motivated', label: 'Motivated', positive: true },
  { id: 'stuck', label: 'Stuck', positive: false },
  { id: 'grateful', label: 'Grateful', positive: true },
  { id: 'anxious', label: 'Anxious', positive: false },
]

export default function Chapter1({ token, onComplete }) {
  const [step, setStep] = useState(0)
  const [workspace, setWorkspace] = useState([])
  const [spectrums, setSpectrums] = useState({})
  const [deskItems, setDeskItems] = useState([])
  const [reactions, setReactions] = useState([])
  const [submitting, setSubmitting] = useState(false)

  const toggleWorkspace = (id) => {
    setWorkspace(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id)
      if (prev.length >= 2) return prev
      return [...prev, id]
    })
  }

  const toggleDeskItem = (id) => {
    setDeskItems(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id)
      if (prev.length >= 5) return prev
      return [...prev, id]
    })
  }

  const toggleReaction = (id) => {
    setReactions(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id)
      if (prev.length >= 3) return prev
      return [...prev, id]
    })
  }

  const canAdvance = () => {
    switch (step) {
      case 0: return true
      case 1: return workspace.length > 0
      case 2: return Object.keys(spectrums).length === 5
      case 3: return deskItems.length === 5
      case 4: return reactions.length === 3
      default: return false
    }
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          chapter: 'ch1',
          data: {
            workspace_type: workspace.map(id => WORKSPACES.find(w => w.id === id)?.label),
            openness: spectrums.openness || 5,
            energy: spectrums.energy || 5,
            formality: spectrums.formality || 5,
            pace: spectrums.pace || 5,
            warmth: spectrums.warmth || 5,
            desk_items: deskItems.map(id => DESK_ITEMS.find(d => d.id === id)?.label),
            reactions: reactions.map(id => REACTIONS.find(r => r.id === id)?.label),
          }
        })
      })
      const result = await res.json()
      if (result.success) onComplete?.(result)
    } catch (e) {
      console.error(e)
    }
    setSubmitting(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', fontFamily: "'Poppins', sans-serif" }}>
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '40px 20px' }}>

        {/* Progress bar */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 40 }}>
          {[0,1,2,3,4].map(i => (
            <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? '#CBFD50' : '#222', transition: 'background 0.3s' }} />
          ))}
        </div>

        {/* Step 0: Welcome */}
        {step === 0 && (
          <div className="fade-up">
            <p style={{ color: '#CBFD50', fontSize: 12, fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>Chapter 1</p>
            <h1 style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 16 }}>My space</h1>
            <p style={{ color: '#999', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
              You're about to add the first strand to your Culture DNA — your physical world. 
              Four quick exercises. No typing required for most of them. Just choose, drag, and react.
            </p>
            <p style={{ color: '#666', fontSize: 14, marginBottom: 40 }}>This chapter takes about 7 minutes.</p>
          </div>
        )}

        {/* Step 1: Workspace selector */}
        {step === 1 && (
          <div className="fade-up">
            <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 8 }}>Which of these best describes your workspace?</h2>
            <p style={{ color: '#666', fontSize: 14, marginBottom: 24 }}>Choose the closest match. You can select up to two for hybrid setups.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              {WORKSPACES.map(w => (
                <button key={w.id} onClick={() => toggleWorkspace(w.id)}
                  style={{
                    background: workspace.includes(w.id) ? '#1a1a1a' : '#111',
                    border: workspace.includes(w.id) ? '2px solid #CBFD50' : '1px solid #222',
                    borderRadius: 12, padding: 20, textAlign: 'left', cursor: 'pointer',
                    transition: 'all 0.2s', color: '#fff',
                  }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>{w.emoji}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{w.label}</div>
                  <div style={{ fontSize: 12, color: '#666', lineHeight: 1.5 }}>{w.desc}</div>
                </button>
              ))}
            </div>
            <p style={{ color: '#444', fontSize: 12, marginTop: 12 }}>{workspace.length}/2 selected</p>
          </div>
        )}

        {/* Step 2: Spectrum sliders */}
        {step === 2 && (
          <div className="fade-up">
            <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 8 }}>Set the dials</h2>
            <p style={{ color: '#666', fontSize: 14, marginBottom: 28 }}>Where does your workplace sit on each spectrum?</p>
            {SPECTRUMS.map(s => (
              <div key={s.id} style={{ marginBottom: 28 }}>
                <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 8, color: spectrums[s.id] !== undefined ? '#CBFD50' : '#fff' }}>{s.label}</div>
                <input type="range" min="0" max="10" step="1"
                  value={spectrums[s.id] ?? ''}
                  onChange={e => setSpectrums(prev => ({ ...prev, [s.id]: parseInt(e.target.value) }))}
                  style={{ width: '100%' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                  <span style={{ fontSize: 11, color: '#555' }}>{s.left}</span>
                  <span style={{ fontSize: 11, color: '#555' }}>{s.right}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Step 3: Desk items */}
        {step === 3 && (
          <div className="fade-up">
            <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 8 }}>Build your ideal workspace</h2>
            <p style={{ color: '#666', fontSize: 14, marginBottom: 24 }}>Choose exactly 5 items that would make the biggest difference.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {DESK_ITEMS.map(d => (
                <button key={d.id} onClick={() => toggleDeskItem(d.id)}
                  style={{
                    background: deskItems.includes(d.id) ? '#1a2a0a' : '#111',
                    border: deskItems.includes(d.id) ? '2px solid #CBFD50' : '1px solid #222',
                    borderRadius: 10, padding: '14px 8px', textAlign: 'center', cursor: 'pointer',
                    color: '#fff', fontSize: 12, fontWeight: 500, transition: 'all 0.2s',
                    opacity: !deskItems.includes(d.id) && deskItems.length >= 5 ? 0.3 : 1,
                  }}>
                  {d.label}
                </button>
              ))}
            </div>
            <p style={{ color: '#444', fontSize: 12, marginTop: 12 }}>{deskItems.length}/5 selected</p>
          </div>
        )}

        {/* Step 4: Reactions */}
        {step === 4 && (
          <div className="fade-up">
            <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 8 }}>How does your workspace make you feel?</h2>
            <p style={{ color: '#666', fontSize: 14, marginBottom: 24 }}>Select exactly 3 reactions.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {REACTIONS.map(r => (
                <button key={r.id} onClick={() => toggleReaction(r.id)}
                  style={{
                    background: reactions.includes(r.id) ? (r.positive ? '#0a2a1a' : '#2a0a0a') : '#111',
                    border: reactions.includes(r.id) ? `2px solid ${r.positive ? '#10B981' : '#EF4444'}` : '1px solid #222',
                    borderRadius: 10, padding: '14px 8px', textAlign: 'center', cursor: 'pointer',
                    color: '#fff', fontSize: 13, fontWeight: 500, transition: 'all 0.2s',
                    opacity: !reactions.includes(r.id) && reactions.length >= 3 ? 0.3 : 1,
                  }}>
                  {r.label}
                </button>
              ))}
            </div>
            <p style={{ color: '#444', fontSize: 12, marginTop: 12 }}>{reactions.length}/3 selected</p>
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 40, paddingBottom: 40 }}>
          {step > 0 && (
            <button onClick={() => setStep(s => s - 1)}
              style={{ background: 'none', border: '1px solid #333', color: '#999', padding: '12px 24px', borderRadius: 100, cursor: 'pointer', fontFamily: "'Poppins'", fontSize: 14 }}>
              Back
            </button>
          )}
          <div style={{ flex: 1 }} />
          {step < 4 ? (
            <button onClick={() => setStep(s => s + 1)}
              disabled={!canAdvance()}
              style={{
                background: canAdvance() ? '#CBFD50' : '#333', color: canAdvance() ? '#000' : '#666',
                border: 'none', padding: '12px 32px', borderRadius: 100, cursor: canAdvance() ? 'pointer' : 'not-allowed',
                fontFamily: "'Poppins'", fontSize: 14, fontWeight: 600, transition: 'all 0.3s',
              }}>
              {step === 0 ? "Let's go" : 'Continue'}
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={!canAdvance() || submitting}
              style={{
                background: '#CBFD50', color: '#000', border: 'none', padding: '12px 32px',
                borderRadius: 100, cursor: 'pointer', fontFamily: "'Poppins'", fontSize: 14, fontWeight: 600,
              }}>
              {submitting ? 'Saving...' : 'Complete Chapter 1 →'}
            </button>
          )}
        </div>

      </div>
    </div>
  )
}
