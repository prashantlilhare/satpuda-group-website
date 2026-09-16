# Backend — intentionally empty

This folder is a placeholder. **No server, database or API code exists yet**, by design.

The frontend is deliberately built so that a backend can be added here later without
restructuring anything:

| Concern | Where it lives today | What changes when the backend arrives |
| --- | --- | --- |
| Content (institutions, programmes, leadership, contact) | `frontend/src/data/*.js` — plain modules with named exports | Swap the module for a fetch/React Query layer; component props stay identical |
| Contact form | `frontend/src/pages/Contact.jsx` — client-side validation only, no network call | Add a `POST` to `/api/enquiries` in the submit handler; validation and UI states already exist |
| Images | `frontend/src/assets/images/**` — imported, hashed and optimised by Vite | Unchanged, or served from object storage if uploads are added |
| Routing | `react-router-dom` browser router in `frontend/src/App.jsx` | Unchanged |

## Suggested shape when work starts

```
backend/
├── src/
│   ├── config/       # db connection, env
│   ├── models/       # Mongoose schemas (Enquiry, Programme, ...)
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── .env.example
└── package.json
```

The first endpoint worth building is `POST /api/enquiries`, to receive the contact form.
Point the frontend at it with a `VITE_API_URL` environment variable.
