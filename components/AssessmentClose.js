'use client'
import { useState } from 'react'
import { S } from './styles'

export default function AssessmentClose({ token }) {
  const [referral, setReferral] = useState(null)
  const [refName, setRefName] = useState('')
  const [refRole, setRefRole] = useState('')
  const [comfort, setComfort] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const submitRef = async () => {
    try {
      await fetch('/api/submit',{method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({token,chapter:'referral',data:{choice:referral,name:refName,role:refRole,comfortable_introducing:comfort}})})
    } catch(e){}
    setSubmitted(true)
  }

  return (
    <div style={S.page}><div style={{...S.inner,maxWidth:600}}>
      <div style={{textAlign:'center',padding:'40px 0 32px'}}>
        <div style={{width:48,height:48,borderRadius:'50%',background:'#E1F5EE',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px'}}>
          <span style={{color:'#0D9488',fontSize:22,fontWeight:600}}>✓</span>
        </div>
        <h2 style={{...S.h2,fontSize:24,textAlign:'center'}}>Assessment complete</h2>
        <p style={{fontSize:15,color:'#9B9690',lineHeight:1.7,maxWidth:440,margin:'0 auto'}}>
          Thank you for completing the CultureLens diagnostic. Your responses have been recorded and will be processed as part of the organisational analysis. Individual responses are never shared — only aggregate patterns are reported.
        </p>
      </div>

      <div style={{background:'#fff',border:'1px solid #E8E5E0',borderRadius:12,padding:'24px',marginTop:16}}>
        <p style={{fontSize:15,fontWeight:500,color:'#0A0A0A',marginBottom:8}}>Strengthen the diagnostic</p>
        <p style={{fontSize:14,color:'#6B6660',lineHeight:1.7,marginBottom:16}}>
          Culture diagnostics produce their most accurate and actionable findings when they capture multiple perspectives. A single perspective — no matter how senior — captures one view of a complex system. When multiple people across different roles, departments, and tenure levels complete this assessment, the convergence engine identifies patterns no individual would see alone.
        </p>
        <p style={{fontSize:14,color:'#2C5282',fontWeight:500,marginBottom:4}}>
          Contradictions between perspectives are often the most valuable findings.
        </p>
        <p style={{fontSize:13,color:'#9B9690',lineHeight:1.6,marginBottom:20}}>
          They reveal the gaps between how the culture is experienced at different levels — which is precisely what leadership needs to understand.
        </p>

        {!submitted ? (
          <div>
            <p style={{fontSize:14,fontWeight:500,color:'#0A0A0A',marginBottom:12}}>
              Is there someone whose perspective would strengthen this diagnostic?
            </p>
            <button onClick={()=>setReferral('yes')} style={{...S.opt(referral==='yes'),marginBottom:6}}>
              Yes — I believe additional perspectives would strengthen the findings.
            </button>
            <button onClick={()=>setReferral('sufficient')} style={{...S.opt(referral==='sufficient'),marginBottom:6}}>
              The right people are already participating.
            </button>
            <button onClick={()=>setReferral('no')} style={{...S.opt(referral==='no'),marginBottom:6}}>
              I'd prefer not to suggest anyone.
            </button>

            {referral==='yes' && (
              <div style={{marginTop:16,padding:'16px',background:'#FAFAF8',borderRadius:8,border:'1px solid #E8E5E0'}}>
                <p style={{fontSize:12,color:'#9B9690',marginBottom:12}}>Optional — this goes to the element consultant, not into the diagnostic engine.</p>
                <input style={{...S.input,marginBottom:8}} placeholder="Name (optional)" value={refName} onChange={e=>setRefName(e.target.value)}/>
                <input style={{...S.input,marginBottom:8}} placeholder="Role / department (optional)" value={refRole} onChange={e=>setRefRole(e.target.value)}/>
                <label style={{display:'flex',gap:8,alignItems:'center',fontSize:13,color:'#6B6660',cursor:'pointer'}}>
                  <input type="checkbox" checked={comfort} onChange={e=>setComfort(e.target.checked)}/>
                  I would be comfortable introducing them to this assessment
                </label>
              </div>
            )}

            {referral && (
              <div style={{marginTop:16,textAlign:'center'}}>
                <button onClick={submitRef} style={S.btnP(true)}>Submit and close</button>
              </div>
            )}
          </div>
        ) : (
          <div style={{textAlign:'center',padding:'16px 0'}}>
            <p style={{fontSize:14,color:'#0D9488',fontWeight:500}}>Thank you. Your feedback has been recorded.</p>
            <p style={{fontSize:13,color:'#9B9690',marginTop:8}}>The Culture Truth Map will be delivered within 10 business days of assessment close.</p>
          </div>
        )}
      </div>
    </div></div>
  )
}
