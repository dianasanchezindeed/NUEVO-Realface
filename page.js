'use client'
import { useEffect, useRef, useState } from 'react'

/* ─── REVEAL HOOK ─── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* ─── WAITLIST FORM ─── */
function WaitlistForm({ large = false }) {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setTimeout(() => { setDone(true); setLoading(false) }, 1200)
  }

  if (done) return (
    <div className={`flex items-center gap-3 glass rounded-2xl px-6 py-4 ${large ? 'text-lg' : ''}`}
         style={{ border: '1px solid rgba(232,84,122,0.3)', animation: 'float 4s ease-in-out infinite' }}>
      <span style={{ fontSize: large ? 28 : 20 }}>✦</span>
      <span className="gradient-text font-display" style={{ fontSize: large ? '1.3rem' : '1rem', fontStyle: 'italic' }}>
        Estás dentro. Te avisaremos pronto.
      </span>
    </div>
  )

  return (
    <form onSubmit={submit} className={`flex ${large ? 'flex-col sm:flex-row gap-3' : 'gap-2'} w-full max-w-md`}>
      <input
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="tu@email.com"
        className={`input-field rounded-2xl flex-1 ${large ? 'px-5 py-4 text-base' : 'px-4 py-3 text-sm'}`}
      />
      <button
        type="submit"
        disabled={loading}
        className={`btn-primary rounded-2xl font-medium whitespace-nowrap ${large ? 'px-8 py-4 text-base' : 'px-5 py-3 text-sm'}`}
        style={{ fontFamily: 'var(--font-body)' }}
      >
        <span>{loading ? '...' : 'Unirme'}</span>
      </button>
    </form>
  )
}

