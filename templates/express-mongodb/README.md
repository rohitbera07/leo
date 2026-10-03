# {{name}}

Express 5 + MongoDB starter using Node 22 native `--watch` and `--env-file`.

## Run

```bash
cp .env.example .env
npm run dev
```

MongoDB is connected lazily after startup. `GET /health` works without MongoDB.
For a free hosted database, use MongoDB Atlas and put its URI in `MONGODB_URI`.
