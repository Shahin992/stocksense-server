# Smart Inventory Management Backend

Node.js + TypeScript backend API for inventory, products, categories, orders, activity logs, restock queue, and dashboard analytics.

## Features

- User registration (`/api/users/create-user`)
- Authentication with JWT login (`/api/auth/login`)
- Role-based access control (`admin`, `manager`, `user`)
- Category management
- Product management (create, update, delete, stock updates)
- Order management and order status updates
- Dashboard stats endpoint
- Activity logs endpoint
- Restock queue endpoint
- MongoDB integration with Mongoose
- Centralized error handling and 404 middleware

## Tech Stack

- Node.js
- Express 5
- TypeScript
- MongoDB + Mongoose
- JWT (`jsonwebtoken`)
- Input validation (`zod`, `express-validator`)

## Installation

1. Clone the repository

```bash
git clone <your-repo-url>
cd stocksense-server
```

2. Install dependencies

```bash
npm install
```

3. Create environment file

Create a `.env` file in the project root with:

```env
PORT=5000
NODE_ENV=development

DB_USERNAME=your_mongodb_username
DB_PASS=your_mongodb_password
DB_NAME=your_database_name

DB_SERVER_SELECTION_TIMEOUT_MS=10000
DB_CONNECT_TIMEOUT_MS=10000
DB_SOCKET_TIMEOUT_MS=20000

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

4. Run in development

```bash
npm run dev
```

The API will run at: `http://localhost:5000`

## Scripts

- `npm run dev` - Start development server with auto-reload
- `npm run build` - Compile TypeScript to `dist/`
- `npm start` - Run production build

## API Base URL

- `http://localhost:5000/api`

## Main Route Groups

- `/api/dashboard`
- `/api/users`
- `/api/auth`
- `/api/categories`
- `/api/products`
- `/api/orders`
- `/api/activity-logs`
- `/api/restock-queue`

## Security Note

- `.env` is ignored by git via `.gitignore`.
- If `.env` was already committed before, untrack it with:

```bash
git rm --cached .env
```

Then commit again.
