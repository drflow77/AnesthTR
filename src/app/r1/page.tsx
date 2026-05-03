import Link from 'next/link';

export default function R1Portal() {
  return (
    <main className="container">
      <Link href="/" className="back-link">
        ← Inicio
      </Link>

      <div className="header" style={{ marginBottom: '32px' }}>
        <div className="card-grade r1-tag" style={{ display: 'inline-block', marginBottom: '12px' }}>R1</div>
        <h1 className="logo-subtitle" style={{ fontSize: '24px', color: '#F1F5F9', fontWeight: 800 }}>Exámenes R1 — Marzo 2026</h1>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Anestesiología · Medicode Solutions</p>
      </div>

      <div className="section-label">Vía Aérea y Evaluación Preanestésica</div>

      <Link href="/R1/via-aerea.html" className="glass-card card-link r2">
        <div className="card-header">
          <span className="card-grade r2-tag">R1</span>
          <span className="card-status active">● Activo</span>
        </div>
        <h2 className="card-title">Vía Aérea y Evaluación Preanestésica</h2>
        <p className="card-desc">Escalas de vía aérea, Cormack-Lehane, clasificación ASA, Caprini y valoración preanestésica.</p>
        <div className="card-meta">
          <span>📝 25 preguntas</span>
          <span>📚 Con referencias</span>
        </div>
        <div className="card-arrow">→</div>
      </Link>

      <div className="section-label" style={{ marginTop: '24px' }}>Farmacología</div>

      <Link href="/R1/anestesicos-locales.html" className="glass-card card-link general">
        <div className="card-header">
          <span className="card-grade general-tag">R1</span>
          <span className="card-status active">● Activo</span>
        </div>
        <h2 className="card-title">Anestésicos Locales</h2>
        <p className="card-desc">Mecanismo de acción, clasificación, propiedades y usos clínicos de los anestésicos locales.</p>
        <div className="card-meta">
          <span>📝 30 preguntas</span>
          <span>💊 Farmacología</span>
        </div>
        <div className="card-arrow">→</div>
      </Link>

      <footer className="footer">
        <div className="footer-text">
          
        </div>
      </footer>
    </main>
  );
}
