export interface Country {
  code: string;
  name: string;
  nativeNames: string[];
  currencies: { [key: string]: string };
  languages: { [key: string]: string };
  emoji: string;
}