export type PipelineStep = {
  id: number;
  label: string;
  description: string;
  icon: string;
  status: 'idle' | 'running' | 'done' | 'error';
};

export type AppConfig = {
  det_thresh: number;
  dist_thresh: number;
  hf_token: string;
  use_enhancer: boolean;
  add_subtitles: boolean;
};

export type Language = {
  code: string;
  label: string;
  flag: string;
};

export type JobStatus = 'idle' | 'running' | 'done' | 'error';
