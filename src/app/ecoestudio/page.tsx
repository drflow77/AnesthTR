import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'EcoEstudio — Ultrasonido para Bloqueos Regionales | AnesthTR',
  description: 'Aprende ecografía para anestesia regional: bloqueo supraclavicular, axilar y plexo braquial guiado por ultrasonido. Módulo interactivo para residentes de anestesiología.',
};

export default function EcoEstudioPortal() {
  return (
    <main className="container">
      <Link href="/" className="back-link">
        ← Volver a AnesthTR
      </Link>

      <div className="header" style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{ display: 'inline-block', padding: '6px 16px', borderRadius: '100px', background: 'rgba(34, 211, 238, 0.08)', color: '#22d3ee', fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '24px' }}>
          Módulo Interactivo
        </div>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔊</div>
        <h1 style={{ fontSize: '36px', fontWeight: 900, color: '#f1f5f9', marginBottom: '8px' }}>EcoEstudio</h1>
        <div style={{ color: '#22d3ee', fontFamily: 'monospace', marginBottom: '16px', fontSize: '13px' }}>// Ultrasonido en Anestesia Regional</div>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: 1.6, maxWidth: '440px', margin: '0 auto' }}>
          Identifica las estructuras anatómicas en la ventana ecográfica de cada bloqueo nervioso periférico.
        </p>
      </div>

      <div className="section-label">Bloqueos disponibles</div>

      <Link href="/EcoEstudio/supraclavicular-final.html" className="glass-card card-link general" style={{ marginBottom: '14px' }}>
        <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
          <div style={{ fontSize: '24px', background: 'rgba(34, 211, 238, 0.1)', border: '1px solid rgba(34,211,238,0.2)', width: '52px', height: '52px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🎯</div>
          <div>
            <h2 className="card-title">Bloqueo Supraclavicular</h2>
            <p className="card-desc">Identifica arteria subclavia, primera costilla, pleura y plexo braquial en la ventana supraclavicular.</p>
          </div>
        </div>
      </Link>

      <Link href="/EcoEstudio/axilar-final.html" className="glass-card card-link r1" style={{ marginBottom: '14px' }}>
        <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
          <div style={{ fontSize: '24px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', width: '52px', height: '52px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🎯</div>
          <div>
            <h2 className="card-title">Bloqueo Axilar</h2>
            <p className="card-desc">Localiza nervios mediano, cubital, radial y musculocutáneo alrededor de la arteria axilar.</p>
          </div>
        </div>
      </Link>

      <Link href="/EcoEstudio/plexo-braquial-v2.html" className="glass-card card-link r2" style={{ marginBottom: '14px' }}>
        <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
          <div style={{ fontSize: '24px', background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.2)', width: '52px', height: '52px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🧠</div>
          <div>
            <h2 className="card-title">Plexo Braquial PRO</h2>
            <p className="card-desc">Mapa dinámico interactivo, reconstrucción drag & drop, 21 flashcards y síndromes clínicos.</p>
          </div>
        </div>
      </Link>

      <div className="section-label" style={{ marginTop: '32px' }}>Próximamente</div>

      <div className="glass-card card-disabled r3" style={{ marginBottom: '14px' }}>
        <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
          <div style={{ fontSize: '24px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', width: '52px', height: '52px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🔒</div>
          <div>
            <h2 className="card-title">Bloqueo Interescalénico</h2>
            <p className="card-desc">Raíces C5-C6-C7 entre escalenos anterior y medio.</p>
          </div>
        </div>
      </div>
      
      <div className="glass-card card-disabled r3" style={{ marginBottom: '14px' }}>
        <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
          <div style={{ fontSize: '24px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)', width: '52px', height: '52px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🔒</div>
          <div>
            <h2 className="card-title">Bloqueo Infraclavicular</h2>
            <p className="card-desc">Cordones lateral, posterior y medial rodeando arteria axilar.</p>
          </div>
        </div>
      </div>

    </main>
  );
}
