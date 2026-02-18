export default function Header() {
  return (
    <header style={{
      borderBottom: '1px solid var(--color-border)',
      background: 'var(--color-surface)',
      padding: '0 32px',
      height: 60,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 32, height: 32,
          background: 'var(--color-primary)',
          borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path fill="white" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
          </svg>
        </div>
        <span style={{ fontWeight: 700, fontSize: 17, letterSpacing: '-0.3px' }}>HeyGenClone</span>
        <span style={{
          fontSize: 11, fontWeight: 600, padding: '2px 8px',
          background: 'var(--color-primary-glow)',
          color: 'var(--color-primary)',
          borderRadius: 20, border: '1px solid rgba(59,130,246,0.3)',
          letterSpacing: '0.5px', textTransform: 'uppercase',
        }}>Open Source</span>
      </div>
      <nav style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <a href="#translate" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: 14, fontWeight: 500, transition: 'color var(--transition)' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-secondary)')}>
          Translate
        </a>
        <a href="#pipeline" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: 14, fontWeight: 500, transition: 'color var(--transition)' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-secondary)')}>
          Pipeline
        </a>
        <a href="#settings" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: 14, fontWeight: 500, transition: 'color var(--transition)' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-secondary)')}>
          Settings
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'var(--color-surface-3)',
            border: '1px solid var(--color-border)',
            borderRadius: 8, padding: '6px 14px',
            color: 'var(--color-text)', textDecoration: 'none',
            fontSize: 13, fontWeight: 500,
            transition: 'border-color var(--transition)',
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-border-hover)')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
          </svg>
          GitHub
        </a>
      </nav>
    </header>
  );
}
