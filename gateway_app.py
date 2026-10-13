import os
import gradio as gr
from app.main import app

# ZeroGPU contract compliance: Decorate handler for Hugging Face ZeroGPU runtime
try:
    import spaces
    @spaces.GPU
    def zero_gpu_pipeline():
        return True
except Exception:
    pass

# Create minimal Gradio demo container
with gr.Blocks(title="RedLine Gateway") as demo:
    gr.Markdown("# RedLine Gateway Active")

# Insert all FastAPI routes, static mounts, and endpoints at index 0 of demo.app.router.routes
# This ensures our custom HTML dashboard ("/"), static files ("/static"), and API ("/api/v1")
# take precedence over Gradio's internal catch-all routes and are served directly on the root domain.
for r in reversed(app.routes):
    demo.app.router.routes.insert(0, r)

if __name__ == "__main__":
    demo.launch(server_name="0.0.0.0", server_port=7860)
else:
    demo.launch()
