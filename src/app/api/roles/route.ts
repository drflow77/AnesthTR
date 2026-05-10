import { NextResponse } from 'next/server';

const GEMINI_URL = (key: string) =>
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`;

async function callGemini(apiKey: string, systemPrompt: string, userText: string, imageBase64?: string, imageMime?: string) {
  const parts: any[] = [];
  if (imageBase64 && imageMime) {
    parts.push({ inlineData: { mimeType: imageMime, data: imageBase64 } });
  }
  parts.push({ text: userText });

  const payload: any = {
    contents: [{ role: 'user', parts }],
    systemInstruction: { parts: [{ text: systemPrompt }] },
    generationConfig: { temperature: 0.2 },
  };

  const res = await fetch(GEMINI_URL(apiKey), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini error: ${err}`);
  }
  const json = await res.json();
  return json.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
}

export async function POST(req: Request) {
  const accessKey = req.headers.get('x-access-key');
  const expectedKey = process.env.PROTOCOLO_PASSWORD;
  if (!expectedKey || accessKey !== expectedKey) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'GEMINI_API_KEY no configurada' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { agent, data } = body;

    if (agent === 1) {
      // Agent 1: Extract rooms from screenshot
      const system = `Eres un extractor de datos médicos. Analiza la imagen del rol quirúrgico y extrae EXACTAMENTE lo que ves.
Responde ÚNICAMENTE con JSON válido, sin markdown, sin explicaciones.
Formato:
{
  "fecha": "string con la fecha que ves",
  "salas": [
    {
      "qx": "Q1",
      "pacientes": [
        { "nombre": "...", "diagnostico": "...", "cirugia": "..." }
      ]
    }
  ],
  "especiales": ["TOCO", "UX", "REQ", "CONSUL", "VPA"]
}
Si no ves alguna sala especial, omítela del array especiales.`;

      const text = await callGemini(apiKey, system,
        'Extrae todos los datos del rol quirúrgico de esta imagen.',
        data.imageBase64, data.imageMime);

      const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      let parsed;
      try { parsed = JSON.parse(clean); }
      catch { parsed = { raw: text, error: 'No se pudo parsear el JSON' }; }

      return NextResponse.json({ result: parsed });

    } else if (agent === 2) {
      // Agent 2: Distribute residents to rooms
      const { salas, especiales, residentes, fecha } = data;
      const system = `Eres el coordinador de residentes de anestesiología. Distribuye los residentes disponibles entre las salas quirúrgicas.
Reglas:
- Asigna exactamente UN residente por sala quirúrgica (Q1, Q2, etc.)
- Asigna residentes a los servicios especiales que corresponda (TOCO, UX, REQ, CONSUL, VPA)
- Distribuye equitativamente según año de residencia cuando sea posible (R3 para salas complejas)
- Si hay más salas que residentes disponibles, deja "SIN ASIGNAR" en esa sala
- Responde ÚNICAMENTE con JSON válido, sin markdown.
Formato:
{
  "salas": { "Q1": "NOMBRE", "Q2": "NOMBRE", ... },
  "especiales": { "TOCO": "NOMBRE", "UX": "NOMBRE", ... },
  "notas": "observaciones breves"
}`;

      const userMsg = `Fecha: ${fecha}
Salas activas: ${salas.map((s: any) => s.qx).join(', ')}
Servicios especiales: ${especiales.join(', ')}
Residentes disponibles: ${residentes.map((r: any) => `${r.nombre} (${r.año})`).join(', ')}`;

      const text = await callGemini(apiKey, system, userMsg);
      const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      let parsed;
      try { parsed = JSON.parse(clean); }
      catch { parsed = { raw: text, error: 'No se pudo parsear' }; }
      return NextResponse.json({ result: parsed });

    } else if (agent === 3) {
      // Agent 3: Verify no repeats using history
      const { propuesta, historial, residentes } = data;
      const system = `Eres el verificador de equidad en la distribución de residentes. Analiza si la propuesta actual repite asignaciones recientes.
Reglas:
- Un residente NO debe estar en la misma sala/servicio más de 2 veces en 7 días
- TOCO y UX son los servicios más demandantes — deben rotar más
- Si hay vacaciones marcadas, el residente NO debe aparecer
- Responde ÚNICAMENTE con JSON válido, sin markdown.
Formato:
{
  "aprobado": true/false,
  "conflictos": [
    { "residente": "NOMBRE", "sala": "Q1", "razon": "Ya estuvo en Q1 el día X" }
  ],
  "sugerencias": [
    { "sala": "Q1", "cambiar": "NOMBRE_ACTUAL", "por": "NOMBRE_SUGERIDO", "razon": "..." }
  ],
  "resumen": "texto breve"
}`;

      const historialStr = JSON.stringify(historial, null, 2);
      const propuestaStr = JSON.stringify(propuesta, null, 2);
      const userMsg = `Propuesta de hoy:\n${propuestaStr}\n\nHistorial últimos días:\n${historialStr}\n\nResidentes con vacaciones:\n${JSON.stringify(residentes.filter((r: any) => r.vacaciones))}`;

      const text = await callGemini(apiKey, system, userMsg);
      const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      let parsed;
      try { parsed = JSON.parse(clean); }
      catch { parsed = { raw: text, error: 'No se pudo parsear' }; }
      return NextResponse.json({ result: parsed });

    } else if (agent === 4) {
      // Agent 4: Final review
      const { propuesta, verificacion, salas, fecha, guardia } = data;
      const system = `Eres el revisor final del rol de salas del servicio de anestesiología. Tu tarea es dar el visto bueno final.
Revisa:
1. Que todas las salas activas tengan un residente asignado
2. Que los servicios especiales estén cubiertos
3. Que la distribución sea justa
4. Que no haya errores evidentes
Responde ÚNICAMENTE con JSON válido, sin markdown.
Formato:
{
  "aprobado": true/false,
  "rolFinal": {
    "salas": { "Q1": "NOMBRE", ... },
    "especiales": { "TOCO": "NOMBRE", ... }
  },
  "observaciones": ["obs1", "obs2"],
  "listo": true/false
}`;

      const userMsg = `Fecha: ${fecha} | Guardia: ${guardia}
Propuesta:\n${JSON.stringify(propuesta, null, 2)}
Resultado verificación:\n${JSON.stringify(verificacion, null, 2)}
Salas con pacientes:\n${JSON.stringify(salas.map((s: any) => s.qx))}`;

      const text = await callGemini(apiKey, system, userMsg);
      const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      let parsed;
      try { parsed = JSON.parse(clean); }
      catch { parsed = { raw: text, error: 'No se pudo parsear' }; }
      return NextResponse.json({ result: parsed });

    } else {
      return NextResponse.json({ error: 'Agente inválido' }, { status: 400 });
    }
  } catch (err: any) {
    console.error('Error /api/roles:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
