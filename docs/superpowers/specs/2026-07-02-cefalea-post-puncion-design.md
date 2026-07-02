# Especificación de Diseño: Módulo Interactivo de Cefalea Pos-Punción Dural (CPPD)

Este documento especifica el diseño pedagógico, técnico y de interfaz de usuario para el nuevo módulo educativo interactivo de Cefalea Pos-Punción Dural en la plataforma **AnesthTR**.

## 1. Objetivos del Módulo
* Explicar de forma interactiva y visual la fisiopatología de la CPPD basada en la pérdida de soporte hidráulico cerebral y la vasodilatación compensatoria (Doctrina de Monro-Kellie).
* Facilitar el diagnóstico diferencial mediante una calculadora interactiva de los criterios de la **ICHD-3** (Código 8.1.3).
* Evaluar y reforzar la toma de decisiones clínicas mediante un simulador clínico ramificado de caso obstétrico basado en las directrices y consensos actuales (2021-2025).

---

## 2. Arquitectura de la Interfaz y Flujo de Usuario

El módulo se implementará en una sola ruta de Next.js (`src/app/cefalea-post-puncion/page.tsx`) siguiendo el **Enfoque A** (Single Page Application con máquina de estados de React).

El estado principal `currentStep` manejará las siguientes vistas:
1. `intro`: Pantalla de bienvenida, objetivos y epidemiología básica.
2. `pathophysiology`: Simulador visual de la dinámica de presiones de LCR y tracción cerebral (Decúbito vs Bipedestación).
3. `diagnosis`: Checklist interactivo basado en criterios diagnósticos ICHD-3 y "Banderas Rojas".
4. `simulator`: Simulador clínico ramificado paso a paso con retroalimentación inmediata.
5. `summary`: Conclusión, referencias bibliográficas interactivas y puntaje final del simulador.

---

## 3. Especificación Detallada de Secciones

### Sección A: Fisiopatología Interactiva
* **UI/UX:**
  * Un panel dividido en dos columnas (móviles: fila única).
  * **Columna Izquierda:** SVG dinámico del cráneo y canal medular. Un selector (Toggle) cambia la posición del paciente: `Decúbito Supino (Acostado)` / `Bipedestación (De pie)`.
  * **Columna Derecha:** Tarjetas informativas dinámicas con explicaciones de los mecanismos activos en cada posición.
* **Comportamiento dinámico:**
  * Al activar `Bipedestación`:
    * El cerebro en el SVG se desplaza 6px hacia abajo.
    * Se dibujan líneas de tracción rojas animadas en la base del cerebro y senos venosos.
    * Las venas cerebrales se ensanchan simulando venodilatación compensatoria.
    * Se activan explicaciones específicas sobre la Doctrina de Monro-Kellie.
  * Al activar `Decúbito Supino`:
    * El cerebro retorna a la posición original.
    * Desaparece la tracción y se reduce el calibre vascular.

### Sección B: Criterios Diagnósticos ICHD-3
* **Checklist Clínico:**
  * Criterio A: Punción dural previa.
  * Criterio B: Inicio dentro de los 5 días posteriores.
  * Criterio C: Cefalea ortostática (empeora en 15 min al pararse, mejora en 15 min al acostarse).
  * Criterio D: Presencia de al menos un síntoma asociado (rigidez de nuca, tinnitus, hipoacusia, fotofobia, náuseas).
  * Criterio E: No se explica mejor por otra patología.
* **Lógica del Resultado:**
  * Si se marcan todos los criterios, se despliega una tarjeta de confirmación en verde con sombreado y bordes iluminados.
  * Se incluye una tarjeta de advertencia permanente sobre **"Banderas Rojas"** (fiebre, focalización neurológica, alteración de la consciencia) que obligan a considerar otros diagnósticos (p. ej., meningitis o trombosis de senos venosos).

### Sección C: Simulador Clínico (Caso: Sofía, 28 años)
* **Datos Dinámicos de Pantalla:**
  * Escala Visual Análoga (EVA) del dolor: Representada visualmente de 0 a 10 con una barra de gradiente dinámico.
  * Barra de progreso de decisiones (5 pasos).
* **Decisiones Clave:**
  1. *Diagnóstico Inicial:* Elegir evaluación clínica estructurada vs TAC inmediata.
  2. *Tratamiento Inicial:* Elegir manejo conservador (hidratación, cafeína, analgésicos) vs Parche Hemático Epidural (PHE) inmediato (profiláctico) vs reposo absoluto estricto.
  3. *Indicación de PHE:* Identificar cuándo el fallo del manejo conservador a las 36 horas justifica ofrecer un PHE terapéutico.
  4. *Técnica del PHE:* Elegir volumen óptimo de sangre autóloga (15-20 mL) y velocidad de inyección lenta vs otros volúmenes inapropiados.
  5. *Alta y Prevención:* Seleccionar instrucciones de alta correctas (evitar esfuerzos y Valsalva, uso de laxantes, signos de alarma).

---

## 4. Diseño Visual y Estilos (Aesthetics)
Siguiendo los lineamientos premium de **AnesthTR**:
* **Paleta de Colores:**
  * Fondo: Oscuro profundo (`#060a14`).
  * Superficies: Tarjetas de vidrio con desenfoque de fondo (`rgba(15, 23, 42, 0.6)` con `backdrop-filter: blur(12px)`).
  * Bordes: Delgados y sutiles (`rgba(51, 65, 85, 0.4)`).
  * Acento Principal (Cefalea): Gradiente de naranja a amarillo dorado (`#f97316` a `#fbbf24`).
* **Tipografía:**
  * Fuentes nativas de Inter, con jerarquías claras utilizando pesos de 500, 700 y 900.
* **Micro-animaciones:**
  * Transiciones suaves de 0.3s en hover de tarjetas y botones.
  * Animación en bucle de la fuga de LCR (gotitas de SVG cayendo).

---

## 5. Plan de Verificación
* **Verificación de Tipos:** Ejecutar `npm run build` para asegurar que TypeScript no reporte errores de tipado o de dependencias de Next.js / React 19.
* **Verificación Funcional:** Probar todas las ramas del simulador clínico para garantizar que el estado de la paciente (EVA, barra de progreso) responda correctamente a las opciones.
* **Validación de Accesibilidad y Responsividad:** Asegurar que los componentes y la navegación funcionen perfectamente en pantallas móviles y de escritorio.
