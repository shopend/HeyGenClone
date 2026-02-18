import type { Language } from '../types';

export const LANGUAGES: Language[] = [
  { code: 'spanish',    label: 'Spanish',    flag: '🇪🇸' },
  { code: 'french',     label: 'French',     flag: '🇫🇷' },
  { code: 'german',     label: 'German',     flag: '🇩🇪' },
  { code: 'italian',    label: 'Italian',    flag: '🇮🇹' },
  { code: 'portuguese', label: 'Portuguese', flag: '🇵🇹' },
  { code: 'polish',     label: 'Polish',     flag: '🇵🇱' },
  { code: 'turkish',    label: 'Turkish',    flag: '🇹🇷' },
  { code: 'russian',    label: 'Russian',    flag: '🇷🇺' },
  { code: 'dutch',      label: 'Dutch',      flag: '🇳🇱' },
  { code: 'czech',      label: 'Czech',      flag: '🇨🇿' },
  { code: 'arabic',     label: 'Arabic',     flag: '🇸🇦' },
  { code: 'chinese',    label: 'Chinese',    flag: '🇨🇳' },
  { code: 'japanese',   label: 'Japanese',   flag: '🇯🇵' },
  { code: 'hungarian',  label: 'Hungarian',  flag: '🇭🇺' },
  { code: 'korean',     label: 'Korean',     flag: '🇰🇷' },
  { code: 'english',    label: 'English',    flag: '🇬🇧' },
];

export const PIPELINE_STEPS = [
  {
    id: 1,
    label: 'Audio Extraction',
    description: 'Extract audio from video, denoise voice from background',
    icon: 'audio',
  },
  {
    id: 2,
    label: 'Transcription',
    description: 'Transcribe speech with Whisper-X and identify speakers',
    icon: 'transcribe',
  },
  {
    id: 3,
    label: 'Face Detection',
    description: 'Detect scene cuts, find faces, build embeddings',
    icon: 'face',
  },
  {
    id: 4,
    label: 'Speaker Mapping',
    description: 'Match speaker audio to detected faces in video',
    icon: 'map',
  },
  {
    id: 5,
    label: 'Translation',
    description: 'Translate text segments to the target language',
    icon: 'translate',
  },
  {
    id: 6,
    label: 'Voice Cloning',
    description: 'Clone each speaker voice and synthesize translated speech',
    icon: 'voice',
  },
  {
    id: 7,
    label: 'Lip Sync',
    description: 'Sync lip movements to new audio using Wav2Lip GAN',
    icon: 'lipsync',
  },
];
