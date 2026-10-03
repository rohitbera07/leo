# {{name}}

Semantic RAG project skeleton.

Leo installs the dependencies and creates the folder structure; the RAG implementation is intentionally left for you to build.

## Dependencies

- `fastapi` / `uvicorn[standard]` — API server
- `pydantic-settings` — typed environment configuration
- `python-multipart` — file uploads
- `pypdf` — PDF text extraction
- `fastembed` — lightweight ONNX embeddings
- `qdrant-client` — local vector storage/client
- `openai` — OpenAI-compatible LLM client

## Structure

- `app/main.py` — application entry point
- `app/api/routes/ingest.py` — document ingestion route
- `app/api/routes/query.py` — retrieval/query route
- `app/api/routes/health.py` — health endpoint
- `app/core/config.py` — settings
- `app/services/chunker.py` — chunking logic
- `app/services/llm.py` — LLM integration
- `app/vectorstore/qdrant.py` — vector-store integration

The API starts with `uvicorn app.main:app --reload` and exposes `GET /health`.
The ingestion and retrieval pipeline is a skeleton for you to implement.

The first real embedding operation will download the selected FastEmbed model.
