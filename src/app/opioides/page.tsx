import Link from 'next/link';

export default function OpioidesHub() {
  return (
    <main className="container">
      {/* HEADER */}
      <div className="hero" style={{ paddingBottom: '28px' }}>
        <div className="hero-glow" />
        <div style={{ marginBottom: '10px' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'rgba(255,107,53,0.12)', color: '#ff6b35',
            padding: '4px 12px', borderRadius: '4px', fontSize: '11px',
            fontWeight: 700, letterSpacing: '0.4px',
            border: '1px solid rgba(255,107,53,0.3)',
          }}>
            FARMACOLOGÍA
          </span>
        </div>
        <h1 style={{
          fontSize: '36px', fontWeight: 900, letterSpacing: '-0.04em',
          background: 'linear-gradient(135deg, #f8fafc 30%, #ff6b35 65%, #fbbf24 100%)',
          WebkitBackgroundClip: 'text', color: 'transparent',
          marginBottom: '10px',
        }}>
          Opioides en Anestesia
        </h1>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto' }}>
          Módulo interactivo de farmacología opioide. Elige tu herramienta de estudio.
        </p>
      </div>

      {/* BACK LINK */}
      <Link href="/" style={{
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px',
        transition: 'color 0.15s',
      }}>
        ← Volver al inicio
      </Link>

      {/* TOOLS */}
      <div className="section-label">Herramientas de estudio</div>

      {/* QUIZ */}
      <Link href="/opioides/quiz.html" className="glass-card card-link opioides">
        <div className="card-icon-wrap opioides-icon">💊</div>
        <div className="card-body">
          <div className="card-header">
            <span className="card-grade opioides-tag">Quiz EnarmTR</span>
            <span className="card-status active">Activo</span>
          </div>
          <h2 className="card-title">Cuestionario de Opioides</h2>
          <p className="card-desc">15 preguntas estilo ENARM con retroalimentación clínica, referencias bibliográficas y modo examen. Receptores, farmacocinética, efectos adversos y casos clínicos.</p>
          <div className="card-meta">
            <span>📝 15 preguntas</span>
            <span>📚 Con bibliografía</span>
            <span>🎯 2 modos</span>
          </div>
        </div>
        <div className="card-arrow">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </Link>

      <div className="card-grid">
        {/* RULETA */}
        <Link href="/opioides/ruleta.html" className="glass-card card-link opioides">
          <div className="card-icon-wrap opioides-icon">🎡</div>
          <div className="card-body">
            <div className="card-header">
              <span className="card-grade opioides-tag">Ruleta</span>
              <span className="card-status active">Activo</span>
            </div>
            <h2 className="card-title">Ruleta de Preguntas</h2>
            <p className="card-desc">Gira la ruleta y responde preguntas aleatorias por categoría: fármacos, receptores, efectos adversos y casos clínicos.</p>
            <div className="card-meta">
              <span>🎡 Aleatorio</span>
              <span>⚡ Dinámico</span>
            </div>
          </div>
          <div className="card-arrow">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </Link>

        {/* CRUCIGRAMA */}
        <Link href="/opioides/crucigrama.html" className="glass-card card-link opioides">
          <div className="card-icon-wrap opioides-icon">🔤</div>
          <div className="card-body">
            <div className="card-header">
              <span className="card-grade opioides-tag">Crucigrama</span>
              <span className="card-status active">Activo</span>
            </div>
            <h2 className="card-title">Crucigrama de Opioides</h2>
            <p className="card-desc">14 palabras clave sobre fármacos opioides, receptores, mecanismos y efectos adversos. Refuerzo visual del vocabulario farmacológico.</p>
            <div className="card-meta">
              <span>🔤 14 palabras</span>
              <span>🧩 Interactivo</span>
            </div>
          </div>
          <div className="card-arrow">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </Link>
      </div>

      {/* TOPICS COVERED */}
      <div className="section-label">Temas cubiertos</div>
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: '16px', padding: '20px 24px',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '12px',
      }}>
        {[
          { icon: '🔬', label: 'Receptores μ, κ, δ', sub: 'Mecanismos moleculares' },
          { icon: '⚗️', label: 'Farmacocinética', sub: 'PKa, lipofilia, BHE' },
          { icon: '💉', label: 'Fármacos clínicos', sub: 'Fentanilo, morfina, remifentanilo' },
          { icon: '⚠️', label: 'Efectos adversos', sub: 'Tolerancia, HIO, prurito' },
          { icon: '🏥', label: 'Casos perioperatorios', sub: 'Manejo clínico práctico' },
          { icon: '📖', label: 'Referencias', sub: 'Miller, Stoelting, Trescot' },
        ].map(t => (
          <div key={t.label} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '18px', flexShrink: 0 }}>{t.icon}</span>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>{t.label}</div>
              <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px' }}>{t.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-brand">Medicode Solutions</div>
        <p className="footer-text">Plataforma educativa de anestesiología</p>
        <div className="disclaimer">
          Este sitio tiene fines exclusivamente educativos. No sustituye el juicio clínico ni las recomendaciones de sociedades médicas vigentes.
        </div>
      </footer>
    </main>
  );
}
