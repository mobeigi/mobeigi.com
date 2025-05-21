// TODO: This can be replaced with `Intl.NumberFormat('en', { notation: 'compact', roundingMode: 'floor' }).format(value)` after targetting ES2023 in tsconfig.
export const formatCompactNumber = (value: number): string => {
  const isNegative = value < 0;
  const abs = Math.floor(Math.abs(value));

  const format = (divisor: number, suffix: string, decimal = false) =>
    (isNegative ? '-' : '') +
    (decimal ? `${Math.floor(abs / (divisor / 10)) / 10}${suffix}` : `${Math.floor(abs / divisor)}${suffix}`);

  if (abs >= 10_000_000_000) return format(1_000_000_000, 'B');
  if (abs >= 1_000_000_000) return format(1_000_000_000, 'B', true);
  if (abs >= 10_000_000) return format(1_000_000, 'M');
  if (abs >= 1_000_000) return format(1_000_000, 'M', true);
  if (abs >= 10_000) return format(1_000, 'K');
  if (abs >= 1_000) return format(1_000, 'K', true);

  return (isNegative ? '-' : '') + `${abs}`;
};
