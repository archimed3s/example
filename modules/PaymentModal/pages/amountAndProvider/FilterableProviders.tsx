import { RadioGroup } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';

import { PaymentMethodLimit, SitePaymentCategory } from '@sharedTypes/api/siteSettings';

import { PaymentProviders } from './PaymentProviders';
import { ProviderFilters } from './ProviderFilters';

type FilterableProvidersProps = {
  selectedProvider: string;
  providers: string[];
  categories: SitePaymentCategory | undefined;
  limits: PaymentMethodLimit[];
  onChange: (providerId: string) => void;
  initialLimit?: number;
};
export const FilterableProviders = ({
  categories,
  selectedProvider,
  providers,
  limits,
  onChange,
}: FilterableProvidersProps) => {
  const categoryNames = useMemo(() => Object.keys(categories ?? {}), [categories]);
  const [category, setCategory] = useState(categoryNames[0]);

  const filtered = useMemo(
    () => providers.filter((provider) => (categories ?? {})[category]?.includes(provider) ?? false),
    [categories, category, providers],
  );

  useEffect(() => {
    if (filtered.length && !filtered.includes(selectedProvider)) {
      onChange(filtered[0]);
    }
  }, [filtered, onChange, selectedProvider]);

  return (
    <>
      <ProviderFilters categories={categoryNames} category={category} onChange={setCategory} />
      <RadioGroup
        value={selectedProvider}
        onChange={onChange}
        marginY={5}
        display="grid"
        gridGap={1}
        overflowY="auto"
        gridTemplateRows={`repeat(${filtered.length}, auto) 1fr`}
      >
        <PaymentProviders providers={filtered} limits={limits} />
      </RadioGroup>
    </>
  );
};
