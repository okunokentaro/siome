export const window = typeof window === 'object'
  ? window
  : {};

export const document = typeof window === 'object'
  ? window.document
  : {};
