"use client"
import { useState, useRef } from "react";

const C = {
  bg: "#08090C", card: "#0F1117", elev: "#161A24", border: "rgba(255,255,255,0.06)",
  text: "#E8E4DD", muted: "#706F73", dim: "#3A3A3E",
  lime: "#CBFD50", limeG: "rgba(203,253,80,0.12)",
  teal: "#34D399", coral: "#FB7185", blue: "#60A5FA", purple: "#A78BFA", amber: "#FBBF24", rose: "#F472B6",
};

const VALS_POS = [
  { id:"trust", l:"Trust", c:C.teal }, { id:"innovation", l:"Innovation", c:C.blue },
  { id:"accountability", l:"Accountability", c:C.lime }, { id:"collaboration", l:"Collaboration", c:C.purple },
  { id:"transparency", l:"Transparency", c:C.teal }, { id:"empowerment", l:"Empowerment", c:C.blue },
  { id:"excellence", l:"Excellence", c:C.amber }, { id:"integrity", l:"Integrity", c:C.lime },
  { id:"courage", l:"Courage", c:C.coral }, { id:"ownership", l:"Ownership", c:C.purple },
  { id:"agility", l:"Agility", c:C.blue }, { id:"resilience", l:"Resilience", c:C.teal },
  { id:"customer", l:"Customer focus", c:C.amber }, { id:"learning", l:"Learning", c:C.purple },
  { id:"respect", l:"Respect", c:C.lime },
];
const VALS_LIM = [
  { id:"blame", l:"Blame", c:C.coral }, { id:"bureaucracy", l:"Bureaucracy", c:C.rose },
  { id:"control", l:"Control", c:C.coral }, { id:"fear", l:"Fear", c:C.rose },
  { id:"silos", l:"Silos", c:C.coral }, { id:"politics", l:"Politics", c:C.rose },
  { id:"micromanage", l:"Micromanagement", c:C.coral }, { id:"complacency", l:"Complacency", c:C.rose },
];
const ALL_V = [...VALS_POS, ...VALS_LIM];
const LIM_IDS = VALS_LIM.map(v=>v.id);

function Btn({children, onClick, disabled, sec}) {
  return <button onClick={onClick} disabled={disabled} style={{
    padding: sec?"14px 28px":"16px 36px", borderRadius:14,
    border: sec?`1px solid ${C.border}`:"none",
    background: sec?"transparent": disabled?C.elev:C.lime,
    color: sec?C.muted: disabled?C.dim:C.bg,
    fontSize:15, fontWeight:600, cursor:disabled?"default":"pointer",
    transition:"all 0.3s", boxShadow: !sec&&!disabled?`0 0 30px ${C.limeG}`:"none",
    fontFamily:"'Outfit',sans-serif",
  }}>{children}</button>;
}

function ValBubble({v, sel, onClick, disabled}) {
  return <button onClick={onClick} disabled={disabled} style={{
    padding:"10px 20px", borderRadius:24, fontSize:13, fontWeight:500,
    border:`1.5px solid ${sel?v.c:C.border}`,
    background: sel?`${v.c}18`:C.card,
    color: sel?v.c:C.muted, cursor:disabled&&!sel?"default":"pointer",
    transition:"all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
    boxShadow: sel?`0 0 16px ${v.c}20`:"none",
    opacity: disabled&&!sel?0.25:1,
    fontFamily:"'Outfit',sans-serif",
    transform: sel?"scale(1.05)":"scale(1)",
  }}>{v.l}</button>;
}

