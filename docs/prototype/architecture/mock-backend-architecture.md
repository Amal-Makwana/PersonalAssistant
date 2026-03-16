# Mock Backend Architecture

## Mock Events API

The prototype mock backend is implemented in `apps/api` with Express and follows layered routing:

- `routes/events.routes.ts` defines `GET /events`
- `controllers/events.controller.ts` parses query options and maps service responses to HTTP status codes
- `services/events.service.ts` applies scenario behavior and optional latency simulation
- `repositories/events.repository.ts` reads fixture-backed data
- `fixtures/events.fixture.json` is the deterministic source of event payloads

### Runtime characteristics
- Local-only runtime on `http://localhost:3000`
- CORS + JSON middleware enabled
- Optional latency simulation (`delay=true`) in the 300ms–800ms range
- Error simulation (`scenario=error`) returns `500`
