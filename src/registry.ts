export type TemplateId =
  | 'express-mongodb'
  | 'express-postgres'
  | 'fastify-postgres'
  | 'fastapi-postgres'
  | 'fastapi-mongodb'
  | 'semantic'
  | 'hybrid';

export type Template = {
  id: TemplateId;
  label: string;
  group: string;
  language: 'node' | 'python';
  description: string;
  postInstall: string[];
  overlay?: string;
};

export const templates: Template[] = [
  { id: 'express-mongodb', label: 'Express + MongoDB', group: 'Node.js', language: 'node', description: 'Express 5 API with Mongoose and MongoDB', postInstall: ['npm install'] },
  { id: 'express-postgres', label: 'Express + PostgreSQL', group: 'Node.js', language: 'node', description: 'Express 5 API with pg Pool and PostgreSQL', postInstall: ['npm install'] },
  { id: 'fastify-postgres', label: 'Fastify + PostgreSQL', group: 'Node.js', language: 'node', description: 'Fastify API with pg Pool and PostgreSQL', postInstall: ['npm install'] },
  { id: 'fastapi-postgres', label: 'FastAPI + PostgreSQL', group: 'Python', language: 'python', description: 'FastAPI with SQLAlchemy and PostgreSQL', postInstall: ['python -m pip install -r requirements.txt'] },
  { id: 'fastapi-mongodb', label: 'FastAPI + MongoDB', group: 'Python', language: 'python', description: 'FastAPI with native async PyMongo', postInstall: ['python -m pip install -r requirements.txt'] },
  { id: 'semantic', label: 'Semantic RAG', group: 'AI / RAG', language: 'python', description: 'FastAPI + FastEmbed + local Qdrant + configurable LLM', postInstall: ['python -m pip install -r requirements.txt'] },
  { id: 'hybrid', label: 'Hybrid RAG', group: 'AI / RAG', language: 'python', description: 'Semantic RAG plus BM25, RRF fusion and optional reranking', postInstall: ['python -m pip install -r requirements.txt'], overlay: 'semantic' }
];

export function getTemplate(id: string): Template | undefined {
  return templates.find((t) => t.id === id);
}
