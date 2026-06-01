export type CoverKey = 'coral' | 'amber' | 'rose' | 'sage' | 'sky' | 'plum';

export const TOKENS = {
  primary:   '#e76f51',
  primaryDk: '#cf5836',
  amber:     '#f0a35e',
  ink:       '#3a2b25',
  inkSoft:   '#8a7a70',
  inkFaint:  '#b8a99f',
  bg:        '#fbf3ec',
  line:      'rgba(58,43,37,0.10)',
} as const;

export const COVERS: Record<CoverKey, [string, string]> = {
  coral: ['#f3906e', '#e2613f'],
  amber: ['#f5b46e', '#eb8d3c'],
  rose:  ['#ef8f8c', '#d75f6c'],
  sage:  ['#9bb589', '#62906c'],
  sky:   ['#94b7c6', '#5f8aa3'],
  plum:  ['#c193b3', '#9a5f86'],
};