/* ─── PHONE MOCKUP ─── */
function PhoneMockup() {
  return (
    <div className="relative flex items-center justify-center" style={{ height: 520, width: 280 }}>

      {/* Glow behind phone */}
      <div className="absolute" style={{
        width: 220, height: 380,
        background: 'radial-gradient(ellipse, rgba(232,84,122,0.35) 0%, rgba(155,93,229,0.2) 50%, transparent 75%)',
        filter: 'blur(30px)', borderRadius: '50%', top: '10%'
      }}/>

      {/* Phone frame */}
      <div className="phone-mockup relative" style={{
        width: 230, height: 460,
        background: 'linear-gradient(160deg, #1a1025 0%, #0d0215 100%)',
        borderRadius: 40,
        border: '1px solid rgba(255,255,255,0.12)',
        overflow: 'hidden',
        zIndex: 2,
      }}>
        {/* Notch */}
        <div style={{ position:'absolute', top: 14, left:'50%', transform:'translateX(-50%)',
          width: 70, height: 8, background: 'rgba(0,0,0,0.6)', borderRadius: 4, zIndex: 10 }}/>

        {/* Screen content */}
        <div style={{ padding: '44px 16px 16px', height:'100%', display:'flex', flexDirection:'column', gap: 12 }}>

          {/* Header */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span style={{ fontSize: 11, color: 'rgba(240,236,234,0.5)', fontFamily:'var(--font-body)' }}>RealFace</span>
            <div style={{ width: 28, height: 28, borderRadius: '50%',
              background: 'linear-gradient(135deg, #e8547a, #9b5de5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12 }}>✦</div>
          </div>

          {/* Match card */}
          <div style={{
            flex: 1, borderRadius: 24,
            background: 'linear-gradient(160deg, rgba(232,84,122,0.15), rgba(155,93,229,0.1))',
            border: '1px solid rgba(255,255,255,0.08)',
            padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* Avatar placeholder */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '65%',
              background: 'linear-gradient(160deg, rgba(155,93,229,0.2) 0%, rgba(76,201,240,0.1) 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(232,84,122,0.4), rgba(155,93,229,0.4))',
                border: '2px solid rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 28
              }}>◈</div>
            </div>

            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'rgba(240,236,234,0.95)', marginBottom: 4 }}>Sofía, 27</div>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 8 }}>
                {['Arte', 'Montaña', 'Jazz'].map(t => (
                  <span key={t} style={{ fontSize: 9, padding: '2px 7px', borderRadius: 10,
                    background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
                    color: 'rgba(240,236,234,0.7)' }}>{t}</span>
                ))}
              </div>
              {/* Compat badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '5px 10px', borderRadius: 12,
                background: 'linear-gradient(135deg, rgba(232,84,122,0.3), rgba(155,93,229,0.3))',
                border: '1px solid rgba(232,84,122,0.4)',
              }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#e8547a', boxShadow: '0 0 6px #e8547a' }}/>
                <span style={{ fontSize: 10, color: '#f8c8d4', fontWeight: 500 }}>87% compatible</span>
              </div>
            </div>
          </div>

          {/* Bottom actions */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
            <button style={{ width: 44, height: 44, borderRadius: '50%',
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, cursor: 'pointer' }}>✕</button>
            <button style={{ width: 52, height: 52, borderRadius: '50%',
              background: 'linear-gradient(135deg, #e8547a, #9b5de5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, cursor: 'pointer',
              boxShadow: '0 8px 30px rgba(232,84,122,0.4)' }}>✦</button>
            <button style={{ width: 44, height: 44, borderRadius: '50%',
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, cursor: 'pointer' }}>⋯</button>
          </div>
        </div>
      </div>

      {/* Floating profile card 1 */}
      <div className="float glass" style={{
        position: 'absolute', left: -90, top: '18%',
        padding: '10px 14px', borderRadius: 16, zIndex: 5,
        border: '1px solid rgba(255,255,255,0.1)',
        minWidth: 110, animationDelay: '0s',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%',
            background: 'linear-gradient(135deg, #4cc9f0, #9b5de5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>◉</div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 500, color: 'var(--text-primary)' }}>Marco, 29</div>
            <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>Madrid</div>
          </div>
        </div>
        <div style={{ marginTop: 6, fontSize: 9, padding: '3px 8px', borderRadius: 8,
          background: 'rgba(76,201,240,0.15)', border: '1px solid rgba(76,201,240,0.3)',
          color: '#4cc9f0', textAlign: 'center' }}>92% match</div>
      </div>

      {/* Floating profile card 2 */}
      <div className="float-alt glass" style={{
        position: 'absolute', right: -80, top: '35%',
        padding: '10px 14px', borderRadius: 16, zIndex: 5,
        border: '1px solid rgba(255,255,255,0.1)',
        minWidth: 110,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%',
            background: 'linear-gradient(135deg, #e8547a, #ff9fb2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>◈</div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 500, color: 'var(--text-primary)' }}>Lía, 25</div>
            <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>Barcelona</div>
          </div>
        </div>
        <div style={{ marginTop: 6, fontSize: 9, padding: '3px 8px', borderRadius: 8,
          background: 'rgba(232,84,122,0.15)', border: '1px solid rgba(232,84,122,0.3)',
          color: '#f8c8d4', textAlign: 'center' }}>79% match</div>
      </div>

      {/* Floating tag bottom */}
      <div className="float-slow glass" style={{
        position: 'absolute', bottom: '8%', left: -60,
        padding: '8px 12px', borderRadius: 12, zIndex: 5,
        border: '1px solid rgba(155,93,229,0.3)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#9b5de5', boxShadow: '0 0 6px #9b5de5' }}/>
          <span style={{ fontSize: 9, color: 'rgba(240,236,234,0.7)' }}>IA activa · analizando</span>
        </div>
      </div>
    </div>
  )
}

/* ─── COMPATIBILITY CIRCLE ─── */
function CompatCircle() {
  const [visible, setVisible] = useState(false)
  const ref = useRef()

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.3 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="relative flex items-center justify-center" style={{ width: 200, height: 200 }}>
      <svg width="200" height="200" style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
        <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6"/>
        {visible && (
          <circle cx="100" cy="100" r="70" fill="none"
            stroke="url(#compatGrad)" strokeWidth="6"
            strokeLinecap="round"
            className="compat-ring"
          />
        )}
        <defs>
          <linearGradient id="compatGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e8547a"/>
            <stop offset="100%" stopColor="#9b5de5"/>
          </linearGradient>
        </defs>
      </svg>
      <div style={{ textAlign: 'center', zIndex: 2 }}>
        <div className="gradient-text font-display" style={{ fontSize: '3rem', lineHeight: 1, fontWeight: 300 }}>
          {visible ? '87%' : '0%'}
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>compatibilidad</div>
      </div>
    </div>
  )
}

/* ─── MAIN PAGE ─── */
export default function Home() {
  useReveal()

  return (
    <main style={{ background: 'var(--bg)' }}>

      {/* ─── NAV ─── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 24px', height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(4,3,10,0.6)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%',
            background: 'linear-gradient(135deg, #e8547a, #9b5de5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, boxShadow: '0 0 16px rgba(232,84,122,0.4)' }}>✦</div>
          <span className="font-display" style={{ fontSize: '1.2rem', fontWeight: 300, letterSpacing: 2 }}>RealFace</span>
        </div>
        <a href="#waitlist">
          <button className="btn-primary" style={{
            padding: '8px 20px', borderRadius: 50,
            fontSize: 13, fontFamily: 'var(--font-body)', fontWeight: 400,
            cursor: 'pointer', border: 'none', color: 'white'
          }}>
            <span>Lista de espera</span>
          </button>
        </a>
      </nav>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="animated-gradient" style={{
        minHeight: '100vh', paddingTop: 64,
        display: 'flex', alignItems: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Orbs */}
        <div className="orb" style={{ width: 600, height: 600, top: -100, left: -200, background: 'radial-gradient(circle, rgba(155,93,229,0.15) 0%, transparent 70%)' }}/>
        <div className="orb" style={{ width: 500, height: 500, bottom: -150, right: -100, background: 'radial-gradient(circle, rgba(232,84,122,0.12) 0%, transparent 70%)' }}/>
        <div className="orb" style={{ width: 300, height: 300, top: '30%', right: '35%', background: 'radial-gradient(circle, rgba(76,201,240,0.06) 0%, transparent 70%)' }}/>

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px', width: '100%',
          display: 'grid', gridTemplateColumns: '1fr', gap: 60, alignItems: 'center',
          position: 'relative', zIndex: 2 }}>

          {/* Text column */}
          <div style={{ textAlign: 'center' }}>

            {/* Badge */}
            <div className="reveal" style={{ display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 16px', borderRadius: 50, marginBottom: 32,
              background: 'rgba(232,84,122,0.1)', border: '1px solid rgba(232,84,122,0.25)' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#e8547a',
                boxShadow: '0 0 8px #e8547a', animation: 'pulseRing 2s ease-out infinite' }}/>
              <span style={{ fontSize: 12, color: '#f8c8d4', letterSpacing: 1.5, textTransform: 'uppercase' }}>
                Próximamente · Madrid
              </span>
            </div>

            {/* Logo word */}
            <div className="reveal delay-100 font-display text-glow" style={{
              fontSize: 'clamp(4rem, 15vw, 10rem)',
              fontWeight: 300, lineHeight: 0.9,
              letterSpacing: '-2px',
              background: 'linear-gradient(135deg, #f0ecea 20%, #f8c8d4 50%, #e8547a 80%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: 24,
            }}>
              RealFace
            </div>

            {/* Headline */}
            <h1 className="reveal delay-200 font-display" style={{
              fontSize: 'clamp(1.6rem, 4vw, 2.8rem)',
              fontWeight: 300, lineHeight: 1.2,
              color: 'var(--text-primary)',
              marginBottom: 16,
              fontStyle: 'italic',
            }}>
              La IA que te presenta<br/>
              <span className="gradient-text">a tu futura pareja.</span>
            </h1>

            {/* Subheadline */}
            <p className="reveal delay-300" style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              color: 'var(--text-muted)',
              lineHeight: 1.7,
              maxWidth: 520, margin: '0 auto 48px',
            }}>
              Y si no buscas pareja, crea planes<br/>y conoce gente que encaja contigo.
            </p>

            {/* CTA */}
            <div className="reveal delay-400" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              <a href="#waitlist">
                <button className="btn-primary" style={{
                  padding: '16px 48px', borderRadius: 50,
                  fontSize: '1rem', fontFamily: 'var(--font-body)', fontWeight: 500,
                  cursor: 'pointer', border: 'none', color: 'white',
                  letterSpacing: 0.5,
                }}>
                  <span>Únete a la lista de espera</span>
                </button>
              </a>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                Más de 2.400 personas esperando
              </span>
            </div>

            {/* Phone mockup centered below */}
            <div className="reveal delay-500" style={{ display: 'flex', justifyContent: 'center', marginTop: 60 }}>
              <PhoneMockup />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: 0.4 }}>
          <span style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase' }}>scroll</span>
          <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, rgba(232,84,122,0.8), transparent)', animation: 'floatSlow 2s ease-in-out infinite' }}/>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MARQUEE STRIP
      ══════════════════════════════════════════ */}
      <div style={{ overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: '16px 0', background: 'rgba(232,84,122,0.04)' }}>
        <div className="marquee-inner" style={{ display: 'flex', gap: 64, whiteSpace: 'nowrap', width: 'max-content' }}>
          {[...Array(2)].map((_, idx) => (
            <div key={idx} style={{ display: 'flex', gap: 64 }}>
              {['Menos swipe, más conexión', 'Personas que encajan contigo', 'Planes reales, no chats eternos',
                'IA que te conoce de verdad', 'No más conexiones vacías', 'Tu próxima pareja te espera'].map((t, i) => (
                <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: 13,
                  color: 'var(--text-muted)', letterSpacing: 1 }}>
                  <span className="gradient-text" style={{ fontSize: 10 }}>✦</span>
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          SECTION 1 — EMOTIONAL VALUE
      ══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px,12vw,140px) 24px', position: 'relative', overflow: 'hidden' }}>
        <div className="orb" style={{ width: 400, height: 400, top: '10%', right: '-5%', background: 'radial-gradient(circle, rgba(155,93,229,0.12) 0%, transparent 70%)' }}/>

        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 2 }}>

          <div className="reveal" style={{ textAlign: 'center', marginBottom: 80 }}>
            <span style={{ fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(232,84,122,0.7)' }}>
              La idea
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2 }}>

            {[
              { number: '01', text: 'Cuanto más te conoce,\nmejor conecta.', accent: '#e8547a' },
              { number: '02', text: 'Tu perfil evoluciona\ncontigo.', accent: '#9b5de5' },
              { number: '03', text: 'Deja de elegir\na ciegas.', accent: '#4cc9f0' },
              { number: '04', text: 'No vuelvas a perder el tiempo\ncon personas que no encajan.', accent: '#e8547a' },
            ].map((item, i) => (
              <div key={i}
                className={`reveal delay-${i * 100 + 100} card-hover`}
                style={{
                  padding: '40px 32px',
                  borderRadius: 2,
                  border: '1px solid rgba(255,255,255,0.04)',
                  position: 'relative', overflow: 'hidden',
                  cursor: 'default',
                }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 2,
                  background: `linear-gradient(90deg, transparent, ${item.accent}40, transparent)` }}/>
                <div style={{ fontSize: 11, color: `${item.accent}80`, letterSpacing: 2,
                  fontFamily: 'var(--font-body)', marginBottom: 20 }}>
                  {item.number}
                </div>
                <p className="font-display" style={{
                  fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 300,
                  lineHeight: 1.3, color: 'var(--text-primary)',
                  whiteSpace: 'pre-line',
                }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 2 — PROBLEM
      ══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px,12vw,140px) 24px', background: 'rgba(255,255,255,0.01)', position: 'relative' }}>
        <div className="orb" style={{ width: 500, height: 500, bottom: '-10%', left: '-10%', background: 'radial-gradient(circle, rgba(232,84,122,0.08) 0%, transparent 70%)' }}/>

        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 2 }}>

          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="reveal" style={{ fontSize: 12, letterSpacing: 3, textTransform: 'uppercase',
              color: 'rgba(232,84,122,0.7)', marginBottom: 20 }}>El problema</div>
            <h2 className="reveal delay-100 font-display" style={{
              fontSize: 'clamp(2rem, 6vw, 4rem)', fontWeight: 300,
              lineHeight: 1.15, fontStyle: 'italic',
            }}>
              Las apps actuales<br/>
              <span style={{ color: 'rgba(240,236,234,0.35)', textDecoration: 'line-through' }}>no funcionan.</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {[
              { icon: '∞', title: 'Swipe infinito', desc: 'Horas mirando fotos de personas que nunca conocerás.', color: 'rgba(232,84,122,0.2)' },
              { icon: '◌', title: 'Conversaciones vacías', desc: '"Hola" → silencio. Una y otra vez. Sin fin.', color: 'rgba(155,93,229,0.2)' },
              { icon: '⊘', title: 'Conexiones sin futuro', desc: 'Matches que no llevan a ningún sitio real.', color: 'rgba(76,201,240,0.15)' },
            ].map((item, i) => (
              <div key={i}
                className={`reveal delay-${i * 150 + 100} glass`}
                style={{
                  padding: '32px 28px', borderRadius: 20,
                  border: '1px solid rgba(255,255,255,0.06)',
                  textAlign: 'center',
                }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%',
                  background: item.color, border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24, margin: '0 auto 20px',
                  color: 'rgba(240,236,234,0.5)' }}>{item.icon}</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 400, marginBottom: 10, color: 'rgba(240,236,234,0.5)',
                  textDecoration: 'line-through', textDecorationColor: 'rgba(232,84,122,0.4)' }}>{item.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 3 — SOLUTION
      ══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px,12vw,140px) 24px', position: 'relative', overflow: 'hidden' }}>
        <div className="orb" style={{ width: 600, height: 600, top: '10%', right: '-15%', background: 'radial-gradient(circle, rgba(155,93,229,0.14) 0%, transparent 70%)' }}/>
        <div className="orb" style={{ width: 400, height: 400, bottom: '10%', left: '-10%', background: 'radial-gradient(circle, rgba(76,201,240,0.08) 0%, transparent 70%)' }}/>

        <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 2 }}>

          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <div className="reveal" style={{ fontSize: 12, letterSpacing: 3, textTransform: 'uppercase',
              color: 'rgba(76,201,240,0.7)', marginBottom: 20 }}>La solución</div>
            <h2 className="reveal delay-100 font-display gradient-text-cool" style={{
              fontSize: 'clamp(2rem, 6vw, 4rem)', fontWeight: 300, lineHeight: 1.15, fontStyle: 'italic',
            }}>
              RealFace es diferente.
            </h2>
            <p className="reveal delay-200" style={{
              fontSize: '1.1rem', color: 'var(--text-muted)', marginTop: 16,
              fontStyle: 'italic', letterSpacing: 0.5,
            }}>
              This feels different.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 1 }}>
            {[
              { icon: '◈', label: 'No eliges por fotos', sub: 'La IA entiende quién eres, no cómo te ves.' },
              { icon: '⏱', label: 'No pierdes el tiempo', sub: 'Solo ves personas que ya tienen sentido para ti.' },
              { icon: '◉', label: 'La IA te entiende', sub: 'Aprende tu personalidad, valores y forma de ser.' },
              { icon: '✦', label: 'Compatibilidad real', sub: 'Conecta personas que realmente encajan.' },
            ].map((item, i) => (
              <div key={i} className={`reveal delay-${i * 100 + 200}`}
                style={{ padding: '36px 28px', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="gradient-text" style={{ fontSize: 28, marginBottom: 16 }}>{item.icon}</div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 500, marginBottom: 10, color: 'var(--text-primary)' }}>{item.label}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 4 — THE WOW (87%)
      ══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px,12vw,140px) 24px',
        background: 'linear-gradient(160deg, rgba(155,93,229,0.05) 0%, rgba(232,84,122,0.05) 100%)',
        borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)',
        position: 'relative', overflow: 'hidden' }}>

        <div className="orb" style={{ width: 700, height: 700, top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          background: 'radial-gradient(circle, rgba(155,93,229,0.1) 0%, transparent 60%)' }}/>

        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 2 }}>

          <div style={{ textAlign: 'center', marginBottom: 80 }}>
            <div className="reveal" style={{ fontSize: 12, letterSpacing: 3, textTransform: 'uppercase',
              color: 'rgba(155,93,229,0.7)', marginBottom: 20 }}>La magia</div>
            <h2 className="reveal delay-100 font-display" style={{
              fontSize: 'clamp(2rem, 6vw, 4rem)', fontWeight: 300, lineHeight: 1.15, fontStyle: 'italic',
            }}>
              Te conoce antes<br/>
              <span className="gradient-text">de conectarte.</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'center' }}>

            {/* Compatibility visual */}
            <div className="reveal-left" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
              <CompatCircle />

              {/* Match card */}
              <div className="glass" style={{
                padding: '24px 28px', borderRadius: 20, width: '100%', maxWidth: 300,
                border: '1px solid rgba(232,84,122,0.15)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(232,84,122,0.4), rgba(155,93,229,0.4))',
                      border: '1px solid rgba(255,255,255,0.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>◈</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>Sofía & Tú</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Análisis IA</div>
                    </div>
                  </div>
                  <div className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: 300, fontFamily: 'var(--font-display)' }}>87%</div>
                </div>

                {[
                  { label: 'Valores compartidos', val: 92, color: '#e8547a' },
                  { label: 'Estilo de comunicación', val: 84, color: '#9b5de5' },
                  { label: 'Alineación emocional', val: 88, color: '#4cc9f0' },
                ].map((bar, i) => (
                  <div key={i} style={{ marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5,
                      fontSize: 11, color: 'var(--text-muted)' }}>
                      <span>{bar.label}</span><span style={{ color: bar.color }}>{bar.val}%</span>
                    </div>
                    <div style={{ height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.06)' }}>
                      <div style={{ height: '100%', width: `${bar.val}%`, borderRadius: 2,
                        background: `linear-gradient(90deg, ${bar.color}, ${bar.color}80)`,
                        transition: 'width 1.5s cubic-bezier(0.16,1,0.3,1)',
                        boxShadow: `0 0 8px ${bar.color}60` }}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Text */}
            <div className="reveal-right" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              {[
                { icon: '◉', title: 'La IA te aprende', body: 'Cuanto más usas RealFace, mejor te entiende. No rellenas formularios. Simplemente eres tú.' },
                { icon: '◈', title: 'Personalidad, valores, comportamiento', body: 'Analiza cómo te expresas, qué te importa y cómo te relacionas con el mundo.' },
                { icon: '✦', title: 'Match antes de hablar', body: 'Solo ves personas que ya tienen sentido para ti. No hay sorpresas desagradables.' },
              ].map((item, i) => (
                <div key={i} className={`delay-${i * 150}`} style={{ display: 'flex', gap: 20 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="gradient-text" style={{ fontSize: 18 }}>{item.icon}</span>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: 6 }}>{item.title}</h4>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 5 — PLANS
      ══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px,12vw,140px) 24px', position: 'relative', overflow: 'hidden' }}>
        <div className="orb" style={{ width: 500, height: 500, top: '5%', left: '-10%', background: 'radial-gradient(circle, rgba(76,201,240,0.1) 0%, transparent 70%)' }}/>

        <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 2 }}>

          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <div className="reveal" style={{ fontSize: 12, letterSpacing: 3, textTransform: 'uppercase',
              color: 'rgba(76,201,240,0.7)', marginBottom: 20 }}>Segundo caso de uso</div>
            <h2 className="reveal delay-100 font-display" style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300, lineHeight: 1.2, fontStyle: 'italic',
            }}>
              ¿Ya tienes pareja?<br/>
              <span style={{ color: 'var(--text-muted)' }}>También es para ti.</span>
            </h2>
            <p className="reveal delay-200" style={{
              fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: 500, margin: '20px auto 0',
              lineHeight: 1.7
            }}>
              Crea planes. Únete a los de otros.<br/>Conoce gente que piensa como tú.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {[
              { emoji: '🍽', label: 'Cenas', desc: 'Comparte mesa con personas interesantes.' },
              { emoji: '⛰', label: 'Deporte', desc: 'Entrena o explora con quien tiene tu ritmo.' },
              { emoji: '✈', label: 'Escapadas', desc: 'Planes de viaje con personas compatibles.' },
              { emoji: '◈', label: 'Eventos', desc: 'Conciertos, exposiciones, cultura.' },
            ].map((plan, i) => (
              <div key={i}
                className={`reveal delay-${i * 100 + 100} card-hover glass`}
                style={{ padding: '28px 24px', borderRadius: 20, textAlign: 'center', cursor: 'default' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{plan.emoji}</div>
                <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: 8 }}>{plan.label}</h3>
                <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{plan.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px,12vw,140px) 24px',
        background: 'rgba(255,255,255,0.01)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        position: 'relative', overflow: 'hidden' }}>

        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 2 }}>

          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <div className="reveal" style={{ fontSize: 12, letterSpacing: 3, textTransform: 'uppercase',
              color: 'rgba(232,84,122,0.7)', marginBottom: 20 }}>Cómo funciona</div>
            <h2 className="reveal delay-100 font-display" style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300, fontStyle: 'italic',
            }}>
              Simple. Casi mágico.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 0, position: 'relative' }}>
            {/* Connecting line */}
            <div style={{ position: 'absolute', top: 36, left: '12.5%', right: '12.5%', height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(232,84,122,0.3), rgba(155,93,229,0.3), transparent)',
              display: 'none' }}/>

            {[
              { num: 1, title: 'Creas tu perfil', desc: 'Sin cuestionarios eternos. Simple, rápido, tuyo.' },
              { num: 2, title: 'La IA te conoce', desc: 'Aprende quién eres con cada interacción.' },
              { num: 3, title: 'Te muestra lo que encaja', desc: 'Personas o planes. Siempre relevantes.' },
              { num: 4, title: 'Tú decides', desc: 'El control siempre es tuyo.' },
            ].map((step, i) => (
              <div key={i} className={`reveal delay-${i * 150}`}
                style={{ padding: '32px 28px', textAlign: 'center',
                  borderRight: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(232,84,122,0.2), rgba(155,93,229,0.2))',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px', fontSize: 18, fontFamily: 'var(--font-display)', fontWeight: 300,
                  color: 'rgba(248,200,212,0.8)' }}>{step.num}</div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 500, marginBottom: 8 }}>{step.title}</h3>
                <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          VALUE PROPS
      ══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(60px,10vw,100px) 24px', position: 'relative', overflow: 'hidden' }}>
        <div className="orb" style={{ width: 600, height: 300, top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          background: 'radial-gradient(ellipse, rgba(232,84,122,0.07) 0%, transparent 70%)' }}/>

        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16 }}>
            {['Menos swipe, más conexión', 'Personas que encajan contigo', 'Planes reales, no chats eternos'].map((prop, i) => (
              <div key={i} className={`reveal delay-${i * 150} glass`}
                style={{ padding: '14px 28px', borderRadius: 50,
                  border: '1px solid rgba(255,255,255,0.08)' }}>
                <span className="font-display" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', fontWeight: 300, fontStyle: 'italic' }}>
                  {prop}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WAITLIST SECTION
      ══════════════════════════════════════════ */}
      <section id="waitlist" style={{
        padding: 'clamp(80px,12vw,140px) 24px',
        background: 'linear-gradient(160deg, rgba(155,93,229,0.06) 0%, rgba(232,84,122,0.08) 100%)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        position: 'relative', overflow: 'hidden'
      }}>
        <div className="orb" style={{ width: 700, height: 700, top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          background: 'radial-gradient(circle, rgba(155,93,229,0.15) 0%, transparent 60%)' }}/>

        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>

          <div className="reveal" style={{ fontSize: 12, letterSpacing: 3, textTransform: 'uppercase',
            color: 'rgba(232,84,122,0.7)', marginBottom: 24 }}>Lista de espera</div>

          <h2 className="reveal delay-100 font-display" style={{
            fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 300,
            lineHeight: 1.1, fontStyle: 'italic', marginBottom: 16,
          }}>
            Deja de elegir<br/>
            <span className="gradient-text">a ciegas.</span>
          </h2>

          <p className="reveal delay-200" style={{
            fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: 48, lineHeight: 1.7
          }}>
            Sé de los primeros en descubrir<br/>una forma diferente de conectar.
          </p>

          <div className="reveal delay-300" style={{ display: 'flex', justifyContent: 'center' }}>
            <WaitlistForm large />
          </div>

          <p className="reveal delay-400" style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 20 }}>
            Sin spam. Sin compromisos. Solo te avisamos cuando estés listo.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px,12vw,140px) 24px', position: 'relative', overflow: 'hidden' }}>
        <div className="orb" style={{ width: 500, height: 500, top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          background: 'radial-gradient(circle, rgba(232,84,122,0.1) 0%, transparent 65%)' }}/>

        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>

          <div className="reveal float-slow" style={{ marginBottom: 40 }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%',
              background: 'linear-gradient(135deg, #e8547a, #9b5de5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 32, margin: '0 auto',
              boxShadow: '0 0 60px rgba(232,84,122,0.4), 0 0 120px rgba(155,93,229,0.2)' }}>✦</div>
          </div>

          <h2 className="reveal delay-100 font-display" style={{
            fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', fontWeight: 300,
            lineHeight: 1.1, fontStyle: 'italic', marginBottom: 32,
          }}>
            <span className="gradient-text">El futuro</span><br/>
            de conocer personas.
          </h2>

          <div className="reveal delay-200">
            <a href="#waitlist">
              <button className="btn-primary" style={{
                padding: '18px 56px', borderRadius: 50,
                fontSize: '1.05rem', fontFamily: 'var(--font-body)', fontWeight: 500,
                cursor: 'pointer', border: 'none', color: 'white',
                letterSpacing: 0.5,
              }}>
                <span>Únete a la lista de espera</span>
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ padding: '32px 24px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 22, height: 22, borderRadius: '50%',
            background: 'linear-gradient(135deg, #e8547a, #9b5de5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>✦</div>
          <span className="font-display" style={{ fontSize: '1rem', letterSpacing: 2, color: 'var(--text-muted)' }}>RealFace</span>
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          © 2025 RealFace · Todos los derechos reservados
        </div>
        <div style={{ display: 'flex', gap: 24, fontSize: 12, color: 'var(--text-muted)' }}>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacidad</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Términos</a>
        </div>
      </footer>

    </main>
  )
}
