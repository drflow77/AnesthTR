import http.server
import socketserver
import json
import urllib.request
import urllib.error
import os
import sys

# Leer la API Key de las variables de entorno
ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY")
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")

if not ANTHROPIC_API_KEY and not GEMINI_API_KEY:
    print("⚠️  ERROR: No se encontró ninguna API KEY.")
    print("Asegúrate de ejecutar el servidor con al menos una:")
    print("ANTHROPIC_API_KEY=\"tu_clave\" GEMINI_API_KEY=\"tu_clave\" python3 server.py")
    sys.exit(1)

PORT = 8000

class CORSRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Habilitar CORS para que el HTML pueda llamar a esta API local sin bloqueos
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        # Responder a las peticiones pre-flight de CORS
        self.send_response(200)
        self.end_headers()

    def do_POST(self):
        if self.path == '/api/chat':
            # Leer el body de la petición del HTML
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            
            try:
                data = json.loads(post_data.decode('utf-8'))
                provider = data.pop('provider', 'anthropic')
                
                if provider == 'gemini':
                    if not GEMINI_API_KEY:
                        raise Exception("GEMINI_API_KEY no está configurada en el servidor local.")
                    
                    system_msg = data.get('system', '')
                    messages = data.get('messages', [])
                    
                    gemini_contents = []
                    for msg in messages:
                        role = "user" if msg["role"] == "user" else "model"
                        parts = [{"text": str(msg["content"])}]
                        gemini_contents.append({"role": role, "parts": parts})
                        
                    gemini_payload = {"contents": gemini_contents}
                    if system_msg:
                        gemini_payload["systemInstruction"] = {"parts": [{"text": system_msg}]}
                    
                    req_data = json.dumps(gemini_payload).encode('utf-8')
                    url = f'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key={GEMINI_API_KEY}'
                    
                    req = urllib.request.Request(url, data=req_data, headers={'Content-Type': 'application/json'}, method='POST')
                    
                    with urllib.request.urlopen(req) as response:
                        res_json = json.loads(response.read().decode('utf-8'))
                        try:
                            reply_text = res_json['candidates'][0]['content']['parts'][0]['text']
                        except (KeyError, IndexError):
                            reply_text = "Error leyendo la respuesta de Gemini."
                        
                        # Mock anthropic format para el frontend
                        mock_response = {"content": [{"text": reply_text}]}
                        self.send_response(200)
                        self.send_header('Content-Type', 'application/json')
                        self.end_headers()
                        self.wfile.write(json.dumps(mock_response).encode('utf-8'))
                        
                else:
                    if not ANTHROPIC_API_KEY:
                        raise Exception("ANTHROPIC_API_KEY no está configurada en el servidor local.")
                        
                    # Anthropic request
                    req_data = json.dumps(data).encode('utf-8')
                    req = urllib.request.Request(
                        'https://api.anthropic.com/v1/messages', 
                        data=req_data,
                        headers={
                            'Content-Type': 'application/json',
                            'x-api-key': ANTHROPIC_API_KEY,
                            'anthropic-version': '2023-06-01'
                        },
                        method='POST'
                    )
                    
                    with urllib.request.urlopen(req) as response:
                        self.send_response(200)
                        self.send_header('Content-Type', 'application/json')
                        self.end_headers()
                        self.wfile.write(response.read())

            except urllib.error.HTTPError as e:
                error_message = e.read()
                self.send_response(e.code)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(error_message)
                print(f"Error de API: {error_message.decode('utf-8')}")
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode('utf-8'))
                print(f"Error interno: {e}")
        else:
            self.send_response(404)
            self.end_headers()

# Levantar el servidor
with socketserver.TCPServer(("", PORT), CORSRequestHandler) as httpd:
    print(f"✅ Servidor Proxy Local activo en: http://localhost:{PORT}")
    print(f"✅ Esperando peticiones de Gemini o Claude...")
    print(f"👉 Abre el archivo HTML en tu navegador.")
    print(f"Presiona Ctrl+C para detener el servidor.")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor detenido.")
