import { useState } from 'react';

type Props = {
  command: string;
  label?: string;
};

export default function CommandBlock({ command, label }: Props) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(command).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div style={{
      background: 'var(--color-surface-2)',
      border: '1px solid var(--color-border)',
      borderRadius: 10, overflow: 'hidden',
    }}>
      {label && (
        <div style={{
          padding: '8px 14px',
          borderBottom: '1px solid var(--color-border)',
          fontSize: 11, fontWeight: 600, color: 'var(--color-text-muted)',
          textTransform: 'uppercase', letterSpacing: '0.5px',
          background: 'var(--color-surface-3)',
        }}>
          {label}
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 14px' }}>
        <span style={{ color: 'var(--color-success)', fontFamily: 'monospace', fontSize: 13, userSelect: 'none' }}>$</span>
        <code style={{
          flex: 1, fontFamily: 'monospace', fontSize: 13,
          color: 'var(--color-text)', wordBreak: 'break-all', lineHeight: 1.6,
        }}>{command}</code>
        <button
          onClick={copy}
          style={{
            flexShrink: 0, padding: '5px 10px',
            background: copied ? 'var(--color-success-bg)' : 'var(--color-surface-3)',
            border: `1px solid ${copied ? 'rgba(34,197,94,0.3)' : 'var(--color-border)'}`,
            borderRadius: 6, cursor: 'pointer',
            fontSize: 12, fontWeight: 500,
            color: copied ? 'var(--color-success)' : 'var(--color-text-secondary)',
            transition: 'all var(--transition)',
          }}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
