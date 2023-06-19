import numeral from 'numeral';

const CENTS_IN_USD = 100;

export const isNumeric = str => !Number.isNaN(parseInt(str, 10));
export const currency = (number, config = {}) =>
  numeral(config.cents ? Number(number / CENTS_IN_USD) : Number(number)).format(
    '$0,0.00'
  );
