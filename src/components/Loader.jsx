function SkeletonCard() {
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: '12px',
      overflow: 'hidden',
    }}>
      {/* Image skeleton */}
      <div className="skeleton" style={{ aspectRatio: '1 / 1', width: '100%' }} />
      {/* Content */}
      <div style={{ padding: '14px 16px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div className="skeleton" style={{ height: '10px', width: '50%' }} />
        <div className="skeleton" style={{ height: '14px', width: '90%' }} />
        <div className="skeleton" style={{ height: '14px', width: '70%' }} />
        <div className="skeleton" style={{ height: '10px', width: '40%' }} />
        <div className="skeleton" style={{ height: '18px', width: '55%', marginTop: '4px' }} />
      </div>
    </div>
  );
}

export default function Loader({ count = 12 }) {
  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <div className="skeleton" style={{ height: '14px', width: '160px' }} />
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '16px',
      }}>
        {Array.from({ length: count }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
