import clm from 'country-locale-map';

import { DropdownItem } from '@components/Dropdown';
import { Flags } from '@components/Flags';

export const formatDropdownCountry = (countryId: string): DropdownItem => ({
  value: countryId,
  icon: countryId ? <Flags country={countryId} /> : undefined,
  label: clm.getCountryByAlpha2(countryId)?.name || countryId,
});
