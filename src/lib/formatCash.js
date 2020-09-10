const formatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumSignificantDigits: 6
});

export const formatCash = (value) => formatter.format(value);
