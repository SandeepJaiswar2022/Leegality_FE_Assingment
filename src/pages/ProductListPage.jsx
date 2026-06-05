import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import ProductGrid from "../components/ProductGrid";
import Filters from "../components/Filters";
import Pagination from "../components/Pagination";
import ThemeToggle from "../components/ThemeToggle";

export default function ProductListPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read current filter state from URL
  const category = searchParams.get("category") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const brandsParam = searchParams.get("brands") || "";
  const selectedBrands = brandsParam ? brandsParam.split(",") : [];

  // Helper: update URL params without losing existing ones
  const setParam = useCallback(
    (updates) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        Object.entries(updates).forEach(([k, v]) => {
          if (v === "" || v === null || v === undefined) {
            next.delete(k);
          } else {
            next.set(k, v);
          }
        });
        return next;
      });
    },
    [setSearchParams],
  );

  const handleCategoryChange = (value) => {
    // Reset page and brands when category changes
    setParam({ category: value, page: null, brands: null });
  };

  const handlePageChange = (newPage) => {
    setParam({ page: newPage });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMinPrice = (value) => {
    setParam({ minPrice: value, page: null });
  };

  const handleMaxPrice = (value) => {
    setParam({ maxPrice: value, page: null });
  };

  const handleBrandToggle = (brand) => {
    const next = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];
    setParam({ brands: next.length > 0 ? next.join(",") : null, page: null });
  };

  const handleReset = () => {
    setSearchParams({});
  };

  const {
    products,
    total,
    totalPages,
    allBrands,
    isLoading,
    isFetching,
    isError,
    error,
  } = useProducts({
    category,
    page,
    brands: selectedBrands,
    minPrice,
    maxPrice,
  });

  return (
    <div
      className="page-enter"
      style={{ minHeight: "100vh", background: "var(--bg-base)" }}
    >
      {/* Header */}
      <header
        style={{
          background: "var(--bg-surface)",
          borderBottom: "1px solid var(--border-subtle)",
          position: "sticky",
          top: 0,
          zIndex: 50,
          backdropFilter: "blur(12px)",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 24px",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "28px",
                height: "28px",
                background: "var(--accent)",
                borderRadius: "7px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.85rem",
                boxShadow: "0 0 16px var(--accent-glow)",
              }}
            >
              ◈
            </div>
            <span
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: "800",
                fontSize: "1.1rem",
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
              }}
            >
              BazaarFlow
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {category && (
              <span className="badge">{category.replace(/-/g, " ")}</span>
            )}
            <span style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>
              {total > 0 && `${total} items`}
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main layout */}
      <main
        style={{ maxWidth: "1400px", margin: "0 auto", padding: "28px 24px" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "clamp(220px, 22%, 280px) 1fr",
            gap: "24px",
            alignItems: "start",
          }}
          className="listing-grid"
        >
          {/* Filters sidebar */}
          <Filters
            selectedCategory={category}
            onCategoryChange={handleCategoryChange}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onMinPriceChange={handleMinPrice}
            onMaxPriceChange={handleMaxPrice}
            selectedBrands={selectedBrands}
            onBrandToggle={handleBrandToggle}
            availableBrands={allBrands}
            onReset={handleReset}
          />

          {/* Product grid + pagination */}
          <div>
            <ProductGrid
              products={products}
              isLoading={isLoading}
              isFetching={isFetching}
              isError={isError}
              error={error}
              total={total}
              page={page}
              totalPages={totalPages}
            />
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </main>

      {/* Responsive override */}
      <style>{`
        @media (max-width: 768px) {
          .listing-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
