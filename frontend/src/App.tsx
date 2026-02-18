import { useState } from 'react';
import './index.css';
import Header from './components/Header';
import Hero from './components/Hero';
import TranslateForm from './components/TranslateForm';
import PipelineVisualizer from './components/PipelineVisualizer';
import SettingsPanel from './components/SettingsPanel';
import QuickStartSection from './components/QuickStartSection';
import type { AppConfig, JobStatus } from './types';

const DEFAULT_CONFIG: AppConfig = {
  det_thresh: 0.3,
  dist_thresh: 0.2,
  hf_token: '',
  use_enhancer: false,
  add_subtitles: true,
};

export default function App() {
  const [config, setConfig] = useState<AppConfig>(DEFAULT_CONFIG);
  const [jobStatus, setJobStatus] = useState<JobStatus>('idle');
  const [activeStep, setActiveStep] = useState(0);

  function handleJobStart() {
    setJobStatus('running');
    setActiveStep(1);
  }

  function handleStepProgress(step: number) {
    setActiveStep(step);
  }

  function handleJobDone() {
    setJobStatus('done');
    setActiveStep(7);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Hero />

      <main style={{
        flex: 1, maxWidth: 1200, margin: '0 auto', width: '100%',
        padding: '48px 24px', display: 'flex', flexDirection: 'column', gap: 48,
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)',
          gap: 24,
          alignItems: 'start',
        }}>
          <TranslateForm
            config={config}
            jobStatus={jobStatus}
            onJobStart={handleJobStart}
            onStepProgress={handleStepProgress}
            onJobDone={handleJobDone}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <PipelineVisualizer activeStep={activeStep} jobStatus={jobStatus} />
            <SettingsPanel config={config} onChange={setConfig} />
          </div>
        </div>

        <QuickStartSection />
      </main>

      <footer style={{
        borderTop: '1px solid var(--color-border)',
        padding: '24px 32px',
        textAlign: 'center',
        fontSize: 13,
        color: 'var(--color-text-muted)',
      }}>
        HeyGenClone — Open-source AI video dubbing.
        Built with Whisper-X, XTTS v2, Wav2Lip, YOLOv8, GFPGAN.
      </footer>
    </div>
  );
}
