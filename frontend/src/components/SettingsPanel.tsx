import type { AppConfig } from '../types';

type Props = {
  config: AppConfig;
  onChange: (c: AppConfig) => void;
};

function Toggle({ checked, onChange, label, hint }: { checked: boolean; onChange: (v: boolean) => void; label: string; hint: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid var(--color-border)' }}>
      <div>
        <div style={{ fontWeight: 500, fontSize: 14 }}>{label}</div>
        <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 2 }}>{hint}</div>
      </div>
      <button
        onClick={() => onChange(!checked)}
        style={{
          width: 44, height: 24, borderRadius: 12,
          background: checked ? 'var(--color-primary)' : 'var(--color-surface-3)',
          border: `1px solid ${checked ? 'var(--color-primary)' : 'var(--color-border)'}`,
          cursor: 'pointer', position: 'relative', transition: 'background var(--transition), border-color var(--transition)',
          flexShrink: 0,
        }}
      >
        <span style={{
          position: 'absolute', top: 2, left: checked ? 22 : 2,
          width: 18, height: 18, borderRadius: '50%',
          background: 'white', transition: 'left var(--transition)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
        }} />
      </button>
    </div>
  );
}

function SliderRow({ label, hint, value, min, max, step, onChange }: {
  label: string; hint: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void;
}) {
  return (
    <div style={{ padding: '14px 0', borderBottom: '1px solid var(--color-border)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <div>
          <div style={{ fontWeight: 500, fontSize: 14 }}>{label}</div>
          <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 2 }}>{hint}</div>
        </div>
        <span style={{
          fontFamily: 'monospace', fontSize: 13, fontWeight: 600,
          color: 'var(--color-primary)',
          background: 'var(--color-primary-glow)',
          padding: '2px 8px', borderRadius: 6,
        }}>{value.toFixed(2)}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ width: '100%', accentColor: 'var(--color-primary)', cursor: 'pointer' }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{min}</span>
        <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{max}</span>
      </div>
    </div>
  );
}

function TokenInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ padding: '14px 0' }}>
      <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 4 }}>HuggingFace Token</div>
      <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginBottom: 10 }}>
        Required for speaker diarization via pyannote — get yours at huggingface.co/settings/tokens
      </div>
      <input
        type="password"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="hf_xxxxxxxxxxxxxxxxxxxx"
        style={{
          width: '100%', padding: '10px 14px',
          background: 'var(--color-surface-2)',
          border: `1px solid ${value ? 'rgba(34,197,94,0.4)' : 'var(--color-border)'}`,
          borderRadius: 8, color: 'var(--color-text)',
          fontSize: 13, fontFamily: 'monospace', outline: 'none',
          transition: 'border-color var(--transition)',
        }}
        onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-primary)')}
        onBlur={e => (e.currentTarget.style.borderColor = value ? 'rgba(34,197,94,0.4)' : 'var(--color-border)')}
      />
      {!value && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          marginTop: 8, fontSize: 12,
          color: 'var(--color-warning)',
        }}>
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth="2" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
          </svg>
          Token required — pipeline will fail without it
        </div>
      )}
    </div>
  );
}

export default function SettingsPanel({ config, onChange }: Props) {
  return (
    <div id="settings" style={{
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-lg)',
      padding: '24px',
    }}>
      <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Settings</h2>
      <p style={{ fontSize: 13, color: 'var(--color-text-muted)', marginBottom: 4 }}>Configure pipeline behaviour</p>

      <TokenInput value={config.hf_token} onChange={v => onChange({ ...config, hf_token: v })} />

      <SliderRow
        label="Detection Threshold"
        hint="Face detection confidence — lower catches more faces"
        value={config.det_thresh} min={0.1} max={0.9} step={0.05}
        onChange={v => onChange({ ...config, det_thresh: v })}
      />
      <SliderRow
        label="Distance Threshold"
        hint="Face re-identification — lower = stricter matching"
        value={config.dist_thresh} min={0.05} max={0.5} step={0.05}
        onChange={v => onChange({ ...config, dist_thresh: v })}
      />

      <Toggle
        checked={config.use_enhancer}
        onChange={v => onChange({ ...config, use_enhancer: v })}
        label="Face Enhancement"
        hint="Apply GFPGAN to restore/sharpen faces after lip sync"
      />
      <Toggle
        checked={config.add_subtitles}
        onChange={v => onChange({ ...config, add_subtitles: v })}
        label="Add Subtitles"
        hint="Burn translated text subtitles into the output video"
      />

      <div style={{
        marginTop: 16, padding: '12px 14px',
        background: 'var(--color-surface-2)',
        border: '1px solid var(--color-border)',
        borderRadius: 8,
      }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
          CLI Equivalent
        </div>
        <code style={{ fontSize: 12, color: 'var(--color-primary)', fontFamily: 'monospace', lineHeight: 1.8, display: 'block', wordBreak: 'break-all' }}>
          {`python translate.py video.mp4 <lang> -o output.mp4`}
        </code>
        <code style={{ fontSize: 12, color: 'var(--color-text-muted)', fontFamily: 'monospace', lineHeight: 1.8, display: 'block' }}>
          {`# config.json: DET_TRESH=${config.det_thresh.toFixed(2)}, DIST_TRESH=${config.dist_thresh.toFixed(2)}`}
          <br/>{`# USE_ENHANCER=${config.use_enhancer}, ADD_SUBTITLES=${config.add_subtitles}`}
        </code>
      </div>
    </div>
  );
}
