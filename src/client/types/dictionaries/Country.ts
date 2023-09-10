export interface Country {
  code: string;
  cca2: string;
  ccn3: string;
  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string
      }
    };
  };
  topLevelDomains: string[];
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    }
  };
  internationalDirectDialing: {
    root: string;
    suffixes: string[];
  };
  capital: string[];
  altSpellings: string[];
  languages: {
    code: string;
    name: string;
  }[];
  translations: {
    [key: string]: {
      official: string;
      common: string;
    }
  };
  region: string;
  flag: string;
  postalCode: {
    format: string;
    regex: string;
  };
}
