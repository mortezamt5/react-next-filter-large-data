# Snapp Doctor Product Catalog

A focused product search and filtering experience built with Next.js, TypeScript, and a virtualized results list. The catalog creates 100,000 realistic mock products in the browser and keeps search and filtering client-side.

## Architecture decisions

- **Next.js App Router** provides a small, familiar application shell. The route and metadata stay server-rendered, while the catalog workspace owns the interactive client state.
- **Feature-based organization** keeps catalog behavior together. Data generation, filtering rules, types, and UI components have separate responsibilities, so the pure filtering function stays easy to reason about and test.
- **One in-memory dataset** is generated once after the client mounts. Integer product IDs are unique and stable within a generated catalog; product names follow `Product 1` through `Product 100000`.
- **Pure, single-pass filtering** combines a case-insensitive name search with category, price, and availability filters. The current controls drive the result directly, which avoids delayed results from a separate asynchronous state pipeline.
- **Virtualized rendering** uses `@tanstack/react-virtual` to render only the visible product rows and a small overscan. Filtering still checks the dataset, but the browser does not create 100,000 DOM rows.
- **Native React state and CSS** are sufficient for this single screen. The project avoids a separate state library, a search dependency, and a styling framework.
- **English and LTR presentation** keep the interface natural for English-speaking users, with the sidebar on the left and table columns ordered from left to right.
- **Responsive presentation** keeps the filters and results usable on narrow screens.

## Project structure

```text
src/
  app/
    globals.css                 Design tokens, layout, and responsive styles
    layout.tsx                  English document metadata and LTR root layout
    page.tsx                    App Router page entry
  features/catalog/
    types.ts                    Product, category, and filter types
    components/
      CatalogWorkspace.tsx      Catalog state, controls, summary, and results
      ProductList.tsx           Virtualized product rows
    data/
      generateProducts.ts       Randomized mock catalog generation
    domain/
      filterProducts.ts         Pure search and combined filter function
      filterProducts.test.ts    Focused tests for search and combined filters
benchmarks/
  catalog.bench.ts              Repeatable 100,000-product filter and heap benchmark
```

## Tooling

- Next.js 16 and React 19 for the application.
- TypeScript in strict mode for product, filter, and component contracts.
- `@tanstack/react-virtual` for efficient list rendering.
- Vitest for focused tests of the pure catalog filtering rules.
- ESLint and the Next.js TypeScript configuration for static checks.
- Native CSS for the visual system and responsive behavior.

## Product data

The catalog contains 100,000 products. Each product has a unique integer ID from 1 to 100,000, a `Product {i}` name, a randomly selected medical category, an integer price from 350,000 to 3,000,000 toman inclusive, and a randomly selected `active` or `inactive` status. Data is generated once in the browser so random values do not cause server/client hydration differences.

## Getting started

Requirements: Node.js 20.9 or newer and pnpm 11.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Use `pnpm build` to create a production build, `pnpm start` to serve it, `pnpm typecheck` for TypeScript, and `pnpm lint` for ESLint.

Run the focused domain tests with `pnpm test`.

## Performance notes

The list uses virtualization to limit rendered rows. Search and filter timing and memory observations should be recorded after measuring a production build in the target browser and device; no benchmark result is claimed before that measurement.

Run `pnpm benchmark` to benchmark the actual pure filtering function against a single generated 100,000-product dataset and print the product dataset's approximate heap growth. The benchmark includes a broad name search and a combined search with category, price, and status filters. Vitest reports mean, percentile latency, and throughput after warmup. The memory figure is the Node.js heap change between snapshots before and after generating the catalog; it includes its product objects and array but excludes browser, DOM, and rendering overhead.

### Initial local measurement

On October 20, 2026, the benchmark produced the following Node.js baseline:

| Measurement | Result |
| --- | ---: |
| Broad, case-insensitive name search across 100,000 products | 6.06 ms mean; 6.50 ms p75 |
| Combined name, category, price, and status filters | 4.77 ms mean; 5.09 ms p75 |
| Product dataset heap growth | 10.2 MiB |

Environment: Windows 11 build 26300, Node.js 24.19.0, 12th Gen Intel Core i7-1255U, 16 GB RAM. Vitest collected 83 broad-search samples and 106 combined-filter samples after warmup. These figures measure the pure filtering function and generated data in Node.js; they do not include React rendering, browser heap, or DOM overhead. Rerun `pnpm benchmark` after material changes and measure the production page in the target browser before treating these numbers as a browser performance result.

Record the runtime, OS, processor, dataset size, and benchmark mode whenever you publish measurements. Treat Node.js results as an algorithm baseline: browser responsiveness and rendered memory should also be checked in the target browser and device.

## AI usage

OpenAI Codex was used to shape the initial architecture and file structure, implement the first catalog UI and filtering flow, and draft this README. It assisted with translating the task requirements into a small feature-based Next.js application and a custom responsive visual system. The implementation is intended to be reviewed and understood by the submitting developer; generated code should be checked against the requirements and explained during evaluation.
