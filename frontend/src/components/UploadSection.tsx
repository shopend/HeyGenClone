import { useRef, useState } from 'react';

type Props = {
  file: File | null;
  onFileChange: (f: File | null) => void;
};

export default function UploadSection({ file, onFileChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped && dropped.type.startsWith('video/')) onFileChange(dropped);
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    if (f) onFileChange(f);
  }

  return (
    <div>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        Input Video
      </label>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${dragging ? 'var(--color-primary)' : file ? 'var(--color-success)' : 'var(--color-border)'}`,
          borderRadius: 'var(--radius-lg)',
          padding: '36px 24px',
          textAlign: 'center',
          cursor: 'pointer',
          background: dragging ? 'var(--color-primary-glow)' : file ? 'var(--color-success-bg)' : 'var(--color-surface-2)',
          transition: 'border-color var(--transition), background var(--transition)',
        }}
      >
        <input ref={inputRef} type="file" accept="video/*" style={{ display: 'none' }} onChange={handleFile} />

        {file ? (
          <>
            <div style={{
              width: 48, height: 48, borderRadius: 12,
              background: 'var(--color-success-bg)',
              border: '1px solid rgba(34,197,94,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 14px',
            }}>
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <path stroke="var(--color-success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <p style={{ fontWeight: 600, fontSize: 15, color: 'var(--color-success)', marginBottom: 4 }}>{file.name}</p>
            <p style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>{(file.size / 1024 / 1024).toFixed(1)} MB — click to change</p>
          </>
        ) : (
          <>
            <div style={{
              width: 48, height: 48, borderRadius: 12,
              background: 'var(--color-surface-3)',
              border: '1px solid var(--color-border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 14px',
            }}>
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <path stroke="var(--color-text-muted)" strokeWidth="1.5" strokeLinecap="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12V4m0 0L8 8m4-4l4 4"/>
              </svg>
            </div>
            <p style={{ fontWeight: 600, color: 'var(--color-text)', marginBottom: 4 }}>Drop a video file here</p>
            <p style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>or click to browse — MP4, MOV, AVI supported</p>
          </>
        )}
      </div>
    </div>
  );
}
