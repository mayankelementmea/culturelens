'use client'
import { useState } from 'react'
import { S } from './styles'

const SCENARIOS = [
  { id:'quality_speed', label:'Scenario 1',
    scene:'A major deliverable to a strategic client has a significant quality issue discovered at the last moment. The project lead is in a board presentation. The client expects delivery tomorrow morning. You have authority to act.',
    q:'What happens next in this organisation?',
    opts:[
      {id:'a',t:'Escalate immediately — interrupt the board presentation to flag the issue.'},
      {id:'b',t:'Assemble a team to fix it overnight without involving the project lead.'},
      {id:'c',t:'Ship as-is with a remediation plan — the client relationship is more important than perfection.'},
      {id:'d',t:'Push the deadline. Inform the client of a delay to ensure quality.'},
    ],
    followUp:'Three months later, a similar situation arises in a different team with a different project lead. How is it handled?',
  },
  { id:'innovation_control', label:'Scenario 2',
    scene:'A mid-level team has developed a prototype solution that could open a significant new market segment. It was not in the annual plan. It would require redirecting resources from an existing priority. They present it to the leadership team with initial validation data.',
    q:'What happens to this initiative in this organisation?',
    opts:[
      {id:'a',t:'"Interesting but not in the plan. We\'ll revisit next cycle." It gets killed.'},
      {id:'b',t:'It gets a small pilot budget with tight milestones. Prove it works first.'},
      {id:'c',t:'Leadership gets excited and redirects significant resources immediately.'},
      {id:'d',t:'It depends entirely on who presented it and which leader they have access to.'},
    ],
    followUp:'Regardless of the outcome, what happens to the team that brought the idea?',
    followOpts:[
      {id:'a',t:'Celebrated for initiative regardless of outcome.'},
      {id:'b',t:'Acknowledged but told to focus on core work.'},
      {id:'c',t:'Quietly sidelined — they stepped out of their lane.'},
      {id:'d',t:'It depends on whether the idea succeeded or failed.'},
    ],
  },
  { id:'loyalty_performance', label:'Scenario 3',
    scene:'A long-serving department head — someone the founder personally hired 15 years ago — is no longer performing at the level the role demands. The evidence is clear across multiple data points. Several direct reports have raised concerns privately. The individual is widely respected and personally connected to the founding team.',
    q:'What actually happens in this organisation?',
    opts:[
      {id:'a',t:'They are protected. Loyalty to long-serving people overrides performance data.'},
      {id:'b',t:'They are given a clear development plan with milestones and consequences.'},
      {id:'c',t:'They are quietly moved to a less critical role — same title, same compensation.'},
      {id:'d',t:'They are managed out with dignity, regardless of tenure and relationship.'},
    ],
    followUp:'What signal does this send to high performers elsewhere in the organisation?',
    followOpts:[
      {id:'a',t:'"Loyalty is valued here — which is reassuring."'},
      {id:'b',t:'"Performance standards are real — which is motivating."'},
      {id:'c',t:'"Nothing will change no matter how clear the evidence — which is demoralising."'},
      {id:'d',t:'"People don\'t notice or discuss it — it happens quietly."'},
    ],
  },
  { id:'crossfunc_conflict', label:'Scenario 4',
    scene:'Two business units are in fundamental disagreement about strategic direction for a shared market. Both leaders have credible data supporting their position. The conflict is escalating — their teams are starting to take sides. A time-sensitive market opportunity is being missed.',
    q:'How does this actually get resolved here?',
    opts:[
      {id:'a',t:'The CEO or founder steps in and makes the call. End of discussion.'},
      {id:'b',t:'An independent review is commissioned — data wins, regardless of who presented it.'},
      {id:'c',t:'A compromise is brokered. Both sides give ground to maintain the relationship.'},
      {id:'d',t:'It festers unresolved. One side eventually gives up or works around the other.'},
    ],
    followUp:'After the resolution, what happens to the relationship between the two leaders?',
    followOpts:[
      {id:'a',t:'Strengthened — they respect each other more for navigating it.'},
      {id:'b',t:'Unchanged — treated as business, not personal.'},
      {id:'c',t:'Damaged — lasting tension and reduced collaboration.'},
      {id:'d',t:'One of them eventually leaves the organisation.'},
    ],
  },
]

const ALLOC_CATS = [
  'Operational execution and delivery',
  'Strategic planning and future positioning',
  'Client and market development',
  'People development and organisational capability',
  'Innovation and transformation',
  'Governance, compliance, and risk management',
  'Internal politics and relationship management',
  'Crisis management and firefighting',
]

