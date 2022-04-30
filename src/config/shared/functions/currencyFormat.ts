export function currencyFormat(numberFormat: number) {
  const currencyFormat = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return currencyFormat.format(numberFormat);
}
