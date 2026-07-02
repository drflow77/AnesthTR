# Plan de Implementación del Módulo de Cefalea Pos-Punción Dural (CPPD)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Crear una página interactiva sobre Cefalea Pos-Punción Dural en la ruta `/cefalea-post-puncion` que integre explicación fisiopatológica (SVG interactivo), calculadora diagnóstica (ICHD-3) y un simulador de caso clínico ramificado de 6 pasos.

**Architecture:** Una sola página de Next.js (`src/app/cefalea-post-puncion/page.tsx`) en el lado del cliente (`use client`) estructurada mediante una máquina de estados para navegar entre pestañas/vistas (`intro`, `fisiopatologia`, `diagnostico`, `simulador`, `resumen`).

**Tech Stack:** Next.js (App Router), React 19, TypeScript, Vanilla CSS e inline styles.

---

### Task 1: Scaffolding y Base de la Máquina de Estados

**Files:**
* Create: [page.tsx](file:///Users/drflow/Desktop/AnesthTR/src/app/cefalea-post-puncion/page.tsx)
* Test: Validar la renderización básica accediendo al servidor de desarrollo (`http://localhost:3000/cefalea-post-puncion`).

- [ ] **Step 1: Crear archivo con estructura base, navegación y estados principales**
  Escribir el esqueleto de la página con el selector de pestañas (`Fisiopatología`, `Diagnóstico (ICHD-3)`, `Simulador Clínico`).
  ```tsx
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
  ```

- [ ] **Step 2: Commit base setup**
  ```bash
  git add src/app/cefalea-post-puncion/page.tsx
  git commit -m "feat: setup basic route and state tab machine for CPPD"
  ```

---

### Task 2: Sección de Fisiopatología Interactiva (Fisio)

**Files:**
* Modify: [page.tsx](file:///Users/drflow/Desktop/AnesthTR/src/app/cefalea-post-puncion/page.tsx)

- [ ] **Step 1: Implementar el SVG dinámico y panel de control**
  Desarrollar el diagrama SVG interactivo con el cerebro, espacio subaracnoideo y gotas animadas, que responda al Toggle de posición (`Decúbito` vs `Bipedestación`).
  * En `Bipedestación` mover el cerebro 5-7px hacia abajo (`transform: translateY(6px)`), engrosar los vasos arteriales/venosos (`strokeWidth` de 1.5 a 4), y mostrar líneas de tensión meninges.
  * Implementar el acordeón dinámico de Monro-Kellie.

- [ ] **Step 2: Probar el cambio de posición en el navegador**
  Verificar que las animaciones de caída del cerebro, la dilatación de las venas y las líneas rojas de tracción se rendericen de forma fluida y que las explicaciones textuales cambien de acuerdo al Toggle.

- [ ] **Step 3: Commit pathophysiology**
  ```bash
  git add src/app/cefalea-post-puncion/page.tsx
  git commit -m "feat: implement interactive pathophysiology SVG and Monro-Kellie panels"
  ```

---

### Task 3: Calculadora Diagnóstica ICHD-3 y Banderas Rojas (Diagnostico)

**Files:**
* Modify: [page.tsx](file:///Users/drflow/Desktop/AnesthTR/src/app/cefalea-post-puncion/page.tsx)

- [ ] **Step 1: Implementar calculadora interactiva ICHD-3**
  Crear el formulario reactivo que almacene las respuestas a los criterios (Punción previa, latencia < 5 días, empeora al pararse, presencia de al menos 1 síntoma asociado, descarte de diagnósticos diferenciales).
  * Crear la lógica de validación para determinar si el resultado es compatible con la codificación oficial de la ICHD-3.
  * Añadir el panel de signos de alarma de "Banderas Rojas" de forma destacada en color rojo translúcido.

- [ ] **Step 2: Probar la lógica en el navegador**
  Asegurar que al marcar todas las casillas requeridas el cartel se pinte de color verde y que si se desmarca alguna cambie a alerta amarilla.

- [ ] **Step 3: Commit diagnosis calculator**
  ```bash
  git add src/app/cefalea-post-puncion/page.tsx
  git commit -m "feat: implement ICHD-3 diagnostic calculator and red flags warning panel"
  ```

---

### Task 4: Caso Clínico - Parte 1 (Pasos 1 a 3)

**Files:**
* Modify: [page.tsx](file:///Users/drflow/Desktop/AnesthTR/src/app/cefalea-post-puncion/page.tsx)

- [ ] **Step 1: Implementar esqueleto de simulación y variables de estado**
  * Definir variables de estado en React para rastrear el paso del simulador (`simStep`), el dolor del paciente (`evaPain`), la capacidad de lactar (`breastfeeding`), la respuesta seleccionada, y si se muestra la retroalimentación.
  * Implementar la interfaz visual: barra superior de estado de la paciente, caja narrativa de historia y opciones del Paso 1, 2 y 3.

- [ ] **Step 2: Escribir lógica de flujo y feedback de los primeros 3 pasos**
  * Paso 1: Diagnóstico (Elegir evaluación clínica vs TAC cerebral).
  * Paso 2: Manejo Inicial (Elegir conservador vs parche profiláctico vs reposo estricto).
  * Paso 3: Falla de manejo conservador (Identificar indicación de parche terapéutico).

- [ ] **Step 3: Probar el flujo de los pasos 1-3**
  Verificar que el EVA del dolor responda a las respuestas elegidas y que aparezca el panel emergente con la explicación de la guía de práctica clínica.

- [ ] **Step 4: Commit simulator part 1**
  ```bash
  git add src/app/cefalea-post-puncion/page.tsx
  git commit -m "feat: implement clinical simulator steps 1-3 with EVA and feedback"
  ```

---

### Task 5: Caso Clínico - Parte 2 (Pasos 4 a 6, Falla del PHE y Alta)

**Files:**
* Modify: [page.tsx](file:///Users/drflow/Desktop/AnesthTR/src/app/cefalea-post-puncion/page.tsx)

- [ ] **Step 1: Implementar pasos 4, 5 y 6**
  * Paso 4: Técnica del PHE (Elegir volumen de 15-20 mL de sangre autóloga inyectada lentamente).
  * Paso 5 (Falla del Parche): Sofía experimenta retorno de dolor EVA 7/10 a las 24 horas del primer PHE. El usuario debe decidir: descartar banderas rojas y ofrecer un segundo PHE.
  * Paso 6: Alta y Prevención (Seleccionar indicaciones de reposo relativo, evitar Valsalva/esfuerzos, laxantes).
  * Implementar la pantalla final con resumen del caso, porcentaje de acierto, y referencias bibliográficas en formato APA e hipervínculos.

- [ ] **Step 2: Probar todo el flujo del simulador de punta a punta**
  Completar el simulador eligiendo respuestas correctas e incorrectas, validando que el paso 5 (falla del PHE) y el paso 6 de alta funcionen correctamente y que la pantalla final muestre el resumen.

- [ ] **Step 3: Commit simulator part 2**
  ```bash
  git add src/app/cefalea-post-puncion/page.tsx
  git commit -m "feat: complete simulator steps 4-6 including EBP failure and discharge instructions"
  ```

---

### Task 6: Integración en la Página de Inicio

**Files:**
* Modify: [page.tsx](file:///Users/drflow/Desktop/AnesthTR/src/app/page.tsx):160-180 (Aproximadamente)

- [ ] **Step 1: Agregar el card interactivo en la pantalla principal**
  Insertar un nuevo bloque `<Link>` para la Cefalea Pos-Punción Dural dentro de la sección de "Simuladores clínicos", utilizando un acento naranja (`#f97316`) y la ruta `/cefalea-post-puncion`.
  ```tsx
  <Link href="/cefalea-post-puncion" className="glass-card card-link sim" style={{ borderLeft: '4px solid #f97316' }}>
    <div className="card-icon-wrap sim-icon" style={{ background: 'rgba(249, 115, 22, 0.12)', color: '#f97316', border: '1px solid rgba(249, 115, 22, 0.2)' }}>💉</div>
    <div className="card-body">
      <div className="card-header">
        <span className="card-grade sim-tag" style={{ background: 'rgba(249, 115, 22, 0.12)', color: '#f97316' }}>Simulador</span>
        <span className="card-status active">Activo</span>
      </div>
      <h2 className="card-title">Cefalea Pos-Punción Dural</h2>
      <p className="card-desc">Fisiopatología tridimensional de Monro-Kellie, criterios ICHD-3 y simulador interactivo de Parche Hemático Epidural.</p>
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
  ```

- [ ] **Step 2: Probar el enlace en la página de inicio**
  Hacer click en el nuevo card para verificar que redirija exitosamente a `/cefalea-post-puncion`.

- [ ] **Step 3: Commit integration**
  ```bash
  git add src/app/page.tsx
  git commit -m "feat: integrate CPPD module card on home page"
  ```

---

### Task 7: Compilación y Verificación Final

**Files:**
* Test: Ejecutar compilación de producción

- [ ] **Step 1: Ejecutar verificación de producción en la terminal**
  Run: `npm run build`
  Expected: Compilación exitosa de Next.js sin errores de TypeScript ni sintaxis.

- [ ] **Step 2: Commit final**
  ```bash
  git commit --allow-empty -m "chore: verified build and completed CPPD interactive module"
  ```
