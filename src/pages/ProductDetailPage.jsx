import { useParams, useSearchParams, Link } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import ErrorState from "../components/ErrorState";
import ThemeToggle from "../components/ThemeToggle";

function DetailSkeleton() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "48px",
        alignItems: "start",
      }}
      className="detail-grid"
    >
      <div
        className="skeleton"
        style={{ aspectRatio: "1", borderRadius: "14px" }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          paddingTop: "8px",
        }}
      >
        {[80, 55, 40, 100, 70, 90, 60].map((w, i) => (
          <div
            key={i}
            className="skeleton"
            style={{ height: i === 3 ? "80px" : "18px", width: `${w}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function StarRating({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <span style={{ fontSize: "1.1rem", letterSpacing: "-1px" }}>
      <span style={{ color: "var(--star)" }}>
        {"★".repeat(full)}
        {half ? "½" : ""}
      </span>
      <span style={{ color: "var(--text-muted)" }}>{"☆".repeat(empty)}</span>
      <span
        style={{
          color: "var(--text-secondary)",
          fontFamily: "DM Sans",
          fontSize: "0.85rem",
          marginLeft: "8px",
          letterSpacing: "0",
        }}
      >
        {rating.toFixed(1)} / 5
      </span>
    </span>
  );
}

function InfoRow({ label, value }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 0",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <span
        style={{
          color: "var(--text-muted)",
          fontSize: "0.83rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          fontWeight: "600",
          fontFamily: "Syne, sans-serif",
        }}
      >
        {label}
      </span>
      <span
        style={{
          color: "var(--text-primary)",
          fontSize: "0.9rem",
          fontWeight: "500",
          textAlign: "right",
          maxWidth: "60%",
        }}
      >
        {value}
      </span>
    </div>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { data: product, isLoading, isError, error } = useProduct(id);

  const backHref = `/?${searchParams.toString()}`;

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
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
            }}
          >
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
          </Link>

          <Link
            to={backHref}
            className="btn-ghost"
            style={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "0.85rem",
            }}
          >
            ← Back to listings
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "36px 24px" }}
      >
        {isLoading ? (
          <DetailSkeleton />
        ) : isError ? (
          <ErrorState message={error?.message} />
        ) : product ? (
          <div>
            {/* Breadcrumb */}
            <nav
              style={{
                marginBottom: "28px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "0.82rem",
                color: "var(--text-muted)",
              }}
            >
              <Link
                to={backHref}
                style={{
                  color: "var(--accent-bright)",
                  textDecoration: "none",
                }}
              >
                Products
              </Link>
              <span>/</span>
              {product.category && (
                <>
                  <Link
                    to={`/?category=${product.category}`}
                    style={{
                      color: "var(--text-secondary)",
                      textDecoration: "none",
                      textTransform: "capitalize",
                    }}
                  >
                    {product.category}
                  </Link>
                  <span>/</span>
                </>
              )}
              <span style={{ color: "var(--text-primary)" }}>
                {product.title}
              </span>
            </nav>

            {/* Product detail grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "48px",
                alignItems: "start",
              }}
              className="detail-grid"
            >
              {/* Image gallery */}
              <div>
                <div
                  style={{
                    background: "var(--bg-elevated)",
                    borderRadius: "14px",
                    overflow: "hidden",
                    border: "1px solid var(--border-subtle)",
                    aspectRatio: "1",
                  }}
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>

                {/* Thumbnails row */}
                {product.images && product.images.length > 1 && (
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      marginTop: "12px",
                      overflowX: "auto",
                      paddingBottom: "4px",
                    }}
                  >
                    {product.images.slice(0, 5).map((img, i) => (
                      <div
                        key={i}
                        style={{
                          flexShrink: 0,
                          width: "64px",
                          height: "64px",
                          borderRadius: "8px",
                          overflow: "hidden",
                          border:
                            i === 0
                              ? "2px solid var(--accent)"
                              : "1px solid var(--border)",
                          cursor: "pointer",
                          transition: "border-color 0.15s",
                        }}
                      >
                        <img
                          src={img}
                          alt={`View ${i + 1}`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Info */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {/* Brand + Category */}
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {product.brand && (
                    <span className="badge">{product.brand}</span>
                  )}
                  {product.category && (
                    <span
                      className="badge"
                      style={{
                        background: "rgba(52, 211, 153, 0.1)",
                        color: "var(--success)",
                        borderColor: "rgba(52, 211, 153, 0.25)",
                      }}
                    >
                      {product.category}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: "800",
                    fontSize: "clamp(1.4rem, 3vw, 2rem)",
                    color: "var(--text-primary)",
                    lineHeight: "1.2",
                  }}
                >
                  {product.title}
                </h1>

                {/* Rating */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <StarRating rating={product.rating} />
                  {product.reviews?.length > 0 && (
                    <span
                      style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}
                    >
                      ({product.reviews.length} review
                      {product.reviews.length !== 1 ? "s" : ""})
                    </span>
                  )}
                </div>

                {/* Price */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "12px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Syne, sans-serif",
                      fontSize: "2rem",
                      fontWeight: "800",
                      color: "var(--text-primary)",
                    }}
                  >
                    ${product.price.toFixed(2)}
                  </span>
                  {product.discountPercentage > 0 && (
                    <>
                      <span
                        style={{
                          color: "var(--text-muted)",
                          textDecoration: "line-through",
                          fontSize: "1.1rem",
                        }}
                      >
                        $
                        {(
                          product.price /
                          (1 - product.discountPercentage / 100)
                        ).toFixed(2)}
                      </span>
                      <span
                        style={{
                          background: "rgba(248, 113, 113, 0.15)",
                          color: "var(--error)",
                          border: "1px solid rgba(248,113,113,0.3)",
                          borderRadius: "6px",
                          padding: "2px 8px",
                          fontSize: "0.82rem",
                          fontWeight: "700",
                        }}
                      >
                        -{Math.round(product.discountPercentage)}% OFF
                      </span>
                    </>
                  )}
                </div>

                {/* Description */}
                {product.description && (
                  <p
                    style={{
                      color: "var(--text-secondary)",
                      lineHeight: "1.75",
                      fontSize: "0.92rem",
                    }}
                  >
                    {product.description}
                  </p>
                )}

                {/* Stock */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    background:
                      product.stock > 10
                        ? "rgba(52, 211, 153, 0.08)"
                        : product.stock > 0
                          ? "rgba(251, 191, 36, 0.08)"
                          : "rgba(248, 113, 113, 0.08)",
                    border: `1px solid ${product.stock > 10 ? "rgba(52,211,153,0.25)" : product.stock > 0 ? "rgba(251,191,36,0.25)" : "rgba(248,113,113,0.25)"}`,
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color:
                        product.stock > 10
                          ? "var(--success)"
                          : product.stock > 0
                            ? "var(--warning)"
                            : "var(--error)",
                    }}
                  >
                    {product.stock > 10
                      ? `✓ In Stock`
                      : product.stock > 0
                        ? `⚠ Only ${product.stock} left`
                        : "✕ Out of Stock"}
                  </span>
                  {product.availabilityStatus && (
                    <span
                      style={{
                        color: "var(--text-muted)",
                        fontSize: "0.78rem",
                      }}
                    >
                      — {product.availabilityStatus}
                    </span>
                  )}
                </div>

                {/* CTA */}
                <div style={{ display: "flex", gap: "12px" }}>
                  <button
                    className="btn-primary"
                    style={{
                      flex: 1,
                      padding: "12px",
                      fontSize: "0.95rem",
                      fontFamily: "Syne, sans-serif",
                      fontWeight: "700",
                    }}
                    disabled={product.stock === 0}
                  >
                    {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                  </button>
                  <button
                    className="btn-ghost"
                    style={{ padding: "12px 16px", fontSize: "1.1rem" }}
                    aria-label="Wishlist"
                  >
                    ♡
                  </button>
                </div>

                {/* Product details table */}
                <div style={{ marginTop: "8px" }}>
                  <h3
                    style={{
                      fontFamily: "Syne, sans-serif",
                      fontWeight: "700",
                      fontSize: "0.85rem",
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      marginBottom: "8px",
                    }}
                  >
                    Product Details
                  </h3>
                  {product.sku && <InfoRow label="SKU" value={product.sku} />}
                  {product.brand && (
                    <InfoRow label="Brand" value={product.brand} />
                  )}
                  {product.category && (
                    <InfoRow label="Category" value={product.category} />
                  )}
                  {product.weight && (
                    <InfoRow label="Weight" value={`${product.weight}g`} />
                  )}
                  {product.warrantyInformation && (
                    <InfoRow
                      label="Warranty"
                      value={product.warrantyInformation}
                    />
                  )}
                  {product.shippingInformation && (
                    <InfoRow
                      label="Shipping"
                      value={product.shippingInformation}
                    />
                  )}
                  {product.returnPolicy && (
                    <InfoRow label="Returns" value={product.returnPolicy} />
                  )}
                </div>
              </div>
            </div>

            {/* Reviews section */}
            {product.reviews && product.reviews.length > 0 && (
              <section style={{ marginTop: "56px" }}>
                <h2
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: "800",
                    fontSize: "1.25rem",
                    color: "var(--text-primary)",
                    marginBottom: "20px",
                  }}
                >
                  Customer Reviews
                </h2>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: "16px",
                  }}
                >
                  {product.reviews.map((review, i) => (
                    <div
                      key={i}
                      style={{
                        background: "var(--bg-card)",
                        border: "1px solid var(--border-subtle)",
                        borderRadius: "12px",
                        padding: "18px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: "10px",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontWeight: "600",
                              fontSize: "0.9rem",
                              color: "var(--text-primary)",
                            }}
                          >
                            {review.reviewerName}
                          </div>
                          <div
                            style={{
                              fontSize: "0.75rem",
                              color: "var(--text-muted)",
                              marginTop: "2px",
                            }}
                          >
                            {new Date(review.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                        </div>
                        <span
                          style={{ color: "var(--star)", fontSize: "0.9rem" }}
                        >
                          {"★".repeat(review.rating)}
                          <span style={{ color: "var(--text-muted)" }}>
                            {"☆".repeat(5 - review.rating)}
                          </span>
                        </span>
                      </div>
                      <p
                        style={{
                          color: "var(--text-secondary)",
                          fontSize: "0.875rem",
                          lineHeight: "1.6",
                        }}
                      >
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        ) : null}
      </main>

      <style>{`
        @media (max-width: 768px) {
          .detail-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
