import { useState } from 'react';
import { useCategories } from '../hooks/useCategories';

export default function Filters({
  selectedCategory,
  onCategoryChange,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  selectedBrands,
  onBrandToggle,
  availableBrands,
  onReset,
}) {
  const { data: categories = [], isLoading: catsLoading } = useCategories();
  const [brandsExpanded, setBrandsExpanded] = useState(true);
  const [categoryExpanded, setCategoryExpanded] = useState(true);
  const [priceExpanded, setPriceExpanded] = useState(true);

  const hasFilters =
    selectedCategory ||
    minPrice !== '' ||
    maxPrice !== '' ||
    selectedBrands.length > 0;

  const sectionHeader = (title, expanded, toggle) => (
    <button
      onClick={toggle}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '0',
        color: 'var(--text-primary)',
        fontFamily: 'Syne, sans-serif',
        fontWeight: '700',
        fontSize: '0.8rem',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
      }}
    >
      {title}
      <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', transition: 'transform 0.2s', transform: expanded ? 'rotate(180deg)' : 'rotate(0)' }}>▾</span>
    </button>
  );

  return (
    <aside style={{
      background: 'var(--bg-surface)',
      border: '1px solid var(--border-subtle)',
      borderRadius: '14px',
      padding: '20px',
      height: 'fit-content',
      position: 'sticky',
      top: '80px',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1rem', fontFamily: 'Syne, sans-serif', fontWeight: '800', color: 'var(--text-primary)' }}>
          Filters
        </h2>
        {hasFilters && (
          <button
            onClick={onReset}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--accent-bright)',
              fontSize: '0.78rem',
              fontWeight: '600',
              padding: '3px 8px',
              borderRadius: '6px',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--accent-dim)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
          >
            Clear all
          </button>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Category */}
        <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '20px' }}>
          {sectionHeader('Category', categoryExpanded, () => setCategoryExpanded(v => !v))}
          {categoryExpanded && (
            <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '200px', overflowY: 'auto', paddingRight: '4px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '5px 8px', borderRadius: '7px', background: !selectedCategory ? 'var(--accent-dim)' : 'transparent', transition: 'background 0.15s' }}>
                <input
                  type="radio"
                  name="category"
                  checked={!selectedCategory}
                  onChange={() => onCategoryChange('')}
                  style={{ accentColor: 'var(--accent)' }}
                />
                <span style={{ fontSize: '0.85rem', color: !selectedCategory ? 'var(--accent-bright)' : 'var(--text-secondary)', fontWeight: !selectedCategory ? '600' : '400' }}>
                  All Categories
                </span>
              </label>
              {catsLoading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="skeleton" style={{ height: '28px', marginBottom: '2px' }} />
                  ))
                : categories.map((cat) => {
                    const slug = cat.slug ?? cat;
                    const name = cat.name ?? cat;
                    const active = selectedCategory === slug;
                    return (
                      <label
                        key={slug}
                        style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '5px 8px', borderRadius: '7px', background: active ? 'var(--accent-dim)' : 'transparent', transition: 'background 0.15s' }}
                        onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = 'var(--bg-hover)'; }}
                        onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                      >
                        <input
                          type="radio"
                          name="category"
                          checked={active}
                          onChange={() => onCategoryChange(slug)}
                          style={{ accentColor: 'var(--accent)' }}
                        />
                        <span style={{ fontSize: '0.85rem', color: active ? 'var(--accent-bright)' : 'var(--text-secondary)', fontWeight: active ? '600' : '400', textTransform: 'capitalize' }}>
                          {name}
                        </span>
                      </label>
                    );
                  })}
            </div>
          )}
        </div>

        {/* Price Range */}
        <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '20px' }}>
          {sectionHeader('Price Range', priceExpanded, () => setPriceExpanded(v => !v))}
          {priceExpanded && (
            <div style={{ marginTop: '12px', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Min $</label>
                <input
                  type="number"
                  className="input-base"
                  placeholder="0"
                  value={minPrice}
                  min={0}
                  onChange={(e) => onMinPriceChange(e.target.value)}
                />
              </div>
              <span style={{ color: 'var(--text-muted)', marginTop: '20px', fontSize: '0.8rem' }}>–</span>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Max $</label>
                <input
                  type="number"
                  className="input-base"
                  placeholder="∞"
                  value={maxPrice}
                  min={0}
                  onChange={(e) => onMaxPriceChange(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>

        {/* Brands */}
        {availableBrands.length > 0 && (
          <div>
            {sectionHeader('Brand', brandsExpanded, () => setBrandsExpanded(v => !v))}
            {brandsExpanded && (
              <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '220px', overflowY: 'auto', paddingRight: '4px' }}>
                {availableBrands.map((brand) => {
                  const active = selectedBrands.includes(brand);
                  return (
                    <label
                      key={brand}
                      style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '5px 8px', borderRadius: '7px', background: active ? 'var(--accent-dim)' : 'transparent', transition: 'background 0.15s' }}
                      onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = 'var(--bg-hover)'; }}
                      onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                    >
                      <input
                        type="checkbox"
                        checked={active}
                        onChange={() => onBrandToggle(brand)}
                      />
                      <span style={{ fontSize: '0.85rem', color: active ? 'var(--accent-bright)' : 'var(--text-secondary)', fontWeight: active ? '600' : '400' }}>
                        {brand}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
