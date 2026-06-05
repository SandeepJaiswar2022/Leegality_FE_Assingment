import { Link, useSearchParams } from 'react-router-dom';

function StarRating({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <span className="stars" aria-label={`Rating: ${rating} out of 5`} style={{ fontSize: '0.8rem', letterSpacing: '-1px' }}>
      {'★'.repeat(full)}
      {half ? '½' : ''}
      <span style={{ color: 'var(--text-muted)' }}>{'☆'.repeat(empty)}</span>
      <span style={{ color: 'var(--text-secondary)', fontFamily: 'DM Sans', fontSize: '0.72rem', marginLeft: '4px', letterSpacing: '0' }}>
        {rating.toFixed(1)}
      </span>
    </span>
  );
}

export default function ProductCard({ product }) {
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={`/product/${product.id}?${searchParams.toString()}`}
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <article className="card-base" style={{ overflow: 'hidden', cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Image */}
        <div style={{
          position: 'relative',
          aspectRatio: '1 / 1',
          overflow: 'hidden',
          background: 'var(--bg-elevated)',
          flexShrink: 0,
        }}>
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transition: 'transform 0.4s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />

          {/* Discount badge */}
          {product.discountPercentage > 0 && (
            <div style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              background: 'var(--error)',
              color: '#fff',
              borderRadius: '6px',
              padding: '2px 7px',
              fontSize: '0.7rem',
              fontWeight: '700',
              fontFamily: 'Syne, sans-serif',
            }}>
              -{Math.round(product.discountPercentage)}%
            </div>
          )}

          {/* Stock warning */}
          {product.stock <= 5 && product.stock > 0 && (
            <div style={{
              position: 'absolute',
              bottom: '8px',
              left: '8px',
              background: 'rgba(251, 191, 36, 0.15)',
              border: '1px solid rgba(251, 191, 36, 0.4)',
              color: 'var(--warning)',
              borderRadius: '6px',
              padding: '2px 7px',
              fontSize: '0.68rem',
              fontWeight: '600',
            }}>
              Only {product.stock} left
            </div>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: '14px 16px 16px', display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
          {/* Brand */}
          {product.brand && (
            <span style={{ color: 'var(--accent-bright)', fontSize: '0.7rem', fontWeight: '600', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'Syne, sans-serif' }}>
              {product.brand}
            </span>
          )}

          {/* Title */}
          <h3 style={{
            fontSize: '0.9rem',
            fontWeight: '600',
            color: 'var(--text-primary)',
            lineHeight: '1.4',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            fontFamily: 'DM Sans, sans-serif',
            marginTop: 'auto',
          }}>
            {product.title}
          </h3>

          {/* Rating */}
          <StarRating rating={product.rating} />

          {/* Price row */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '4px' }}>
            <span style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'Syne, sans-serif' }}>
              ${product.price.toFixed(2)}
            </span>
            {product.discountPercentage > 0 && (
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
