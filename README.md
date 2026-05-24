# Async Race

Frontend SPA for the Rolling Scopes School **Async Race** task.

The app manages cars in a garage, starts and stops their engines, runs races,
and stores winner statistics.

## Tech Stack

- React 18
- TypeScript
- Redux Toolkit
- React Router
- Vite
- ESLint Airbnb config
- Prettier

## Backend API

The frontend expects the provided mock server to run locally:

```bash
git clone https://github.com/mikhama/async-race-api.git
cd async-race-api
npm install
npm start
```

API URL:

```txt
http://127.0.0.1:3000
```

## Frontend Setup

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` - start the development server
- `npm run build` - create a production build
- `npm run lint` - run ESLint checks
- `npm run format` - format files with Prettier
- `npm run ci:format` - check formatting without changing files

## Important API Resources

- `/garage` - cars CRUD
- `/engine` - start, stop, and drive engine requests
- `/winners` - winner statistics CRUD

## Deployment

Deployment link will be added here after the frontend is deployed.

## Checklist

Final checklist and score will be added before submission.
