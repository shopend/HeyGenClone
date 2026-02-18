import CommandBlock from './CommandBlock';

const STEPS = [
  {
    n: 1,
    title: 'Clone the repo',
    cmd: 'git clone https://github.com/BandarHL/OpenHeyGen.git && cd OpenHeyGen',
  },
  {
    n: 2,
    title: 'Install dependencies',
    cmd: './install.sh',
  },
  {
    n: 3,
    title: 'Add your HuggingFace token to config.json',
    cmd: '# Set "HF_TOKEN": "hf_xxxx" in config.json',
  },
  {
    n: 4,
    title: 'Run translation',
    cmd: 'python translate.py myvideo.mp4 spanish -o output.mp4',
  },
];

export default function QuickStartSection() {
  return (
    <section style={{
      padding: '64px 32px',
      borderTop: '1px solid var(--color-border)',
      maxWidth: 900, margin: '0 auto', width: '100%',
    }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>Quick Start</h2>
      <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', marginBottom: 40, fontSize: 14 }}>
        Get running in four steps
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {STEPS.map(step => (
          <div key={step.n} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%', flexShrink: 0, marginTop: 2,
              background: 'var(--color-primary-glow)',
              border: '1px solid rgba(59,130,246,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 700, color: 'var(--color-primary)',
            }}>{step.n}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 8 }}>{step.title}</div>
              <CommandBlock command={step.cmd} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
