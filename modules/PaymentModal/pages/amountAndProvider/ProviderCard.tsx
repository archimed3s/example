import { useRadioGroupContext } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';

import { ProviderListItemCard } from '@components/ProviderListItemCard';
import { useCurrency } from '@hooks/useCurrency';
import { PaymentMethodLimit } from '@sharedTypes/api/siteSettings';

type ProviderCardProps = {
  providerName: string;
  limits: PaymentMethodLimit;
  onClick?: (id: string) => void;
};

const messages = defineMessages({
  limits: {
    id: 'PaymentProvider.limits',
    defaultMessage: 'Min {min} • Max {max}',
  },
});

export const ProviderCard = (props: ProviderCardProps) => {
  const { getCurrencyFormatted } = useCurrency();
  const radioContext = useRadioGroupContext();

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (radioContext.value === props.limits.paymentProviderId) {
      ref.current?.scrollIntoView();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Needs to be done only once
  }, []);

  return (
    <ProviderListItemCard
      ref={ref}
      iconSrc={`/images/payment-logos/${props.limits.paymentProviderId}.png`}
      iconAlt={`${props.providerName} logo`}
      title={props.providerName}
      description={
        <FormattedMessage
          {...messages.limits}
          values={{
            min: getCurrencyFormatted(props.limits.minAmount, props.limits.currency),
            max: getCurrencyFormatted(props.limits.maxAmount, props.limits.currency),
          }}
        />
      }
      onClick={props.onClick}
      value={props.limits.paymentProviderId}
    />
  );
};
