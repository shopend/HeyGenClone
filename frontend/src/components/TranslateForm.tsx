import { useState } from 'react';
import UploadSection from './UploadSection';
import LanguagePicker from './LanguagePicker';
import CommandBlock from './CommandBlock';
import type { AppConfig, JobStatus } from '../types';
import { LANGUAGES } from '../data/languages';

type Props = {
  config: AppConfig;
  onJobStart: () => void;
  onStepProgress: (step: number) => void;
  onJobDone: () => void;
  onJobError: () => void;
  jobStatus: JobStatus;
};

export default function TranslateForm({ config, onJobStart, onStepProgress, onJobDone, jobStatus }: Omit<Props, 'onJobError'>) {
  const [file, setFile] = useState<File | null>(null);
  const [language, setLanguage] = useState('spanish');
  const [outputName, setOutputName] = useState('output.mp4');

  const selectedLang = LANGUAGES.find(l => l.code === language);

  const command = `python translate.py "${file?.name ?? 'video.mp4'}" ${language} -o ${outputName}`;

  function simulate() {
    if (!file) return;
    onJobStart();
    let step = 1;
    const interval = setInterval(() => {
      onStepProgress(step);
      step++;
      if (step > 7) {
        clearInterval(interval);
        setTimeout(onJobDone, 600);
      }
    }, 900);
  }

  const canRun = !!file && !!language && jobStatus !== 'running';

  return (
    <div id="translate" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
      }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Translate Video</h2>
        <p style={{ fontSize: 13, color: 'var(--color-text-muted)', marginBottom: 24 }}>
          English-language video in, dubbed video out
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <UploadSection file={file} onFileChange={setFile} />
          <LanguagePicker selected={language} onSelect={setLanguage} />

          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Output Filename
            </label>
            <input
              value={outputName}
              onChange={e => setOutputName(e.target.value)}
              placeholder="output.mp4"
              style={{
                width: '100%', padding: '10px 14px',
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
        </div>
      </div>

      <div style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
      }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Generated Command</h3>
        <CommandBlock command={command} label="Terminal" />
        <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 10, lineHeight: 1.6 }}>
          Run this in your project root after installing dependencies via <code style={{ background: 'var(--color-surface-3)', padding: '1px 5px', borderRadius: 4 }}>./install.sh</code>
        </p>
      </div>

      {!config.hf_token && (
        <div style={{
          display: 'flex', gap: 12, alignItems: 'flex-start',
          padding: '14px 16px',
          background: 'var(--color-warning-bg)',
          border: '1px solid rgba(245,158,11,0.3)',
          borderRadius: 10,
        }}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 2 }}>
            <path stroke="var(--color-warning)" strokeWidth="2" strokeLinecap="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
          </svg>
          <div>
            <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--color-warning)', marginBottom: 2 }}>HuggingFace token missing</div>
            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
              Speaker diarization requires a HuggingFace token. Add it in Settings above.
            </div>
          </div>
        </div>
      )}

      <button
        onClick={simulate}
        disabled={!canRun}
        style={{
          width: '100%', padding: '14px',
          background: canRun ? 'var(--color-primary)' : 'var(--color-surface-3)',
          border: `1px solid ${canRun ? 'var(--color-primary)' : 'var(--color-border)'}`,
          borderRadius: 10, cursor: canRun ? 'pointer' : 'not-allowed',
          color: canRun ? 'white' : 'var(--color-text-muted)',
          fontSize: 15, fontWeight: 600,
          transition: 'background var(--transition), opacity var(--transition)',
          opacity: canRun ? 1 : 0.6,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        }}
        onMouseEnter={e => { if (canRun) e.currentTarget.style.background = 'var(--color-primary-dark)'; }}
        onMouseLeave={e => { if (canRun) e.currentTarget.style.background = 'var(--color-primary)'; }}
      >
        {jobStatus === 'running' ? (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
              <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
              <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            Processing...
          </>
        ) : jobStatus === 'done' ? (
          <>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <path stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
            Done — Run Again
          </>
        ) : (
          <>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <path fill="white" d="M8 5v14l11-7z"/>
            </svg>
            {selectedLang ? `Translate to ${selectedLang.label}` : 'Select a language'}
          </>
        )}
      </button>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
