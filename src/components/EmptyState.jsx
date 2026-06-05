export default function EmptyState() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '64px 24px',
      gap: '16px',
      textAlign: 'center',
    }}>
      <div style={{
        width: '72px',
        height: '72px',
        borderRadius: '50%',
        background: 'var(--accent-dim)',
        border: '1px solid rgba(124, 111, 255, 0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2rem',
      }}>
        🔍
      </div>
      <div>
        <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '6px', fontSize: '1.1rem' }}>
          No products found
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', maxWidth: '360px' }}>
          Try adjusting your filters or search with different criteria.
        </p>
      </div>
    </div>
  );
}
