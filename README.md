AI Timetable Generator (Node.js + MongoDB)

Setup

1) Requirements
- Node.js 18+
- MongoDB running locally or a MongoDB URI

2) Install

```bash
npm install
```

3) Configure

Create a .env file:

```
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/ai_timetable_dev
```

4) Seed sample data

```bash
npm run seed
```

5) Run

```bash
npm run dev
```

API Quickstart

- POST /api/import/data (JSON) – bulk import students/courses/faculty/rooms
- GET  /api/data/courses – list courses
- POST /api/generate – trigger generation (placeholder)
- GET  /api/timetable/:semester – fetch timetable

Notes

- The generation service is a placeholder returning counts; integrate heuristic/CP logic later.


