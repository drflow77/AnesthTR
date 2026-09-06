import Link from 'next/link';

export default function Home() {
  return (
    <main className="container">
      {/* HERO */}
      <div className="hero">
        <div className="hero-glow" />
        <div className="logo-brand">
          <img src="/logo.PNG" alt="AnesthTR" className="logo-img" />
          <div className="logo-text-group">
            <h1 className="logo-wordmark">Anesth<span className="logo-tr">TR</span></h1>
            <p className="hero-sub">Plataforma de educación en anestesiología</p>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat-pill">
            <span className="stat-num">9</span>
            <span className="stat-label">Módulos</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-pill">
            <span className="stat-num">5</span>
            <span className="stat-label">Simuladores</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-pill">
            <span className="stat-num">1</span>
            <span className="stat-label">Agente IA</span>
          </div>
        </div>
      </div>

      {/* ROPICALC — producto hermano */}
      <a
        href="https://ropicalc.com"
        target="_blank"
        rel="noopener noreferrer"
        className="glass-card card-link ropi-banner"
      >
        <div className="card-icon-wrap ropi-icon">
          <img src="/ropicalc-icon.png" alt="" width={48} height={48} />
        </div>
        <div className="card-body">
          <div className="card-header">
            <span className="card-grade ropi-tag">Otra herramienta de Medicode</span>
            <span className="card-status active">Activo</span>
          </div>
          <h2 className="card-title">RopiCalc — 18 calculadoras clínicas</h2>
          <p className="card-desc">Ropivacaína, dosis pediátrica, ASA, Caprini, función renal y más. Funciona sin internet.</p>
          <div className="card-meta">
            <span>🧮 18 calculadoras</span>
            <span>📴 Offline</span>
            <span>📱 Web app</span>
          </div>
        </div>
        <div className="card-arrow">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6 14L14 6M14 6H8M14 6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </a>

      {/* TRIVIA */}
      <div className="section-label">Trivia general</div>

      <Link href="/general" className="glass-card card-link general">
        <div className="card-icon-wrap general-icon">🎯</div>
        <div className="card-body">
          <div className="card-header">
            <span className="card-grade general-tag">General</span>
            <span className="card-status active">Activo</span>
          </div>
          <h2 className="card-title">Trivia de Anestesiología</h2>
          <p className="card-desc">Preguntas de repaso general para todos los grados. Farmacología, fisiología y conceptos clave.</p>
          <div className="card-meta">
            <span>🎯 Trivia interactiva</span>
            <span>📊 Con puntaje</span>
          </div>
        </div>
        <div className="card-arrow">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </Link>

      {/* EXÁMENES */}
      <div className="section-label">Exámenes mensuales por grado</div>

      <div className="card-grid">
        <Link href="/r1" className="glass-card card-link r1">
          <div className="card-icon-wrap r1-icon">R1</div>
          <div className="card-body">
            <div className="card-header">
              <span className="card-grade r1-tag">R1</span>
              <span className="card-status active">Activo</span>
            </div>
            <h2 className="card-title">Exámenes R1</h2>
            <p className="card-desc">Vía aérea, evaluación preanestésica, ASA/Caprini y anestésicos locales.</p>
            <div className="card-meta">
              <span>📝 2 exámenes</span>
            </div>
          </div>
          <div className="card-arrow">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </Link>

        <Link href="/r2" className="glass-card card-link r2">
          <div className="card-icon-wrap r2-icon">R2</div>
          <div className="card-body">
            <div className="card-header">
              <span className="card-grade r2-tag">R2</span>
              <span className="card-status active">Activo</span>
            </div>
            <h2 className="card-title">Exámenes R2</h2>
            <p className="card-desc">Anestesia regional, tipos de bloqueo, anatomía y técnicas guiadas por ultrasonido.</p>
            <div className="card-meta">
              <span>📝 1 examen</span>
            </div>
          </div>
          <div className="card-arrow">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </Link>

        <div className="glass-card card-disabled">
          <div className="card-icon-wrap r3-icon">R3</div>
          <div className="card-body">
            <div className="card-header">
              <span className="card-grade r3-tag">R3</span>
              <span className="card-status soon">Pronto</span>
            </div>
            <h2 className="card-title">Exámenes R3</h2>
            <p className="card-desc">Temas por definir.</p>
          </div>
        </div>
      </div>

      {/* OPIOIDES */}
      <div className="section-label">Farmacología · Módulos temáticos</div>

      <Link href="/opioides" className="glass-card card-link opioides">
        <div className="card-icon-wrap opioides-icon">💊</div>
        <div className="card-body">
          <div className="card-header">
            <span className="card-grade opioides-tag">Farmacología</span>
            <span className="card-status active">Activo</span>
          </div>
          <h2 className="card-title">Módulo de Opioides</h2>
          <p className="card-desc">Quiz estilo ENARM, ruleta de preguntas y crucigrama interactivo. Receptores, farmacocinética, efectos adversos y casos perioperatorios.</p>
          <div className="card-meta">
            <span>📝 Quiz 15 preguntas</span>
            <span>🎡 Ruleta</span>
            <span>🔤 Crucigrama</span>
          </div>
        </div>
        <div className="card-arrow">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </Link>

      {/* MÓDULOS INTERACTIVOS */}
      <div className="section-label">Simuladores clínicos</div>

      <Link href="/ecoestudio" className="glass-card card-link eco">
        <div className="card-icon-wrap eco-icon">🔊</div>
        <div className="card-body">
          <div className="card-header">
            <span className="card-grade eco-tag">EcoEstudio</span>
            <span className="card-status active">Activo</span>
          </div>
          <h2 className="card-title">Ultrasonido en Anestesia Regional</h2>
          <p className="card-desc">Identifica estructuras anatómicas en la ventana ecográfica de bloqueos nerviosos periféricos.</p>
          <div className="card-meta">
            <span>🔊 2 bloqueos</span>
            <span>🎯 Interactivo</span>
          </div>
        </div>
        <div className="card-arrow">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </Link>

      <Link href="/anafilaxia" className="glass-card card-link sim" style={{ borderLeft: '4px solid #f87171' }}>
        <div className="card-icon-wrap sim-icon" style={{ background: 'rgba(239, 68, 68, 0.12)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.2)' }}>🚨</div>
        <div className="card-body">
          <div className="card-header">
            <span className="card-grade sim-tag" style={{ background: 'rgba(239, 68, 68, 0.12)', color: '#f87171' }}>Simulador</span>
            <span className="card-status active">Activo</span>
          </div>
          <h2 className="card-title">Anafilaxia Perioperatoria</h2>
          <p className="card-desc">Simulador interactivo de crisis hemodinámica y respiratoria en quirófano. Algoritmo NAP6 / Association of Anaesthetists y base fisiopatológica.</p>
          <div className="card-meta">
            <span>🚨 Simulación interactiva</span>
            <span>🔬 Fisiopatología</span>
            <span>📊 Guías 2021-2025</span>
          </div>
        </div>
        <div className="card-arrow">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </Link>

      <Link href="/cefalea-post-puncion" className="glass-card card-link sim" style={{ borderLeft: '4px solid #f97316' }}>
        <div className="card-icon-wrap sim-icon" style={{ background: 'rgba(249, 115, 22, 0.12)', color: '#f97316', border: '1px solid rgba(249, 115, 22, 0.2)' }}>💉</div>
        <div className="card-body">
          <div className="card-header">
            <span className="card-grade sim-tag" style={{ background: 'rgba(249, 115, 22, 0.12)', color: '#f97316' }}>Simulador</span>
            <span className="card-status active">Activo</span>
          </div>
          <h2 className="card-title">Cefalea Pos-Punción Dural</h2>
          <p className="card-desc">Fisiopatología interactiva de Monro-Kellie, calculadora diagnóstica ICHD-3 y simulador clínico de toma de decisiones terapéuticas.</p>
          <div className="card-meta">
            <span>🔬 Fisiopatología interactiva</span>
            <span>📋 Criterios ICHD-3</span>
            <span>💉 Manejo y segundo PHE</span>
          </div>
        </div>
        <div className="card-arrow">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </Link>

      <div className="card-grid">
        <Link href="/general/40-intoxicacion-last-simulador.html" className="glass-card card-link sim">
          <div className="card-icon-wrap sim-icon">🧪</div>
          <div className="card-body">
            <div className="card-header">
              <span className="card-grade sim-tag">Simulador</span>
              <span className="card-status active">Activo</span>
            </div>
            <h2 className="card-title">LAST — Intoxicación por Anestésicos Locales</h2>
            <p className="card-desc">Caso clínico interactivo con manejo paso a paso. Checklist ASRA integrado.</p>
          </div>
          <div className="card-arrow">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </Link>

        <Link href="/general/DAS Anestesia.html" className="glass-card card-link sim">
          <div className="card-icon-wrap sim-icon">🫁</div>
          <div className="card-body">
            <div className="card-header">
              <span className="card-grade sim-tag">Simulador</span>
              <span className="card-status active">Activo</span>
            </div>
            <h2 className="card-title">DAS 2025 · Vía Aérea Difícil</h2>
            <p className="card-desc">Algoritmo Planes A–D, caso clínico de VAD y quiz. Incluye escenario CICO.</p>
          </div>
          <div className="card-arrow">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </Link>
      </div>

      {/* HERRAMIENTAS IA */}
      <div className="section-label">Inteligencia artificial</div>

      <Link href="/protocolos" className="glass-card card-link ai-card">
        <div className="card-icon-wrap ai-icon">🤖</div>
        <div className="card-body">
          <div className="card-header">
            <span className="card-grade ai-tag">IA</span>
            <span className="card-status active">Activo</span>
          </div>
          <h2 className="card-title">Revisor de Protocolos de Investigación</h2>
          <p className="card-desc">Agente de IA que revisa, crea y mejora protocolos clínicos. Guía oficial 2019 + Oficio 2810/2026/345.</p>
          <div className="card-meta">
            <span>🤖 Agente IA</span>
            <span>📋 Checklist</span>
            <span>🏥 CEI / CNIC</span>
          </div>
        </div>
        <div className="card-arrow">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </Link>

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
