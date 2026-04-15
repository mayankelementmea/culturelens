"use client"
import { useState, useEffect, useRef } from "react";

const ALL_V = [
  {id:"trust",l:"Trust",c:"#0D9488",bg:"#CCFBF1"},{id:"innovation",l:"Innovation",c:"#2563EB",bg:"#DBEAFE"},
  {id:"accountability",l:"Accountability",c:"#7C3AED",bg:"#EDE9FE"},{id:"collaboration",l:"Collaboration",c:"#0891B2",bg:"#CFFAFE"},
  {id:"transparency",l:"Transparency",c:"#059669",bg:"#D1FAE5"},{id:"empowerment",l:"Empowerment",c:"#4F46E5",bg:"#E0E7FF"},
  {id:"excellence",l:"Excellence",c:"#B45309",bg:"#FEF3C7"},{id:"integrity",l:"Integrity",c:"#0D9488",bg:"#CCFBF1"},
  {id:"courage",l:"Courage",c:"#DC2626",bg:"#FEE2E2"},{id:"ownership",l:"Ownership",c:"#7C3AED",bg:"#EDE9FE"},
  {id:"agility",l:"Agility",c:"#2563EB",bg:"#DBEAFE"},{id:"resilience",l:"Resilience",c:"#059669",bg:"#D1FAE5"},
  {id:"customer",l:"Customer focus",c:"#B45309",bg:"#FEF3C7"},{id:"learning",l:"Learning",c:"#0891B2",bg:"#CFFAFE"},
  {id:"respect",l:"Respect",c:"#0D9488",bg:"#CCFBF1"},
  {id:"blame",l:"Blame",c:"#DC2626",bg:"#FEE2E2",lim:true},{id:"bureaucracy",l:"Bureaucracy",c:"#9F1239",bg:"#FFE4E6",lim:true},
  {id:"control",l:"Control",c:"#B91C1C",bg:"#FEE2E2",lim:true},{id:"fear",l:"Fear",c:"#9F1239",bg:"#FFE4E6",lim:true},
  {id:"silos",l:"Silos",c:"#DC2626",bg:"#FEE2E2",lim:true},{id:"politics",l:"Politics",c:"#9F1239",bg:"#FFE4E6",lim:true},
  {id:"micromanage",l:"Micromanagement",c:"#B91C1C",bg:"#FEE2E2",lim:true},{id:"complacency",l:"Complacency",c:"#9F1239",bg:"#FFE4E6",lim:true},
];

function Particles() {
  return <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>
    {Array.from({length:20}).map((_,i)=>{
      const size = 4 + Math.random()*8;
      const x = Math.random()*100;
      const delay = Math.random()*20;
      const dur = 15 + Math.random()*20;
      const colors = ["#CBFD50","#60A5FA","#A78BFA","#34D399","#FBBF24","#F472B6"];
      const col = colors[i%colors.length];
      return <div key={i} style={{
        position:"absolute", width:size, height:size, borderRadius:"50%",
        background:col, opacity:0.15,
        left:`${x}%`, top:`${110}%`,
        animation:`rise ${dur}s linear ${delay}s infinite`,
      }}/>;
    })}
  </div>;
}

function ValBubble({v,sel,onClick,disabled,idx}) {
  return <button onClick={onClick} disabled={disabled&&!sel} style={{
    padding:"12px 22px", borderRadius:28, fontSize:14, fontWeight:600,
    border: sel?`2px solid ${v.c}`:"2px solid transparent",
    background: sel? v.bg : "rgba(255,255,255,0.7)",
    color: sel?v.c:"#64748B", cursor:disabled&&!sel?"default":"pointer",
    transition:"all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
    boxShadow: sel?`0 4px 20px ${v.c}25, 0 0 0 4px ${v.c}10`:"0 1px 4px rgba(0,0,0,0.04)",
    opacity: disabled&&!sel?0.3:1,
    transform: sel?"scale(1.08) translateY(-2px)":"scale(1)",
    fontFamily:"'Outfit',sans-serif",
    backdropFilter:"blur(8px)",
    animation: sel?`selected 0.5s ease`:"none",
    letterSpacing:"-0.01em",
  }}>{v.l}</button>;
}

