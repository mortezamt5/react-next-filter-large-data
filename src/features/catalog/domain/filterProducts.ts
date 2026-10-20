import type { Product, ProductFilters } from "../types";

export function filterProducts(products: Product[], filters: ProductFilters): Product[] {
  const query = filters.query.trim().toLowerCase();

  return products.filter((product) => {
    if (query && !product.name.toLowerCase().includes(query)) return false;
    if (filters.category !== "all" && product.category !== filters.category) return false;
    if (filters.status !== "all" && product.status !== filters.status) return false;
    if (filters.minPrice !== null && product.price < filters.minPrice) return false;
    if (filters.maxPrice !== null && product.price > filters.maxPrice) return false;
    return true;
  });
}
