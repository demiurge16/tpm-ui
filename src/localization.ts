import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from '../public/locales/en/translation.json';
import fr from '../public/locales/fr/translation.json';
import nl from '../public/locales/nl/translation.json';
import de from '../public/locales/de/translation.json';
import es from '../public/locales/es/translation.json';
import pt from '../public/locales/pt/translation.json';
import it from '../public/locales/it/translation.json';
import pl from '../public/locales/pl/translation.json';
import ua from '../public/locales/ua/translation.json';
import hr from '../public/locales/hr/translation.json';
import jp from '../public/locales/jp/translation.json';

i18n.use(initReactI18next).init({
  lng: 'en',
  debug: true,
  resources: {
    en: {
      translation: en
    },
    fr: {
      translation: fr
    },
    nl: {
      translation: nl
    },
    de: {
      translation: de
    },
    es: {
      translation: es
    },
    pt: {
      translation: pt
    },
    it: {
      translation: it
    },
    pl: {
      translation: pl
    },
    ua: {
      translation: ua
    },
    hr: {
      translation: hr
    },
    jp: {
      translation: jp
    }
  },
  fallbackLng: 'en'
});

export default i18n;
