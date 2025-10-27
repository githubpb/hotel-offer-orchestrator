# 🏨 Hotel Offer Orchestrator

## Overview
Aggregates hotel offers from two mock suppliers, deduplicates by name, and returns the best-priced offer using Temporal and Redis.

## Tech Stack
- Node.js (TypeScript)
- Express
- Temporal.io
- Redis
- Docker Compose

## Setup
```bash
npm install
npm run dev
```
Or using Docker:
```bash
docker-compose up --build
```

## Endpoints
- `/api/hotels?city=delhi`
- `/api/hotels?city=delhi&minPrice=3000&maxPrice=6000`
- `/health`