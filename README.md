## Nike-BE

A simple Express + MongoDB backend for a Nike-like store. Provides product, spotlight, user auth, and Stripe checkout endpoints.

### Tech Stack
- **Runtime**: Node.js (CommonJS)
- **Framework**: Express
- **Database**: MongoDB with Mongoose
- **Auth**: JWT, bcrypt
- **Payments**: Stripe Checkout
- **CORS**: open to all origins (adjust for production)

### Prerequisites
- Node.js 18+
- MongoDB connection URI
- Stripe account and secret key

### Environment Variables
Create a `.env` file in the project root:

```bash
MONGO_URI="your-mongodb-connection-string"
JWT_SECRET="your-jwt-secret"
STRIPE_SECRET_KEY="sk_test_xxx"
FRONTEND_URL="http://localhost:5173"  # or your deployed frontend URL
PORT=3000  # optional; code defaults to 3000
```

### Installation
```bash
npm install
```

### Run
```bash
node index.js
```
- Server starts on `http://localhost:3000`
- CORS is currently configured to allow all origins.

### API Overview

- Base URL: `http://localhost:3000`

#### Health
- **GET** `/` → HTML hello message.


### Notes
- For production, restrict CORS `origin`.
- Ensure `FRONTEND_URL` matches your frontend deployment for Stripe redirects.
- JWT tokens are expected directly in `Authorization` header; adjust if you prefer `Bearer <token>` format.
- Collections used: `products`, `spotlightData`, `users`.

Made with ❤️ by Abhishek