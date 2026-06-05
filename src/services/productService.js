import apiClient from '../api/axios';

const PRODUCTS_PER_PAGE = 12;

/**
 * Fetch paginated products (all categories)
 * @param {number} page - 1-based page number
 */
export async function getProducts(page = 1) {
  const skip = (page - 1) * PRODUCTS_PER_PAGE;
  const { data } = await apiClient.get('/products', {
    params: { limit: PRODUCTS_PER_PAGE, skip },
  });
  return data; // { products, total, skip, limit }
}

/**
 * Fetch all available categories
 */
export async function getCategories() {
  const { data } = await apiClient.get('/products/categories');
  return data; // array of category objects { slug, name, url }
}

/**
 * Fetch ALL products of a given category (no server-side limit)
 * We fetch them all so client-side brand + price filters work correctly.
 * @param {string} category - category slug
 */
export async function getProductsByCategory(category) {
  const { data } = await apiClient.get(`/products/category/${category}`, {
    params: { limit: 0 }, // 0 = return all
  });
  return data; // { products, total }
}

/**
 * Fetch a single product by ID
 * @param {string|number} id
 */
export async function getProductById(id) {
  const { data } = await apiClient.get(`/products/${id}`);
  return data;
}
