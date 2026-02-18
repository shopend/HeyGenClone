import type { ReactElement } from 'react';
import { PIPELINE_STEPS } from '../data/languages';
import type { JobStatus } from '../types';

type Props = {
  activeStep: number;
  jobStatus: JobStatus;
};

const ICONS: Record<string, ReactElement> = {
  audio: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" d="M9 18V5l12-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zm12-2a3 3 0 11-6 0 3 3 0 016 0z"/>
    </svg>
  ),
  transcribe: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"/>
    </svg>
  ),
  face: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
    </svg>
  ),
  map: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"/>
    </svg>
  ),
  translate: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"/>
    </svg>
  ),
  voice: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>
    </svg>
  ),
  lipsync: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"/>
    </svg>
  ),
};

function StepBadge({ step, active, done, running }: { step: typeof PIPELINE_STEPS[0]; active: boolean; done: boolean; running: boolean }) {
  const color = done ? 'var(--color-success)' : running ? 'var(--color-primary)' : 'var(--color-text-muted)';
  const bg = done ? 'var(--color-success-bg)' : running ? 'var(--color-primary-glow)' : 'var(--color-surface-3)';
  const border = done ? 'rgba(34,197,94,0.3)' : running ? 'rgba(59,130,246,0.4)' : 'var(--color-border)';

  return (
    <div style={{
      display: 'flex', gap: 14, alignItems: 'flex-start',
      padding: '14px 16px',
      background: active ? bg : 'var(--color-surface-2)',
      border: `1px solid ${active ? border : 'var(--color-border)'}`,
      borderRadius: 10,
      transition: 'background var(--transition), border-color var(--transition)',
      position: 'relative', overflow: 'hidden',
    }}>
      {running && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: 'linear-gradient(90deg, transparent, var(--color-primary), transparent)',
          animation: 'slide 1.5s linear infinite',
        }} />
      )}

      <div style={{
        width: 36, height: 36, borderRadius: 9, flexShrink: 0,
        background: active ? bg : 'var(--color-surface-3)',
        border: `1px solid ${active ? border : 'var(--color-border)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color,
      }}>
        {done ? (
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <path stroke="var(--color-success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
          </svg>
        ) : ICONS[step.icon]}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
          <span style={{ fontSize: 11, color: 'var(--color-text-muted)', fontWeight: 600 }}>STEP {step.id}</span>
          {running && (
            <span style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '0.5px',
              color: 'var(--color-primary)',
              background: 'var(--color-primary-glow)',
              padding: '1px 7px', borderRadius: 10, textTransform: 'uppercase',
            }}>Running</span>
          )}
          {done && (
            <span style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '0.5px',
              color: 'var(--color-success)',
              background: 'var(--color-success-bg)',
              padding: '1px 7px', borderRadius: 10, textTransform: 'uppercase',
            }}>Done</span>
          )}
        </div>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 3, color: active ? 'var(--color-text)' : 'var(--color-text-secondary)' }}>{step.label}</div>
        <div style={{ fontSize: 12, color: 'var(--color-text-muted)', lineHeight: 1.5 }}>{step.description}</div>
      </div>
    </div>
  );
}

export default function PipelineVisualizer({ activeStep, jobStatus }: Props) {
  return (
    <div id="pipeline">
      <style>{`
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>

      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Pipeline Steps</h2>
        <p style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>7-stage AI processing pipeline</p>
      </div>

      {jobStatus !== 'idle' && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '12px 16px', borderRadius: 10, marginBottom: 16,
          background: jobStatus === 'done' ? 'var(--color-success-bg)' : jobStatus === 'error' ? 'var(--color-error-bg)' : 'var(--color-primary-glow)',
          border: `1px solid ${jobStatus === 'done' ? 'rgba(34,197,94,0.3)' : jobStatus === 'error' ? 'rgba(239,68,68,0.3)' : 'rgba(59,130,246,0.3)'}`,
        }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%',
            background: jobStatus === 'done' ? 'var(--color-success)' : jobStatus === 'error' ? 'var(--color-error)' : 'var(--color-primary)',
            boxShadow: jobStatus === 'running' ? '0 0 0 3px rgba(59,130,246,0.2)' : 'none',
            animation: jobStatus === 'running' ? 'pulse 1.5s ease-in-out infinite' : 'none',
          }} />
          <span style={{ fontSize: 13, fontWeight: 500 }}>
            {jobStatus === 'running' && `Processing step ${activeStep} of ${PIPELINE_STEPS.length}...`}
            {jobStatus === 'done' && 'Translation complete — output video ready'}
            {jobStatus === 'error' && 'An error occurred during processing'}
          </span>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {PIPELINE_STEPS.map(step => (
          <StepBadge
            key={step.id}
            step={step}
            active={activeStep >= step.id || jobStatus === 'done'}
            done={jobStatus === 'done' || activeStep > step.id}
            running={activeStep === step.id && jobStatus === 'running'}
          />
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
