"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { Product } from "../types";
import { Icon } from "./Icons";

const numberFormat = new Intl.NumberFormat("en-US");

function getCardColumnCount() {
  if (window.matchMedia("(max-width: 600px)").matches) return 1;
  if (window.matchMedia("(min-width: 1500px)").matches) return 3;
  return 2;
}

function getServerCardColumnCount() {
  return 2;
}

function subscribeToCardColumnCount(onChange: () => void) {
  const queries = [
    window.matchMedia("(max-width: 600px)"),
    window.matchMedia("(min-width: 1500px)"),
  ];
  queries.forEach((query) => query.addEventListener("change", onChange));
  return () => queries.forEach((query) => query.removeEventListener("change", onChange));
}

type ProductListProps = {
  products: Product[];
  loading: boolean;
};

export function ProductList({ products, loading }: ProductListProps) {
  const [view, setView] = useState<"cards" | "list">("cards");
  const columnCount = useSyncExternalStore(
    subscribeToCardColumnCount,
    getCardColumnCount,
    getServerCardColumnCount,
  );
  const scrollElementRef = useRef<HTMLDivElement>(null);
  const virtualItemCount = view === "cards"
    ? Math.ceil(products.length / columnCount)
    : products.length;
  // TanStack Virtual exposes an imperative instance that the React Compiler cannot safely memoize.
  // eslint-disable-next-line react-hooks/incompatible-library
  const virtualizer = useVirtualizer({
    count: virtualItemCount,
    getScrollElement: () => scrollElementRef.current,
    estimateSize: () => view === "cards" ? 224 : 76,
    getItemKey: (index) => {
      const productIndex = view === "cards" ? index * columnCount : index;
      return products[productIndex]?.id ?? productIndex;
    },
    overscan: view === "cards" ? Math.ceil(8 / columnCount) : 8,
  });

  return (
    <div className="product-list-shell">
      <div className="product-view-switch" role="group" aria-label="Product view">
        <button
          className={`product-view-button${view === "cards" ? " is-active" : ""}`}
          type="button"
          aria-pressed={view === "cards"}
          onClick={() => setView("cards")}
        >
          <Icon name="grid" />
          <span>Cards</span>
        </button>
        <button
          className={`product-view-button${view === "list" ? " is-active" : ""}`}
          type="button"
          aria-pressed={view === "list"}
          onClick={() => setView("list")}
        >
          <Icon name="list" />
          <span>List</span>
        </button>
      </div>
      <div
        className={`product-table product-table-${view}`}
        role={view === "cards" ? "presentation" : "table"}
        aria-label={view === "list" ? "Product list" : undefined}
        aria-rowcount={view === "list" ? products.length + 1 : undefined}
      >
        <div className="product-table-head" role="row">
          <span role="columnheader">Product</span>
          <span role="columnheader">Category</span>
          <span role="columnheader">Price</span>
          <span role="columnheader">Status</span>
        </div>

        <div
          className="product-scroll"
          ref={scrollElementRef}
          role={view === "cards" && !loading && products.length > 0 ? "list" : undefined}
          aria-label={view === "cards" && !loading && products.length > 0 ? "Product list" : undefined}
        >
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
          ) : view === "cards" ? (
            <div className="virtual-space" role="presentation" style={{ height: virtualizer.getTotalSize() }}>
              {virtualizer.getVirtualItems().map((virtualRow) => {
                const firstProductIndex = virtualRow.index * columnCount;
                const rowProducts = products.slice(firstProductIndex, firstProductIndex + columnCount);
                const firstProduct = rowProducts[0];
                if (!firstProduct) return null;

                return (
                  <div
                    className={`product-grid-row product-grid-row-${columnCount}`}
                    role="presentation"
                    key={firstProduct.id}
                    data-index={virtualRow.index}
                    ref={virtualizer.measureElement}
                    style={{ transform: `translateY(${virtualRow.start}px)` }}
                  >
                    {rowProducts.map((product, columnIndex) => {
                      const productIndex = firstProductIndex + columnIndex;
                      return (
                        <article className="product-card" role="listitem" key={product.id}>
                          <div className="product-card-top">
                            <span className={`category-pill category-${productIndex % 6}`}>
                              <span className="category-mark" />
                              {product.category}
                            </span>
                            <span className={`status-pill status-${product.status}`}>
                              <span className="status-dot" />
                              {product.status === "active" ? "Active" : "Inactive"}
                            </span>
                          </div>
                          <div className="product-card-identity">
                            <span className={`product-avatar tone-${productIndex % 5}`} aria-hidden="true">P</span>
                            <span className="product-copy">
                              <strong>{product.name}</strong>
                              <small><bdi>{`P-${String(product.id).padStart(6, "0")}`}</bdi></small>
                            </span>
                          </div>
                          <div className="product-card-bottom">
                            <span className="product-card-price-label">Unit price</span>
                            <span className="product-card-price">
                              <strong>{numberFormat.format(product.price)}</strong>
                              <small>Toman</small>
                            </span>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="virtual-space" role="rowgroup" style={{ height: virtualizer.getTotalSize() }}>
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
                      <span className={`product-avatar tone-${virtualRow.index % 5}`} aria-hidden="true">P</span>
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
    </div>
  );
}
