import Link from "next/link"

export default function Home() {
  const I="#4F46E5",Lm="#C4B5FD",Ls="#E8E4FF",N="#1E1B4B",Ns="#4C4885",S="#64748B",W="#FFFFFF"
  return (
    <div style={{minHeight:"100vh",background:"#F0EDFF",fontFamily:"'Poppins',sans-serif",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:-120,right:-80,width:400,height:400,borderRadius:"50%",background:`radial-gradient(circle,${Lm}44 0%,transparent 70%)`,pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:-100,left:-60,width:350,height:350,borderRadius:"50%",background:`radial-gradient(circle,${I}18 0%,transparent 70%)`,pointerEvents:"none"}}/>

      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"14px 0",background:"rgba(255,255,255,0.85)",backdropFilter:"blur(16px)",borderBottom:`1px solid ${Ls}`}}>
        <div style={{maxWidth:1100,margin:"0 auto",padding:"0 40px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:14,fontWeight:800,color:W,background:I,padding:"4px 10px",borderRadius:8,boxShadow:`0 4px 12px ${I}30`}}>e</span>
            <span style={{fontSize:16,fontWeight:700,color:N,letterSpacing:"-0.02em"}}>element</span>
          </div>
          <Link href="/chapter?token=demo" style={{fontSize:14,fontWeight:600,padding:"10px 28px",background:I,color:W,borderRadius:50,textDecoration:"none",boxShadow:`0 4px 16px ${I}30`}}>Launch diagnostic</Link>
        </div>
      </nav>

      <section style={{paddingTop:160,maxWidth:1100,margin:"0 auto",padding:"160px 40px 80px",position:"relative"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:6,padding:"6px 14px",borderRadius:100,background:W,border:`1px solid ${Ls}`,fontSize:12,fontWeight:500,color:I,marginBottom:24,boxShadow:`0 2px 8px ${I}0A`}}>
          <span style={{fontSize:14}}>🔮</span> Culture articulation platform
        </div>
        <h1 style={{fontSize:"clamp(36px,5.5vw,60px)",fontWeight:700,lineHeight:1.08,letterSpacing:"-0.03em",color:N,marginBottom:24,maxWidth:640}}>
          See your culture<br/><span style={{background:`linear-gradient(135deg,${I},${Lm})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>before it sees you.</span>
        </h1>
        <p style={{fontSize:18,color:Ns,maxWidth:500,marginBottom:40,lineHeight:1.75}}>CultureLens maps what surveys miss — the hidden patterns in how your people work, decide, grow, and trust. In 45 minutes, see what took consultants weeks.</p>
        <Link href="/chapter?token=demo" style={{display:"inline-flex",fontSize:15,fontWeight:600,padding:"16px 40px",background:I,color:W,borderRadius:50,textDecoration:"none",boxShadow:`0 8px 28px ${I}30`}}>Begin the diagnostic →</Link>
      </section>

      <div style={{borderTop:`1px solid ${Ls}`,borderBottom:`1px solid ${Ls}`,background:"rgba(255,255,255,0.65)",backdropFilter:"blur(8px)"}}>
        <div style={{maxWidth:1100,margin:"0 auto",padding:"0 40px",display:"grid",gridTemplateColumns:"repeat(4,1fr)"}}>
          {[["6","Phases"],["45","Minutes"],["7","Diagnostic layers"],["250+","Projects benchmarked"]].map(([n,l],i)=>(
            <div key={i} style={{textAlign:"center",padding:"28px 0",borderRight:i<3?`1px solid ${Ls}`:"none"}}>
              <span style={{fontSize:"clamp(28px,3vw,40px)",fontWeight:700,background:`linear-gradient(135deg,${I},${Lm})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",display:"block"}}>{n}</span>
              <span style={{fontSize:13,color:S,fontWeight:500}}>{l}</span>
            </div>
          ))}
        </div>
      </div>

      <section style={{padding:"80px 0"}}>
        <div style={{maxWidth:1100,margin:"0 auto",padding:"0 40px"}}>
          <div style={{fontSize:12,fontWeight:600,color:I,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:12}}>The experience</div>
          <h2 style={{fontSize:"clamp(24px,3.5vw,40px)",fontWeight:700,letterSpacing:"-0.02em",color:N,marginBottom:48}}>Not a survey. A structured articulation.</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
            {[
              [I,"Identity + emotion","Express what this organisation IS — the pride, the fears, the non-negotiables."],
              ["#7C3AED","Operating model","How decisions happen, how information flows, how crisis reveals truth."],
              ["#F59E0B","Strategic dilemmas","Four branching scenarios with no right answer. Your choices reveal assumptions."],
              ["#E704CA","Values + origins","What values actually operate — not the poster. Where they came from."],
              ["#2563EB","Story + legacy","The founding legend. The critical incidents. The drift from origins."],
              ["#10B981","Honesty + safety","Can people speak truth to power? Third-person scenarios that bypass the paradox."],
            ].map(([c,t,desc],i)=>(
              <div key={i} style={{background:W,borderRadius:20,padding:"28px 24px",boxShadow:`0 4px 20px ${I}08`,border:`1px solid ${Ls}`}}>
                <div style={{fontSize:11,fontWeight:600,color:c,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:8}}>Phase {i+1}</div>
                <div style={{fontSize:17,fontWeight:600,color:N,marginBottom:6}}>{t}</div>
                <div style={{fontSize:14,color:Ns,lineHeight:1.7}}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer style={{padding:"32px 0",borderTop:`1px solid ${Ls}`,textAlign:"center"}}>
        <p style={{fontSize:13,color:S}}>
          <span style={{color:W,background:I,padding:"2px 6px",borderRadius:4,fontSize:11,fontWeight:700,marginRight:6}}>e</span>
          element | Culture Articulation Platform | elementmea.com
        </p>
      </footer>
    </div>
  )
}
