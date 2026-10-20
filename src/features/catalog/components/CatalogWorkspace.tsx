"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { generateProducts } from "../data/generateProducts";
import { filterProducts } from "../domain/filterProducts";
import { PRODUCT_CATEGORIES, type Product, type ProductCategory, type ProductFilters, type ProductStatus } from "../types";
import { Icon } from "./Icons";
import { ProductList } from "./ProductList";

const numberFormat = new Intl.NumberFormat("en-US");

function parsePrice(value: string): number | null {
  if (!value.trim()) return null;
  const price = Number(value);
  return Number.isFinite(price) ? price : null;
}

function MetricCard({
  label,
  value,
  note,
  icon,
  tone,
}: {
  label: string;
  value: string;
  note: string;
  icon: "package" | "chart" | "grid" | "spark";
  tone: string;
}) {
  return (
    <article className="metric-card">
      <div className={`metric-icon ${tone}`}><Icon name={icon} /></div>
      <span className="metric-label">{label}</span>
      <div className="metric-value-line">
        <strong>{value}</strong>
        <span>{note}</span>
      </div>
    </article>
  );
}

export function CatalogWorkspace() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProductCategory | "all">("all");
  const [status, setStatus] = useState<ProductStatus | "all">("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const generated = useRef(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (generated.current) return;
    generated.current = true;
    setProducts(generateProducts());
  }, []);

  useEffect(() => {
    function focusSearch(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    }

    window.addEventListener("keydown", focusSearch);
    return () => window.removeEventListener("keydown", focusSearch);
  }, []);

  const filters = useMemo<ProductFilters>(() => ({
    query,
    category,
    minPrice: parsePrice(minPrice),
    maxPrice: parsePrice(maxPrice),
    status,
  }), [category, maxPrice, minPrice, query, status]);

  const filteredProducts = useMemo(
    () => filterProducts(products, filters),
    [filters, products],
  );

  const activeCount = useMemo(
    () => products.reduce((count, product) => count + Number(product.status === "active"), 0),
    [products],
  );

  const isFiltered = Boolean(query || category !== "all" || status !== "all" || minPrice || maxPrice);

  function resetFilters() {
    setQuery("");
    setCategory("all");
    setStatus("all");
    setMinPrice("");
    setMaxPrice("");
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#overview" aria-label="Noa home">
          <span className="brand-symbol"><span /></span>
          <span className="brand-copy">
            <strong>NOA</strong>
            <small>PRODUCT STUDIO</small>
          </span>
        </a>

        <div className="sidebar-caption">WORKSPACE</div>
        <nav className="side-nav" aria-label="Main navigation">
          <a className="nav-link" href="#overview">
            <Icon name="grid" />
            <span>Overview</span>
          </a>
          <a className="nav-link nav-link-active" href="#catalog" aria-current="page">
            <Icon name="package" />
            <span>Product catalog</span>
            <span className="nav-count">01</span>
          </a>
          <a className="nav-link" href="#filters">
            <Icon name="sliders" />
            <span>Filters & search</span>
          </a>
        </nav>

        <div className="sidebar-spacer" />

        <div className="side-note">
          <span className="side-note-icon"><Icon name="spark" /></span>
          <strong>Make room for clarity.</strong>
          <p>A calmer way to find the right product.</p>
          <a href="#catalog">Browse catalog <Icon name="arrow" /></a>
        </div>

        <div className="sidebar-profile">
          <span className="profile-avatar">N</span>
          <span><strong>Sample workspace</strong><small>Demo account</small></span>
          <span className="profile-menu" aria-hidden="true">···</span>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb"><span>Workspace</span><b>/</b><strong>Product catalog</strong></div>
          <div className="topbar-actions">
            <span className="live-indicator"><span /> Local demo</span>
            <span className="topbar-divider" />
            <span className="topbar-date">Sample dataset</span>
            <span className="topbar-avatar">N</span>
          </div>
        </header>

        <div className="page-body">
          <section className="intro-section" id="overview">
            <div className="intro-copy">
              <div className="eyebrow"><span className="eyebrow-line" /> PRODUCT INSIGHTS <span className="eyebrow-index">/ 2026</span></div>
              <h1>Products, <span>in focus.</span></h1>
              <p>Explore the catalog, find what you need, and make confident decisions.</p>
            </div>
            <div className="intro-art" aria-hidden="true">
              <div className="art-ring art-ring-outer" />
              <div className="art-ring art-ring-inner" />
              <span className="art-core"><Icon name="spark" /></span>
              <span className="art-label">N° 001</span>
              <span className="art-dot art-dot-one" />
              <span className="art-dot art-dot-two" />
            </div>
          </section>

          <section className="metrics-grid" aria-label="Catalog summary">
            <MetricCard label="Total products" value={products.length ? numberFormat.format(products.length) : "—"} note="items" icon="package" tone="metric-icon-lime" />
            <MetricCard label="Active products" value={products.length ? numberFormat.format(activeCount) : "—"} note="available" icon="chart" tone="metric-icon-mint" />
            <MetricCard label="Categories" value={numberFormat.format(PRODUCT_CATEGORIES.length)} note="product groups" icon="grid" tone="metric-icon-peach" />
            <MetricCard label="Price range" value="350K – 3M" note="Toman" icon="spark" tone="metric-icon-lilac" />
          </section>

          <section className="filter-panel" id="filters" aria-labelledby="filters-heading">
            <div className="panel-heading">
              <div className="panel-title-wrap">
                <span className="panel-icon"><Icon name="sliders" /></span>
                <div>
                  <h2 id="filters-heading">Filters & search</h2>
                  <p>Find the right product in seconds.</p>
                </div>
              </div>
              <button className="reset-button" type="button" onClick={resetFilters} disabled={!isFiltered}>
                <Icon name="refresh" /> Clear filters
              </button>
            </div>

            <div className="filter-controls">
              <label className="field search-field">
                <span className="field-label">Search products</span>
                <span className="input-shell">
                  <Icon name="search" />
                  <input
                    ref={searchInputRef}
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search by product name..."
                    aria-label="Search by product name"
                  />
                  <kbd>Ctrl / ⌘ K</kbd>
                </span>
              </label>

              <label className="field">
                <span className="field-label">Category</span>
                <span className="select-shell">
                  <select value={category} onChange={(event) => setCategory(event.target.value as ProductCategory | "all")}>
                    <option value="all">All categories</option>
                    {PRODUCT_CATEGORIES.map((item) => <option key={item} value={item}>{item}</option>)}
                  </select>
                  <Icon name="chevron" />
                </span>
              </label>

              <label className="field">
                <span className="field-label">Availability</span>
                <span className="select-shell">
                  <select value={status} onChange={(event) => setStatus(event.target.value as ProductStatus | "all")}>
                    <option value="all">All statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  <Icon name="chevron" />
                </span>
              </label>

              <div className="field price-field">
                <span className="field-label">Price range <small>Toman</small></span>
                <div className="price-inputs">
                  <label className="price-input-shell">
                    <span className="sr-only">Minimum price in Toman</span>
                    <input type="number" min="350000" max="3000000" step="50000" value={minPrice} onChange={(event) => setMinPrice(event.target.value)} placeholder="Min 350,000" />
                  </label>
                  <span className="price-separator" />
                  <label className="price-input-shell">
                    <span className="sr-only">Maximum price in Toman</span>
                    <input type="number" min="350000" max="3000000" step="50000" value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} placeholder="Max 3,000,000" />
                  </label>
                </div>
              </div>
            </div>
          </section>

          <section className="results-section" id="catalog" aria-labelledby="results-heading">
            <div className="results-heading">
              <div>
                <div className="results-kicker">CATALOG RESULTS</div>
                <h2 id="results-heading">Product catalog <span className="results-count">{numberFormat.format(filteredProducts.length)}</span></h2>
              </div>
              <div className="result-meta"><span className="result-meta-dot" /> {isFiltered ? "Filtered results" : "All products"}</div>
            </div>

            <ProductList products={filteredProducts} loading={!products.length} />

            <footer className="list-footer">
              <span><span className="footer-live-dot" /> Virtualized for smooth browsing</span>
              <span>Client-side filters <b>•</b> <bdi>100K items</bdi></span>
            </footer>
          </section>

          <footer className="page-footer"><span>Designed for a better search experience</span><span>NOA <i /> 2026</span></footer>
        </div>
      </main>
    </div>
  );
}
