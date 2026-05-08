import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'R2 — Bloqueos Regionales y Anestesia Regional | AnesthTR',
  description: 'Simuladores para R2 de anestesiología: anatomía de bloqueos regionales, técnicas guiadas por ultrasonido, tipos de bloqueo y manejo de complicaciones.',
};

export default function R2Portal() {
  return (
    <main className="container">
      <Link href="/" className="back-link">
        ← Inicio
      </Link>

      <div className="header" style={{ marginBottom: '32px' }}>
        <div className="card-grade r2-tag" style={{ display: 'inline-block', marginBottom: '12px' }}>R2</div>
        <h1 className="logo-subtitle" style={{ fontSize: '24px', color: '#F1F5F9', fontWeight: 800 }}>Exámenes R2 — Marzo 2026</h1>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Anestesiología · Medicode Solutions</p>
      </div>

      <div className="section-label">Anestesia Regional y Ultrasonido</div>

      <Link href="/R2/bloqueos-regionales.html" className="glass-card card-link r2">
        <div className="card-header">
          <span className="card-grade r2-tag">R2</span>
          <span className="card-status active">● Activo</span>
        </div>
        <h2 className="card-title">Bloqueos Regionales</h2>
        <p className="card-desc">Anatomía, técnicas guiadas por ultrasonido, tipos de bloqueo y complicaciones.</p>
        <div className="card-meta">
          <span>📝 20 preguntas</span>
          <span>🫀 Anestesia Regional</span>
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
