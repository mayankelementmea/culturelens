"use client"
import { useState } from "react"

const V=[
  {id:"trust",l:"Trust",c:"#4F46E5",bg:"#E0E7FF",bg2:"#EEF2FF"},
  {id:"innovation",l:"Innovation",c:"#7C3AED",bg:"#EDE9FE",bg2:"#F5F3FF"},
  {id:"accountability",l:"Accountability",c:"#6366F1",bg:"#E0E7FF",bg2:"#EEF2FF"},
  {id:"collaboration",l:"Collaboration",c:"#2563EB",bg:"#DBEAFE",bg2:"#EFF6FF"},
  {id:"transparency",l:"Transparency",c:"#10B981",bg:"#A7F3D0",bg2:"#D1FAE5"},
  {id:"empowerment",l:"Empowerment",c:"#3B82F6",bg:"#BFDBFE",bg2:"#DBEAFE"},
  {id:"excellence",l:"Excellence",c:"#F59E0B",bg:"#FDE68A",bg2:"#FEF3C7"},
  {id:"integrity",l:"Integrity",c:"#4F46E5",bg:"#C4B5FD",bg2:"#EDE9FE"},
  {id:"courage",l:"Courage",c:"#E704CA",bg:"#F5D0FE",bg2:"#FAE8FF"},
  {id:"ownership",l:"Ownership",c:"#7C3AED",bg:"#E9D5FF",bg2:"#F3E8FF"},
  {id:"agility",l:"Agility",c:"#2563EB",bg:"#BFDBFE",bg2:"#DBEAFE"},
  {id:"resilience",l:"Resilience",c:"#10B981",bg:"#6EE7B7",bg2:"#D1FAE5"},
  {id:"customer",l:"Customer focus",c:"#F59E0B",bg:"#FED7AA",bg2:"#FFEDD5"},
  {id:"learning",l:"Learning",c:"#6366F1",bg:"#C7D2FE",bg2:"#E0E7FF"},
  {id:"respect",l:"Respect",c:"#4F46E5",bg:"#C4B5FD",bg2:"#EDE9FE"},
  {id:"blame",l:"Blame",c:"#DC2626",bg:"#FCA5A5",bg2:"#FEE2E2",lim:1},
  {id:"bureaucracy",l:"Bureaucracy",c:"#BE185D",bg:"#FBCFE8",bg2:"#FCE7F3",lim:1},
  {id:"control",l:"Control",c:"#B91C1C",bg:"#FCA5A5",bg2:"#FEE2E2",lim:1},
  {id:"fear",l:"Fear",c:"#9F1239",bg:"#FDA4AF",bg2:"#FFE4E6",lim:1},
  {id:"silos",l:"Silos",c:"#DC2626",bg:"#FCA5A5",bg2:"#FEE2E2",lim:1},
  {id:"politics",l:"Politics",c:"#BE185D",bg:"#FBCFE8",bg2:"#FCE7F3",lim:1},
  {id:"micromanage",l:"Micromanagement",c:"#B91C1C",bg:"#FCA5A5",bg2:"#FEE2E2",lim:1},
  {id:"complacency",l:"Complacency",c:"#9F1239",bg:"#FDA4AF",bg2:"#FFE4E6",lim:1},
]

const I="#4F46E5",Lm="#C4B5FD",Ls="#E8E4FF",N="#1E1B4B",Ns="#4C4885",Sl="#64748B",Slt="#94A3B8",W="#FFFFFF"
const shadow="0 8px 32px rgba(79,70,229,0.06), 0 2px 8px rgba(0,0,0,0.04)"
const shadowLg="0 20px 60px rgba(79,70,229,0.08), 0 4px 16px rgba(0,0,0,0.04)"

