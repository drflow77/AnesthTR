import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const accessKey = req.headers.get('x-access-key');
    const expectedKey = process.env.PROTOCOLO_PASSWORD;
    if (!expectedKey || accessKey !== expectedKey) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const data = await req.json();
    const provider = data.provider || 'gemini';
    const system_msg = data.system || '';
    const messages = data.messages || [];
    const file = data.file;

    if (provider === 'gemini') {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return NextResponse.json({ error: 'GEMINI_API_KEY no está configurada en .env.local' }, { status: 500 });
      }

      // Convertir formato de mensajes a Gemini
      const gemini_contents = messages.map((msg: any, index: number) => {
        const role = msg.role === 'user' ? 'user' : 'model';
        const parts: any[] = [];
        
        // Adjuntar el archivo al último mensaje del usuario
        if (file && role === 'user' && index === messages.length - 1) {
          parts.push({
            inlineData: {
              mimeType: file.mimeType,
              data: file.data
            }
          });
        }
        
        parts.push({ text: String(msg.content) });

        return { role, parts };
      });

      const gemini_payload: any = { contents: gemini_contents };
      if (system_msg) {
        gemini_payload.systemInstruction = { parts: [{ text: system_msg }] };
      }

      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gemini_payload)
      });

      if (!response.ok) {
        const errText = await response.text();
        return NextResponse.json({ error: `Error de Gemini: ${errText}` }, { status: response.status });
      }

      const res_json = await response.json();
      const reply_text = res_json.candidates?.[0]?.content?.parts?.[0]?.text || "Error leyendo la respuesta de Gemini.";

      // Devolver en el formato mock que espera nuestro Frontend
      return NextResponse.json({ content: [{ text: reply_text }] });

    } else {
      // Proveedor Anthropic (Claude)
      const apiKey = process.env.ANTHROPIC_API_KEY;
      if (!apiKey) {
        return NextResponse.json({ error: 'ANTHROPIC_API_KEY no está configurada en .env.local' }, { status: 500 });
      }

      // Extraer propiedades para limpiar el payload
      const { provider: _, file: __, ...anthropicPayload } = data;

      // Adjuntar archivo al último mensaje si existe
      if (file && anthropicPayload.messages.length > 0) {
        const lastMsg = anthropicPayload.messages[anthropicPayload.messages.length - 1];
        if (lastMsg.role === 'user') {
          const textContent = lastMsg.content;
          lastMsg.content = [
            {
              type: "document",
              source: {
                type: "base64",
                media_type: file.mimeType,
                data: file.data
              }
            },
            {
              type: "text",
              text: textContent
            }
          ];
        }
      }

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify(anthropicPayload)
      });

      if (!response.ok) {
        const errText = await response.text();
        return NextResponse.json({ error: `Error de Anthropic: ${errText}` }, { status: response.status });
      }

      const res_json = await response.json();
      return NextResponse.json(res_json);
    }
  } catch (error: any) {
    console.error("Error en API Route /api/chat:", error);
    return NextResponse.json({ error: error.message || 'Error interno del servidor' }, { status: 500 });
  }
}
