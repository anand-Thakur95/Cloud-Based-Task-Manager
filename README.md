# Task Management App

Full-stack task management application with:

- `Frontend`: React + Vite + Redux Toolkit Query
- `Backend`: Node.js + Express + MongoDB (Mongoose)
- Cookie-based JWT authentication

## Project Structure

```text
Task Management/
  Frontend/   # React client
  Backend/    # Express API
```

## Tech Stack

- Frontend: React 19, Vite, Redux Toolkit, React Router, Tailwind CSS
- Backend: Express 5, Mongoose, JWT, bcryptjs, cookie-parser, cors
- Database: MongoDB

## Prerequisites

- Node.js 18+
- npm
- MongoDB instance (local or cloud)

## Environment Variables

Create `Backend/.env`:

```env
PORT=8800
MONGODB_URL=mongodb://127.0.0.1:27017/task-manager
JWT_SECRET=your_super_secret_key
NODE_ENV=development
```

Create `Frontend/.env`:

```env
VITE_APP_BASE_URL=http://localhost:8800
```

## Installation

Install backend dependencies:

```bash
cd Backend
npm install
```

Install frontend dependencies:

```bash
cd ../Frontend
npm install
```

## Run Locally

Start backend:

```bash
cd Backend
npm start
```

Start frontend:

```bash
cd Frontend
npm run dev
```

Default local URLs:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8800`

## API Base

All API routes are served under:

`/api`

Examples:

- `/api/user/login`
- `/api/task/dashboard`

## Main API Endpoints

User routes:

- `POST /api/user/register`
- `POST /api/user/login`
- `POST /api/user/logout`
- `GET /api/user/get-team` (admin)
- `GET /api/user/notifications`
- `PUT /api/user/profile`
- `PUT /api/user/read-noti`
- `PUT /api/user/change-password`
- `PUT /api/user/:id` (admin activate/deactivate)
- `DELETE /api/user/:id` (admin delete user)

Task routes:

- `POST /api/task/create` (admin)
- `POST /api/task/duplicate/:id` (admin)
- `POST /api/task/activity/:id`
- `GET /api/task/dashboard`
- `GET /api/task`
- `GET /api/task/:id`
- `PUT /api/task/create-subtask/:id` (admin)
- `PUT /api/task/update/:id` (admin)
- `PUT /api/task/:id` (admin, move to trash)
- `DELETE /api/task/delete-restore/:id`

## Authentication

- Backend sets a `token` cookie on login/register.
- Protected endpoints require that cookie.
- Admin-only routes are enforced by `isAdmin` middleware.

## Notes

- Backend CORS is currently configured for `http://localhost:5173`.
- Frontend sends credentials (`credentials: include`) for auth requests.
