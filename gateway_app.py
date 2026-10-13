import os
import uvicorn
import gradio as gr
from app.main import app

# ZeroGPU contract compliance: Decorate and wire handler for Hugging Face ZeroGPU runtime
try:
    import spaces
    @spaces.GPU
    def zero_gpu_pipeline():
        return True
except ImportError:
    class spaces:
        @staticmethod
        def GPU(fn):
            return fn

    @spaces.GPU
    def zero_gpu_pipeline():
        return True

# Create Gradio demo container with wired ZeroGPU function
with gr.Blocks(title="RedLine Gateway") as demo:
    gr.Markdown("# RedLine Gateway Active")
    btn = gr.Button("GPU Probe", visible=False)
    btn.click(zero_gpu_pipeline)

# Mount Gradio onto the master FastAPI application at "/gradio"
# FastAPI natively serves root "/", "/static", and all "/api/v1" endpoints directly.
app = gr.mount_gradio_app(app, demo, path="/gradio")

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 7860))
    uvicorn.run(app, host="0.0.0.0", port=port)
