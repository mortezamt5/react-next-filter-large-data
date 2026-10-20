"use client";

import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { Product } from "../types";

const numberFormat = new Intl.NumberFormat("en-US");

type ProductListProps = {
  products: Product[];
  loading: boolean;
};

export function ProductList({ products, loading }: ProductListProps) {
  const scrollElementRef = useRef<HTMLDivElement>(null);
  // TanStack Virtual exposes an imperative instance that the React Compiler cannot safely memoize.
  // eslint-disable-next-line react-hooks/incompatible-library
  const virtualizer = useVirtualizer({
    count: products.length,
    getScrollElement: () => scrollElementRef.current,
    estimateSize: () => 76,
    getItemKey: (index) => products[index]?.id ?? index,
    overscan: 8,
  });

  return (
      <div className="product-table" role="table" aria-label="Product list" aria-rowcount={products.length + 1}>
      <div className="product-table-head" role="row">
        <span role="columnheader">Product</span>
        <span role="columnheader">Category</span>
        <span role="columnheader">Price</span>
        <span role="columnheader">Status</span>
      </div>

      <div className="product-scroll" ref={scrollElementRef}>
        {loading ? (
          <div className="loading-rows" aria-label="Loading product list">
            {Array.from({ length: 7 }, (_, index) => (
              <div className="loading-row" key={index}>
                <span className="loading-swatch" />
                <span className="loading-line loading-line-wide" />
                <span className="loading-line" />
                <span className="loading-line loading-line-short" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="empty-state">
            <span className="empty-orbit">⌕</span>
            <strong>No products match your search</strong>
            <span>Adjust your filters and try again.</span>
          </div>
        ) : (
          <div
            className="virtual-space"
            role="rowgroup"
            style={{ height: virtualizer.getTotalSize() }}
          >
            {virtualizer.getVirtualItems().map((virtualRow) => {
              const product = products[virtualRow.index];
              if (!product) return null;

              return (
                <div
                  className="product-row"
                  role="row"
                  key={product.id}
                  data-index={virtualRow.index}
                  aria-rowindex={virtualRow.index + 2}
                  ref={virtualizer.measureElement}
                  style={{ transform: `translateY(${virtualRow.start}px)` }}
                >
                  <span className="product-cell product-identity" role="cell">
                    <span className={`product-avatar tone-${virtualRow.index % 5}`} aria-hidden="true">
                      P
                    </span>
                    <span className="product-copy">
                      <strong>{product.name}</strong>
                      <small><bdi>{`P-${String(product.id).padStart(6, "0")}`}</bdi></small>
                    </span>
                  </span>
                  <span className="product-cell" role="cell">
                    <span className={`category-pill category-${virtualRow.index % 6}`}>
                      <span className="category-mark" />
                      {product.category}
                    </span>
                  </span>
                  <span className="product-cell product-price" role="cell">
                    <strong>{numberFormat.format(product.price)}</strong>
                    <small>Toman</small>
                  </span>
                  <span className="product-cell" role="cell">
                    <span className={`status-pill status-${product.status}`}>
                      <span className="status-dot" />
                      {product.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
