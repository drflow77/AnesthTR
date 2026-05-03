import Link from 'next/link';

export default function Home() {
  return (
    <main className="container">
      <div className="logo-container">
        <div className="logo-brand">
          <img src="/logo.PNG" alt="AnesthTR" className="logo-img" />
        </div>
        <h1 className="logo-subtitle">Evaluaciones de Anestesiología · DFC Medical Apps</h1>
      </div>

      <div className="section-label">Trivia general</div>

      <Link href="/general" className="glass-card card-link general">
        <div className="card-header">
          <span className="card-grade general-tag">General</span>
          <span className="card-status active">● Activo</span>
        </div>
        <h2 className="card-title">Trivia de Anestesiología</h2>
        <p className="card-desc">Preguntas de repaso general para todos los grados. Farmacología, fisiología y conceptos clave.</p>
        <div className="card-meta">
          <span>🎯 Trivia interactiva</span>
          <span>📊 Con puntaje</span>
        </div>
        <div className="card-arrow">→</div>
      </Link>

      <div className="section-label">Exámenes mensuales por grado</div>

      <Link href="/r1" className="glass-card card-link r1">
        <div className="card-header">
          <span className="card-grade r1-tag">R1</span>
          <span className="card-status active">● Activo</span>
        </div>
        <h2 className="card-title">Exámenes R1 — Marzo 2026</h2>
        <p className="card-desc">Vía aérea, evaluación preanestésica, clasificaciones ASA/Caprini y anestésicos locales.</p>
        <div className="card-meta">
          <span>📝 2 exámenes</span>
          <span>📊 Con calificación</span>
        </div>
        <div className="card-arrow">→</div>
      </Link>

      <Link href="/r2" className="glass-card card-link r2">
        <div className="card-header">
          <span className="card-grade r2-tag">R2</span>
          <span className="card-status active">● Activo</span>
        </div>
        <h2 className="card-title">Exámenes R2 — Marzo 2026</h2>
        <p className="card-desc">Anestesia regional, tipos de bloqueo, anatomía y técnicas guiadas por ultrasonido.</p>
        <div className="card-meta">
          <span>📝 1 examen</span>
          <span>🫀 Anestesia Regional</span>
        </div>
        <div className="card-arrow">→</div>
      </Link>

      <div className="glass-card card-disabled r3">
        <div className="card-header">
          <span className="card-grade r3-tag">R3</span>
          <span className="card-status soon">Próximamente</span>
        </div>
        <h2 className="card-title">Exámenes R3 — Marzo 2026</h2>
        <p className="card-desc">Temas por definir.</p>
        <div className="card-meta">
          <span>📝 Próximamente</span>
        </div>
      </div>

      <div className="section-label">Módulos interactivos</div>

      <Link href="/ecoestudio" className="glass-card card-link general">
        <div className="card-header">
          <span className="card-grade general-tag">EcoEstudio</span>
          <span className="card-status active">● Activo</span>
        </div>
        <h2 className="card-title">EcoEstudio — Ultrasonido en Anestesia Regional</h2>
        <p className="card-desc">Identifica estructuras anatómicas en la ventana ecográfica de bloqueos nerviosos periféricos.</p>
        <div className="card-meta">
          <span>🔊 2 bloqueos disponibles</span>
          <span>🎯 Juego interactivo</span>
        </div>
        <div className="card-arrow">→</div>
      </Link>

      <Link href="/general/40-intoxicacion-last-simulador.html" className="glass-card card-link general">
        <div className="card-header">
          <span className="card-grade general-tag">Simulador</span>
          <span className="card-status active">● Activo</span>
        </div>
        <h2 className="card-title">Simulador LAST — Intoxicación por Anestésicos Locales</h2>
        <p className="card-desc">Caso clínico interactivo con manejo paso a paso según el Checklist ASRA. Aprende qué hacer y qué evitar.</p>
        <div className="card-meta">
          <span>🧪 Caso clínico ramificado</span>
          <span>📋 Guía ASRA integrada</span>
        </div>
        <div className="card-arrow">→</div>
      </Link>

      <Link href="/general/DAS Anestesia.html" className="glass-card card-link general">
        <div className="card-header">
          <span className="card-grade general-tag">Simulador</span>
          <span className="card-status active">● Activo</span>
        </div>
        <h2 className="card-title">DAS 2025 · Guía y Simulador de Vía Aérea Difícil</h2>
        <p className="card-desc">Algoritmo interactivo Planes A–D, caso clínico de VAD y quiz de la guía DAS 2025. Incluye escenario CICO.</p>
        <div className="card-meta">
          <span>🫁 Algoritmo A→D</span>
          <span>🚨 Simulador + Quiz</span>
        </div>
        <div className="card-arrow">→</div>
      </Link>

      <div className="section-label">Herramientas de investigación</div>

      <Link href="/protocolos" className="glass-card card-link general">
        <div className="card-header">
          <span className="card-grade general-tag">IA</span>
          <span className="card-status active">● Activo</span>
        </div>
        <h2 className="card-title">Revisor de Protocolos de Investigación</h2>
        <p className="card-desc">Agente de IA que revisa, crea y mejora protocolos clínicos. Basado en la guía oficial de criterios 2019 y el Oficio 2810/2026/345.</p>
        <div className="card-meta">
          <span>🤖 Agente IA</span>
          <span>📋 Checklist oficial</span>
          <span>🏥 CEI / CNIC</span>
        </div>
        <div className="card-arrow">→</div>
      </Link>

      <footer className="footer">
        <div className="footer-text">
          Coordinación de Anestesiología — Turno Vespertino<br />
          DFC Medical Apps<br /><br />
          Desarrollado por <a href="https://ropicalc.com" target="_blank" rel="noopener noreferrer">DFC Medical Apps</a>
          <p className="disclaimer">
            ⚠️ Este sitio tiene fines exclusivamente educativos. La información aquí presentada no sustituye el juicio clínico ni las recomendaciones de sociedades médicas vigentes. Siempre consulta fuentes primarias antes de tomar decisiones clínicas.
          </p>
        </div>
      </footer>
    </main>
  );
}
