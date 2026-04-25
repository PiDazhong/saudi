import { useLang } from '../context/LanguageContext';
import en from '../../shark/en.json';
import ar from '../../shark/ar.json';

const translations = { en, ar };

export const useTranslation = () => {
  const { lang } = useLang();

  const t = (key) => {
    const dict = translations[lang] || translations.en;
    return dict[key] ?? key;
  };

  return { t, lang };
};
