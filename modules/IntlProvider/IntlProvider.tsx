import { ReactNode, useMemo } from 'react';
import { IntlProvider as ReactIntlProvider } from 'react-intl';

import enMessages from '../../lang/compiled/en.json';

// TODO: Implement localisation transaltions in future
const translations = { en: enMessages };

type IntlProviderProps = {
  children: ReactNode;
  locale?: string;
  defaultLocale: string;
};

const isObjKey = <T,>(key: string | number | symbol, obj: T): key is keyof T => key in obj;

export const IntlProvider = ({ children, locale, defaultLocale }: IntlProviderProps) => {
  const [shortLocale] = locale ? locale.split('-') : [defaultLocale];

  const messages = useMemo(() => {
    if (isObjKey(shortLocale, translations)) {
      return translations[shortLocale];
    }

    return translations.en;
  }, [shortLocale]);

  return (
    <ReactIntlProvider locale={shortLocale} defaultLocale={defaultLocale} messages={messages}>
      {children}
    </ReactIntlProvider>
  );
};
