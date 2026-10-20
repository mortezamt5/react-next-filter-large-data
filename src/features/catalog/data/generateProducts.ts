import { PRODUCT_CATEGORIES, type Product, type ProductStatus } from "../types";

const MIN_PRICE = 350_000;
const MAX_PRICE = 3_000_000;
const PRICE_STEP = 10_000;
const PRODUCT_COUNT = 100_000;

function randomInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateProducts(count = PRODUCT_COUNT): Product[] {
  return Array.from({ length: count }, (_, index) => {
    const status: ProductStatus = Math.random() < 0.5 ? "active" : "inactive";

    return {
      id: index + 1,
      name: `Product ${index + 1}`,
      category: PRODUCT_CATEGORIES[randomInteger(0, PRODUCT_CATEGORIES.length - 1)],
      price: MIN_PRICE + randomInteger(0, (MAX_PRICE - MIN_PRICE) / PRICE_STEP) * PRICE_STEP,
      status,
    };
  });
}
