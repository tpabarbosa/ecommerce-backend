# E-commerce Backend

This is a basic backend API implementation in **Node** and **Typescript** for an e-commerce website.

It makes use of **TypeORM** with a **PostgreSQL** database hosted at [**ElephantSQL**](https://www.elephantsql.com/) for data manipulation and persistence.

For user authentication and authorization it makes use of **JWT Token** with **Bearer header Authorization**.

> .
>
> **Test it:**
>
> 👉 https://tpabarbosa-ecommerce-backend.herokuapp.com/
>
> 👉 https://tpabarbosa-ecommerce-backend.herokuapp.com/api/v1/products
> .

![create user controller](/docs/CreateUserController.png?raw=true)
![user routes](/docs/userRoutes.png?raw=true)

## Endpoints 📌

#### **API**

- GET /
  - returns {message: 'Server is running at HOST:PORT'}
- GET /api
  - returns {message: 'API IS WORKING'}
- GET /api/v1
  - returns {message: 'API V1 IS WORKING'}

#### **USERS**

All routes must be prefixed with /api/v1

- GET /users
  - PROTECTED ADMIN ONLY - not implemented yet
- POST /users
  - PUBLIC - to register a new user
- PUT /users/:user_id
  - not implemented yet
- DELETE /users/:user_id
  - not implemented yet
- GET /users/:user_id

  - PROTECTED ADMIN and AUTHENTICATED USER - retrieve user information

- GET /users/:user_id/reviews
  - PROTECTED ADMIN and AUTHENTICATED USER - retrieve user reviews
- GET /users/:user_id/reviews/:product_id
  - PROTECTED ADMIN and AUTHENTICATED USER - retrieve user review of an specific product
- POST /users/:user_id/reviews

  - PROTECTED AUTHENTICATED USER - register a new review

- GET /users/:user_id/cart
  - PROTECTED ADMIN and AUTHENTICATED USER - retrieve user shopping cart items
- POST /users/:user_id/cart
  - PROTECTED AUTHENTICATED USER - register a new item to user shopping cart
- DELETE /users/:user_id/cart
  - PROTECTED ADMIN and AUTHENTICATED USER - clean user shopping cart (delete all items)
- DELETE /users/:user_id/cart/:item_id
  - PROTECTED ADMIN and AUTHENTICATED USER - remove an item from user shopping cart
- PUT /users/:user_id/cart

  - PROTECTED ADMIN and AUTHENTICATED USER - update an item quantity or size from user shopping cart

- GET /users/:user_id/wishlist
  - PROTECTED ADMIN and AUTHENTICATED USER - retrieve user wishlist
- POST /users/:user_id/wishlist
  - PROTECTED AUTHENTICATED USER - register a new product to user wishlist
- DELETE /users/:user_id/wishlist/:product_id
  - PROTECTED ADMIN and AUTHENTICATED USER - remove a product from user wishlist

#### **AUTHENTICATION**

All routes must be prefixed with /api/v1

- POST /auth/login
  - PUBLIC - check user credentials and provide an access jwt token
- GET /auth/verify-token/:token
  - PUBLIC - check if a jwt token is valid

#### **PRODUCTS**

All routes must be prefixed with /api/v1

- GET /products
  - PUBLIC - retrieve a list of products
- POST /products
  - PROTECTED ADMIN - create a new product
- PUT /products/:product_id
  - PROTECTED ADMIN - not implemented yet
- DELETE /products/:product_id

  - PROTECTED ADMIN - not implemented yet

- GET /products/:product_id
  - PUBLIC - retrieve product information
- GET /products/slugs/:slug

  - PUBLIC - retrieve product information

- GET /products/categories
  - PUBLIC - retrieve a list of all categories
- GET /products/categories/:category_id
  - PUBLIC - retrieve category list of products
- GET /products/categories/slugs/:slug

  - PUBLIC - retrieve category list of products

- GET /products/:product_id/reviews
  - PUBLIC - retrieve product reviews
- GET /products/slugs/:slug/reviews

  - PUBLIC - retrieve product reviews

- POST /products/sales

  - PROTECTED ADMIN - create a new sale

- POST /products/sizes

  - PROTECTED ADMIN - create a new size

- POST /products/categories
  - PROTECTED ADMIN - create a new category

## Next Steps 🧭

This is not a finished production ready API. It lacks some minimum and essentials functionalities:

🔲 testing
🔲 email verification
🔲 password recovery
🔲 refresh token
🔲 social sign in
🔲 add a storage service to save assets and documents uploads
🔲 finish users crud operations
🔲 finish products crud operations
🔲 finish categories crud operations
🔲 finish sales crud operations
🔲 finish sizes crud operations
🔲 finish categories crud operations
🔲 finish reviews crud operations
🔲 add orders/payment management
😏 and much more!!
