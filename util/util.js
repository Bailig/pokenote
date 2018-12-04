import R from 'ramda';

export const toPercent = R.pipe(
  R.multiply(1000),
  Math.round,
  R.divide(R.__, 10),
);
