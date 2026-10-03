# {{name}}

Hybrid RAG project skeleton.

Leo installs the dependencies and creates the folder structure; the retrieval/ingestion implementation is intentionally left for you to build.

Hybrid is designed as a thin retrieval overlay on top of the semantic architecture: semantic search + BM25 + RRF + optional cross-encoder reranking. Keep one ingestion pipeline.

## Dependencies

Includes all Semantic RAG dependencies plus:

- `bm25s` — lexical/BM25 retrieval

The reranker uses the cross-encoder support provided by FastEmbed.

## Structure

- `app/main.py` — application entry point
- `app/api/routes/ingest.py` — shared ingestion route
- `app/api/routes/query.py` — hybrid query route
- `app/core/config.py` — settings
- `app/retrieval/bm25.py` — lexical retrieval
- `app/retrieval/fusion.py` — RRF fusion
- `app/retrieval/reranker.py` — optional cross-encoder reranking

Each Python file contains only a short note describing its responsibility.
