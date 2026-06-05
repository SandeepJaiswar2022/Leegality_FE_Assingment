# BazaarFlow — Amazon-style Product Listing App

A production-quality React application built with Vite, React Query, React Router, and Tailwind CSS. Features a refined dark theme, full filter system, URL-persisted state, and responsive layout.

---

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:5173`

---

## Tech Stack

| Tool                 | Version | Role                    |
| -------------------- | ------- | ----------------------- |
| React                | 19+     | UI framework            |
| Vite                 | 6+      | Build tool              |
| React Router DOM     | 7+      | Routing & URL state     |
| TanStack React Query | 5+      | Data fetching & caching |
| Axios                | Latest  | HTTP client             |
| Tailwind CSS         | 4+      | Utility-first styling   |

---

## Folder Structure

```
src/
├── api/
│   └── axios.js              # Axios instance with interceptors
├── services/
│   └── productService.js     # Raw API functions
├── hooks/
│   ├── useProducts.js        # Product list with filter/pagination logic
│   ├── useCategories.js      # Category list
│   └── useProduct.js         # Single product by ID
├── pages/
│   ├── ProductListPage.jsx   # / route
│   └── ProductDetailPage.jsx # /product/:id route
├── components/
│   ├── ProductCard.jsx       # Individual product card
│   ├── ProductGrid.jsx       # Grid + loading/error/empty states
│   ├── Filters.jsx           # Sidebar with category/price/brand
│   ├── Pagination.jsx        # Page navigation
│   ├── Loader.jsx            # Skeleton loading cards
│   ├── ErrorState.jsx        # Error UI
│   └── EmptyState.jsx        # No results UI
├── routes/
│   └── AppRoutes.jsx         # Route definitions
├── App.jsx                   # Providers (QueryClient, Router)
└── main.jsx                  # Entry point
```

---

## Architectural Decisions

### 1. URL as Single Source of Truth

All filter state lives in `URLSearchParams` via React Router's `useSearchParams`. This means:

- Filters survive page refreshes
- "Back" button restores exact filter/page state
- Links are shareable and bookmarkable
- No need for localStorage, context, or Redux

### 2. Two-Phase Fetching Strategy

- **With category**: Fetch ALL products for that category (DummyJSON supports `limit=0`), then apply brand/price/pagination client-side. This gives accurate filter counts and correct pagination totals.
- **Without category**: Use server-side pagination (`skip/limit`). Brand/price filters apply client-side on current page. This keeps initial load fast.

### 3. React Query for Data Layer

- Queries are cached with `staleTime` — navigating back to the listing page doesn't re-fetch unnecessarily.
- `placeholderData: (prev) => prev` gives instant UI on page change (previous data stays visible while next page loads).
- `isFetching` vs `isLoading` used separately — skeleton appears only on first load; an overlay spinner appears on subsequent navigations.

### 4. Service / Hook Separation

- `productService.js` — pure async functions, no React dependencies. Easily testable in isolation.
- `hooks/` — wrap service calls with React Query, handle derived state (filtering, brand extraction, pagination math).

### 5. Dark Theme via CSS Custom Properties

All colors are defined as CSS variables in `:root`. This makes the theme easily customizable and avoids Tailwind dark-mode class overhead. Font pairing: **Syne** (geometric, bold — headings) + **DM Sans** (humanist, readable — body).

---

## Filter Logic

All three filters combine with AND logic:

```
final products = products
  .filter(category)     ← server-side
  .filter(brand)        ← client-side (multi-select OR within brand)
  .filter(price)        ← client-side (minPrice ≤ price ≤ maxPrice)
```

When any filter changes, `page` resets to `1` automatically.

---

## Assumptions

- DummyJSON `limit=0` returns all products for a category (verified, works).
- Brand data is extracted from products; some products may have `undefined` brand (filtered out).
- The app is read-only — no cart, auth, or persistence beyond filter state.
- Images are served from DummyJSON CDN; no fallback image handling needed for this demo.

---

## Future Improvements

- [ ] **Search** — full-text search bar using `/products/search?q=`
- [ ] **Sort** — by price, rating, discount (client-side)
- [ ] **Cart** — add to cart with persisted state (Zustand + localStorage)
- [ ] **Auth** — login/register using DummyJSON `/auth` endpoints
- [ ] **Image gallery** — click thumbnail to swap main image on detail page
- [ ] **Comparison** — side-by-side product comparison
- [ ] **PWA** — offline support with service worker
- [ ] **Testing** — Vitest + React Testing Library for hooks and components
- [ ] **Virtualization** — react-virtual for very long product lists
