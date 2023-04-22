export interface Currency {
  code: string;
  name: string;
}

export interface CurrencyExchangeRates {
  baseCurrencyCode: string;
  amount: number;
  rates: { [key: string]: number };
}
