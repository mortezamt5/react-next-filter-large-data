import { cpus, platform, release, totalmem } from "node:os";
import { bench, describe } from "vitest";
import { generateProducts } from "../src/features/catalog/data/generateProducts";
import { filterProducts } from "../src/features/catalog/domain/filterProducts";
import type { ProductFilters } from "../src/features/catalog/types";

const collectGarbage = (globalThis as typeof globalThis & { gc?: () => void }).gc;
const productCount = 100_000;

collectGarbage?.();
const heapBefore = process.memoryUsage().heapUsed;
const products = generateProducts(productCount);
collectGarbage?.();
const heapAfter = process.memoryUsage().heapUsed;
const datasetHeapGrowth = (heapAfter - heapBefore) / 1024 / 1024;

const broadSearch: ProductFilters = {
  query: "product",
  category: "all",
  minPrice: null,
  maxPrice: null,
  status: "all",
};

const combinedSearch: ProductFilters = {
  query: "product 9",
  category: "Medical Equipment",
  minPrice: 750_000,
  maxPrice: 2_200_000,
  status: "active",
};

const memoryGb = (totalmem() / 1024 ** 3).toFixed(0);
console.info(
  [
    `Runtime: ${process.version}`,
    `OS: ${platform()} ${release()}`,
    `CPU: ${cpus()[0]?.model ?? "unknown"} (${cpus().length} logical cores)`,
    `System memory: ${memoryGb} GB`,
    `Dataset: ${productCount.toLocaleString("en-US")} products`,
    `Dataset heap growth: ${datasetHeapGrowth.toFixed(1)} MiB`,
  ].join("\n"),
);

describe("100,000-product search and filters", () => {
  bench("broad, case-insensitive name search", () => {
    filterProducts(products, broadSearch);
  });

  bench("combined name, category, price, and status filters", () => {
    filterProducts(products, combinedSearch);
  });
});