export default function App() {
  const [ph, setPh] = useState(0);
  const [d, setD] = useState({ id:"", pride:"", fears:"", pv:[], ov:[], gap:[] });
  const set = (k,v) => setD(p=>({...p,[k]:v}));
  const tog = (k, id, max) => {
    const arr = d[k]||[];
    if(arr.includes(id)) set(k, arr.filter(x=>x!==id));
    else if(!max || arr.length<max) set(k, [...arr, id]);
  };

  const entropy = d.ov.length>0 ? Math.round((d.ov.filter(id=>LIM_IDS.includes(id)).length/d.ov.length)*100) : 0;
  const gapVals = d.ov.filter(id=>!d.gap.includes(id));

  return <div style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:"'Outfit',sans-serif",position:"relative",overflow:"hidden"}}>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;1,400&display=swap');
      @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
      @keyframes glow{0%,100%{box-shadow:0 0 20px rgba(203,253,80,0.05)}50%{box-shadow:0 0 40px rgba(203,253,80,0.15)}}
      ::selection{background:${C.lime};color:${C.bg}}
      textarea:focus{outline:none;border-color:${C.lime}!important;box-shadow:0 0 0 3px ${C.limeG}!important}
      textarea::placeholder{color:${C.dim}}
    `}</style>

    <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,pointerEvents:"none",zIndex:0,
      background:`radial-gradient(800px 600px at 15% 25%,rgba(203,253,80,0.04),transparent 60%),
        radial-gradient(600px 500px at 85% 65%,rgba(96,165,250,0.03),transparent 60%),
        radial-gradient(500px 400px at 50% 90%,rgba(167,139,250,0.03),transparent 60%)`
    }}/>

    <div style={{position:"relative",zIndex:1,maxWidth:760,margin:"0 auto",padding:"40px 24px",minHeight:"100vh"}}>

      {/* Progress */}
      {ph>0 && ph<7 && <div style={{display:"flex",gap:4,marginBottom:48}}>
        {[1,2,3,4,5,6].map(i=><div key={i} style={{flex:1,height:3,borderRadius:2,
          background:i<=ph?C.lime:"rgba(255,255,255,0.06)",transition:"all 0.5s",
          boxShadow:i<=ph?`0 0 8px ${C.limeG}`:"none"}}/>)}
      </div>}

      {/* WELCOME */}
      {ph===0 && <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"80vh",textAlign:"center",animation:"fadeUp 0.8s ease"}}>
        <div style={{marginBottom:24}}>
          <span style={{fontSize:13,fontWeight:600,color:C.bg,background:C.lime,padding:"4px 10px",borderRadius:6}}>e</span>
          <span style={{fontSize:13,fontWeight:500,color:C.muted,marginLeft:8,letterSpacing:"0.1em",textTransform:"uppercase"}}>CultureLens</span>
        </div>
        <h1 style={{fontSize:48,fontWeight:300,lineHeight:1.15,letterSpacing:"-0.03em",marginBottom:20,maxWidth:560}}>
          Your culture has a voice.<br/><span style={{color:C.lime,fontWeight:500}}>Give it words.</span>
        </h1>
        <p style={{fontSize:17,color:C.muted,maxWidth:460,marginBottom:40,lineHeight:1.7}}>
          Express what this organisation truly is — its pride, its fears, its values, and its tensions. Watch your culture take shape.
        </p>
        <Btn onClick={()=>setPh(1)}>Begin your culture articulation</Btn>
      </div>}

      {/* IDENTITY */}
      {ph===1 && <div style={{animation:"fadeUp 0.6s ease"}}>
        <div style={{fontSize:11,fontWeight:500,letterSpacing:"0.15em",textTransform:"uppercase",color:C.lime,marginBottom:16}}>Identity</div>
        <h2 style={{fontSize:28,fontWeight:400,lineHeight:1.3,marginBottom:8,fontFamily:"'Playfair Display',serif",fontStyle:"italic"}}>
          In one sentence, describe this organisation's personality
        </h2>
        <p style={{fontSize:15,color:C.muted,marginBottom:32,lineHeight:1.7}}>Not the elevator pitch. The honest character of this place — as if describing a person.</p>
        <textarea value={d.id} onChange={e=>set("id",e.target.value)} placeholder="We are..." maxLength={200}
          style={{width:"100%",minHeight:100,padding:"20px 24px",background:C.card,border:`1px solid ${C.border}`,
            borderRadius:16,fontSize:18,fontWeight:300,color:C.text,lineHeight:1.6,resize:"none",
            fontFamily:"'Playfair Display',serif",fontStyle:"italic",boxSizing:"border-box"}}/>
        <div style={{fontSize:11,color:C.dim,marginTop:8}}>{d.id.length}/200</div>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:40}}>
          <Btn sec onClick={()=>setPh(0)}>Back</Btn>
          <Btn disabled={d.id.trim().length<10} onClick={()=>setPh(2)}>Continue</Btn>
        </div>
      </div>}

      {/* PRIDE */}
      {ph===2 && <div style={{animation:"fadeUp 0.6s ease"}}>
        <div style={{fontSize:11,fontWeight:500,letterSpacing:"0.15em",textTransform:"uppercase",color:C.teal,marginBottom:16}}>Pride</div>
        <h2 style={{fontSize:28,fontWeight:400,lineHeight:1.3,marginBottom:8,fontFamily:"'Playfair Display',serif",fontStyle:"italic"}}>
          What is this organisation most proud of?
        </h2>
        <p style={{fontSize:15,color:C.muted,marginBottom:32}}>What would you put on a flag? The thing that makes people say "this is why I stay."</p>
        <textarea value={d.pride} onChange={e=>set("pride",e.target.value)} placeholder="What fills this place with pride..."
          maxLength={500} style={{width:"100%",minHeight:120,padding:"20px 24px",background:C.card,
            border:`1px solid ${C.border}`,borderRadius:16,fontSize:15,color:C.text,lineHeight:1.7,resize:"vertical",
            fontFamily:"'Outfit',sans-serif",boxSizing:"border-box"}}/>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:40}}>
          <Btn sec onClick={()=>setPh(1)}>Back</Btn>
          <Btn disabled={d.pride.trim().length<10} onClick={()=>setPh(3)}>Continue</Btn>
        </div>
      </div>}

      {/* FEARS */}
      {ph===3 && <div style={{animation:"fadeUp 0.6s ease"}}>
        <div style={{fontSize:11,fontWeight:500,letterSpacing:"0.15em",textTransform:"uppercase",color:C.coral,marginBottom:16}}>Tensions</div>
        <h2 style={{fontSize:28,fontWeight:400,lineHeight:1.3,marginBottom:8,fontFamily:"'Playfair Display',serif",fontStyle:"italic"}}>
          What keeps you up at night about this organisation?
        </h2>
        <p style={{fontSize:15,color:C.muted,marginBottom:32}}>The frustration. The pattern you wish would change. What you can see but can't fix.</p>
        <textarea value={d.fears} onChange={e=>set("fears",e.target.value)} placeholder="What concerns me most..."
          maxLength={500} style={{width:"100%",minHeight:120,padding:"20px 24px",background:C.card,
            border:`1px solid ${C.border}`,borderRadius:16,fontSize:15,color:C.text,lineHeight:1.7,resize:"vertical",
            fontFamily:"'Outfit',sans-serif",boxSizing:"border-box"}}/>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:40}}>
          <Btn sec onClick={()=>setPh(2)}>Back</Btn>
          <Btn disabled={d.fears.trim().length<10} onClick={()=>setPh(4)}>Continue</Btn>
        </div>
      </div>}

      {/* PERSONAL VALUES */}
      {ph===4 && <div style={{animation:"fadeUp 0.6s ease"}}>
        <div style={{fontSize:11,fontWeight:500,letterSpacing:"0.15em",textTransform:"uppercase",color:C.purple,marginBottom:16}}>Your values</div>
        <h2 style={{fontSize:28,fontWeight:400,lineHeight:1.3,marginBottom:8,fontFamily:"'Playfair Display',serif",fontStyle:"italic"}}>
          What values define you and your family?
        </h2>
        <p style={{fontSize:15,color:C.muted,marginBottom:24}}>Select the values that are core to who you are. Your personal compass. Tap to select.</p>
        <div style={{display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center",marginBottom:16}}>
          {VALS_POS.map(v=><ValBubble key={v.id} v={v} sel={d.pv.includes(v.id)}
            disabled={d.pv.length>=8&&!d.pv.includes(v.id)} onClick={()=>tog("pv",v.id,8)}/>)}
        </div>
        <div style={{textAlign:"center",fontSize:12,color:d.pv.length>=3?C.lime:C.muted}}>{d.pv.length} selected</div>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:32}}>
          <Btn sec onClick={()=>setPh(3)}>Back</Btn>
          <Btn disabled={d.pv.length<3} onClick={()=>setPh(5)}>Continue</Btn>
        </div>
      </div>}

      {/* ORG VALUES */}
      {ph===5 && <div style={{animation:"fadeUp 0.6s ease"}}>
        <div style={{fontSize:11,fontWeight:500,letterSpacing:"0.15em",textTransform:"uppercase",color:C.amber,marginBottom:16}}>Organisation values</div>
        <h2 style={{fontSize:28,fontWeight:400,lineHeight:1.3,marginBottom:8,fontFamily:"'Playfair Display',serif",fontStyle:"italic"}}>
          What values actually operate in this organisation today?
        </h2>
        <p style={{fontSize:15,color:C.muted,marginBottom:12}}>Not the poster. What you see reinforced daily. Include the uncomfortable ones.</p>
        <div style={{fontSize:12,fontWeight:500,color:C.teal,marginBottom:8,marginTop:20}}>Positive values</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center",marginBottom:16}}>
          {VALS_POS.map(v=><ValBubble key={v.id} v={v} sel={d.ov.includes(v.id)} onClick={()=>tog("ov",v.id,12)}
            disabled={d.ov.length>=12&&!d.ov.includes(v.id)}/>)}
        </div>
        <div style={{fontSize:12,fontWeight:500,color:C.coral,marginBottom:8,marginTop:20}}>Limiting values — the ones you feel but rarely name</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center",marginBottom:16}}>
          {VALS_LIM.map(v=><ValBubble key={v.id} v={v} sel={d.ov.includes(v.id)} onClick={()=>tog("ov",v.id,12)}
            disabled={d.ov.length>=12&&!d.ov.includes(v.id)}/>)}
        </div>
        <div style={{textAlign:"center",fontSize:12,color:d.ov.length>=3?C.lime:C.muted}}>{d.ov.length} selected</div>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:32}}>
          <Btn sec onClick={()=>setPh(4)}>Back</Btn>
          <Btn disabled={d.ov.length<3} onClick={()=>setPh(6)}>Continue</Btn>
        </div>
      </div>}

      {/* VALUES GAP */}
      {ph===6 && <div style={{animation:"fadeUp 0.6s ease"}}>
        <div style={{fontSize:11,fontWeight:500,letterSpacing:"0.15em",textTransform:"uppercase",color:C.coral,marginBottom:16}}>Values gap</div>
        <h2 style={{fontSize:28,fontWeight:400,lineHeight:1.3,marginBottom:8,fontFamily:"'Playfair Display',serif",fontStyle:"italic"}}>
          Which values are important but not genuinely followed?
        </h2>
        <p style={{fontSize:15,color:C.muted,marginBottom:24}}>Tap values the organisation claims but doesn't live. These are your culture gaps.</p>
        <div style={{display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center"}}>
          {d.ov.map(id=>{const v=ALL_V.find(x=>x.id===id); if(!v) return null;
            const isGap=d.gap.includes(id);
            return <button key={id} onClick={()=>tog("gap",id)} style={{
              padding:"10px 20px",borderRadius:24,fontSize:14,fontWeight:500,
              border:`1.5px solid ${isGap?C.coral+"60":v.c+"40"}`,
              background:isGap?`${C.coral}15`:v.c+"10",
              color:isGap?C.coral:v.c, cursor:"pointer", transition:"all 0.3s",
              textDecoration:isGap?"line-through":"none", opacity:isGap?0.7:1,
              fontFamily:"'Outfit',sans-serif",
            }}>{v.l}</button>;
          })}
        </div>
        {d.gap.length>0 && <div style={{textAlign:"center",marginTop:16,fontSize:13,color:C.coral}}>
          {d.gap.length} gap{d.gap.length>1?"s":""} identified
        </div>}
        <div style={{display:"flex",justifyContent:"space-between",marginTop:40}}>
          <Btn sec onClick={()=>setPh(5)}>Back</Btn>
          <Btn onClick={()=>setPh(7)}>See your Culture Canvas</Btn>
        </div>
      </div>}

      {/* CULTURE CANVAS */}
      {ph===7 && <div style={{animation:"fadeUp 0.8s ease"}}>
        <div style={{textAlign:"center",marginBottom:40}}>
          <div style={{fontSize:11,fontWeight:500,letterSpacing:"0.15em",textTransform:"uppercase",color:C.lime,marginBottom:12}}>Your culture, articulated</div>
          <div style={{fontSize:32,fontWeight:300,fontStyle:"italic",color:C.text,fontFamily:"'Playfair Display',serif",lineHeight:1.3,maxWidth:600,margin:"0 auto"}}>
            "{d.id}"
          </div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:24}}>
          <div style={{background:`linear-gradient(135deg,rgba(52,211,153,0.08),rgba(52,211,153,0.02))`,
            border:"1px solid rgba(52,211,153,0.15)",borderRadius:16,padding:"20px 24px"}}>
            <div style={{fontSize:12,fontWeight:600,color:C.teal,marginBottom:8}}>What we are, absolutely</div>
            <div style={{fontSize:14,color:"rgba(52,211,153,0.8)",lineHeight:1.7}}>{d.pride}</div>
          </div>
          <div style={{background:`linear-gradient(135deg,rgba(251,113,133,0.08),rgba(251,113,133,0.02))`,
            border:"1px solid rgba(251,113,133,0.15)",borderRadius:16,padding:"20px 24px"}}>
            <div style={{fontSize:12,fontWeight:600,color:C.coral,marginBottom:8}}>What keeps us up at night</div>
            <div style={{fontSize:14,color:"rgba(251,113,133,0.8)",lineHeight:1.7}}>{d.fears}</div>
          </div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"160px 1fr",gap:16,marginBottom:24}}>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:20,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            <div style={{fontSize:48,fontWeight:300,color:entropy>30?C.coral:entropy>15?C.amber:C.teal}}>{entropy}%</div>
            <div style={{fontSize:11,color:C.muted}}>Cultural entropy</div>
            <div style={{fontSize:10,marginTop:6,padding:"3px 10px",borderRadius:8,
              background:entropy>30?"rgba(251,113,133,0.1)":entropy>15?"rgba(251,191,36,0.1)":"rgba(52,211,153,0.1)",
              color:entropy>30?C.coral:entropy>15?C.amber:C.teal}}>
              {entropy>30?"High friction":entropy>15?"Moderate":"Healthy"}
            </div>
          </div>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:20}}>
            <div style={{fontSize:12,fontWeight:600,color:C.text,marginBottom:12}}>Operating values today</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
              {d.ov.map(id=>{const v=ALL_V.find(x=>x.id===id);return v?
                <span key={id} style={{padding:"6px 14px",borderRadius:20,fontSize:12,fontWeight:500,
                  background:`${v.c}15`,border:`1px solid ${v.c}30`,color:v.c}}>{v.l}</span>:null;
              })}
            </div>
          </div>
        </div>

        {d.gap.length>0 && <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:20,marginBottom:24}}>
          <div style={{fontSize:12,fontWeight:600,color:C.coral,marginBottom:12}}>Values gap — claimed but not lived</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {d.gap.map(id=>{const v=ALL_V.find(x=>x.id===id);return v?
              <span key={id} style={{padding:"6px 14px",borderRadius:20,fontSize:12,fontWeight:500,
                background:`${C.coral}15`,border:`1px solid ${C.coral}30`,color:C.coral,textDecoration:"line-through"}}>{v.l}</span>:null;
            })}
          </div>
        </div>}

        {d.pv.length>0 && <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:20,marginBottom:24}}>
          <div style={{fontSize:12,fontWeight:600,color:C.purple,marginBottom:12}}>Founder / family values</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {d.pv.map(id=>{const v=VALS_POS.find(x=>x.id===id);return v?
              <span key={id} style={{padding:"6px 14px",borderRadius:20,fontSize:12,fontWeight:500,
                background:`${v.c}15`,border:`1px solid ${v.c}30`,color:v.c}}>{v.l}</span>:null;
            })}
          </div>
          {d.pv.some(id=>!d.ov.includes(id)) && <div style={{marginTop:12,padding:"10px 14px",borderRadius:10,background:"rgba(251,191,36,0.06)",border:"1px solid rgba(251,191,36,0.15)"}}>
            <div style={{fontSize:11,fontWeight:500,color:C.amber,marginBottom:4}}>Values not transferred to the organisation</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
              {d.pv.filter(id=>!d.ov.includes(id)).map(id=>{const v=VALS_POS.find(x=>x.id===id);return v?
                <span key={id} style={{fontSize:11,color:C.amber,padding:"2px 8px",borderRadius:10,background:"rgba(251,191,36,0.08)"}}>{v.l}</span>:null;
              })}
            </div>
          </div>}
        </div>}

        <div style={{textAlign:"center",padding:"32px 0"}}>
          <p style={{fontSize:14,color:C.muted,marginBottom:16}}>This is your culture, articulated. The starting point for deeper work with element.</p>
          <Btn sec onClick={()=>setPh(0)}>Start over</Btn>
        </div>
      </div>}

    </div>
  </div>;
}
