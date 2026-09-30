# Art Esperança

E-commerce application developed with **Next.js** and **PostgreSQL**, featuring a product catalog, variants, shopping cart, authentication, checkout, and order management.

> **Status:** Under development / validation.

## Stack

- [Next.js](https://nextjs.org/) 15
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui
- Radix UI
- Lucide React
- React Hook Form
- Zod
- TanStack React Query
- Better Auth
- Drizzle ORM
- PostgreSQL
- Stripe
- Cloudflare R2
- Neon PostgreSQL

## Features

The project currently includes:

- Product catalog
- Categories
- Product variants
- Stock control per variant
- Featured products
- Made-to-order products
- Product cover image
- Image gallery
- Variant-specific image
- Shopping cart
- Shipping address registration and selection
- Email and password authentication
- Google authentication
- Checkout
- Order creation
- User order history
- Payment status
- Shipping status
- Stripe Checkout integration
- Stripe webhook for payment confirmation
- Database seed

## Requirements

To run the project locally, the following must be installed:

- Node.js
- npm
- PostgreSQL
- Git

Credentials for the services used by the application are also required, as described in the environment variables section.

## Installation

Clone the repository:

```bash
git clone https://github.com/Zarpdon/art-esperanca.git
```

Enter the project directory:

```bash
cd art-esperanca
```

Install the dependencies:

```bash
npm install
```

## Environment Variables

The application currently uses the following environment variables:

```env
DATABASE_URL=

BUCKET_URL=
NEXT_PUBLIC_BUCKET_URL=

BETTER_AUTH_SECRET=
BETTER_AUTH_URL=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

Create a `.env` file in the project root and fill in the variables according to the environment being used.

Real keys, secrets, tokens, or credentials **must not be committed to Git**.

In production, these variables are configured directly in the hosting service.

### Database

`DATABASE_URL` must point to a valid PostgreSQL instance.

Example:

```env
DATABASE_URL=postgresql://username:password@host:5432/database
```

The project uses Drizzle ORM to access the database.

### Image Hosting

The project currently uses Cloudflare R2 to host images.

Example:

```env
BUCKET_URL=your-bucket.r2.dev
NEXT_PUBLIC_BUCKET_URL=https://your-bucket.r2.dev/
```

### Better Auth

Better Auth uses:

```env
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
```

The application supports email/password authentication and Google OAuth.

Social authentication uses:

```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

### Stripe

The Stripe integration uses:

```env
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

The webhook secret must correspond to the endpoint used in the respective environment.

For local development, the Stripe CLI can forward events to the application:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

The `whsec_...` value provided by the Stripe CLI is specific to that local listener.

In production, the endpoint configured in the Stripe Dashboard has its own webhook secret.

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

## Available Scripts

The scripts currently defined in `package.json` are:

```bash
npm run dev
npm run build
npm run start
npm run lint
```

- `dev` — starts the development environment.
- `build` — generates the production build.
- `start` — starts the application in production mode.
- `lint` — runs static analysis on the project using ESLint and Prettier.

> Drizzle operations currently do not have dedicated scripts in `package.json`. They can be executed directly using `npx drizzle-kit`.

### Development

Run the development server:

```bash
npm run dev
```

By default, the application will be available at:

```text
http://localhost:3000
```

## Database

PostgreSQL access is handled through Drizzle ORM.

The main configuration is located at:

```text
drizzle.config.ts
```

The schema is located at:

```text
src/db/schema.ts
```

The database connection is located at:

```text
src/db/index.ts
```

### Schema

The main tables include:

- `user`
- `session`
- `account`
- `verification`
- `category`
- `product`
- `product_variant`
- `product_image`
- `shipping_address`
- `cart`
- `cart_item`
- `order`
- `order_item`

### Main Relationships

```text
User
 ├── Shipping Addresses
 ├── Cart
 │    └── Cart Items
 │         └── Product Variant
 └── Orders
      └── Order Items
           └── Product Variant

Category
 └── Products
      ├── Variants
      └── Images
```

### Products

A product has:

- Name
- Slug
- Description
- Cover image
- Category
- Image gallery

Each product can have multiple variants.

A variant has:

- Name
- Slug
- Variant identifier
- Price in cents
- Optional image
- Stock
- Active status
- Featured status
- Made-to-order indicator

Stock is stored directly on the variant.

### Image Gallery

Additional images are stored in `product_image`.

Each image has a display order through:

```text
displayOrder
```

The product cover image is stored separately in:

```text
product.coverImageUrl
```

This allows the main product image to be separated from additional gallery images and variant-specific images.

## Seed

The project includes a seed at:

```text
src/db/seed.ts
```

The example data used by the seed is located at:

```text
src/db/seed.example.json
```

The seed:

1. Clears product images.
2. Clears variants.
3. Clears products.
4. Clears categories.
5. Creates the categories present in the JSON file.
6. Creates the products.
7. Creates the gallery images.
8. Creates the variants.
9. Automatically defines `isActive` according to stock.

## Authentication

Authentication is implemented using Better Auth.

Configuration:

```text
src/lib/auth.ts
```

Endpoint:

```text
src/app/api/auth/[...all]/route.ts
```

Currently available methods:

- Email and password
- Google OAuth

Authentication information is persisted in PostgreSQL through the Drizzle adapter.

## Shopping Cart

The shopping cart is associated with the authenticated user.

The main structure is:

```text
Cart
 └── Cart Items
      └── Product Variant
```

Each cart item references a specific variant and contains its quantity.

## Checkout

The checkout page is located at:

```text
src/app/checkout/page.tsx
```

The checkout:

- Requires authentication.
- Retrieves the current cart.
- Redirects unauthenticated users to `/authentication`.
- Redirects empty carts to `/identificacao`.
- Displays the shipping address.
- Displays the cart summary.
- Allows the user to place an order.

## Orders

Orders have two groups of statuses.

### Payment Status

```text
pending

paid

canceled
```

### Shipping Status

```text
pending

shipped

delivered

canceled

returned
```

The order also stores a snapshot of the information used during the purchase, including:

- Email
- Name
- CPF/document
- Phone
- ZIP code
- Address
- Number
- Complement
- Neighborhood
- City
- State
- Country
- Shipping cost
- Total

Order items also store information specific to the time of purchase, such as the product name, variant name, price, and quantity.

This preserves the purchase data even if the product or its variant is subsequently modified.

## Stripe

The integration uses Stripe Checkout.

The application has a webhook at:

```text
src/app/api/stripe/webhook/route.ts
```

The endpoint validates the signature sent by Stripe through:

```env
STRIPE_WEBHOOK_SECRET
```

When it receives:

```text
checkout.session.completed
```

the webhook identifies the order through the session metadata and changes its status from:

```text
pending
```

to:

```text
paid
```

### Local Webhook

For development:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

The secret returned by the Stripe CLI should only be used in the local environment.

### Production Webhook

In production, an endpoint should be created in the Stripe Dashboard pointing to:

```text
https://YOUR-DOMAIN/api/stripe/webhook
```

The secret for this endpoint must be configured separately in the production environment.

## Images

The project uses externally hosted images, currently through Cloudflare R2.

Next.js is configured using the `BUCKET_URL` environment variable to allow images from the example domain:

```text
your-bucket.r2.dev
```

This configuration is located in:

```text
next.config.ts
```

Image URLs are stored in the database, while the actual files remain in external storage.

## Main Structure

The current project structure is approximately:

```text
art-esperanca/

├── public/

├── src/
│   ├── actions/
│   ├── app/
│   │   ├── api/
│   │   ├── authentication/
│   │   ├── checkout/
│   │   ├── compras/
│   │   └── ...
│   ├── components/
│   ├── db/
│   │   ├── schema.ts
│   │   ├── index.ts
│   │   ├── seed.ts
│   │   └── seed.example.json
│   ├── lib/
│   │   └── auth.ts
│   └── providers/

├── drizzle/
├── drizzle.config.ts
├── next.config.ts
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

The structure may evolve as new features are added.

## Production

The project can be run in a Node.js environment after the build.

Build:

```bash
npm run build
```

Run:

```bash
npm start
```

The following environment variables must be configured in production at a minimum:

- PostgreSQL
- Image hosting
- Better Auth
- Google OAuth
- Stripe

The PostgreSQL database used in production can be hosted through Neon.

## Deploy

The project can be hosted as a Node.js Web Service.

Current configuration:

### Render Deployment

The project is currently hosted as a Web Service on Render.

### Build Command

```bash
npm ci && npm run build
```

### Start Command

```bash
npm start
```

Environment variables must be configured directly in the service.

The public URL currently used by the validation environment is:

```text
https://art-esperanca.onrender.com
```

## General Architecture

The main application flow can be represented as:

```text
                    ┌──────────────┐
                    │     User     │
                    └──────┬───────┘
                           │
                           ▼
                    ┌─────────────────┐
                    │   Next.js App   │
                    └───────┬─────────┘
                            │
            ┌───────────────┼────────────────┐
            │               │                │
            ▼               ▼                ▼
     ┌────────────┐  ┌─────────────┐  ┌─────────────┐
     │ Better Auth│  │   Drizzle   │  │   Stripe    │
     └──────┬─────┘  └──────┬──────┘  └──────┬──────┘
            │               │                │
            │               ▼                │
            │       ┌───────────────┐        │
            │       │  PostgreSQL   │        │
            │       └───────────────┘        │
            │                                │
            │                                ▼
            │                         ┌─────────────┐
            │                         │   Webhook   │
            │                         └──────┬──────┘
            │                                │
            └────────────────────────────────┘
```

Product images currently follow a separate flow:

```text
Product
   │
   ├── coverImageUrl
   │
   ├── product_image
   │
   └── variant.imageUrl
           │
           ▼
      Cloudflare R2
```

## Project Status

> The project is currently under development.

The application already has the main structure of an e-commerce platform, including a product catalog, authentication, shopping cart, checkout, orders, and payment integration.

New features and architectural improvements may be added as the project evolves.

## Repository

Source code:

https://github.com/Zarpdon/art-esperanca

## License

The source code of this project is available under a custom license that permits its use, modification, distribution, and reuse, including for commercial purposes.

The license allows the code to be used as a foundation for other systems and e-commerce projects, but does not grant rights to the Art Esperança visual identity, brand, images, texts, product data, or other creative content.

See the [`LICENSE`](./LICENSE) file for the full terms.