const Pill=({v,sel,onClick,dis})=><button onClick={onClick} disabled={dis&&!sel} style={{
  padding:"14px 28px",borderRadius:50,fontSize:15,fontWeight:sel?700:500,
  background:sel?v.bg2:W,border:`2.5px solid ${sel?v.c+"90":Ls}`,
  color:sel?v.c:Slt,cursor:dis&&!sel?"default":"pointer",fontFamily:"'Poppins',sans-serif",
  boxShadow:sel?`0 8px 24px ${v.c}20, 0 2px 8px rgba(0,0,0,0.04)`:"0 2px 8px rgba(0,0,0,0.04)",
  transition:"all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
  transform:sel?"scale(1.08) translateY(-4px)":"scale(1)",opacity:dis&&!sel?0.25:1,
  letterSpacing:"0.01em",lineHeight:1,
}}>{v.l}</button>

const Btn=({children,onClick,dis,sec})=><button onClick={onClick} disabled={dis} style={{
  padding:sec?"16px 36px":"18px 48px",borderRadius:50,fontSize:16,fontWeight:700,
  fontFamily:"'Poppins',sans-serif",border:sec?`2.5px solid ${Ls}`:"none",
  cursor:dis?"default":"pointer",
  background:sec?W:dis?"#E2E8F0":I,
  color:sec?Sl:dis?Slt:W,
  boxShadow:sec?shadow:dis?"none":`0 12px 40px ${I}30`,
  transition:"all 0.3s",letterSpacing:"-0.01em",
}}>{children}</button>

const Card=({children,bg,border,style})=><div style={{background:bg||W,borderRadius:24,
  boxShadow:shadow,padding:"32px 36px",border:border?`2.5px solid ${border}`:`1px solid ${Ls}`,
  ...style}}>{children}</div>

function Donut({pct,color,size=160}){
  const r=size/2-14,circ=2*Math.PI*r,dash=pct/100*circ
  return <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
    <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={Ls} strokeWidth={12}/>
    <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={12}
      strokeDasharray={`${dash} ${circ-dash}`} strokeLinecap="round"
      transform={`rotate(-90 ${size/2} ${size/2})`} style={{transition:"stroke-dasharray 1.5s ease"}}/>
    <text x={size/2} y={size/2-4} textAnchor="middle" fontSize="36" fontWeight="300" fill={N} fontFamily="Poppins">{pct}%</text>
    <text x={size/2} y={size/2+18} textAnchor="middle" fontSize="11" fill={Slt} fontWeight="600" fontFamily="Poppins" letterSpacing="1.5">ENTROPY</text>
  </svg>
}

const PHASE_BG=[
  `linear-gradient(160deg,#F0EDFF 0%,#E8E4FF 30%,#F7F5FF 60%,${Ls} 100%)`,
  `linear-gradient(160deg,#F0EDFF 0%,#EEEAFF 40%,#F7F5FF 100%)`,
  `linear-gradient(160deg,#EEF2FF 0%,#E0E7FF 40%,#F0EDFF 100%)`,
  `linear-gradient(160deg,#FFE4E6 0%,#FFF1F2 40%,#F0EDFF 100%)`,
  `linear-gradient(160deg,#F3E8FF 0%,#EDE9FE 40%,#F0EDFF 100%)`,
  `linear-gradient(160deg,#E0E7FF 0%,#EEF2FF 40%,#F0EDFF 100%)`,
  `linear-gradient(160deg,#FEF3C7 0%,#FFFBEB 40%,#F0EDFF 100%)`,
  `linear-gradient(160deg,#FFE4E6 0%,#FFF1F2 40%,#F0EDFF 100%)`,
  `linear-gradient(160deg,#F0EDFF 0%,#F7F5FF 30%,#FFFFFF 60%,#EEF2FF 100%)`,
]

