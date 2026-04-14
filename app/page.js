import Link from "next/link"

export default function Home() {
  const s = {
    nav: { position:'fixed',top:0,left:0,right:0,zIndex:100,padding:'16px 0',background:'rgba(248,247,244,0.92)',backdropFilter:'blur(12px)',borderBottom:'1px solid #E8E5E0' },
    navInner: { maxWidth:1100,margin:'0 auto',padding:'0 40px',display:'flex',justifyContent:'space-between',alignItems:'center' },
    logo: { fontFamily:'var(--font-h)',fontSize:18,fontWeight:600,color:'#0A0A0A',letterSpacing:'-0.02em',textDecoration:'none' },
    logoE: { color:'#CBFD50',background:'#0A0A0A',padding:'2px 6px',borderRadius:4,marginRight:2,fontSize:16 },
    navCta: { fontFamily:'var(--font-h)',fontSize:13,fontWeight:500,padding:'8px 24px',background:'#0A0A0A',color:'#fff',borderRadius:6,textDecoration:'none',transition:'all 0.2s' },
    hero: { paddingTop:140,paddingBottom:80,maxWidth:1100,margin:'0 auto',padding:'140px 40px 80px' },
    label: { fontFamily:'var(--font-h)',fontSize:11,fontWeight:500,letterSpacing:'0.12em',textTransform:'uppercase',color:'#9B9690',marginBottom:20 },
    h1: { fontFamily:'var(--font-h)',fontSize:'clamp(32px,5vw,56px)',fontWeight:600,lineHeight:1.15,letterSpacing:'-0.03em',color:'#0A0A0A',marginBottom:24,maxWidth:680 },
    sub: { fontSize:19,color:'#6B6660',maxWidth:560,marginBottom:32,lineHeight:1.7 },
    cta: { display:'inline-flex',alignItems:'center',gap:8,fontFamily:'var(--font-h)',fontSize:14,fontWeight:500,padding:'14px 32px',background:'#0A0A0A',color:'#fff',borderRadius:6,textDecoration:'none' },
    ctaSec: { display:'inline-flex',alignItems:'center',gap:8,fontFamily:'var(--font-h)',fontSize:14,fontWeight:500,padding:'14px 32px',background:'transparent',color:'#0A0A0A',border:'1px solid #D4D0C8',borderRadius:6,textDecoration:'none',marginLeft:12 },
    section: { padding:'80px 0' },
    container: { maxWidth:1100,margin:'0 auto',padding:'0 40px' },
    sectionTitle: { fontFamily:'var(--font-h)',fontSize:'clamp(24px,3.5vw,36px)',fontWeight:600,letterSpacing:'-0.02em',color:'#0A0A0A',marginBottom:12 },
    sectionSub: { fontSize:17,color:'#9B9690',marginBottom:48,maxWidth:540 },
    grid3: { display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:1,background:'#E8E5E0' },
    card: { background:'#fff',padding:'clamp(28px,4vw,44px)' },
    cardNum: { fontFamily:'var(--font-h)',fontSize:11,fontWeight:500,color:'#9B9690',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:12 },
    cardTitle: { fontFamily:'var(--font-h)',fontSize:17,fontWeight:600,color:'#0A0A0A',marginBottom:8 },
    cardText: { fontSize:15,color:'#9B9690',lineHeight:1.6 },
    divider: { height:1,background:'#E8E5E0' },
    stat: { textAlign:'center',padding:'32px 0' },
    statN: { fontFamily:'var(--font-h)',fontSize:'clamp(28px,4vw,44px)',fontWeight:600,color:'#0A0A0A',display:'block',lineHeight:1.2 },
    statL: { fontFamily:'var(--font-h)',fontSize:12,color:'#9B9690',fontWeight:400 },
    trustBg: { background:'#fff',borderTop:'1px solid #E8E5E0',borderBottom:'1px solid #E8E5E0' },
    framework: { display:'grid',gridTemplateColumns:'1fr 1fr',gap:1,background:'#E8E5E0',borderRadius:8,overflow:'hidden',marginTop:40 },
    fwCard: { background:'#fff',padding:28 },
    fwLabel: { fontFamily:'var(--font-h)',fontSize:11,fontWeight:500,color:'#0D9488',letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:6 },
    fwTitle: { fontFamily:'var(--font-h)',fontSize:15,fontWeight:600,color:'#0A0A0A',marginBottom:4 },
    fwText: { fontSize:14,color:'#9B9690',lineHeight:1.6 },
    footer: { padding:'40px 0',borderTop:'1px solid #E8E5E0',textAlign:'center',fontFamily:'var(--font-h)',fontSize:12,color:'#9B9690' },
  }

  return (
    <div style={{background:'#F8F7F4',minHeight:'100vh'}}>
      <nav style={s.nav}>
        <div style={s.navInner}>
          <Link href="/" style={s.logo}><span style={s.logoE}>e</span>lement</Link>
          <div style={{display:'flex',gap:32,alignItems:'center'}}>
            <span style={{fontFamily:'var(--font-h)',fontSize:13,color:'#9B9690'}}>CultureLens Platform</span>
            <Link href="/chapter?token=demo" style={s.navCta}>Request diagnostic</Link>
          </div>
        </div>
      </nav>

      <section style={s.hero}>
        <p style={s.label}>Organisational culture intelligence</p>
        <h1 style={s.h1}>See your culture as it actually operates — not as it claims to be</h1>
        <p style={s.sub}>CultureLens is a seven-layer diagnostic platform that maps organisational culture through behavioural data, not self-report surveys. Designed for leadership teams making strategic decisions about transformation, integration, and growth.</p>
        <div>
          <Link href="/chapter?token=demo" style={s.cta}>Launch a diagnostic</Link>
          <Link href="#methodology" style={s.ctaSec}>View methodology</Link>
        </div>
      </section>

      <div style={s.divider} />

      <section style={s.section}>
        <div style={s.container}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:40,textAlign:'center'}}>
            {[['7','Diagnostic layers'],['250+','Strategic HR projects delivered'],['<50','Minutes per participant'],['3','Extraction principles']].map(([n,l])=>(
              <div key={l} style={s.stat}><span style={s.statN}>{n}</span><span style={s.statL}>{l}</span></div>
            ))}
          </div>
        </div>
      </section>

      <div style={s.divider} />

      <section style={{...s.section,...s.trustBg}} id="methodology">
        <div style={s.container}>
          <p style={s.label}>Methodology</p>
          <h2 style={s.sectionTitle}>Seven diagnostic layers. Three extraction principles.</h2>
          <p style={s.sectionSub}>Each layer draws on validated organisational science. Combined, they produce findings no single framework can deliver alone.</p>
          <div style={s.framework}>
            {[
              ['Layer 1','Depth','Schein three-level model','Surfaces the gap between artifacts, espoused values, and basic assumptions that actually drive behaviour'],
              ['Layer 2','Culture typology','Cameron & Quinn CVF','Maps the Clan/Adhocracy/Market/Hierarchy blend — current state vs preferred — with transformation gap analysis'],
              ['Layer 3','Values system','Barrett CTT model','Quantifies cultural entropy, values alignment gaps, personal-organisational fit, and identifies change champions'],
              ['Layer 4','Strategy-culture fit','Denison DOCS framework','Links 12 cultural indices to business performance — mission, adaptability, involvement, consistency'],
              ['Layer 5','Power and influence','Cross & Parker ONA','Reveals hidden connectors, bottlenecks, isolated clusters, and the gap between formal hierarchy and informal influence'],
              ['Layer 6','Psychological safety','Edmondson model','Measures the enabling condition for everything else — voice, error tolerance, inclusion, and dissent — by team'],
              ['Layer 7','Generational values','Schein + Gersick','Traces current culture to founder and family origins — what the legacy protects and what it constrains'],
            ].map(([layer,title,source,desc])=>(
              <div key={layer} style={s.fwCard}>
                <p style={s.fwLabel}>{layer}</p>
                <p style={s.fwTitle}>{title}</p>
                <p style={{fontFamily:'var(--font-h)',fontSize:11,color:'#0D9488',marginBottom:6}}>{source}</p>
                <p style={s.fwText}>{desc}</p>
              </div>
            ))}
            <div style={s.fwCard}>
              <p style={s.fwLabel}>Convergence engine</p>
              <p style={s.fwTitle}>AI-powered triangulation</p>
              <p style={{fontFamily:'var(--font-h)',fontSize:11,color:'#0D9488',marginBottom:6}}>Multi-source validation</p>
              <p style={s.fwText}>No finding enters the Truth Map without confirmation from two or more independent data sources. Contradictions are surfaced as the highest-priority insights.</p>
            </div>
          </div>
        </div>
      </section>

      <section style={s.section}>
        <div style={s.container}>
          <p style={s.label}>How it works</p>
          <h2 style={s.sectionTitle}>From data collection to board-ready insight</h2>
          <p style={s.sectionSub}>Three phases. No fieldwork required. Results in days, not months.</p>
          <div style={s.grid3}>
            {[
              ['01','Deploy','Participants receive a unique link to a 45-minute interactive assessment. Six modules of visual exercises, behavioural scenarios, and structured prompts — designed to extract honest data without direct questioning. Completion rates consistently exceed 85%.'],
              ['02','Analyse','The AI convergence engine processes quantitative scores, qualitative narratives, and network data across all seven layers. Themes are extracted, cross-validated against multiple sources, and contradictions are flagged. Segmentation by department, level, and tenure reveals subculture patterns invisible in aggregate data.'],
              ['03','Deliver','The Culture Truth Map: a board-ready diagnostic document with validated findings, evidence chains, business impact quantification, and a prioritised transformation roadmap. Each finding is traceable to specific data sources. Delivered within 10 business days of assessment close.'],
            ].map(([num,title,desc])=>(
              <div key={num} style={s.card}>
                <p style={s.cardNum}>Phase {num}</p>
                <p style={s.cardTitle}>{title}</p>
                <p style={s.cardText}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={s.divider} />

      <section style={s.section}>
        <div style={s.container}>
          <p style={s.label}>The assessment experience</p>
          <h2 style={s.sectionTitle}>Six modules. Zero Likert scales.</h2>
          <p style={s.sectionSub}>Each module uses a different interaction paradigm to maintain engagement and extract different types of cultural data.</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:1,background:'#E8E5E0'}}>
            {[
              ['Module 1: Environment','Workspace analysis, environmental spectrum mapping, and projective workspace design — capturing artifact-level data through visual interaction rather than description.'],
              ['Module 2: Decision architecture','Four branching scenarios with consequence chains, testing assumptions about voice, risk, accountability, and hierarchy. Behavioural metadata (decision speed, consistency) adds a layer no interview can capture.'],
              ['Module 3: Values and typology','Three-round values assessment producing Barrett-equivalent entropy scores, CVF culture profile, and prioritised transformation targets. Origin tracing maps values to their generational source.'],
              ['Module 4: Narrative intelligence','Structured narrative collection with AI theme extraction. Founding legend analysis. Values drift measurement across six dimensions with tenure-segmented transmission analysis.'],
              ['Module 5: Influence mapping','Scenario-based network elicitation producing three force-directed graphs: knowledge, trust, and energy networks. Reveals the informal organisation operating beneath the formal hierarchy.'],
              ['Module 6: Safety and strategy','Third-person scenario projection for psychological safety measurement (bypassing the direct-question paradox). Six Denison-mapped indices linking culture traits to business performance outcomes.'],
            ].map(([title,desc])=>(
              <div key={title} style={s.card}>
                <p style={{...s.cardTitle,marginBottom:6}}>{title}</p>
                <p style={s.cardText}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{...s.section,...s.trustBg}}>
        <div style={{...s.container,maxWidth:720,textAlign:'center'}}>
          <p style={s.label}>Deliverables</p>
          <h2 style={{...s.sectionTitle,marginBottom:40}}>What leadership receives</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:24}}>
            {[
              ['Culture Truth Map','Board-ready diagnostic with validated findings, evidence chains, contradiction analysis, and business impact quantification'],
              ['Transformation roadmap','Prioritised interventions ranked by impact and feasibility with 90-day quick wins identified'],
              ['Founder legacy analysis','Generational values origin map, values drift index, and legacy verdict — what the heritage protects and constrains'],
            ].map(([t,d])=>(
              <div key={t} style={{textAlign:'left'}}>
                <p style={{fontFamily:'var(--font-h)',fontSize:14,fontWeight:600,color:'#0A0A0A',marginBottom:6}}>{t}</p>
                <p style={{fontSize:14,color:'#9B9690',lineHeight:1.6}}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{...s.section,textAlign:'center'}}>
        <div style={s.container}>
          <h2 style={{...s.sectionTitle,marginBottom:16}}>Culture is your most powerful strategic lever.</h2>
          <p style={{fontSize:17,color:'#9B9690',marginBottom:36,maxWidth:480,margin:'0 auto 36px'}}>Most organisations measure engagement. CultureLens diagnoses the system that produces it.</p>
          <Link href="/chapter?token=demo" style={s.cta}>Request a diagnostic</Link>
        </div>
      </section>

      <footer style={s.footer}>
        <div style={s.container}>
          <p><span style={{color:'#CBFD50',background:'#0A0A0A',padding:'1px 4px',borderRadius:3,marginRight:4,fontSize:11}}>e</span>lement | Strategic HR Consulting | elementmea.com</p>
        </div>
      </footer>
    </div>
  )
}