function Btn({children,onClick,disabled,sec}) {
  return <button onClick={onClick} disabled={disabled} style={{
    padding:sec?"14px 32px":"18px 44px", borderRadius:16,
    border:sec?"2px solid #E2E8F0":"none",
    background:sec?"transparent":disabled?"#E2E8F0":"linear-gradient(135deg,#CBFD50 0%,#A3E635 50%,#4ADE80 100%)",
    color:sec?"#64748B":disabled?"#94A3B8":"#0F172A",
    fontSize:16, fontWeight:700, cursor:disabled?"default":"pointer",
    transition:"all 0.3s ease",
    boxShadow:!sec&&!disabled?"0 8px 32px rgba(203,253,80,0.3), 0 2px 8px rgba(0,0,0,0.08)":"none",
    fontFamily:"'Outfit',sans-serif", letterSpacing:"-0.02em",
    transform: !disabled&&!sec?"translateY(0)":"none",
  }}>{children}</button>;
}

export default function CultureLensApp() {
  const [ph,setPh]=useState(0);
  const [d,setD]=useState({id:"",pride:"",fears:"",never:"",pv:[],ov:[],gap:[]});
  const set=(k,v)=>setD(p=>({...p,[k]:v}));
  const tog=(k,id,max)=>{
    const a=d[k]||[];
    if(a.includes(id)) set(k,a.filter(x=>x!==id));
    else if(!max||a.length<max) set(k,[...a,id]);
  };
  const entropy = d.ov.length>0?Math.round(d.ov.filter(id=>ALL_V.find(v=>v.id===id)?.lim).length/d.ov.length*100):0;

  return <div style={{minHeight:"100vh",position:"relative",overflow:"hidden",fontFamily:"'Outfit',sans-serif"}}>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&display=swap');
      @keyframes rise{0%{transform:translateY(0) rotate(0deg);opacity:0.15}50%{opacity:0.25}100%{transform:translateY(-120vh) rotate(360deg);opacity:0}}
      @keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
      @keyframes selected{0%{transform:scale(0.9)}50%{transform:scale(1.12) translateY(-4px)}100%{transform:scale(1.08) translateY(-2px)}}
      @keyframes gradientMove{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
      @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
      @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
      body{margin:0;padding:0;background:#FEFDF8}
      ::selection{background:#CBFD50;color:#0F172A}
      textarea:focus,input:focus{outline:none;border-color:#CBFD50!important;box-shadow:0 0 0 4px rgba(203,253,80,0.2)!important}
      textarea::placeholder{color:#CBD5E1}
    `}</style>

    {/* Animated gradient background */}
    <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,zIndex:0,
      background:"linear-gradient(135deg, #FEFDF8 0%, #FFF7ED 15%, #FFFBEB 30%, #F0FDF4 50%, #ECFDF5 65%, #F0F9FF 80%, #FDF4FF 100%)",
      backgroundSize:"300% 300%", animation:"gradientMove 20s ease infinite"
    }}/>

    {/* Floating decorative orbs */}
    <div style={{position:"fixed",top:"10%",right:"10%",width:300,height:300,borderRadius:"50%",
      background:"radial-gradient(circle,rgba(203,253,80,0.12) 0%,transparent 70%)",
      animation:"float 8s ease-in-out infinite",zIndex:0,pointerEvents:"none"}}/>
    <div style={{position:"fixed",bottom:"15%",left:"5%",width:250,height:250,borderRadius:"50%",
      background:"radial-gradient(circle,rgba(96,165,250,0.08) 0%,transparent 70%)",
      animation:"float 10s ease-in-out 2s infinite",zIndex:0,pointerEvents:"none"}}/>
    <div style={{position:"fixed",top:"50%",left:"60%",width:200,height:200,borderRadius:"50%",
      background:"radial-gradient(circle,rgba(167,139,250,0.06) 0%,transparent 70%)",
      animation:"float 12s ease-in-out 4s infinite",zIndex:0,pointerEvents:"none"}}/>

    <Particles/>

    <div style={{position:"relative",zIndex:1,maxWidth:780,margin:"0 auto",padding:"40px 28px",minHeight:"100vh"}}>

      {/* Progress */}
      {ph>0 && ph<8 && <div style={{display:"flex",gap:5,marginBottom:56}}>
        {[1,2,3,4,5,6,7].map(i=><div key={i} style={{flex:1,height:4,borderRadius:4,
          background:i<=ph?"linear-gradient(90deg,#CBFD50,#4ADE80)":"#E2E8F0",
          transition:"all 0.6s ease",
          boxShadow:i<=ph?"0 2px 8px rgba(203,253,80,0.3)":"none"}}/>)}
      </div>}

      {/* WELCOME */}
      {ph===0 && <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"85vh",textAlign:"center",animation:"fadeUp 1s ease"}}>
        <div style={{marginBottom:32,display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:15,fontWeight:800,color:"#0F172A",background:"#CBFD50",padding:"6px 12px",borderRadius:8,boxShadow:"0 4px 16px rgba(203,253,80,0.3)"}}>e</span>
          <span style={{fontSize:14,fontWeight:600,color:"#94A3B8",letterSpacing:"0.12em",textTransform:"uppercase"}}>CultureLens</span>
        </div>
        <h1 style={{fontSize:"clamp(40px,7vw,64px)",fontWeight:300,lineHeight:1.1,letterSpacing:"-0.04em",marginBottom:24,maxWidth:600,color:"#0F172A"}}>
          Your culture has<br/>a voice. <span style={{fontWeight:700,background:"linear-gradient(135deg,#CBFD50,#22C55E)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Give it words.</span>
        </h1>
        <p style={{fontSize:18,color:"#64748B",maxWidth:480,marginBottom:48,lineHeight:1.8,fontWeight:400}}>
          Express what this organisation truly is — its pride, its values, its tensions. Watch your culture come alive as a living portrait.
        </p>
        <Btn onClick={()=>setPh(1)}>Begin your culture articulation</Btn>
        <p style={{fontSize:12,color:"#CBD5E1",marginTop:16}}>Takes about 8 minutes</p>
      </div>}

      {/* IDENTITY */}
      {ph===1 && <div style={{animation:"fadeUp 0.6s ease"}}>
        <div style={{display:"inline-block",padding:"6px 16px",borderRadius:20,background:"linear-gradient(135deg,#ECFDF5,#D1FAE5)",color:"#059669",fontSize:12,fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:20}}>Identity</div>
        <h2 style={{fontSize:32,fontWeight:300,lineHeight:1.3,marginBottom:12,color:"#0F172A",fontFamily:"'Playfair Display',serif",fontStyle:"italic"}}>
          In one sentence, describe this organisation's personality
        </h2>
        <p style={{fontSize:16,color:"#64748B",marginBottom:36,lineHeight:1.7}}>Not the elevator pitch. The honest character of this place — as if describing a person to a friend.</p>
        <textarea value={d.id} onChange={e=>set("id",e.target.value)} placeholder="We are a..." maxLength={200}
          style={{width:"100%",minHeight:110,padding:"24px 28px",background:"rgba(255,255,255,0.8)",
            border:"2px solid #E2E8F0",borderRadius:20,fontSize:20,fontWeight:300,color:"#0F172A",
            lineHeight:1.6,resize:"none",fontFamily:"'Playfair Display',serif",fontStyle:"italic",
            backdropFilter:"blur(8px)",boxSizing:"border-box",transition:"all 0.3s"}}/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:8}}>
          <span style={{fontSize:12,color:"#CBD5E1"}}>{d.id.length}/200</span>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:44}}>
          <Btn sec onClick={()=>setPh(0)}>Back</Btn>
          <Btn disabled={d.id.trim().length<10} onClick={()=>setPh(2)}>Continue</Btn>
        </div>
      </div>}

      {/* PRIDE */}
      {ph===2 && <div style={{animation:"fadeUp 0.6s ease"}}>
        <div style={{display:"inline-block",padding:"6px 16px",borderRadius:20,background:"linear-gradient(135deg,#DBEAFE,#BFDBFE)",color:"#2563EB",fontSize:12,fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:20}}>Pride</div>
        <h2 style={{fontSize:32,fontWeight:300,lineHeight:1.3,marginBottom:12,color:"#0F172A",fontFamily:"'Playfair Display',serif",fontStyle:"italic"}}>
          What is this organisation most proud of?
        </h2>
        <p style={{fontSize:16,color:"#64748B",marginBottom:36}}>What would you put on a flag and carry? The thing that makes people here say "this is why I stay."</p>
        <textarea value={d.pride} onChange={e=>set("pride",e.target.value)} placeholder="What fills this place with pride..."
          maxLength={500} style={{width:"100%",minHeight:130,padding:"24px 28px",background:"rgba(255,255,255,0.8)",
            border:"2px solid #E2E8F0",borderRadius:20,fontSize:16,color:"#0F172A",lineHeight:1.7,resize:"vertical",
            backdropFilter:"blur(8px)",boxSizing:"border-box",transition:"all 0.3s"}}/>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:44}}>
          <Btn sec onClick={()=>setPh(1)}>Back</Btn>
          <Btn disabled={d.pride.trim().length<10} onClick={()=>setPh(3)}>Continue</Btn>
        </div>
      </div>}

      {/* FEARS */}
      {ph===3 && <div style={{animation:"fadeUp 0.6s ease"}}>
        <div style={{display:"inline-block",padding:"6px 16px",borderRadius:20,background:"linear-gradient(135deg,#FEE2E2,#FECACA)",color:"#DC2626",fontSize:12,fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:20}}>Tensions</div>
        <h2 style={{fontSize:32,fontWeight:300,lineHeight:1.3,marginBottom:12,color:"#0F172A",fontFamily:"'Playfair Display',serif",fontStyle:"italic"}}>
          What keeps you up at night about this organisation?
        </h2>
        <p style={{fontSize:16,color:"#64748B",marginBottom:36}}>The frustration. The pattern you wish would change. What you can see but haven't been able to fix.</p>
        <textarea value={d.fears} onChange={e=>set("fears",e.target.value)} placeholder="What concerns me most..."
          maxLength={500} style={{width:"100%",minHeight:130,padding:"24px 28px",background:"rgba(255,255,255,0.8)",
            border:"2px solid #E2E8F0",borderRadius:20,fontSize:16,color:"#0F172A",lineHeight:1.7,resize:"vertical",
            backdropFilter:"blur(8px)",boxSizing:"border-box",transition:"all 0.3s"}}/>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:44}}>
          <Btn sec onClick={()=>setPh(2)}>Back</Btn>
          <Btn disabled={d.fears.trim().length<10} onClick={()=>setPh(4)}>Continue</Btn>
        </div>
      </div>}

      {/* NEVER BECOME */}
      {ph===4 && <div style={{animation:"fadeUp 0.6s ease"}}>
        <div style={{display:"inline-block",padding:"6px 16px",borderRadius:20,background:"linear-gradient(135deg,#EDE9FE,#DDD6FE)",color:"#7C3AED",fontSize:12,fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:20}}>Boundaries</div>
        <h2 style={{fontSize:32,fontWeight:300,lineHeight:1.3,marginBottom:12,color:"#0F172A",fontFamily:"'Playfair Display',serif",fontStyle:"italic"}}>
          What must this organisation never become?
        </h2>
        <p style={{fontSize:16,color:"#64748B",marginBottom:36}}>The anti-identity. The version of this place that would make you walk away.</p>
        <textarea value={d.never} onChange={e=>set("never",e.target.value)} placeholder="We must never become..."
          maxLength={300} style={{width:"100%",minHeight:100,padding:"24px 28px",background:"rgba(255,255,255,0.8)",
            border:"2px solid #E2E8F0",borderRadius:20,fontSize:16,color:"#0F172A",lineHeight:1.7,resize:"vertical",
            backdropFilter:"blur(8px)",boxSizing:"border-box",transition:"all 0.3s"}}/>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:44}}>
          <Btn sec onClick={()=>setPh(3)}>Back</Btn>
          <Btn disabled={d.never.trim().length<5} onClick={()=>setPh(5)}>Continue</Btn>
        </div>
      </div>}

      {/* PERSONAL / FAMILY VALUES */}
      {ph===5 && <div style={{animation:"fadeUp 0.6s ease"}}>
        <div style={{display:"inline-block",padding:"6px 16px",borderRadius:20,background:"linear-gradient(135deg,#CFFAFE,#A5F3FC)",color:"#0891B2",fontSize:12,fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:20}}>Your values</div>
        <h2 style={{fontSize:32,fontWeight:300,lineHeight:1.3,marginBottom:12,color:"#0F172A",fontFamily:"'Playfair Display',serif",fontStyle:"italic"}}>
          What values define you and your family?
        </h2>
        <p style={{fontSize:16,color:"#64748B",marginBottom:28}}>Tap the values that are your personal compass — the principles you would never compromise. Select up to 8.</p>
        <div style={{display:"flex",flexWrap:"wrap",gap:10,justifyContent:"center"}}>
          {ALL_V.filter(v=>!v.lim).map((v,i)=><ValBubble key={v.id} v={v} idx={i} sel={d.pv.includes(v.id)}
            disabled={d.pv.length>=8} onClick={()=>tog("pv",v.id,8)}/>)}
        </div>
        <div style={{textAlign:"center",marginTop:16,fontSize:14,fontWeight:600,color:d.pv.length>=3?"#059669":"#94A3B8"}}>{d.pv.length} selected {d.pv.length<3?"(min 3)":""}</div>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:36}}>
          <Btn sec onClick={()=>setPh(4)}>Back</Btn>
          <Btn disabled={d.pv.length<3} onClick={()=>setPh(6)}>Continue</Btn>
        </div>
      </div>}

      {/* ORG VALUES */}
      {ph===6 && <div style={{animation:"fadeUp 0.6s ease"}}>
        <div style={{display:"inline-block",padding:"6px 16px",borderRadius:20,background:"linear-gradient(135deg,#FEF3C7,#FDE68A)",color:"#B45309",fontSize:12,fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:20}}>Organisation values</div>
        <h2 style={{fontSize:32,fontWeight:300,lineHeight:1.3,marginBottom:12,color:"#0F172A",fontFamily:"'Playfair Display',serif",fontStyle:"italic"}}>
          What values actually operate here today?
        </h2>
        <p style={{fontSize:16,color:"#64748B",marginBottom:20}}>Not the poster. What you see reinforced daily. Include the uncomfortable ones.</p>
        <p style={{fontSize:13,fontWeight:600,color:"#059669",marginBottom:10}}>Positive values</p>
        <div style={{display:"flex",flexWrap:"wrap",gap:10,justifyContent:"center",marginBottom:20}}>
          {ALL_V.filter(v=>!v.lim).map((v,i)=><ValBubble key={v.id} v={v} idx={i} sel={d.ov.includes(v.id)}
            disabled={d.ov.length>=12} onClick={()=>tog("ov",v.id,12)}/>)}
        </div>
        <p style={{fontSize:13,fontWeight:600,color:"#DC2626",marginBottom:10}}>Limiting values — the ones you feel but rarely name</p>
        <div style={{display:"flex",flexWrap:"wrap",gap:10,justifyContent:"center",marginBottom:16}}>
          {ALL_V.filter(v=>v.lim).map((v,i)=><ValBubble key={v.id} v={v} idx={i} sel={d.ov.includes(v.id)}
            disabled={d.ov.length>=12} onClick={()=>tog("ov",v.id,12)}/>)}
        </div>
        <div style={{textAlign:"center",fontSize:14,fontWeight:600,color:d.ov.length>=3?"#059669":"#94A3B8"}}>{d.ov.length} selected</div>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:36}}>
          <Btn sec onClick={()=>setPh(5)}>Back</Btn>
          <Btn disabled={d.ov.length<3} onClick={()=>setPh(7)}>Continue</Btn>
        </div>
      </div>}

      {/* VALUES GAP */}
      {ph===7 && <div style={{animation:"fadeUp 0.6s ease"}}>
        <div style={{display:"inline-block",padding:"6px 16px",borderRadius:20,background:"linear-gradient(135deg,#FEE2E2,#FECACA)",color:"#DC2626",fontSize:12,fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:20}}>Values gap</div>
        <h2 style={{fontSize:32,fontWeight:300,lineHeight:1.3,marginBottom:12,color:"#0F172A",fontFamily:"'Playfair Display',serif",fontStyle:"italic"}}>
          Which values are important but not genuinely followed?
        </h2>
        <p style={{fontSize:16,color:"#64748B",marginBottom:28}}>Tap values the organisation claims but doesn't consistently live. These are your culture gaps.</p>
        <div style={{display:"flex",flexWrap:"wrap",gap:10,justifyContent:"center"}}>
          {d.ov.map(id=>{const v=ALL_V.find(x=>x.id===id);if(!v)return null;const g=d.gap.includes(id);
            return <button key={id} onClick={()=>tog("gap",id)} style={{
              padding:"12px 22px",borderRadius:28,fontSize:14,fontWeight:600,
              border:`2px solid ${g?"#EF4444":v.c+"40"}`,
              background:g?"#FEF2F2":v.bg,
              color:g?"#DC2626":v.c,cursor:"pointer",transition:"all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
              textDecoration:g?"line-through":"none",opacity:g?0.7:1,
              fontFamily:"'Outfit',sans-serif",
              transform:g?"scale(0.95)":"scale(1)",
              boxShadow:g?"inset 0 2px 8px rgba(220,38,38,0.1)":"0 2px 8px rgba(0,0,0,0.04)",
            }}>{v.l}</button>;
          })}
        </div>
        {d.gap.length>0 && <div style={{textAlign:"center",marginTop:16,fontSize:14,fontWeight:600,color:"#DC2626"}}>
          {d.gap.length} gap{d.gap.length>1?"s":""} identified
        </div>}
        <div style={{display:"flex",justifyContent:"space-between",marginTop:44}}>
          <Btn sec onClick={()=>setPh(6)}>Back</Btn>
          <Btn onClick={()=>setPh(8)}>See your Culture Canvas</Btn>
        </div>
      </div>}

      {/* CULTURE CANVAS OUTPUT */}
      {ph===8 && <div style={{animation:"fadeUp 0.8s ease"}}>
        <div style={{textAlign:"center",marginBottom:48}}>
          <div style={{display:"inline-block",padding:"6px 20px",borderRadius:20,background:"linear-gradient(135deg,#CBFD50,#4ADE80)",color:"#0F172A",fontSize:12,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:16,boxShadow:"0 4px 16px rgba(203,253,80,0.3)"}}>Your culture, articulated</div>
          <div style={{fontSize:"clamp(28px,5vw,40px)",fontWeight:300,fontStyle:"italic",color:"#0F172A",fontFamily:"'Playfair Display',serif",lineHeight:1.3,maxWidth:640,margin:"0 auto"}}>
            "{d.id}"
          </div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
          <div style={{background:"linear-gradient(135deg,rgba(5,150,105,0.06),rgba(52,211,153,0.04))",border:"2px solid rgba(5,150,105,0.15)",borderRadius:24,padding:"24px 28px"}}>
            <div style={{fontSize:13,fontWeight:700,color:"#059669",marginBottom:10,textTransform:"uppercase",letterSpacing:"0.06em"}}>What we are</div>
            <div style={{fontSize:15,color:"#065F46",lineHeight:1.7}}>{d.pride}</div>
          </div>
          <div style={{background:"linear-gradient(135deg,rgba(220,38,38,0.04),rgba(248,113,113,0.03))",border:"2px solid rgba(220,38,38,0.12)",borderRadius:24,padding:"24px 28px"}}>
            <div style={{fontSize:13,fontWeight:700,color:"#DC2626",marginBottom:10,textTransform:"uppercase",letterSpacing:"0.06em"}}>What keeps us up</div>
            <div style={{fontSize:15,color:"#991B1B",lineHeight:1.7}}>{d.fears}</div>
          </div>
        </div>

        {d.never && <div style={{background:"linear-gradient(135deg,rgba(124,58,237,0.04),rgba(167,139,250,0.03))",border:"2px solid rgba(124,58,237,0.12)",borderRadius:24,padding:"20px 28px",marginBottom:20}}>
          <div style={{fontSize:13,fontWeight:700,color:"#7C3AED",marginBottom:8,textTransform:"uppercase",letterSpacing:"0.06em"}}>What we must never become</div>
          <div style={{fontSize:15,color:"#5B21B6",lineHeight:1.7}}>{d.never}</div>
        </div>}

        <div style={{display:"grid",gridTemplateColumns:"180px 1fr",gap:16,marginBottom:20}}>
          <div style={{background:"rgba(255,255,255,0.7)",border:"2px solid #E2E8F0",borderRadius:24,padding:24,textAlign:"center",backdropFilter:"blur(8px)"}}>
            <div style={{fontSize:56,fontWeight:200,color:entropy>30?"#DC2626":entropy>15?"#B45309":"#059669",fontFamily:"'Outfit'",lineHeight:1}}>{entropy}%</div>
            <div style={{fontSize:12,color:"#64748B",fontWeight:500,marginTop:4}}>Cultural entropy</div>
            <div style={{fontSize:11,marginTop:8,padding:"4px 12px",borderRadius:12,display:"inline-block",
              background:entropy>30?"#FEE2E2":entropy>15?"#FEF3C7":"#D1FAE5",
              color:entropy>30?"#DC2626":entropy>15?"#B45309":"#059669",fontWeight:600}}>
              {entropy>30?"High friction":entropy>15?"Moderate":"Healthy"}
            </div>
          </div>
          <div style={{background:"rgba(255,255,255,0.7)",border:"2px solid #E2E8F0",borderRadius:24,padding:24,backdropFilter:"blur(8px)"}}>
            <div style={{fontSize:13,fontWeight:700,color:"#0F172A",marginBottom:12,textTransform:"uppercase",letterSpacing:"0.06em"}}>Operating values today</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
              {d.ov.map(id=>{const v=ALL_V.find(x=>x.id===id);return v?
                <span key={id} style={{padding:"8px 16px",borderRadius:24,fontSize:13,fontWeight:600,
                  background:v.bg,border:`1.5px solid ${v.c}30`,color:v.c}}>{v.l}</span>:null;
              })}
            </div>
          </div>
        </div>

        {d.gap.length>0 && <div style={{background:"rgba(255,255,255,0.7)",border:"2px solid rgba(220,38,38,0.12)",borderRadius:24,padding:24,marginBottom:20,backdropFilter:"blur(8px)"}}>
          <div style={{fontSize:13,fontWeight:700,color:"#DC2626",marginBottom:12,textTransform:"uppercase",letterSpacing:"0.06em"}}>Values gap — claimed but not lived</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
            {d.gap.map(id=>{const v=ALL_V.find(x=>x.id===id);return v?
              <span key={id} style={{padding:"8px 16px",borderRadius:24,fontSize:13,fontWeight:600,
                background:"#FEE2E2",border:"1.5px solid #FECACA",color:"#DC2626",textDecoration:"line-through"}}>{v.l}</span>:null;
            })}
          </div>
        </div>}

        {d.pv.length>0 && <div style={{background:"rgba(255,255,255,0.7)",border:"2px solid #E2E8F0",borderRadius:24,padding:24,marginBottom:20,backdropFilter:"blur(8px)"}}>
          <div style={{fontSize:13,fontWeight:700,color:"#0F172A",marginBottom:12,textTransform:"uppercase",letterSpacing:"0.06em"}}>Founder / family values</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
            {d.pv.map(id=>{const v=ALL_V.find(x=>x.id===id);return v?
              <span key={id} style={{padding:"8px 16px",borderRadius:24,fontSize:13,fontWeight:600,
                background:v.bg,border:`1.5px solid ${v.c}30`,color:v.c}}>{v.l}</span>:null;
            })}
          </div>
          {d.pv.some(id=>!d.ov.includes(id)) && <div style={{marginTop:14,padding:"14px 18px",borderRadius:16,background:"linear-gradient(135deg,rgba(180,83,9,0.04),rgba(251,191,36,0.04))",border:"1.5px solid rgba(180,83,9,0.15)"}}>
            <div style={{fontSize:12,fontWeight:700,color:"#B45309",marginBottom:6}}>Values not transferred to the organisation</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
              {d.pv.filter(id=>!d.ov.includes(id)).map(id=>{const v=ALL_V.find(x=>x.id===id);return v?
                <span key={id} style={{fontSize:12,fontWeight:600,color:"#B45309",padding:"4px 12px",borderRadius:12,background:"#FEF3C7"}}>{v.l}</span>:null;
              })}
            </div>
          </div>}
        </div>}

        <div style={{textAlign:"center",padding:"40px 0"}}>
          <p style={{fontSize:16,color:"#64748B",marginBottom:20,lineHeight:1.7,maxWidth:500,margin:"0 auto 20px"}}>
            This is your culture, articulated. The starting point for deeper diagnostic work with element.
          </p>
          <Btn sec onClick={()=>setPh(0)}>Start over</Btn>
        </div>
      </div>}

    </div>
  </div>;
}
