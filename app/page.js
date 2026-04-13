import Link from 'next/link'

export default function Home() {
  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh' }}>
      {/* Nav */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '20px 0', backdropFilter: 'blur(20px)', background: 'rgba(0,0,0,0.7)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: "'Poppins'", fontSize: 20, fontWeight: 500 }}><span style={{ color: '#CBFD50' }}>e</span>lement</span>
          <Link href="/chapter?token=demo" style={{ fontFamily: "'Poppins'", fontSize: 13, fontWeight: 500, padding: '8px 24px', background: '#CBFD50', color: '#000', borderRadius: 100, textDecoration: 'none' }}>Start your DNA</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ paddingTop: 160, paddingBottom: 100, maxWidth: 1120, margin: '0 auto', padding: '160px 40px 100px' }}>
        <p style={{ fontFamily: "'Poppins'", fontSize: 12, fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#CBFD50', marginBottom: 24 }}>CultureLens by element</p>
        <h1 style={{ fontFamily: "'Poppins'", fontSize: 'clamp(40px, 7vw, 72px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 24 }}>Build your<br/>culture <span style={{ color: '#CBFD50' }}>DNA</span></h1>
        <p style={{ fontSize: 20, color: '#999', maxWidth: 520, marginBottom: 20, lineHeight: 1.6, fontFamily: "'EB Garamond'" }}>A 45-minute experience that turns how you feel about your workplace into visual insight you can actually use.</p>
        <p style={{ fontSize: 16, color: '#666', maxWidth: 500, marginBottom: 40, lineHeight: 1.8, fontFamily: "'EB Garamond'" }}>CultureLens is not a survey. It&apos;s a series of visual exercises, creative tasks, and interactive scenarios that build your personal Culture Profile — a unique map of how you experience your organisation&apos;s culture.</p>
        <Link href="/chapter?token=demo" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: "'Poppins'", fontSize: 15, fontWeight: 600, padding: '16px 36px', background: '#CBFD50', color: '#000', borderRadius: 100, textDecoration: 'none' }}>Start building your culture DNA →</Link>
      </section>

      {/* Stats */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '40px 0' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 40px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, textAlign: 'center' }}>
          {[['45','minutes'],['6','chapters'],['0','Likert scales'],['1','personal profile']].map(([n,l]) => (
            <div key={l}><span style={{ fontFamily: "'Poppins'", fontSize: 36, fontWeight: 700, color: '#CBFD50' }}>{n}</span><br/><span style={{ fontFamily: "'Poppins'", fontSize: 13, color: '#666' }}>{l}</span></div>
          ))}
        </div>
      </section>

      {/* Chapters */}
      <section style={{ maxWidth: 1120, margin: '0 auto', padding: '80px 40px' }}>
        <p style={{ fontFamily: "'Poppins'", fontSize: 12, fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#CBFD50', marginBottom: 12 }}>The experience</p>
        <h2 style={{ fontFamily: "'Poppins'", fontSize: 36, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 40 }}>What you&apos;ll do</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          {[
            ['Chapter 1','My space','Pick your workspace from illustrated options. Set five visual dials. Build your ideal desk.'],
            ['Chapter 2','How we move','Navigate realistic workplace scenarios. Build a visual timeline of your typical day.'],
            ['Chapter 3','What we stand for','Swipe through illustrated value cards. Auction your culture coins. Map your culture type.'],
            ['Chapter 4','Our stories','Tell the founding legend. Share the best and worst. Discover shared experiences.'],
            ['Chapter 5','The invisible org chart','Three scenarios. Three questions. Who really holds knowledge, influence, and energy?'],
            ['Chapter 6','The truth mirror','What would most people actually do? Six honest scenarios. One final word.'],
          ].map(([num,title,desc]) => (
            <div key={title} style={{ background: '#1a1a1a', padding: 36, border: '1px solid rgba(255,255,255,0.03)' }}>
              <p style={{ fontFamily: "'Poppins'", fontSize: 11, color: '#CBFD50', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>{num}</p>
              <h3 style={{ fontFamily: "'Poppins'", fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{title}</h3>
              <p style={{ fontSize: 15, color: '#666', lineHeight: 1.7, fontFamily: "'EB Garamond'" }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Privacy */}
      <section style={{ background: '#111', borderTop: '1px solid rgba(255,255,255,0.04)', padding: '80px 0' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 40px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Poppins'", fontSize: 28, fontWeight: 600, marginBottom: 16 }}>Your responses are private</h2>
          <p style={{ fontSize: 16, color: '#666', lineHeight: 1.8, fontFamily: "'EB Garamond'" }}>No one in your organisation — not your manager, not HR, not the CEO — will ever see your individual responses. All data is anonymised before analysis. The only person who sees your personal Culture Profile is you.</p>
        </div>
      </section>

      {/* Footer CTA */}
      <section style={{ textAlign: 'center', padding: '100px 40px' }}>
        <h2 style={{ fontFamily: "'Poppins'", fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 16 }}>Ready to build your culture <span style={{ color: '#CBFD50' }}>DNA</span>?</h2>
        <p style={{ fontSize: 18, color: '#666', marginBottom: 36, fontFamily: "'EB Garamond'" }}>45 minutes. 6 chapters. One profile that&apos;s uniquely yours.</p>
        <Link href="/chapter?token=demo" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: "'Poppins'", fontSize: 15, fontWeight: 600, padding: '16px 36px', background: '#CBFD50', color: '#000', borderRadius: 100, textDecoration: 'none' }}>Start now →</Link>
      </section>

      <footer style={{ padding: '40px 0', borderTop: '1px solid rgba(255,255,255,0.04)', textAlign: 'center' }}>
        <p style={{ fontFamily: "'Poppins'", fontSize: 13, color: '#666' }}>Powered by <span style={{ color: '#CBFD50' }}>e</span>lement | Strategic HR Consulting</p>
      </footer>
    </div>
  )
}
