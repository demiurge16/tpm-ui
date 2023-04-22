export interface Language {
  code: string;
  iso6391: string;
  iso6392B: string;
  iso6392T: string;
  name: string;
  scope: string;
  type: string;
}

export interface LanguageScope {
  code: string;
  name: string;
}

export interface LanguageType {
  code: string;
  name: string;
}
