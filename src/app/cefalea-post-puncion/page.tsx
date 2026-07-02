"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function CefaleaPostPuncionPage() {
  const [activeTab, setActiveTab] = useState<'intro' | 'fisio' | 'diagnostico' | 'simulador' | 'referencias'>('intro');
  const [isStanding, setIsStanding] = useState(false);
  const [expandedCard, setExpandedCard] = useState<number | null>(1);

  return (
    <main className="container">
      {/* Header con gradientes */}
      <div className="hero" style={{ paddingBottom: '20px' }}>
        <div className="hero-glow" />
        <div style={{ marginBottom: '10px' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'rgba(249, 115, 22, 0.12)', color: '#f97316',
            padding: '4px 12px', borderRadius: '4px', fontSize: '11px',
            fontWeight: 700, letterSpacing: '0.4px',
            border: '1px solid rgba(249, 115, 22, 0.3)',
          }}>
            SIMULACIÓN Y CLÍNICA
          </span>
        </div>
        <h1 style={{
          fontSize: '32px', fontWeight: 900, letterSpacing: '-0.04em',
          background: 'linear-gradient(135deg, #f8fafc 30%, #f97316 65%, #fbbf24 100%)',
          WebkitBackgroundClip: 'text', color: 'transparent',
          marginBottom: '10px',
        }}>
          Cefalea Pos-Punción Dural
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto' }}>
          Fisiopatología interactiva, criterios ICHD-3 y simulador de toma de decisiones terapéuticas.
        </p>
      </div>

      {/* Back link */}
      <Link href="/" style={{
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px',
        transition: 'color 0.15s',
      }}>
        ← Volver al inicio
      </Link>

      {/* Navigation tabs */}
      <div style={{
        display: 'flex', gap: '8px', borderBottom: '1px solid var(--border)',
        paddingBottom: '12px', marginBottom: '20px', overflowX: 'auto',
      }}>
        {(['intro', 'fisio', 'diagnostico', 'simulador', 'referencias'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: activeTab === tab ? 'rgba(249, 115, 22, 0.15)' : 'transparent',
              color: activeTab === tab ? '#f97316' : 'var(--text-secondary)',
              border: activeTab === tab ? '1px solid rgba(249, 115, 22, 0.4)' : '1px solid transparent',
              padding: '8px 16px', borderRadius: '8px', fontSize: '13px',
              fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
              whiteSpace: 'nowrap',
            }}
          >
            {tab === 'intro' && 'Introducción'}
            {tab === 'fisio' && '🔬 Fisiopatología'}
            {tab === 'diagnostico' && '📋 Criterios ICHD-3'}
            {tab === 'simulador' && '🎮 Caso Clínico'}
            {tab === 'referencias' && '📖 Referencias'}
          </button>
        ))}
      </div>

      {/* Contenedor dinámico */}
      <div className="glass-card" style={{ padding: '24px', minHeight: '300px' }}>
        {activeTab === 'intro' && (
          <div>
            <h2 style={{ fontSize: '20px', marginBottom: '12px', color: '#f1f5f9' }}>Cefalea Pos-Punción Dural (CPPD)</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>
              La CPPD es una complicación iatrogénica frecuente tras bloqueos neuroaxiales (raquídeo o epidural). Ocurre por la punción involuntaria de la duramadre, provocando una fuga persistente de líquido cefalorraquídeo.
            </p>
            <div style={{
              background: 'rgba(15, 23, 42, 0.4)', borderRadius: '12px',
              border: '1px solid var(--border)', padding: '16px', marginBottom: '16px'
            }}>
              <h3 style={{ fontSize: '14px', color: '#f97316', marginBottom: '8px' }}>🎯 Objetivos de Aprendizaje:</h3>
              <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li>Comprender la dinámica de presiones y la teoría de Monro-Kellie.</li>
                <li>Aplicar de forma rigurosa los criterios de la ICHD-3.</li>
                <li>Aprender el manejo conservador, técnico del Parche Hemático Epidural (PHE) y pautas de alta.</li>
                <li>Aprender a reaccionar ante una falla o recidiva del primer PHE.</li>
              </ul>
            </div>
            <button 
              onClick={() => setActiveTab('fisio')}
              style={{
                background: 'linear-gradient(135deg, #f97316 0%, #fbbf24 100%)',
                color: '#060a14', border: 'none', padding: '12px 24px',
                borderRadius: '8px', fontSize: '14px', fontWeight: 700,
                cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px'
              }}
            >
              Comenzar Estudio →
            </button>
          </div>
        )}
        {activeTab === 'fisio' && (
          <div>
            {/* Local Styles for animation */}
            <style>{`
              @keyframes drip {
                0% {
                  transform: translateY(0px) scale(0.8);
                  opacity: 0;
                }
                15% {
                  opacity: 1;
                }
                85% {
                  opacity: 1;
                }
                100% {
                  transform: translateY(40px) scale(0.5);
                  opacity: 0;
                }
              }
              .droplet-container {
                animation: drip 1.8s infinite cubic-bezier(0.4, 0, 0.6, 1);
              }
              .d1 { animation-delay: 0s; }
              .d2 { animation-delay: 0.6s; }
              .d3 { animation-delay: 1.2s; }
              
              @keyframes pulseRed {
                0%, 100% { opacity: 0.6; }
                50% { opacity: 1; }
              }
              .traction-line {
                stroke-dasharray: 4 2;
                animation: pulseRed 1.5s infinite ease-in-out;
              }
              
              @media (max-width: 768px) {
                .fisio-grid {
                  grid-template-columns: 1fr !important;
                }
                .svg-panel {
                  height: 320px !important;
                }
              }
            `}</style>

            <div className="fisio-grid" style={{
              display: 'grid',
              gridTemplateColumns: '1.1fr 1.2fr',
              gap: '32px',
              alignItems: 'start',
            }}>
              {/* Left Column: Selector and SVG */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f1f5f9', margin: '0 0 4px 0' }}>
                  Simulador de Posición Corporal
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
                  Cambia la postura del paciente para observar los cambios en la presión hidrostática y tracción meníngea.
                </p>

                {/* Glass Button Group */}
                <div style={{
                  display: 'flex',
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '4px',
                  width: '100%',
                  boxSizing: 'border-box',
                }}>
                  <button
                    onClick={() => setIsStanding(false)}
                    style={{
                      flex: 1,
                      padding: '10px 16px',
                      borderRadius: '8px',
                      border: 'none',
                      background: !isStanding ? 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)' : 'transparent',
                      color: !isStanding ? '#ffffff' : 'var(--text-secondary)',
                      fontWeight: 600,
                      fontSize: '13px',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: !isStanding ? '0 4px 12px rgba(14, 165, 233, 0.3)' : 'none',
                    }}
                  >
                    🛏️ Decúbito Supino
                  </button>
                  <button
                    onClick={() => setIsStanding(true)}
                    style={{
                      flex: 1,
                      padding: '10px 16px',
                      borderRadius: '8px',
                      border: 'none',
                      background: isStanding ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' : 'transparent',
                      color: isStanding ? '#ffffff' : 'var(--text-secondary)',
                      fontWeight: 600,
                      fontSize: '13px',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: isStanding ? '0 4px 12px rgba(239, 68, 68, 0.3)' : 'none',
                    }}
                  >
                    🧍 Bipedestación
                  </button>
                </div>

                {/* SVG Panel */}
                <div className="svg-panel" style={{
                  background: 'rgba(15, 23, 42, 0.4)',
                  border: '1px solid var(--border)',
                  borderRadius: '16px',
                  height: '420px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '16px',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  {/* Absolute subtle background glow */}
                  <div style={{
                    position: 'absolute',
                    width: '180px',
                    height: '180px',
                    borderRadius: '50%',
                    background: isStanding ? 'rgba(239, 68, 68, 0.05)' : 'rgba(14, 165, 233, 0.05)',
                    filter: 'blur(40px)',
                    top: '50px',
                    left: 'calc(50% - 90px)',
                    transition: 'all 0.5s ease',
                    pointerEvents: 'none',
                  }} />

                  <svg
                    viewBox="0 0 300 400"
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  >
                    {/* Definitions */}
                    <defs>
                      <linearGradient id="csfGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity={isStanding ? "0.08" : "0.22"} />
                        <stop offset="80%" stopColor="#0ea5e9" stopOpacity={isStanding ? "0.05" : "0.15"} />
                        <stop offset="100%" stopColor="#0284c7" stopOpacity="0.25" />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>

                    {/* 1. Subarachnoid Space (CSF Space) - Glow Fill */}
                    <path
                      d="M 150,48 C 96,48 88,94 88,140 C 88,174 114,184 135,204 L 135,365 L 165,365 L 165,204 C 186,184 212,174 212,140 C 212,94 204,48 150,48 Z"
                      fill="url(#csfGrad)"
                      stroke="#0ea5e9"
                      strokeWidth="1"
                      strokeOpacity={isStanding ? 0.3 : 0.6}
                      style={{ transition: 'stroke-opacity 0.5s ease' }}
                    />

                    {/* 2. Dilated meningeal vessels inside skull */}
                    <g style={{ transition: 'all 0.5s ease' }}>
                      {/* Left Meningeal Vessel */}
                      <path
                        d="M 98,135 Q 92,95 112,78 Q 124,68 138,72"
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth={isStanding ? 3 : 1}
                        strokeOpacity={isStanding ? 0.8 : 0.25}
                        style={{ transition: 'stroke-width 0.5s ease, stroke-opacity 0.5s ease' }}
                      />
                      {/* Right Meningeal Vessel */}
                      <path
                        d="M 202,135 Q 208,95 188,78 Q 176,68 162,72"
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth={isStanding ? 3 : 1}
                        strokeOpacity={isStanding ? 0.8 : 0.25}
                        style={{ transition: 'stroke-width 0.5s ease, stroke-opacity 0.5s ease' }}
                      />
                      {/* Top Vessel Branches */}
                      <path
                        d="M 112,78 Q 125,82 135,88"
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth={isStanding ? 2 : 0.7}
                        strokeOpacity={isStanding ? 0.8 : 0.2}
                        style={{ transition: 'stroke-width 0.5s ease, stroke-opacity 0.5s ease' }}
                      />
                      <path
                        d="M 188,78 Q 175,82 165,88"
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth={isStanding ? 2 : 0.7}
                        strokeOpacity={isStanding ? 0.8 : 0.2}
                        style={{ transition: 'stroke-width 0.5s ease, stroke-opacity 0.5s ease' }}
                      />
                    </g>

                    {/* 3. Outer Skull & Spinal Canal Contour */}
                    <path
                      d="M 150,40 C 90,40 80,90 80,140 C 80,180 110,190 130,210 L 130,370 L 170,370 L 170,210 C 190,190 220,180 220,140 C 220,90 210,40 150,40 Z"
                      fill="none"
                      stroke="#475569"
                      strokeWidth="2.5"
                    />

                    {/* 4. Dural Tear / Punción Dural (L3-L4 region) */}
                    {/* Visual gap and tear marker on the right dural wall at y=320 */}
                    <path
                      d="M 170,314 L 170,326"
                      stroke="#0f172a"
                      strokeWidth="3.5"
                    />
                    <path
                      d="M 170,315 L 164,320 L 170,325"
                      stroke="#f97316"
                      strokeWidth="2"
                      fill="none"
                      filter="url(#glow)"
                    />
                    <text
                      x="180"
                      y="323"
                      fill="#f97316"
                      fontSize="9"
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      Punción L3-L4
                    </text>

                    {/* 5. Dripping droplets */}
                    <g>
                      <g className="droplet-container d1">
                        <circle cx="166" cy="320" r="2.5" fill="#38bdf8" />
                      </g>
                      <g className="droplet-container d2">
                        <circle cx="166" cy="320" r="2.5" fill="#38bdf8" />
                      </g>
                      <g className="droplet-container d3">
                        <circle cx="166" cy="320" r="2.5" fill="#38bdf8" />
                      </g>
                    </g>

                    {/* 6. Dynamic Brain and Spinal Cord Group */}
                    <g
                      style={{
                        transform: isStanding ? 'translateY(6px)' : 'translateY(0px)',
                        transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                      {/* Brainstem & Spinal Cord */}
                      <path
                        d="M 144,180 L 144,340 C 144,343 156,343 156,340 L 156,180 Z"
                        fill="#cbd5e1"
                        stroke="#94a3b8"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M 150,185 L 150,330"
                        stroke="#94a3b8"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                        fill="none"
                      />

                      {/* Brain Cerebrum & Cerebellum */}
                      <path
                        d="M 150,65 C 115,65 98,90 98,125 C 98,150 110,165 125,168 C 122,175 125,185 135,188 C 140,192 142,205 142,230 L 158,230 C 158,205 160,192 165,188 C 175,185 178,175 175,168 C 190,165 202,150 202,125 C 202,90 185,65 150,65 Z"
                        fill="#cbd5e1"
                        stroke="#94a3b8"
                        strokeWidth="2"
                      />

                      {/* Gyri / internal squiggles */}
                      <path d="M 120,90 Q 130,95 140,90" stroke="#94a3b8" strokeWidth="1.5" fill="none" opacity="0.6" />
                      <path d="M 110,120 Q 130,110 145,120" stroke="#94a3b8" strokeWidth="1.5" fill="none" opacity="0.6" />
                      <path d="M 125,145 Q 140,140 150,150" stroke="#94a3b8" strokeWidth="1.5" fill="none" opacity="0.6" />
                      <path d="M 180,90 Q 170,95 160,90" stroke="#94a3b8" strokeWidth="1.5" fill="none" opacity="0.6" />
                      <path d="M 190,120 Q 170,110 155,120" stroke="#94a3b8" strokeWidth="1.5" fill="none" opacity="0.6" />
                      <path d="M 175,145 Q 160,140 150,150" stroke="#94a3b8" strokeWidth="1.5" fill="none" opacity="0.6" />
                    </g>

                    {/* 7. Wavy Traction Lines - Anchor points on skull y=48 stretching to brain y=65/71 */}
                    <g
                      style={{
                        opacity: isStanding ? 1 : 0,
                        transform: isStanding ? 'scaleY(1.35)' : 'scaleY(1)',
                        transformOrigin: '150px 48px',
                        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                      stroke="#ef4444"
                      strokeWidth="1.5"
                      fill="none"
                    >
                      {/* Left traction line */}
                      <path d="M 120,48 Q 117,53 123,58 T 120,66" className="traction-line" />
                      {/* Center traction line */}
                      <path d="M 150,48 Q 147,53 153,58 T 150,66" className="traction-line" />
                      {/* Right traction line */}
                      <path d="M 180,48 Q 177,53 183,58 T 180,66" className="traction-line" />
                    </g>

                    {/* 8. Downward Force Arrows */}
                    <g
                      style={{
                        opacity: isStanding ? 1 : 0,
                        transition: 'opacity 0.5s ease',
                      }}
                      fill="#ef4444"
                    >
                      <path d="M 120,74 L 120,81 M 117,78 L 120,81 L 123,78" stroke="#ef4444" strokeWidth="1.5" fill="none" />
                      <path d="M 150,74 L 150,81 M 147,78 L 150,81 L 153,78" stroke="#ef4444" strokeWidth="1.5" fill="none" />
                      <path d="M 180,74 L 180,81 M 177,78 L 180,81 L 183,78" stroke="#ef4444" strokeWidth="1.5" fill="none" />
                    </g>
                  </svg>
                </div>
              </div>

              {/* Right Column: Dynamic details & Accordion */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Dynamic details card */}
                <div style={{
                  background: isStanding ? 'rgba(239, 68, 68, 0.05)' : 'rgba(14, 165, 233, 0.05)',
                  border: isStanding ? '1px solid rgba(239, 68, 68, 0.2)' : '1px solid rgba(14, 165, 233, 0.2)',
                  borderRadius: '12px',
                  padding: '16px',
                  transition: 'all 0.5s ease',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '18px' }}>{isStanding ? '⚠️' : '✅'}</span>
                    <strong style={{ fontSize: '14px', color: isStanding ? '#f87171' : '#38bdf8' }}>
                      {isStanding ? 'Tracción Gravitacional Activa (Bipedestación)' : 'Compensación de Presión (Supino)'}
                    </strong>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>
                    {isStanding ? (
                      'La posición vertical aumenta la presión hidrostática en la columna, lo que incrementa el ritmo de fuga del LCR. Al reducirse el volumen y flotabilidad del LCR cerebral, el cerebro "desciende", traccionando las meninges sensitivas y provocando cefalea intensa.'
                    ) : (
                      'Al acostarse, la gradiente hidrostática entre la cabeza y la columna se anula. La fuga disminuye y la presión intracraneal se estabiliza. La tracción sobre las meninges y pares craneales cesa, aliviando la cefalea de forma inmediata.'
                    )}
                  </p>
                </div>

                {/* Accordion / Card Deck */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {/* Card 1 */}
                  <div
                    onClick={() => setExpandedCard(expandedCard === 1 ? null : 1)}
                    className="glass-card"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'stretch',
                      padding: '16px',
                      cursor: 'pointer',
                      border: expandedCard === 1 ? '1px solid rgba(14, 165, 233, 0.4)' : '1px solid var(--border)',
                      background: expandedCard === 1 ? 'rgba(15, 23, 42, 0.6)' : 'rgba(15, 23, 42, 0.3)',
                      transition: 'all 0.3s ease',
                      transform: 'none',
                      opacity: 1,
                      animation: 'none',
                      gap: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '100px',
                          background: 'rgba(56, 189, 248, 0.12)',
                          color: '#38bdf8',
                        }}>
                          VOLUMEN
                        </span>
                        <h4 style={{ margin: 0, fontSize: '14px', color: '#f1f5f9', fontWeight: 600 }}>
                          1. Fuga de Líquido Cefalorraquídeo
                        </h4>
                      </div>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        {expandedCard === 1 ? '▼' : '▲'}
                      </span>
                    </div>

                    {expandedCard === 1 && (
                      <div style={{
                        marginTop: '8px',
                        fontSize: '13px',
                        color: 'var(--text-secondary)',
                        lineHeight: '1.6',
                        borderTop: '1px solid rgba(255,255,255,0.06)',
                        paddingTop: '8px',
                      }}>
                        <p style={{ margin: '0 0 8px 0' }}>
                          La punción de la duramadre deja un orificio persistente por el cual el LCR se extravasa hacia el espacio epidural, reduciendo el volumen intratecal total.
                        </p>
                        <div style={{
                          background: 'rgba(14, 165, 233, 0.08)',
                          padding: '10px',
                          borderRadius: '8px',
                          border: '1px solid rgba(14, 165, 233, 0.15)',
                          fontSize: '12px',
                        }}>
                          <strong>Balance de Dinámica:</strong> La producción fisiológica es de unos <strong>~0.35 ml/min</strong> (aprox. 500 ml/día). Si el flujo de fuga de la brecha dural supera esta cifra, se produce un balance de volumen negativo.
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card 2 */}
                  <div
                    onClick={() => setExpandedCard(expandedCard === 2 ? null : 2)}
                    className="glass-card"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'stretch',
                      padding: '16px',
                      cursor: 'pointer',
                      border: expandedCard === 2 ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid var(--border)',
                      background: expandedCard === 2 ? 'rgba(15, 23, 42, 0.6)' : 'rgba(15, 23, 42, 0.3)',
                      transition: 'all 0.3s ease',
                      transform: 'none',
                      opacity: 1,
                      animation: 'none',
                      gap: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '100px',
                          background: 'rgba(239, 68, 68, 0.12)',
                          color: '#f87171',
                        }}>
                          MECÁNICA
                        </span>
                        <h4 style={{ margin: 0, fontSize: '14px', color: '#f1f5f9', fontWeight: 600 }}>
                          2. Pérdida de Soporte Hidráulico
                        </h4>
                      </div>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        {expandedCard === 2 ? '▼' : '▲'}
                      </span>
                    </div>

                    {expandedCard === 2 && (
                      <div style={{
                        marginTop: '8px',
                        fontSize: '13px',
                        color: 'var(--text-secondary)',
                        lineHeight: '1.6',
                        borderTop: '1px solid rgba(255,255,255,0.06)',
                        paddingTop: '8px',
                      }}>
                        <p style={{ margin: '0 0 8px 0' }}>
                          El cerebro está inmerso en LCR. Por el principio de flotabilidad, su peso efectivo se reduce dramáticamente.
                        </p>
                        <div style={{
                          background: 'rgba(239, 68, 68, 0.08)',
                          padding: '10px',
                          borderRadius: '8px',
                          border: '1px solid rgba(239, 68, 68, 0.15)',
                          fontSize: '12px',
                        }}>
                          <strong>Efecto Flotabilidad:</strong> El cerebro pasa de un peso aparente de <strong>50 g</strong> a su peso real de <strong>1400 g</strong> al perder el amortiguador de LCR. Esto somete a tracción por gravedad a las meninges y a los nervios craneales <strong>V, IX y X</strong>.
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card 3 */}
                  <div
                    onClick={() => setExpandedCard(expandedCard === 3 ? null : 3)}
                    className="glass-card"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'stretch',
                      padding: '16px',
                      cursor: 'pointer',
                      border: expandedCard === 3 ? '1px solid rgba(251, 191, 36, 0.4)' : '1px solid var(--border)',
                      background: expandedCard === 3 ? 'rgba(15, 23, 42, 0.6)' : 'rgba(15, 23, 42, 0.3)',
                      transition: 'all 0.3s ease',
                      transform: 'none',
                      opacity: 1,
                      animation: 'none',
                      gap: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '100px',
                          background: 'rgba(251, 191, 36, 0.12)',
                          color: '#fbbf24',
                        }}>
                          MONRO-KELLIE
                        </span>
                        <h4 style={{ margin: 0, fontSize: '14px', color: '#f1f5f9', fontWeight: 600 }}>
                          3. Doctrina de Monro-Kellie
                        </h4>
                      </div>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        {expandedCard === 3 ? '▼' : '▲'}
                      </span>
                    </div>

                    {expandedCard === 3 && (
                      <div style={{
                        marginTop: '8px',
                        fontSize: '13px',
                        color: 'var(--text-secondary)',
                        lineHeight: '1.6',
                        borderTop: '1px solid rgba(255,255,255,0.06)',
                        paddingTop: '8px',
                      }}>
                        <p style={{ margin: '0 0 8px 0' }}>
                          El volumen dentro de la cavidad craneana rígida es siempre constante e incompresible.
                        </p>
                        <div style={{
                          background: 'rgba(251, 191, 36, 0.08)',
                          padding: '10px',
                          borderRadius: '8px',
                          border: '1px solid rgba(251, 191, 36, 0.15)',
                          fontSize: '12px',
                          marginBottom: '8px',
                        }}>
                          <strong>Fórmula:</strong> V<sub>encéfalo</sub> + V<sub>sangre</sub> + V<sub>LCR</sub> = Constante
                        </div>
                        <p style={{ margin: 0 }}>
                          Como el volumen de LCR cae, el volumen vascular venoso aumenta de manera compensatoria. Esta venodilatación (especialmente venas meningeas y senos) genera congestión y el característico dolor pulsátil.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'diagnostico' && <div style={{ color: 'var(--text-muted)' }}>Módulo Diagnóstico en desarrollo...</div>}
        {activeTab === 'simulador' && <div style={{ color: 'var(--text-muted)' }}>Módulo Caso Clínico en desarrollo...</div>}
        {activeTab === 'referencias' && <div style={{ color: 'var(--text-muted)' }}>Módulo Referencias en desarrollo...</div>}
      </div>
    </main>
  );
}