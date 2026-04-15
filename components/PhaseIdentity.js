'use client'
import { useState } from 'react'
import { S } from './styles'

export default function PhaseIdentity({ onComplete, onUpdate }) {
  const [step, setStep] = useState(0)
  const [d, setD] = useState({})
  const totalSteps = 7

  const set = (key, val) => {
    const next = { ...d, [key]: val }
    setD(next)
    onUpdate?.(next)
  }

  const canGo = () => {
    if (step === 0) return true
    if (step === 1) return (d.identity_sentence || '').trim().length > 10
    if (step === 2) return (d.proud_of || '').trim().length > 10
    if (step === 3) return (d.never_compromise || '').trim().length > 5
    if (step === 4) return (d.keeps_up_at_night || '').trim().length > 10
    if (step === 5) return (d.never_become || '').trim().length > 5
    if (step === 6) return (d.emotion_words || []).length === 3
    return false
  }

  const emotionOptions = [
    'Resilient','Proud','Loyal','Ambitious','Anxious','Energised',
    'Frustrated','Cautious','Connected','Stagnant','Driven','Warm',
    'Pressured','Innovative','Bureaucratic','Caring','Competitive','Uncertain',
    'Trusting','Siloed','Entrepreneurial','Comfortable','Stretched','United'
  ]

  const toggleEmotion = (word) => {
    const arr = d.emotion_words || []
    if (arr.includes(word)) set('emotion_words', arr.filter(w => w !== word))
    else if (arr.length < 3) set('emotion_words', [...arr, word])
  }

  return (
    <div>
      <div style={S.progress}>{Array.from({length:totalSteps},(_,i)=><div key={i} style={S.bar(i<=step)}/>)}</div>

      {step === 0 && <div>
        <p style={S.label}>Phase 1 of 6</p>
        <h2 style={{...S.h2, fontSize:26}}>Your culture, in your words</h2>
        <p style={S.body}>Before any structural analysis, we want to understand this organisation through your eyes. How does it feel? What makes it what it is? What are you proud of — and what concerns you?</p>
        <p style={S.body}>There are no right answers. Express what you genuinely experience.</p>
        <div style={S.note}>Watch the Culture Canvas on the right begin to take shape as you answer. This is your culture being articulated.</div>
      </div>}

      {step === 1 && <div>
        <p style={S.label}>Identity</p>
        <h2 style={S.h2}>In one sentence, how would you describe this organisation's personality to someone who has never worked here?</h2>
        <p style={S.sub}>Not the elevator pitch. Not the website tagline. How would you honestly describe the character of this place?</p>
        <textarea style={{...S.textarea, fontSize:16, minHeight:80}}
          placeholder="We are..." maxLength={200}
          value={d.identity_sentence || ''} onChange={e => set('identity_sentence', e.target.value)} />
        <p style={S.count}>{(d.identity_sentence||'').length}/200</p>
      </div>}

      {step === 2 && <div>
        <p style={S.label}>Pride</p>
        <h2 style={S.h2}>What is this organisation most proud of?</h2>
        <p style={S.sub}>What would you put on a flag and carry? The thing that makes people here say "this is why I stay."</p>
        <textarea style={S.textarea} placeholder="What fills this organisation with pride..."
          maxLength={500} value={d.proud_of || ''} onChange={e => set('proud_of', e.target.value)} />
      </div>}

      {step === 3 && <div>
        <p style={S.label}>Non-negotiables</p>
        <h2 style={S.h2}>What would this organisation never compromise on — even under financial pressure?</h2>
        <p style={S.sub}>The principle, standard, or commitment that is sacred here.</p>
        <textarea style={{...S.textarea, minHeight:80}} placeholder="We would never..."
          maxLength={300} value={d.never_compromise || ''} onChange={e => set('never_compromise', e.target.value)} />
      </div>}

      {step === 4 && <div>
        <p style={S.label}>Concerns</p>
        <h2 style={S.h2}>What keeps you up at night about how this organisation operates?</h2>
        <p style={S.sub}>The frustration, the pattern you wish would change, the thing you can see but haven't been able to fix.</p>
        <textarea style={S.textarea} placeholder="What concerns me most..."
          maxLength={500} value={d.keeps_up_at_night || ''} onChange={e => set('keeps_up_at_night', e.target.value)} />
      </div>}

      {step === 5 && <div>
        <p style={S.label}>Boundaries</p>
        <h2 style={S.h2}>What would you never want this organisation to become?</h2>
        <p style={S.sub}>The anti-identity. The version of this organisation that would make you walk away.</p>
        <textarea style={{...S.textarea, minHeight:80}} placeholder="We must never become..."
          maxLength={300} value={d.never_become || ''} onChange={e => set('never_become', e.target.value)} />
      </div>}

      {step === 6 && <div>
        <p style={S.label}>Emotional temperature</p>
        <h2 style={S.h2}>Pick three words that capture the emotional reality of this organisation right now.</h2>
        <p style={S.sub}>Not aspirational. What it actually feels like to work here today.</p>
        <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:6}}>
          {emotionOptions.map(w => {
            const sel = (d.emotion_words||[]).includes(w)
            const full = (d.emotion_words||[]).length >= 3
            return <button key={w} onClick={() => toggleEmotion(w)} style={{
              background: sel ? '#F0F4F8' : '#fff',
              border: sel ? '1.5px solid #2C5282' : '1px solid #E8E5E0',
              borderRadius:6, padding:'10px 4px', textAlign:'center', cursor:'pointer',
              fontSize:12, fontWeight: sel ? 500 : 400,
              color: sel ? '#1E3A5F' : '#6B6660',
              opacity: !sel && full ? 0.3 : 1,
              transition:'all 0.15s',
            }}>{w}</button>
          })}
        </div>
        <p style={S.count}>{(d.emotion_words||[]).length} of 3 selected</p>
      </div>}

      <div style={S.nav}>
        {step > 0 && <button onClick={() => setStep(s=>s-1)} style={S.btnS}>Back</button>}
        <div style={{flex:1}} />
        {step < totalSteps - 1 ? (
          <button onClick={() => setStep(s=>s+1)} disabled={!canGo()} style={S.btnP(canGo())}>
            {step === 0 ? 'Begin' : 'Continue'}</button>
        ) : (
          <button onClick={() => onComplete?.(d)} disabled={!canGo()} style={S.btnP(canGo())}>
            Continue to operating model</button>
        )}
      </div>
    </div>
  )
}
