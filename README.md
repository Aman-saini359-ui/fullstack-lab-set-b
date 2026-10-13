# Full Stack Development Lab – Set B

This repository contains the implementation of two practicals for the Full Stack Development Lab.

## Practical B1: JWT Authentication API

**Technology:** Node.js, Express.js, JSON Web Tokens, bcryptjs

Features:
- User registration with input validation
- Password hashing
- Login with JWT generation
- JWT expiration after one hour
- Protected profile route
- Appropriate HTTP status codes and error responses

### Run B1

```bash
cd b1-jwt-api
npm install
node src/server.js
```

The API runs at `http://localhost:3000`.

## Practical B2: Shopping Cart with Discount

**Technology:** React, Vite, JavaScript, CSS

Features:
- Product listing
- Add and remove products
- Increase and decrease quantities
- Automatic total calculation
- 10% discount on totals of ₹1,000 or more
- Responsive shopping cart interface
- Required `data-testid` attributes

### Run B2

```bash
cd b2-shopping-cart
npm install
npm run dev
```

Open the local URL shown by Vite.

## Discount Rule

A 10% discount is applied when the cart subtotal is at least ₹1,000.

## Academic Project

**Subject:** Full Stack Development Lab  
**Practical Set:** B