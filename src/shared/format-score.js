function round(num) {
  return Math.round(num * 10) / 10;
}

const formatter =
  window.Intl && window.Intl.NumberFormat
    ? Intl.NumberFormat('en', { minimumFractionDigits: 1 })
    : {
        format(num) {
          return num;
        },
      };

export function formatScore(score) {
  return formatter.format ? formatter.format(round(score)) : round(score);
}
