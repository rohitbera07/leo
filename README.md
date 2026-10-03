# Leo

### A lightweight backend project generator for developers who want a serious starting point.

**Leo** scaffolds production-oriented backend projects in seconds — from Express and Fastify APIs to FastAPI services, PostgreSQL/MongoDB backends, and RAG foundations.

No boilerplate hunting.  
No copying old projects.  
No bloated frameworks.

Just choose a template and start building.

```bash
npx create-leo my-api
```

---

##  Why Leo?

Starting a backend project usually means repeating the same setup:

- Create the project
- Configure the server
- Set up environment variables
- Add database configuration
- Create routes
- Add health checks
- Configure CORS
- Install dependencies
- Create a sensible folder structure

Leo handles that foundation for you.

You get a **clean, understandable project structure** that you can immediately extend into your own application.

> **Leo doesn't try to build your application for you. It gives you a solid starting point.**

---

##  Quick Start

### Create a project

```bash
npx create-leo my-api
```

Leo will guide you through the template selection:

```text
◇ Leo — backend project generator

◇ Choose a backend template
│
◆ Express + MongoDB
│ Express + PostgreSQL
│ Fastify + PostgreSQL
│ FastAPI + PostgreSQL
│ FastAPI + MongoDB
│ Semantic RAG
│ Hybrid RAG
```

Then:

```text
✔ Created my-api

Next steps

  cd my-api
  npm run dev
```

That's it.

---

#  Templates

Leo currently provides **7 backend templates**.

| Template | Stack | Best for |
|---|---|---|
| `express-mongodb` | Express 5 + Mongoose + MongoDB | REST APIs with MongoDB |
| `express-postgres` | Express 5 + pg + PostgreSQL | REST APIs with PostgreSQL |
| `fastify-postgres` | Fastify + pg + PostgreSQL | High-performance Node APIs |
| `fastapi-postgres` | FastAPI + SQLAlchemy + PostgreSQL | Python APIs with relational databases |
| `fastapi-mongodb` | FastAPI + async PyMongo + MongoDB | Python APIs with MongoDB |
| `semantic` | FastAPI + FastEmbed + Qdrant | Semantic RAG foundations |
| `hybrid` | Semantic + BM25 + RRF + optional reranking | Hybrid search / RAG systems |

---

#  What Leo Generates

Leo creates **real project files**, not code snippets pasted into strings.

For example:

```text
my-api/
├── src/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   └── server.js
│
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

The exact structure depends on the selected template.

Every template includes the fundamentals needed to start building:

- Environment configuration
- Health endpoint
- Routing structure
- Database foundation where applicable
- Error handling where applicable
- Development scripts
- README
- `.env.example`
- `.gitignore`

---

# RAG Templates

Leo also provides lightweight foundations for building **Retrieval-Augmented Generation (RAG)** applications.

Instead of forcing a large framework onto your project, Leo gives you a small, understandable foundation.

## Semantic RAG

```text
semantic/
└── app/
    ├── api/
    │   └── routes/
    │       ├── ingest.py
    │       ├── query.py
    │       └── health.py
    │
    ├── core/
    │   └── config.py
    │
    ├── services/
    │   ├── chunker.py
    │   └── llm.py
    │
    ├── vectorstore/
    │   └── qdrant.py
    │
    └── main.py
```

The files intentionally start as **clear scaffolding rather than a giant pre-built RAG implementation**.

This makes the architecture easier to understand, customize, and extend.

### Hybrid RAG

The hybrid template adds:

```text
Semantic Retrieval
       +
   BM25 Search
       ↓
   RRF Fusion
       ↓
