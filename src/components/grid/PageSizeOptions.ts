interface PageSizeOption {
  label: string;
  value: number;
}

export const PageSizeOptions: { [key: string]: PageSizeOption } = {
  unpaged: {
    label: 'Unpaged',
    value: 0,
  },
  ten: {
    label: '10',
    value: 10,
  },
  twentyFive: {
    label: '25',
    value: 25,
  },
  fifty: {
    label: '50',
    value: 50,
  },
  hundred: {
    label: '100',
    value: 100,
  },
  twoHundredFifty: {
    label: '250',
    value: 250,
  },
}
