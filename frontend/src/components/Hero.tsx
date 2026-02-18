export default function Hero() {
  return (
    <section style={{
      textAlign: 'center',
      padding: '72px 32px 48px',
      background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(59,130,246,0.08) 0%, transparent 70%)',
      borderBottom: '1px solid var(--color-border)',
    }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        background: 'var(--color-surface-3)',
        border: '1px solid var(--color-border)',
        borderRadius: 20, padding: '6px 16px',
        fontSize: 13, color: 'var(--color-text-secondary)',
        marginBottom: 24,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-success)', display: 'inline-block' }} />
        AI-Powered Video Dubbing — Multilingual, Voice-Cloned, Lip-Synced
      </div>

      <h1 style={{
        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
        fontWeight: 700,
        lineHeight: 1.15,
        letterSpacing: '-1px',
        marginBottom: 20,
        maxWidth: 700,
        margin: '0 auto 20px',
      }}>
        Translate videos into{' '}
        <span style={{ color: 'var(--color-primary)' }}>16 languages</span>
        {' '}with your voice
      </h1>

      <p style={{
        fontSize: 17,
        color: 'var(--color-text-secondary)',
        maxWidth: 560,
        margin: '0 auto 40px',
        lineHeight: 1.7,
      }}>
        Open-source replica of HeyGen. Automatically transcribes, translates, clones voices,
        and syncs lips — all in one pipeline.
      </p>

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        {[
          { label: 'Whisper-X', desc: 'Transcription' },
          { label: 'XTTS v2', desc: 'Voice Cloning' },
          { label: 'Wav2Lip', desc: 'Lip Sync' },
          { label: 'GFPGAN', desc: 'Face Enhance' },
          { label: 'YOLOv8', desc: 'Face Detect' },
        ].map(item => (
          <div key={item.label} style={{
            background: 'var(--color-surface-2)',
            border: '1px solid var(--color-border)',
            borderRadius: 10, padding: '8px 16px',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
          }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text)' }}>{item.label}</span>
            <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{item.desc}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
