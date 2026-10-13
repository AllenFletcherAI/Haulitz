import os
import uvicorn
import gradio as gr
from app.main import app

# Responsive styles to render the full RedLine Gateway dashboard smoothly
custom_css = """
body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; background-color: #0f172a; }
.gradio-container { max-width: 100% !important; padding: 0 !important; margin: 0 !important; }
footer { display: none !important; }
iframe { width: 100%; height: 100vh; border: none; display: block; }
"""

with gr.Blocks(title="RedLine Gateway", css=custom_css) as demo:
    gr.HTML("""
    <iframe src="/" style="width: 100vw; height: 100vh; border: 0; margin: 0; padding: 0; display: block;"></iframe>
    """)

# Mount Gradio onto the existing FastAPI application at /gradio
# Root "/" continues to serve the primary executive dashboard
app = gr.mount_gradio_app(app, demo, path="/gradio")

if __name__ == "__main__":
    port = int(os.getenv("PORT", 7860))
    host = os.getenv("HOST", "0.0.0.0")
    print(f"[*] Starting RedLine Gateway on {host}:{port} (Hugging Face Spaces Bridge)...")
    uvicorn.run(app, host=host, port=port)
