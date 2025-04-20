# PondeerVibe E-commerce Platform

A modern e-commerce platform that aggregates products from multiple Shopify stores into a unified shopping experience. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Browse products from multiple Shopify stores
- Add products to cart from different vendors
- Cart management with store grouping
- Stripe Connect integration for split payments
- Modern, responsive UI with Tailwind CSS

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Prisma with PostgreSQL
- Stripe Connect
- Shopify Storefront API (GraphQL)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables in `.env.local`:
   ```
   DATABASE_URL=
   STRIPE_SECRET_KEY=
   STRIPE_PUBLISHABLE_KEY=
   STRIPE_WEBHOOK_SECRET=
   PLATFORM_FEE_PERCENTAGE=5
   SHOPIFY_STOREFRONT_ACCESS_TOKEN=
   SHOPIFY_STORE_DOMAIN=
   ```

4. Initialize the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                 # Next.js app router pages
│   ├── api/            # API routes
│   ├── cart/           # Cart page
│   └── page.tsx        # Homepage
├── components/         # React components
├── lib/               # Utility functions and API clients
│   ├── prisma/        # Database client
│   ├── shopify/       # Shopify API integration
│   └── stripe/        # Stripe payment integration
└── types/             # TypeScript type definitions
```

## Development Status

This is currently an MVP with the following implemented:
- Basic product browsing
- Cart functionality
- Mock data integration
- UI components and styling

Next steps:
- Implement real Shopify API integration
- Add Stripe Connect payment processing
- Add user authentication
- Implement search and filtering
- Add admin dashboard for vendors

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License.
