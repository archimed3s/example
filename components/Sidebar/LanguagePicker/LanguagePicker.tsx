import { useRouter } from 'next/router';

import { Dropdown, DropdownItem } from '@components/Dropdown/Dropdown';
import { Flags } from '@components/Flags/Flags';

import { LanguagePickerContainer } from './LanguagePickerContainer';

const LOCALES_MAPPING: Record<string, DropdownItem> = {
  en: {
    label: 'Global',
    value: 'en',
    icon: <Flags country="GB" size={4} />,
  },
  'en-CA': {
    label: 'Canada',
    value: 'en-CA',
    countryCode: 'CA',
    icon: <Flags country="CA" size={4} />,
  },
  'en-AU': {
    label: 'Australia',
    value: 'en-AU',
    icon: <Flags country="AU" size={4} />,
  },
  'fr-CA': {
    label: 'French (Canada)',
    value: 'fr-CA',
    icon: <Flags country="FR" size={4} />,
  },
};

export const LanguagePicker = () => {
  const { locale, locales, asPath, push } = useRouter();

  const selectedCountry = locale && LOCALES_MAPPING[locale] ? LOCALES_MAPPING[locale] : LOCALES_MAPPING.en;
  const dropdownLocales =
    locales?.reduce<DropdownItem[]>((acc, locale) => {
      if (LOCALES_MAPPING[locale]) {
        return [...acc, LOCALES_MAPPING[locale]];
      }

      return acc;
    }, []) || [];

  const onChange = (item: DropdownItem) => {
    push(asPath, asPath, { locale: item.value });
  };

  return (
    <Dropdown
      onChange={onChange}
      items={dropdownLocales}
      selectedItem={selectedCountry}
      components={{ Container: LanguagePickerContainer }}
    />
  );
};
