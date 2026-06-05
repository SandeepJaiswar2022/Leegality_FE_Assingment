import { useQuery } from '@tanstack/react-query';
import { getProducts, getProductsByCategory } from '../services/productService';

const PRODUCTS_PER_PAGE = 12;

/**
 * Hook that returns products based on active filters.
 *
 * Strategy:
 * - If a category is selected → fetch ALL products in that category (no server limit),
 *   then apply brand/price/pagination client-side.
 * - If no category → use server-side pagination (skip/limit).
 *   Brand/price filters applied client-side on the current page's data.
 *
 * This gives accurate pagination counts when filters are active.
 */
export function useProducts({ category, page, brands, minPrice, maxPrice }) {
  const hasCategory = Boolean(category);

  // --- Fetch with category (all products for that category) ---
  const categoryQuery = useQuery({
    queryKey: ['products', 'category', category],
    queryFn: () => getProductsByCategory(category),
    enabled: hasCategory,
    staleTime: 1000 * 60 * 5,
  });

  // --- Fetch without category (server-paginated) ---
  const allQuery = useQuery({
    queryKey: ['products', 'all', page],
    queryFn: () => getProducts(page),
    enabled: !hasCategory,
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });

  const isLoading = hasCategory ? categoryQuery.isLoading : allQuery.isLoading;
  const isFetching = hasCategory ? categoryQuery.isFetching : allQuery.isFetching;
  const isError = hasCategory ? categoryQuery.isError : allQuery.isError;
  const error = hasCategory ? categoryQuery.error : allQuery.error;

  let products = [];
  let total = 0;
  let allBrands = [];

  if (hasCategory && categoryQuery.data) {
    let filtered = categoryQuery.data.products ?? [];

    // Extract unique brands BEFORE price/brand filtering for the sidebar
    allBrands = [...new Set(filtered.map((p) => p.brand).filter(Boolean))].sort();

    // Apply brand filter
    if (brands && brands.length > 0) {
      filtered = filtered.filter((p) => brands.includes(p.brand));
    }

    // Apply price filter
    if (minPrice !== '' && minPrice !== undefined) {
      filtered = filtered.filter((p) => p.price >= Number(minPrice));
    }
    if (maxPrice !== '' && maxPrice !== undefined) {
      filtered = filtered.filter((p) => p.price <= Number(maxPrice));
    }

    total = filtered.length;

    // Client-side pagination slice
    const skip = (page - 1) * PRODUCTS_PER_PAGE;
    products = filtered.slice(skip, skip + PRODUCTS_PER_PAGE);
  } else if (!hasCategory && allQuery.data) {
    let filtered = allQuery.data.products ?? [];
    total = allQuery.data.total ?? 0;

    // Extract unique brands from current page
    allBrands = [...new Set(filtered.map((p) => p.brand).filter(Boolean))].sort();

    // Apply brand filter (client-side on current page)
    if (brands && brands.length > 0) {
      filtered = filtered.filter((p) => brands.includes(p.brand));
    }

    // Apply price filter
    if (minPrice !== '' && minPrice !== undefined) {
      filtered = filtered.filter((p) => p.price >= Number(minPrice));
    }
    if (maxPrice !== '' && maxPrice !== undefined) {
      filtered = filtered.filter((p) => p.price <= Number(maxPrice));
    }

    products = filtered;
  }

  const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);

  return {
    products,
    total,
    totalPages,
    allBrands,
    isLoading,
    isFetching,
    isError,
    error,
  };
}