export default function CultureLensApp(){
  const [ph,setPh]=useState(0)
  const [d,setD]=useState({id:"",pride:"",fears:"",never:"",pv:[],ov:[],gap:[]})
  const s=(k,v)=>setD(p=>({...p,[k]:v}))
  const tog=(k,id,mx)=>{const a=d[k]||[];if(a.includes(id))s(k,a.filter(x=>x!==id));else if(!mx||a.length<mx)s(k,[...a,id])}
  const ent=d.ov.length>0?Math.round(d.ov.filter(id=>V.find(x=>x.id===id)?.lim).length/d.ov.length*100):0

  return <div style={{minHeight:"100vh",background:PHASE_BG[ph],fontFamily:"'Poppins',sans-serif",position:"relative",overflow:"hidden",transition:"background 0.8s ease"}}>
    <style>{`
      @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
      @keyframes float1{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-20px) rotate(3deg)}}
      @keyframes float2{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(15px) rotate(-2deg)}}
      @keyframes float3{0%,100%{transform:translate(0,0)}50%{transform:translate(10px,-15px)}}
      body{margin:0}
      ::selection{background:${I};color:white}
      textarea:focus{outline:none;border-color:${I}!important;box-shadow:0 0 0 4px ${I}15!important}
      textarea::placeholder{color:#94A3B8}
    `}</style>

    <div style={{position:"fixed",top:"-5%",right:"-5%",width:400,height:400,borderRadius:"50%",background:`rgba(255,255,255,0.4)`,animation:"float1 10s ease-in-out infinite",pointerEvents:"none",zIndex:0}}/>
    <div style={{position:"fixed",bottom:"-10%",left:"-5%",width:350,height:350,borderRadius:"50%",background:`rgba(255,255,255,0.3)`,animation:"float2 13s ease-in-out infinite",pointerEvents:"none",zIndex:0}}/>
    <div style={{position:"fixed",top:"40%",left:"70%",width:200,height:200,borderRadius:"50%",background:`rgba(255,255,255,0.25)`,animation:"float3 16s ease-in-out infinite",pointerEvents:"none",zIndex:0}}/>
    <div style={{position:"fixed",top:"15%",left:"12%",width:60,height:60,borderRadius:18,border:`3px solid rgba(255,255,255,0.5)`,animation:"float1 20s ease-in-out infinite",pointerEvents:"none",zIndex:0,transform:"rotate(15deg)"}}/>
    <div style={{position:"fixed",bottom:"20%",right:"10%",width:40,height:40,borderRadius:12,border:`3px solid rgba(255,255,255,0.4)`,animation:"float2 18s ease-in-out infinite",pointerEvents:"none",zIndex:0,transform:"rotate(-20deg)"}}/>

    <div style={{position:"relative",zIndex:1,maxWidth:760,margin:"0 auto",padding:"48px 28px",minHeight:"100vh"}}>

      {ph>0&&ph<8&&<div style={{display:"flex",gap:6,marginBottom:56}}>
        {[1,2,3,4,5,6,7].map(i=><div key={i} style={{flex:1,height:8,borderRadius:50,
          background:i<=ph?`linear-gradient(90deg,${I},${Lm})`:Ls,
          boxShadow:i<=ph?`0 2px 8px ${I}25`:`inset 0 1px 3px rgba(0,0,0,0.04)`,
          transition:"all 0.6s ease"}}/>)}
      </div>}

      {/* WELCOME */}
      {ph===0&&<div key="w" style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"85vh",textAlign:"center",animation:"fadeUp 0.8s ease"}}>
        <div style={{width:80,height:80,borderRadius:24,background:I,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:32,boxShadow:`0 16px 48px ${I}30`}}>
          <span style={{fontSize:36,fontWeight:800,color:W}}>e</span>
        </div>
        <div style={{fontSize:13,fontWeight:700,color:Sl,letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:28}}>CultureLens</div>
        <h1 style={{fontSize:"clamp(38px,6vw,58px)",fontWeight:300,lineHeight:1.15,letterSpacing:"-0.03em",color:N,marginBottom:28,maxWidth:580}}>
          Your culture has<br/>a voice. <span style={{fontWeight:800,background:`linear-gradient(135deg,${I},${Lm})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Give it words.</span>
        </h1>
        <p style={{fontSize:18,color:Sl,maxWidth:480,marginBottom:48,lineHeight:1.8,fontWeight:400}}>Express what this organisation truly is — its pride, values, and tensions. Watch your culture come alive as a living portrait.</p>
        <Btn onClick={()=>setPh(1)}>Begin your culture articulation</Btn>
        <p style={{fontSize:13,color:Slt,marginTop:20,fontWeight:500}}>Takes about 8 minutes</p>
      </div>}

      {/* IDENTITY */}
      {ph===1&&<div key="id" style={{animation:"fadeUp 0.6s ease"}}>
        <span style={{display:"inline-block",padding:"8px 24px",borderRadius:50,background:`${I}12`,color:I,fontSize:13,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:24,boxShadow:`0 2px 8px ${I}10`}}>Identity</span>
        <h2 style={{fontSize:32,fontWeight:300,lineHeight:1.35,color:N,marginBottom:12,fontStyle:"italic"}}>In one sentence, describe this organisation's personality</h2>
        <p style={{fontSize:16,color:Sl,marginBottom:36,lineHeight:1.7}}>Not the elevator pitch. The honest character of this place.</p>
        <Card style={{boxShadow:shadowLg}}>
          <textarea value={d.id} onChange={e=>s("id",e.target.value)} placeholder="We are a..." maxLength={200}
            style={{width:"100%",minHeight:100,padding:0,background:"transparent",border:"none",fontSize:22,fontWeight:300,color:N,lineHeight:1.6,resize:"none",fontFamily:"'Poppins',sans-serif",fontStyle:"italic",boxSizing:"border-box"}}/>
        </Card>
        <div style={{textAlign:"right",fontSize:12,color:Slt,marginTop:8}}>{d.id.length}/200</div>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:44}}>
          <Btn sec onClick={()=>setPh(0)}>Back</Btn>
          <Btn dis={d.id.trim().length<10} onClick={()=>setPh(2)}>Continue</Btn>
        </div>
      </div>}

      {/* PRIDE */}
      {ph===2&&<div key="pr" style={{animation:"fadeUp 0.6s ease"}}>
        <span style={{display:"inline-block",padding:"8px 24px",borderRadius:50,background:"#E0E7FF",color:"#4F46E5",fontSize:13,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:24,boxShadow:`0 2px 8px ${I}10`}}>Pride</span>
        <h2 style={{fontSize:32,fontWeight:300,lineHeight:1.35,color:N,marginBottom:12,fontStyle:"italic"}}>What is this organisation most proud of?</h2>
        <p style={{fontSize:16,color:Sl,marginBottom:36}}>What would you put on a flag?</p>
        <Card style={{boxShadow:shadowLg}}><textarea value={d.pride} onChange={e=>s("pride",e.target.value)} placeholder="What fills this place with pride..." maxLength={500} style={{width:"100%",minHeight:120,padding:0,background:"transparent",border:"none",fontSize:16,color:N,lineHeight:1.7,resize:"vertical",fontFamily:"'Poppins',sans-serif",boxSizing:"border-box"}}/></Card>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:44}}>
          <Btn sec onClick={()=>setPh(1)}>Back</Btn><Btn dis={d.pride.trim().length<10} onClick={()=>setPh(3)}>Continue</Btn>
        </div>
      </div>}

      {/* FEARS */}
      {ph===3&&<div key="fe" style={{animation:"fadeUp 0.6s ease"}}>
        <span style={{display:"inline-block",padding:"8px 24px",borderRadius:50,background:"#FFE4E6",color:"#E11D48",fontSize:13,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:24}}>Tensions</span>
        <h2 style={{fontSize:32,fontWeight:300,lineHeight:1.35,color:N,marginBottom:12,fontStyle:"italic"}}>What keeps you up at night?</h2>
        <p style={{fontSize:16,color:Sl,marginBottom:36}}>The frustration. The pattern you wish would change.</p>
        <Card style={{boxShadow:shadowLg}}><textarea value={d.fears} onChange={e=>s("fears",e.target.value)} placeholder="What concerns me most..." maxLength={500} style={{width:"100%",minHeight:120,padding:0,background:"transparent",border:"none",fontSize:16,color:N,lineHeight:1.7,resize:"vertical",fontFamily:"'Poppins',sans-serif",boxSizing:"border-box"}}/></Card>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:44}}>
          <Btn sec onClick={()=>setPh(2)}>Back</Btn><Btn dis={d.fears.trim().length<10} onClick={()=>setPh(4)}>Continue</Btn>
        </div>
      </div>}

      {/* NEVER */}
      {ph===4&&<div key="nv" style={{animation:"fadeUp 0.6s ease"}}>
        <span style={{display:"inline-block",padding:"8px 24px",borderRadius:50,background:"#EDE9FE",color:"#7C3AED",fontSize:13,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:24}}>Boundaries</span>
        <h2 style={{fontSize:32,fontWeight:300,lineHeight:1.35,color:N,marginBottom:12,fontStyle:"italic"}}>What must this organisation never become?</h2>
        <p style={{fontSize:16,color:Sl,marginBottom:36}}>The anti-identity.</p>
        <Card style={{boxShadow:shadowLg}}><textarea value={d.never} onChange={e=>s("never",e.target.value)} placeholder="We must never become..." maxLength={300} style={{width:"100%",minHeight:90,padding:0,background:"transparent",border:"none",fontSize:16,color:N,lineHeight:1.7,resize:"vertical",fontFamily:"'Poppins',sans-serif",boxSizing:"border-box"}}/></Card>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:44}}>
          <Btn sec onClick={()=>setPh(3)}>Back</Btn><Btn dis={d.never.trim().length<5} onClick={()=>setPh(5)}>Continue</Btn>
        </div>
      </div>}

      {/* PERSONAL VALUES */}
      {ph===5&&<div key="pv" style={{animation:"fadeUp 0.6s ease"}}>
        <span style={{display:"inline-block",padding:"8px 24px",borderRadius:50,background:"#E0E7FF",color:I,fontSize:13,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:24}}>Your values</span>
        <h2 style={{fontSize:32,fontWeight:300,lineHeight:1.35,color:N,marginBottom:12,fontStyle:"italic"}}>What values define you and your family?</h2>
        <p style={{fontSize:16,color:Sl,marginBottom:32}}>Tap to select. Up to 8.</p>
        <div style={{display:"flex",flexWrap:"wrap",gap:12,justifyContent:"center"}}>
          {V.filter(x=>!x.lim).map(v=><Pill key={v.id} v={v} sel={d.pv.includes(v.id)} dis={d.pv.length>=8} onClick={()=>tog("pv",v.id,8)}/>)}
        </div>
        <div style={{textAlign:"center",marginTop:20,fontSize:15,fontWeight:700,color:d.pv.length>=3?I:Slt}}>{d.pv.length} selected{d.pv.length<3?" (min 3)":""}</div>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:40}}>
          <Btn sec onClick={()=>setPh(4)}>Back</Btn><Btn dis={d.pv.length<3} onClick={()=>setPh(6)}>Continue</Btn>
        </div>
      </div>}

      {/* ORG VALUES */}
      {ph===6&&<div key="ov" style={{animation:"fadeUp 0.6s ease"}}>
        <span style={{display:"inline-block",padding:"8px 24px",borderRadius:50,background:"#FEF3C7",color:"#D97706",fontSize:13,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:24}}>Organisation values</span>
        <h2 style={{fontSize:32,fontWeight:300,lineHeight:1.35,color:N,marginBottom:12,fontStyle:"italic"}}>What values actually operate here today?</h2>
        <p style={{fontSize:16,color:Sl,marginBottom:20}}>Include the uncomfortable ones.</p>
        <p style={{fontSize:13,fontWeight:700,color:I,marginBottom:12}}>Positive values</p>
        <div style={{display:"flex",flexWrap:"wrap",gap:12,justifyContent:"center",marginBottom:28}}>
          {V.filter(x=>!x.lim).map(v=><Pill key={v.id} v={v} sel={d.ov.includes(v.id)} dis={d.ov.length>=12} onClick={()=>tog("ov",v.id,12)}/>)}
        </div>
        <p style={{fontSize:13,fontWeight:700,color:"#DC2626",marginBottom:12}}>Limiting values — the ones you feel but rarely name</p>
        <div style={{display:"flex",flexWrap:"wrap",gap:12,justifyContent:"center"}}>
          {V.filter(x=>x.lim).map(v=><Pill key={v.id} v={v} sel={d.ov.includes(v.id)} dis={d.ov.length>=12} onClick={()=>tog("ov",v.id,12)}/>)}
        </div>
        <div style={{textAlign:"center",marginTop:20,fontSize:15,fontWeight:700,color:d.ov.length>=5?I:Slt}}>{d.ov.length} selected{d.ov.length<5?" (min 5)":""}</div>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:40}}>
          <Btn sec onClick={()=>setPh(5)}>Back</Btn><Btn dis={d.ov.length<5} onClick={()=>setPh(7)}>Continue</Btn>
        </div>
      </div>}

      {/* GAP */}
      {ph===7&&<div key="gp" style={{animation:"fadeUp 0.6s ease"}}>
        <span style={{display:"inline-block",padding:"8px 24px",borderRadius:50,background:"#FFE4E6",color:"#E11D48",fontSize:13,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:24}}>Values gap</span>
        <h2 style={{fontSize:32,fontWeight:300,lineHeight:1.35,color:N,marginBottom:12,fontStyle:"italic"}}>Which values are important but not followed?</h2>
        <p style={{fontSize:16,color:Sl,marginBottom:28}}>Tap values the organisation claims but doesn't live.</p>
        <div style={{display:"flex",flexWrap:"wrap",gap:12,justifyContent:"center"}}>
          {d.ov.map(id=>{const v=V.find(x=>x.id===id);if(!v)return null;const g=d.gap.includes(id);
            return <Pill key={id} v={{...v,c:g?"#DC2626":v.c,bg2:g?"#FEE2E2":v.bg2}} sel={true} onClick={()=>tog("gap",id)}>
              <span style={{textDecoration:g?"line-through":"none"}}>{v.l}</span>
            </Pill>})}
        </div>
        {d.gap.length>0&&<div style={{textAlign:"center",marginTop:20,fontSize:15,fontWeight:700,color:"#DC2626"}}>{d.gap.length} gap{d.gap.length>1?"s":""}</div>}
        <div style={{display:"flex",justifyContent:"space-between",marginTop:44}}>
          <Btn sec onClick={()=>setPh(6)}>Back</Btn><Btn onClick={()=>setPh(8)}>See your Culture Canvas</Btn>
        </div>
      </div>}

      {/* CANVAS */}
      {ph===8&&<div key="cv" style={{animation:"fadeUp 0.8s ease"}}>
        <div style={{textAlign:"center",marginBottom:48}}>
          <div style={{display:"inline-block",padding:"10px 32px",borderRadius:50,background:I,color:W,fontSize:13,fontWeight:800,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:24,boxShadow:`0 8px 24px ${I}30`}}>Your culture, articulated</div>
          <div style={{fontSize:"clamp(26px,4vw,38px)",fontWeight:300,fontStyle:"italic",color:N,lineHeight:1.3,maxWidth:620,margin:"0 auto"}}>"{d.id}"</div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:24}}>
          <Card bg="#EEF2FF" border="#C4B5FD">
            <div style={{fontSize:13,fontWeight:800,color:I,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:12}}>What we are</div>
            <div style={{fontSize:15,color:"#312E81",lineHeight:1.8}}>{d.pride}</div>
          </Card>
          <Card bg="#FFF1F2" border="#FDA4AF">
            <div style={{fontSize:13,fontWeight:800,color:"#E11D48",letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:12}}>What keeps us up</div>
            <div style={{fontSize:15,color:"#9F1239",lineHeight:1.8}}>{d.fears}</div>
          </Card>
        </div>

        {d.never&&<Card bg="#F5F3FF" border="#C4B5FD" style={{marginBottom:24}}>
          <div style={{fontSize:13,fontWeight:800,color:"#7C3AED",letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:12}}>What we must never become</div>
          <div style={{fontSize:15,color:"#5B21B6",lineHeight:1.8}}>{d.never}</div>
        </Card>}

        <div style={{display:"grid",gridTemplateColumns:"200px 1fr",gap:20,marginBottom:24}}>
          <Card style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24}}>
            <Donut pct={ent} color={ent>30?"#EF4444":ent>15?"#F59E0B":I}/>
            <div style={{marginTop:10,padding:"6px 16px",borderRadius:50,fontSize:12,fontWeight:700,
              background:ent>30?"#FEE2E2":ent>15?"#FEF3C7":"#EEF2FF",
              color:ent>30?"#DC2626":ent>15?"#D97706":I}}>{ent>30?"High friction":ent>15?"Moderate":"Healthy"}</div>
          </Card>
          <Card>
            <div style={{fontSize:13,fontWeight:800,color:N,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:16}}>Operating values</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
              {d.ov.map(id=>{const v=V.find(x=>x.id===id);return v?<span key={id} style={{padding:"10px 20px",borderRadius:50,fontSize:13,fontWeight:600,background:v.bg2,border:`2px solid ${v.c}30`,color:v.c}}>{v.l}</span>:null})}
            </div>
          </Card>
        </div>

        {d.gap.length>0&&<Card bg="#FFF1F2" border="#FECACA" style={{marginBottom:24}}>
          <div style={{fontSize:13,fontWeight:800,color:"#DC2626",letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:16}}>Values gap — claimed but not lived</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
            {d.gap.map(id=>{const v=V.find(x=>x.id===id);return v?<span key={id} style={{padding:"10px 20px",borderRadius:50,fontSize:13,fontWeight:600,background:"#FEE2E2",border:"2px solid #FECACA",color:"#DC2626",textDecoration:"line-through"}}>{v.l}</span>:null})}
          </div>
        </Card>}

        {d.pv.length>0&&<Card style={{marginBottom:24}}>
          <div style={{fontSize:13,fontWeight:800,color:N,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:16}}>Founder / family values</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
            {d.pv.map(id=>{const v=V.find(x=>x.id===id);return v?<span key={id} style={{padding:"10px 20px",borderRadius:50,fontSize:13,fontWeight:600,background:v.bg2,border:`2px solid ${v.c}30`,color:v.c}}>{v.l}</span>:null})}
          </div>
          {d.pv.some(id=>!d.ov.includes(id))&&<Card bg="#FFFBEB" border="#FDE68A" style={{marginTop:16,padding:"20px 24px"}}>
            <div style={{fontSize:12,fontWeight:800,color:"#D97706",marginBottom:8}}>Values not transferred to the organisation</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
              {d.pv.filter(id=>!d.ov.includes(id)).map(id=>{const v=V.find(x=>x.id===id);return v?<span key={id} style={{fontSize:13,fontWeight:600,color:"#D97706",padding:"6px 16px",borderRadius:50,background:"#FEF3C7"}}>{v.l}</span>:null})}
            </div>
          </Card>}
        </Card>}

        <div style={{textAlign:"center",padding:"40px 0"}}>
          <p style={{fontSize:16,color:Sl,marginBottom:24}}>This is your culture, articulated.</p>
          <Btn sec onClick={()=>setPh(0)}>Start over</Btn>
        </div>
      </div>}

    </div>
  </div>
}
