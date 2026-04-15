import Link from "next/link"

export default function Home() {
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(170deg,#FEFCE8 0%,#FEF9C3 8%,#FFFFFF 20%,#F0FDFA 40%,#FFFFFF 55%,#EFF6FF 70%,#FFFFFF 85%,#FDF4FF 100%)",fontFamily:"'Nunito',sans-serif",position:"relative"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');body{margin:0}`}</style>
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"16px 0",background:"rgba(255,255,255,0.8)",backdropFilter:"blur(16px)",borderBottom:"1px solid #F1F5F9"}}>
        <div style={{maxWidth:1100,margin:"0 auto",padding:"0 40px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:15,fontWeight:800,color:"white",background:"linear-gradient(135deg,#A3E635,#34D399)",padding:"4px 10px",borderRadius:8,boxShadow:"0 4px 12px rgba(52,211,153,0.2)"}}>e</span>
            <span style={{fontSize:16,fontWeight:700,color:"#0F172A",letterSpacing:"-0.02em"}}>element</span>
          </div>
          <Link href="/chapter?token=demo" style={{fontSize:14,fontWeight:700,padding:"10px 28px",background:"linear-gradient(135deg,#A3E635,#34D399)",color:"white",borderRadius:50,textDecoration:"none",boxShadow:"0 4px 16px rgba(52,211,153,0.25)",textShadow:"0 1px 2px rgba(0,0,0,0.1)"}}>Launch diagnostic</Link>
        </div>
      </nav>

      <section style={{paddingTop:160,maxWidth:1100,margin:"0 auto",padding:"160px 40px 80px"}}>
        <div style={{fontSize:13,fontWeight:700,color:"#059669",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:20}}>Culture articulation platform</div>
        <h1 style={{fontSize:"clamp(36px,5.5vw,60px)",fontWeight:300,lineHeight:1.1,letterSpacing:"-0.03em",color:"#0F172A",marginBottom:24,maxWidth:680}}>
          Your culture has a voice.<br/><span style={{fontWeight:800,background:"linear-gradient(135deg,#059669,#0D9488,#0891B2)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Give it words.</span>
        </h1>
        <p style={{fontSize:18,color:"#64748B",maxWidth:520,marginBottom:40,lineHeight:1.8}}>CultureLens helps business leaders express their organisational culture — the pride, the tensions, the origins — and see it reflected as a living portrait they own.</p>
        <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
          <Link href="/chapter?token=demo" style={{display:"inline-flex",fontSize:15,fontWeight:700,padding:"16px 40px",background:"linear-gradient(135deg,#A3E635,#34D399,#2DD4BF)",color:"white",borderRadius:50,textDecoration:"none",boxShadow:"0 8px 24px rgba(52,211,153,0.3)",textShadow:"0 1px 2px rgba(0,0,0,0.1)"}}>Express your culture</Link>
        </div>
      </section>

      <div style={{borderTop:"1px solid #F1F5F9",borderBottom:"1px solid #F1F5F9",background:"rgba(255,255,255,0.6)",backdropFilter:"blur(8px)"}}>
        <div style={{maxWidth:1100,margin:"0 auto",padding:"0 40px",display:"grid",gridTemplateColumns:"repeat(4,1fr)"}}>
          {[["6","Phases"],["50","Minutes"],["7","Diagnostic layers"],["250+","Projects benchmarked"]].map(([n,l],i)=>(
            <div key={i} style={{textAlign:"center",padding:"28px 0",borderRight:i<3?"1px solid #F1F5F9":"none"}}>
              <span style={{fontSize:"clamp(28px,3vw,40px)",fontWeight:800,background:"linear-gradient(135deg,#059669,#0891B2)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",display:"block"}}>{n}</span>
              <span style={{fontSize:13,color:"#94A3B8",fontWeight:500}}>{l}</span>
            </div>
          ))}
        </div>
      </div>

      <section style={{padding:"80px 0"}}>
        <div style={{maxWidth:1100,margin:"0 auto",padding:"0 40px"}}>
          <div style={{fontSize:13,fontWeight:700,color:"#059669",letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:12}}>The experience</div>
          <h2 style={{fontSize:"clamp(24px,3.5vw,40px)",fontWeight:700,letterSpacing:"-0.02em",color:"#0F172A",marginBottom:48}}>Not a survey. A structured articulation.</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
            {[
              ["#059669","Identity + emotion","Express what this organisation IS — the pride, the fears, the non-negotiables."],
              ["#2563EB","Operating model","How decisions happen, how information flows, how crisis reveals truth."],
              ["#D97706","Strategic dilemmas","Four branching scenarios with no right answer. Your choices reveal assumptions."],
              ["#7C3AED","Values + origins","What values actually operate — not the poster. Where they came from."],
              ["#E11D48","Story + legacy","The founding legend. The critical incidents. The drift from origins."],
              ["#0891B2","Honesty + safety","Can people speak truth to power? Third-person scenarios that bypass the paradox."],
            ].map(([c,t,desc],i)=>(
              <div key={i} style={{background:"white",borderRadius:24,padding:"28px 24px",boxShadow:"0 4px 24px rgba(0,0,0,0.04)",border:"1px solid #F1F5F9"}}>
                <div style={{fontSize:12,fontWeight:700,color:c,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:8}}>Phase {i+1}</div>
                <div style={{fontSize:17,fontWeight:700,color:"#0F172A",marginBottom:6}}>{t}</div>
                <div style={{fontSize:14,color:"#64748B",lineHeight:1.7}}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer style={{padding:"32px 0",borderTop:"1px solid #F1F5F9",textAlign:"center"}}>
        <p style={{fontSize:13,color:"#94A3B8"}}>
          <span style={{color:"white",background:"linear-gradient(135deg,#A3E635,#34D399)",padding:"2px 6px",borderRadius:4,fontSize:11,fontWeight:700,marginRight:6}}>e</span>
          element | Culture Articulation Platform | elementmea.com
        </p>
      </footer>
    </div>
  )
}
