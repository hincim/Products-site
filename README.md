# Products Site

Angular 14 single-page storefront application with product browsing, category filtering, account authentication, and admin-restricted create flows.

## Tech stack

- Angular 14
- TypeScript
- RxJS
- Bootstrap 5
- CKEditor 4 (`ckeditor4-angular`)
- Firebase Hosting configuration (`firebase.json`)

## Implemented functionality

- Product listing view
- Product detail view
- Category sidebar and category-based filtering
- Account registration/login/logout flow
- Admin guard (`AdminGuard`) for protected routes
- Admin-only product creation form (with rich-text description)
- Admin-only category creation form

## Routing overview

- `/home` — home page
- `/products` — product list
- `/products/category/:categoryId` — category-filtered products
- `/products/:productId` — product detail
- `/products/create` — product creation (admin only)
- `/categories/create` — category creation (admin only)
- `/account` — authentication page

## Project structure

```text
src/app
├── authentication/   # auth component, service, guard, models
├── categories/       # category list/create components and service
├── products/         # product list/detail/create components and service
├── shared/           # navbar, home, not-found components
└── models/           # repository model classes
```

## Getting started

### Prerequisites

- Node.js and npm
- Angular CLI 14.x

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm start
```

Default dev URL: `http://localhost:4200/`.

## Available scripts

- `npm start` — run development server
- `npm run build` — create production build
- `npm run watch` — build in watch mode (development configuration)
- `npm test` — run Karma unit tests

## Configuration notes

- Admin access is controlled by `adminEmail` in:
  - `src/environments/environment.ts`
  - `src/environments/environment.prod.ts`
- Data and auth services depend on a `ServicesUtil` class referenced at:
  - `src/app/authentication/auth.service.ts`
  - `src/app/products/product.service.ts`
  - `src/app/categories/category.service.ts`

If `src/app/util/services.util.ts` is not present in your local checkout, add it with the required API base URLs and auth key expected by those services.

## Build and deployment

- Build output path: `dist/ilk-app`
- Firebase Hosting is configured to serve `dist/ilk-app` and rewrite all routes to `index.html` for SPA routing.