export default function Chapter2({ token, onComplete }) {
  const [step, setStep] = useState(0) // 0=intro, 1-4=scenarios(dp1), 5-8=scenarios(dp2), 9=allocation
  const [answers, setAnswers] = useState({})
  const [alloc, setAlloc] = useState(ALLOC_CATS.map(()=>12))
  const [submitting, setSubmitting] = useState(false)

  const totalSteps = 10 // intro + 4 dp1 + 4 dp2 + allocation
  const isIntro = step===0
  const isAlloc = step===9
  const scenIdx = step>=1 && step<=4 ? step-1 : step>=5 && step<=8 ? step-5 : -1
  const isDP2 = step>=5 && step<=8
  const scen = scenIdx>=0 ? SCENARIOS[scenIdx] : null

  const canGo = () => {
    if(isIntro) return true
    if(isAlloc) return true
    if(scen) {
      const key = isDP2 ? scen.id+'_dp2' : scen.id
      return !!answers[key]
    }
    return false
  }

  const submit = async () => {
    setSubmitting(true)
    try {
      const data = {...answers, resource_allocation: ALLOC_CATS.reduce((o,c,i)=>({...o,[c]:alloc[i]}),{})}
      const r = await fetch('/api/submit',{method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({token,chapter:'ch2',data})})
      const result = await r.json()
      if(result.success) onComplete?.(result)
    } catch(e){console.error(e)}
    setSubmitting(false)
  }

  const allocTotal = alloc.reduce((s,v)=>s+v,0)

  return (
    <div style={S.page}><div style={S.inner}>
      <div style={S.progress}>{Array.from({length:totalSteps},(_,i)=><div key={i} style={S.bar(i<=step)}/>)}</div>

      {isIntro && <div>
        <p style={S.label}>Module 2 of 6</p>
        <h2 style={{...S.h2,fontSize:26}}>Strategic decision patterns</h2>
        <p style={S.body}>Four organisational dilemmas with no right answer. Each presents a genuine strategic tension. Your choices reveal the operating assumptions — about quality, innovation, loyalty, and authority — that shape how this organisation actually functions under pressure.</p>
        <p style={S.body}>Each scenario has two decision points. The pattern across all four produces a diagnostic fingerprint.</p>
        <div style={S.note}>Estimated time: 10 minutes.</div>
      </div>}

      {scen && !isDP2 && <div>
        <p style={S.label}>{scen.label}: Decision point 1</p>
        <div style={S.scene}><div style={S.sceneLabel}>Situation</div>{scen.scene}</div>
        <h2 style={S.h2}>{scen.q}</h2>
        <div style={{marginTop:16}}>
          {scen.opts.map(o=>(
            <button key={o.id} onClick={()=>setAnswers(p=>({...p,[scen.id]:o.id}))} style={S.opt(answers[scen.id]===o.id)}>{o.t}</button>
          ))}
        </div>
      </div>}

      {scen && isDP2 && <div>
        <p style={S.label}>{scen.label}: Decision point 2</p>
        <div style={{...S.scene,background:'#FAFAF8'}}>
          <div style={S.sceneLabel}>Following the situation above</div>
          {scen.followUp}
        </div>
        <h2 style={S.h2}>What happens?</h2>
        <div style={{marginTop:16}}>
          {(scen.followOpts||scen.opts).map(o=>(
            <button key={o.id} onClick={()=>setAnswers(p=>({...p,[scen.id+'_dp2']:o.id}))} style={S.opt(answers[scen.id+'_dp2']===o.id)}>{o.t}</button>
          ))}
        </div>
      </div>}

      {isAlloc && <div>
        <p style={S.label}>Resource deployment analysis</p>
        <h2 style={S.h2}>How is leadership attention and energy actually distributed?</h2>
        <p style={S.sub}>Not what the strategy document says — how time, attention, and resources are actually allocated. Adjust the sliders to reflect reality. Total should be close to 100%.</p>
        {ALLOC_CATS.map((cat,i)=>(
          <div key={i} style={{marginBottom:16}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
              <span style={{fontSize:13,color:'#3D3A36',fontWeight:500}}>{cat}</span>
              <span style={{fontSize:13,color:'#2C5282',fontWeight:500}}>{alloc[i]}%</span>
            </div>
            <input type="range" min="0" max="60" step="1" value={alloc[i]}
              onChange={e=>{const v=[...alloc];v[i]=parseInt(e.target.value);setAlloc(v)}} style={{width:'100%'}}/>
          </div>
        ))}
        <div style={{textAlign:'center',padding:'12px 0',fontSize:14,fontWeight:500,
          color: Math.abs(allocTotal-100)<15?'#0D9488':'#DC2626'}}>
          Total: {allocTotal}%{Math.abs(allocTotal-100)<15?' ':'  — adjust to be closer to 100%'}
        </div>
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
