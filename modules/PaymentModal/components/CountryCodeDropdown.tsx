import { ICountryCodeItem, codes } from 'country-calling-code';
import { Control, Controller, FieldPath } from 'react-hook-form';

import { Dropdown, DropdownItem } from '@components/Dropdown';
import { Flags } from '@components/Flags';
import { useSiteSettings } from '@hooks/useSiteSettings';

const getSitePhones = (countryCodes: string[]): Array<ICountryCodeItem> => {
  return codes.filter(({ isoCode2 }) => countryCodes.includes(isoCode2));
};

type CountryCodeProps<Obj extends Record<string, string>, Name extends FieldPath<Obj>> = {
  name: Name;
  control: Control<Obj>;
};

export const CountryCodeDropdown = <Obj extends Record<string, string>, Name extends FieldPath<Obj>>({
  name,
  control,
}: CountryCodeProps<Obj, Name>) => {
  const settings = useSiteSettings();

  const items = getSitePhones(settings?.countries ?? []).map((country) => {
    return {
      label: `+${country.countryCodes[0]}`,
      value: country.countryCodes[0],
      icon: <Flags country={country.isoCode2} />,
    };
  });

  return (
    <Controller
      render={({ field }) => {
        const onSelectChange = (item: DropdownItem) => field.onChange(item.value);
        return <Dropdown id={name} testId={name} items={items} onChange={onSelectChange} />;
      }}
      name={name}
      control={control}
    />
  );
};
