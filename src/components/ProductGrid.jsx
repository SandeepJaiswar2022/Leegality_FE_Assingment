import ProductCard from './ProductCard';
import Loader from './Loader';
import ErrorState from './ErrorState';
import EmptyState from './EmptyState';

export default function ProductGrid({ products, isLoading, isFetching, isError, error, total, page, totalPages }) {
  if (isLoading) return <Loader />;
  if (isError) return <ErrorState message={error?.message} />;
  if (!isLoading && products.length === 0) return <EmptyState />;

  return (
    <div style={{ position: 'relative' }}>
      {/* Fetching overlay */}
      {isFetching && !isLoading && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(8, 8, 16, 0.45)',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '12px',
          backdropFilter: 'blur(2px)',
        }}>
          <div style={{
            display: 'flex',
            gap: '6px',
            alignItems: 'center',
          }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--accent)',
                animation: `bounce 0.8s ${i * 0.15}s infinite`,
              }} />
            ))}
          </div>
          <style>{`
            @keyframes bounce {
              0%, 100% { transform: translateY(0); opacity: 0.6; }
              50% { transform: translateY(-8px); opacity: 1; }
            }
          `}</style>
        </div>
      )}

      {/* Results count */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px',
      }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{total}</span>{' '}
          product{total !== 1 ? 's' : ''} found
          {totalPages > 1 && (
            <span> · Page <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{page}</span> of {totalPages}</span>
          )}
        </p>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '16px',
        animation: 'fadeUp 0.3s ease forwards',
      }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
