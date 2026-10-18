// Bracketed text like "[email address]" marks copy Ben still has to fill in.
export const isPlaceholder = (value: string) => /^\[[^\]]*\]$/.test(value.trim());

export const hasPlaceholder = (value: string) => /\[[^\]]*\]/.test(value);
