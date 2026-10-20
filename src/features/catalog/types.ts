export const PRODUCT_CATEGORIES = [
  "Medical Equipment",
  "Skincare",
  "Home Health",
  "Supplements & Nutrition",
  "Medical Supplies",
  "Baby Care",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];
export type ProductStatus = "active" | "inactive";

export type Product = {
  id: number;
  name: string;
  category: ProductCategory;
  price: number;
  status: ProductStatus;
};

export type ProductFilters = {
  query: string;
  category: ProductCategory | "all";
  minPrice: number | null;
  maxPrice: number | null;
  status: ProductStatus | "all";
};
