# Async Race

**Score: 370 / 400**

**Deployment:** https://async-race-iota.vercel.app

**Repository:** https://github.com/MATE099/async-race

Frontend SPA for the Rolling Scopes School **Async Race** task.

The app manages cars in a garage, starts and stops their engines, runs races,
and stores winner statistics.

## Tech Stack

- React 18
- TypeScript (strict mode)
- Redux Toolkit
- React Router
- Vite
- ESLint (Airbnb config)
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

## Checklist ___/400 pts

### UI Deployment

- [x] **Deployment Platform:** Deployed on Vercel

### Requirements to Commits and Repository

- [x] **Commit guidelines compliance:** Conventional Commits format used
- [x] **Checklist included in README.md**
- [x] **Score calculation:** 370 / 400
- [x] **UI Deployment link in README.md**

### Basic Structure (80 points)

- [x] **Two Views (10 points):** Garage and Winners
- [x] **Garage View Content (30 points):** view name, car panel, race controls, garage section
- [x] **Winners View Content (10 points):** view name, winners table, pagination
- [x] **Persistent State (30 points):** page numbers, inputs, and sort state preserved between views

### Garage View (90 points)

- [x] **Car Creation And Editing Panel. CRUD Operations (20 points)**
- [x] **Color Selection (10 points)**
- [x] **Random Car Creation (20 points)**
- [x] **Car Management Buttons (10 points)**
- [x] **Pagination (10 points):** 7 cars per page
- [x] **Empty Garage (10 points)**
- [x] **Empty Garage Page (10 points):** moves to previous page when last car on page is removed

### Winners View (50 points)

- [x] **Display Winners (15 points)**
- [x] **Pagination for Winners (10 points):** 10 winners per page
- [x] **Winners Table (15 points):** number, icon, name, wins, best time
- [x] **Sorting Functionality (10 points):** sort by wins and best time (server-side)

### Race (170 points)

- [x] **Start Engine Animation (20 points)**
- [x] **Stop Engine Animation (20 points)**
- [x] **Responsive Animation (30 points)**
- [x] **Start Race Button (10 points)**
- [x] **Reset Race Button (15 points)**
- [x] **Winner Announcement (5 points)**
- [x] **Button States (20 points)**
- [ ] **Actions during the race (50 points):** partially implemented — Race and Generate buttons are disabled during a race; other actions (delete, edit, pagination) are not fully blocked

### Prettier and ESLint Configuration (10 points)

- [x] **Prettier Setup (5 points):** `format` and `ci:format` scripts
- [x] **ESLint Configuration (5 points):** Airbnb config with `lint` script

### Overall Code Quality (100 points) — skipped during self-check

- [ ] Discretionary points awarded by reviewer
