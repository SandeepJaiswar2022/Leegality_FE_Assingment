export default function ErrorState({ message = 'Failed to load products. Please try again.' }) {
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
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        background: 'rgba(248, 113, 113, 0.12)',
        border: '1px solid rgba(248, 113, 113, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.8rem',
      }}>
        ⚠
      </div>
      <div>
        <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '6px', fontSize: '1.1rem' }}>
          Something went wrong
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', maxWidth: '360px' }}>
          {message}
        </p>
      </div>
      <button
        className="btn-ghost"
        onClick={() => window.location.reload()}
        style={{ marginTop: '8px' }}
      >
        Try again
      </button>
    </div>
  );
}
