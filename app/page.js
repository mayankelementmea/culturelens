import Link from "next/link"

export default function Home() {
  return (
    <div style={{minHeight:'100vh',position:'relative',zIndex:1,fontFamily:"'Space Grotesk',sans-serif"}}>
      {/* Nav */}
      <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:100,padding:'16px 0',background:'rgba(11,13,17,0.85)',backdropFilter:'blur(16px)',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
        <div style={{maxWidth:1100,margin:'0 auto',padding:'0 40px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <Link href="/" style={{fontFamily:"'Space Grotesk'",fontSize:18,fontWeight:600,color:'#F0EDE8',letterSpacing:'-0.02em',textDecoration:'none',display:'flex',alignItems:'center',gap:4}}>
            <span style={{color:'#0B0D11',background:'#CBFD50',padding:'2px 6px',borderRadius:4,fontSize:15}}>e</span>lement
          </Link>
          <div style={{display:'flex',gap:32,alignItems:'center'}}>
            <span style={{fontSize:13,color:'#5A5A5E'}}>CultureLens</span>
            <Link href="/chapter?token=demo" style={{fontSize:13,fontWeight:500,padding:'8px 24px',background:'#CBFD50',color:'#0B0D11',borderRadius:8,textDecoration:'none',transition:'all 0.2s',boxShadow:'0 0 20px rgba(203,253,80,0.1)'}}>Launch diagnostic</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{paddingTop:160,paddingBottom:80,maxWidth:1100,margin:'0 auto',padding:'160px 40px 80px'}}>
        <p style={{fontSize:12,fontWeight:500,letterSpacing:'0.15em',textTransform:'uppercase',color:'#CBFD50',marginBottom:20,fontFamily:"'Space Grotesk'"}}>Culture articulation platform</p>
        <h1 style={{fontSize:'clamp(36px,5.5vw,64px)',fontWeight:600,lineHeight:1.1,letterSpacing:'-0.03em',color:'#F0EDE8',marginBottom:24,maxWidth:720,fontFamily:"'Space Grotesk'"}}>Your culture has a voice.<br/><span style={{color:'#CBFD50'}}>Give it words.</span></h1>
        <p style={{fontSize:18,color:'#8B8B8E',maxWidth:520,marginBottom:36,lineHeight:1.7,fontFamily:"'Inter'"}}>CultureLens helps business leaders express their organisational culture — the pride, the tensions, the origins, the identity — and see it reflected back as a living, interactive portrait they own.</p>
        <div style={{display:'flex',gap:12}}>
          <Link href="/chapter?token=demo" style={{display:'inline-flex',alignItems:'center',gap:8,fontFamily:"'Space Grotesk'",fontSize:15,fontWeight:600,padding:'16px 36px',background:'#CBFD50',color:'#0B0D11',borderRadius:10,textDecoration:'none',boxShadow:'0 0 30px rgba(203,253,80,0.15)',transition:'all 0.3s'}}>Express your culture</Link>
          <Link href="#how" style={{display:'inline-flex',alignItems:'center',gap:8,fontFamily:"'Space Grotesk'",fontSize:15,fontWeight:500,padding:'16px 32px',background:'transparent',color:'#8B8B8E',border:'1px solid rgba(255,255,255,0.08)',borderRadius:10,textDecoration:'none'}}>See how it works</Link>
        </div>
      </section>

      {/* Stats */}
      <div style={{borderTop:'1px solid rgba(255,255,255,0.04)',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
        <div style={{maxWidth:1100,margin:'0 auto',padding:'0 40px',display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:0}}>
          {[['6','Articulation phases'],['50','Minutes to clarity'],['7','Diagnostic layers'],['250+','Projects benchmarked']].map(([n,l],i)=>(
            <div key={i} style={{textAlign:'center',padding:'28px 0',borderRight:i<3?'1px solid rgba(255,255,255,0.04)':'none'}}>
              <span style={{fontFamily:"'Space Grotesk'",fontSize:'clamp(28px,3vw,40px)',fontWeight:600,color:'#CBFD50',display:'block',lineHeight:1.2}}>{n}</span>
              <span style={{fontSize:12,color:'#5A5A5E'}}>{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <section id="how" style={{padding:'80px 0'}}>
        <div style={{maxWidth:1100,margin:'0 auto',padding:'0 40px'}}>
          <p style={{fontSize:12,fontWeight:500,letterSpacing:'0.12em',textTransform:'uppercase',color:'#CBFD50',marginBottom:12}}>The experience</p>
          <h2 style={{fontFamily:"'Space Grotesk'",fontSize:'clamp(24px,3.5vw,40px)',fontWeight:600,letterSpacing:'-0.02em',color:'#F0EDE8',marginBottom:12}}>Not a survey. A structured articulation.</h2>
          <p style={{fontSize:16,color:'#5A5A5E',marginBottom:48,maxWidth:540}}>Six phases. Split screen. Your culture builds visually as you answer. Walk away with an interactive portrait you can share, adjust, and use.</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:1,background:'rgba(255,255,255,0.04)'}}>
            {[
              ['Identity + emotion','Express what this organisation IS — the pride, the fears, the non-negotiables. Find your culture voice before any structural analysis.'],
              ['Operating model','How decisions happen, how information flows, how crisis reveals the truth. Seven questions that map the machinery beneath the surface.'],
              ['Strategic dilemmas','Four branching scenarios with no right answer. Quality vs speed. Innovation vs control. Loyalty vs performance. Your choices reveal the operating assumptions.'],
              ['Values + origins','What values actually operate here — not the poster. Where they came from. The cultural entropy score. The gap between today and needed.'],
              ['Story + legacy','The founding legend. The critical incidents. The drift from origins to present. Stories encode assumptions the teller doesn\'t know they\'re expressing.'],
              ['Honesty + safety','Can people speak truth to power here? Third-person scenarios that bypass the direct-question paradox. The enabling condition for everything else.'],
            ].map(([title,desc],i)=>(
              <div key={i} style={{background:'#12151B',padding:'clamp(20px,3vw,36px)'}}>
                <div style={{fontSize:11,fontWeight:500,color:'#CBFD50',marginBottom:8,fontFamily:"'Space Grotesk'"}}>Phase {i+1}</div>
                <div style={{fontFamily:"'Space Grotesk'",fontSize:16,fontWeight:500,color:'#F0EDE8',marginBottom:6}}>{title}</div>
                <div style={{fontSize:13,color:'#5A5A5E',lineHeight:1.6}}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The output */}
      <section style={{padding:'80px 0',borderTop:'1px solid rgba(255,255,255,0.04)'}}>
        <div style={{maxWidth:720,margin:'0 auto',padding:'0 40px',textAlign:'center'}}>
          <p style={{fontSize:12,fontWeight:500,letterSpacing:'0.12em',textTransform:'uppercase',color:'#CBFD50',marginBottom:12}}>The output</p>
          <h2 style={{fontFamily:"'Space Grotesk'",fontSize:'clamp(24px,3.5vw,36px)',fontWeight:600,letterSpacing:'-0.02em',color:'#F0EDE8',marginBottom:16}}>Your Culture Canvas</h2>
          <p style={{fontSize:16,color:'#5A5A5E',marginBottom:36,lineHeight:1.7}}>An interactive portrait of your organisation's culture. Identity, pride, boundaries, operating model, values, origins, gaps, emotional signature — all in one living visualisation. Click any element to refine. Share the link. Use it in board meetings.</p>
          <Link href="/chapter?token=demo" style={{display:'inline-flex',alignItems:'center',gap:8,fontFamily:"'Space Grotesk'",fontSize:15,fontWeight:600,padding:'16px 36px',background:'#CBFD50',color:'#0B0D11',borderRadius:10,textDecoration:'none',boxShadow:'0 0 30px rgba(203,253,80,0.15)'}}>Build your canvas</Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{padding:'32px 0',borderTop:'1px solid rgba(255,255,255,0.04)',textAlign:'center'}}>
        <p style={{fontSize:12,color:'#5A5A5E'}}>
          <span style={{color:'#0B0D11',background:'#CBFD50',padding:'1px 4px',borderRadius:3,marginRight:4,fontSize:10}}>e</span>
          lement | Culture Articulation Platform | elementmea.com
        </p>
      </footer>
    </div>
  )
}