Optional Reranking
```

It provides dedicated places for:

- BM25 retrieval
- Result fusion
- Optional cross-encoder reranking
- Semantic retrieval
- LLM integration

The reranker is **disabled by default** so you can start lightweight and enable it when needed.

---

#  Design Philosophy

Leo follows a few simple principles.

### Lightweight by default

No unnecessary framework layers.

Leo uses native platform features whenever they make sense.

### Understandable

Generated projects should be easy to read and modify.

You shouldn't need to understand a huge abstraction layer before changing your own backend.

### Production-oriented

The templates include practical foundations such as:

- Environment configuration
- Health checks
- Database separation
- Error handling
- Modular routing
- Sensible project structure

### No framework lock-in

Leo does not force your project into a particular application architecture.

You own the generated code.

### RAG without LangChain

RAG templates intentionally avoid LangChain.

Instead, the foundation uses focused components:

- FastEmbed
- Qdrant
- BM25
- RRF
- Optional cross-encoder reranking
- OpenAI-compatible LLM clients

This keeps the underlying retrieval architecture visible.

---

# Built With

Leo itself is intentionally small.

```text
TypeScript
      │
      ├── @clack/prompts
      ├── picocolors
      ├── Node.js native APIs
      └── tsup
```

The CLI uses native Node.js functionality where possible instead of adding dependencies for things Node already provides.

---

# LLM Flexibility

The RAG templates use an **OpenAI-compatible client interface**.

That means the LLM endpoint can be configured through:

```env
LLM_BASE_URL=
LLM_API_KEY=
LLM_MODEL=
```

You can therefore adapt the generated project to different OpenAI-compatible providers or local development setups without rewriting the application architecture.

---

#  Local Vector Storage

The RAG templates use **Qdrant local file storage**.

You don't need to run a separate Qdrant server just to experiment with the generated project.

This makes the starter particularly convenient for:

- Learning RAG
- Prototyping
- Local development
- Small projects
- Experiments

For production deployments, you can replace the local setup with your preferred hosted/vector infrastructure.

---

# Free-Friendly Development

Leo does not require a paid service just to generate a project.

For normal backend templates, you can use:

- Local MongoDB
- Local PostgreSQL
- Free database tiers
- Your own infrastructure

For RAG development:

- Qdrant can run locally
- FastEmbed provides local embeddings
- An LLM API is only required when you want generated answers

The first FastEmbed usage may download an embedding model. This is expected.

> **RAG dependencies are heavier than normal backend templates, so their first installation can take noticeably longer.**

---

# 🛠️ CLI Options

## Interactive mode

```bash
npx create-leo my-api
```

## Select a template directly

```bash
npx create-leo my-api --template express-mongodb
```

## Create a RAG project

```bash
npx create-leo my-rag --template hybrid
```

## Skip dependency installation

```bash
npx create-leo my-api --template express-mongodb --no-install
```

Useful for:

- CI
- Testing
- Offline setup
- Custom dependency installation
- Template inspection

## List available templates

```bash
npx create-leo --list
```

---

# 🐍 Python Support

Python templates require:

```text
Python 3.11+
```

Leo supports Python environments using:

```text
uv
```

when available, with a fallback to:

```text
venv + pip
```

This means you don't have to manually create a virtual environment every time you scaffold a Python backend.

---

# 📦 Requirements

### Node.js

```text
Node.js 22+
```

### Python

Required only for Python templates:

```text
Python 3.11+
```

`uv` is recommended but optional.

---

# 🔍 Example

Create a PostgreSQL backend:

```bash
npx create-leo orders-api --template express-postgres
```

Create a FastAPI + PostgreSQL backend:

```bash
npx create-leo backend --template fastapi-postgres
```

Create a hybrid RAG foundation:

```bash
npx create-leo knowledge-base --template hybrid
```

Then open the generated project and start building.

---

# 🗺️ What's Next?

Leo is intentionally starting small.

Possible future directions include:

- More backend templates
- Authentication foundations
- Redis-ready templates
- Queue/worker foundations
- More RAG architectures
- Better project customization
- Additional database options
- Template composition
- Project configuration
- More CLI commands

The goal is not to generate everything.

The goal is to make the **first 30 minutes of a backend project dramatically easier**.

---

# 🤝 Contributing

Contributions, ideas, template suggestions, and bug reports are welcome.

If you find a problem, please open an issue with:

1. Operating system
2. Node.js version
3. Python version (if applicable)
4. Leo command used
5. Error/output

---

# 📄 License

MIT

---

<div align="center">

**Built with Node.js + TypeScript**

⭐ If Leo is useful to you, consider giving the project a star.

</div>