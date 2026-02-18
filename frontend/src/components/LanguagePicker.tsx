import { useState } from 'react';
import { LANGUAGES } from '../data/languages';

type Props = {
  selected: string;
  onSelect: (code: string) => void;
};

export default function LanguagePicker({ selected, onSelect }: Props) {
  const [search, setSearch] = useState('');

  const filtered = LANGUAGES.filter(l =>
    l.label.toLowerCase().includes(search.toLowerCase())
  );

  const selectedLang = LANGUAGES.find(l => l.code === selected);

  return (
    <div>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        Target Language
      </label>

      {selectedLang && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: 'var(--color-primary-glow)',
          border: '1px solid rgba(59,130,246,0.3)',
          borderRadius: 10, padding: '10px 14px',
          marginBottom: 12,
        }}>
          <span style={{ fontSize: 22 }}>{selectedLang.flag}</span>
          <div>
            <div style={{ fontWeight: 600, fontSize: 15 }}>{selectedLang.label}</div>
            <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>Selected output language</div>
          </div>
        </div>
      )}

      <div style={{
        position: 'relative', marginBottom: 10,
      }}>
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24"
          style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
          <circle cx="11" cy="11" r="7" stroke="var(--color-text-muted)" strokeWidth="2"/>
          <path d="m16.5 16.5 3.5 3.5" stroke="var(--color-text-muted)" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search language..."
          style={{
            width: '100%', padding: '9px 12px 9px 34px',
            background: 'var(--color-surface-2)',
            border: '1px solid var(--color-border)',
            borderRadius: 8, color: 'var(--color-text)',
            fontSize: 14, outline: 'none',
            transition: 'border-color var(--transition)',
          }}
          onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-primary)')}
          onBlur={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}
        />
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
        gap: 8, maxHeight: 220, overflowY: 'auto', paddingRight: 2,
      }}>
        {filtered.map(lang => (
          <button
            key={lang.code}
            onClick={() => onSelect(lang.code)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '9px 12px',
              background: selected === lang.code ? 'var(--color-primary-glow)' : 'var(--color-surface-2)',
              border: `1px solid ${selected === lang.code ? 'rgba(59,130,246,0.5)' : 'var(--color-border)'}`,
              borderRadius: 8, cursor: 'pointer',
              transition: 'border-color var(--transition), background var(--transition)',
              textAlign: 'left',
            }}
            onMouseEnter={e => {
              if (selected !== lang.code) e.currentTarget.style.borderColor = 'var(--color-border-hover)';
            }}
            onMouseLeave={e => {
              if (selected !== lang.code) e.currentTarget.style.borderColor = 'var(--color-border)';
            }}
          >
            <span style={{ fontSize: 18 }}>{lang.flag}</span>
            <span style={{ fontSize: 13, fontWeight: 500, color: selected === lang.code ? 'var(--color-primary)' : 'var(--color-text)' }}>
              {lang.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
