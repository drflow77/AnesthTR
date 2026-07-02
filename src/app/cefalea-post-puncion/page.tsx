"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function CefaleaPostPuncionPage() {
  const [activeTab, setActiveTab] = useState<'intro' | 'fisio' | 'diagnostico' | 'simulador' | 'referencias'>('intro');

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
        {activeTab === 'fisio' && <div style={{ color: 'var(--text-muted)' }}>Módulo Fisiopatología en desarrollo...</div>}
        {activeTab === 'diagnostico' && <div style={{ color: 'var(--text-muted)' }}>Módulo Diagnóstico en desarrollo...</div>}
        {activeTab === 'simulador' && <div style={{ color: 'var(--text-muted)' }}>Módulo Caso Clínico en desarrollo...</div>}
        {activeTab === 'referencias' && <div style={{ color: 'var(--text-muted)' }}>Módulo Referencias en desarrollo...</div>}
      </div>
    </main>
  );
}