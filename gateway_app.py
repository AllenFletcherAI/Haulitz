import os
import uvicorn
import gradio as gr
from app.main import app

# Create minimal Gradio block to fulfill Hugging Face Spaces Gradio SDK runtime contract
with gr.Blocks(title="RedLine Gateway") as demo:
    gr.Markdown("# RedLine Gateway Active")

# Mount Gradio onto the existing FastAPI application at "/"
# Pre-registered FastAPI routes (/, /static, /api/v1, /health) take precedence,
# serving the full custom RedLine Gateway SPA dashboard directly to all visitors.
hf_app = gr.mount_gradio_app(app, demo, path="/")

if __name__ == "__main__":
    port = int(os.getenv("PORT", 7860))
    host = os.getenv("HOST", "0.0.0.0")
    print(f"[*] Starting RedLine Gateway on {host}:{port} (Hugging Face Spaces Bridge)...")
    uvicorn.run(hf_app, host=host, port=port)
