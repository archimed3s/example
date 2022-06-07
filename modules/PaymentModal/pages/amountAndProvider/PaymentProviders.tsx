import { useMemo } from 'react';

import { PaymentMethodLimit } from '@sharedTypes/api/siteSettings';

import { PROVIDERS } from '../../consts';
import { ProviderCard } from './ProviderCard';

type PaymentProvidersProps = {
  providers: string[];
  limits: PaymentMethodLimit[];
  onProviderClick?: (providerId: string) => void;
};

type ProviderWithLimits = { providerName: string; limits: PaymentMethodLimit };

export const PaymentProviders = ({ limits, providers, onProviderClick }: PaymentProvidersProps) => {
  const providerWithLimits = useMemo(
    () =>
      providers.reduce<ProviderWithLimits[]>((acc, provider) => {
        const providerName = PROVIDERS[provider];
        const providerLimits = limits.find((limit) => limit.paymentProviderId === provider);
        if (providerName && providerLimits) {
          acc.push({
            providerName: providerName.name,
            limits: providerLimits,
          });
        }
        return acc;
      }, []),
    [providers, limits],
  );

  return (
    <>
      {providerWithLimits.map((provider) => (
        <ProviderCard key={provider.providerName} {...provider} onClick={onProviderClick} />
      ))}
    </>
  );
};
