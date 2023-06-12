# E-Commerce Project

This is an e-commerce project that allows users to create, manage, and purchase products.

## Features

- User authentication (signup, login)
- Product management (create, GET, update, delete)
- Shopping cart functionality
- Checkout profile and ready for order placement
- Role base feature for Admin & User 

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer

## Getting Started

### Prerequisites

- Node.js (v14 or above)
- MongoDB (running instance)

### Api Endpoints

- POST /api/v1/user/signup - User signup
- POST /api/v1/user/signin - User login

- POST /api/v1/category - Admin can create Category 
- GET /api/v1/category  - All user can See the category 

- POST api/v1/product - Only Admin can create a new product
= GET api/v1/product - Get all products
- GET api/v1/product/:id - Get a product by ID
- PUT api/v1/product/:id - Update a product by ID

- POST /api/v1/card - Add a product to the cart
- GET /api/v1/card- Get the cart items
- PUT /api/v1/card/:id - Update a cart item by ID
- DELETE /api/v1/card/:id - Remove a cart item by ID

- POST api/v1/profile - Create Profile and ready to process order 
- GET api/v1/profile - Get profile data and ready to  place an order

### Notice 

- It is still on devlopment so sometime some bug may be occers
