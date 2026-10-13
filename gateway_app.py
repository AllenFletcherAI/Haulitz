import os
import gradio as gr
from fastapi import HTTPException
from fastapi.responses import FileResponse
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

static_dir = os.path.join(os.path.dirname(__file__), "app", "static")
index_file = os.path.join(static_dir, "index.html")

def serve_static(file_path: str):
    target = os.path.normpath(os.path.join(static_dir, file_path))
    if not target.startswith(os.path.normpath(static_dir)):
        raise HTTPException(status_code=403, detail="Forbidden")
    if os.path.isfile(target):
        return FileResponse(target)
    raise HTTPException(status_code=404, detail="File not found")

def serve_root():
    return FileResponse(
        index_file,
        headers={
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache",
            "Expires": "0"
        }
    )

# Register static and root routes on demo.app
demo.app.add_api_route("/static/{file_path:path}", serve_static)
demo.app.add_api_route("/", serve_root)

# Include all FastAPI application routes from app.router
demo.app.include_router(app.router)

# Prepend our routes at the very front of demo.app.router.routes so they precede any Gradio handlers
for r in reversed(app.routes):
    demo.app.router.routes.insert(0, r)

# Ensure /static and / are at index 0 and 1
for p in ["/static/{file_path:path}", "/"]:
    matched = [r for r in demo.app.router.routes if getattr(r, "path", "") == p]
    if matched:
        demo.app.router.routes.insert(0, matched[0])

if __name__ == "__main__":
    demo.launch(server_name="0.0.0.0", server_port=7860)
else:
    demo.launch()
