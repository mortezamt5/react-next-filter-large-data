import { describe, expect, it } from "vitest";
import { filterProducts } from "./filterProducts";
import type { Product, ProductFilters } from "../types";

const products: Product[] = [
  {
    id: 1,
    name: "Product 1",
    category: "Medical Equipment",
    price: 350_000,
    status: "active",
  },
  {
    id: 2,
    name: "Product 2",
    category: "Skincare",
    price: 1_250_000,
    status: "inactive",
  },
  {
    id: 3,
    name: "Product 3",
    category: "Medical Equipment",
    price: 3_000_000,
    status: "inactive",
  },
];

const allFilters: ProductFilters = {
  query: "",
  category: "all",
  minPrice: null,
  maxPrice: null,
  status: "all",
};

describe("filterProducts", () => {
  it("matches product names without case sensitivity", () => {
    expect(filterProducts(products, { ...allFilters, query: "pRoDuCt 2" }).map((item) => item.id)).toEqual([2]);
  });

  it("combines category, inclusive price range, and status filters", () => {
    const result = filterProducts(products, {
      ...allFilters,
      category: "Medical Equipment",
      minPrice: 350_000,
      maxPrice: 3_000_000,
      status: "inactive",
    });

    expect(result.map((item) => item.id)).toEqual([3]);
  });

  it("trims the search query and includes products on either price boundary", () => {
    const result = filterProducts(products, {
      ...allFilters,
      query: "  product 1  ",
      minPrice: 350_000,
      maxPrice: 350_000,
    });

    expect(result.map((item) => item.id)).toEqual([1]);
  });

  it("returns every product when no filters are active", () => {
    expect(filterProducts(products, allFilters)).toEqual(products);
  });
});
