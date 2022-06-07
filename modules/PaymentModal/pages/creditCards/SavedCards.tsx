import { Grid, RadioGroup, Text } from '@chakra-ui/react';
import { ChangeEvent, useCallback, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useMutation } from 'react-query';

import { postPaymentiqDepositRequestAuthorized } from '@api/deposit';
import { Button } from '@components/Button/Button';
import { Input } from '@components/Input/Input';
import { ProviderListItemCard } from '@components/ProviderListItemCard';
import { usePaymentContext } from '@hooks/usePaymentContext';
import { PaymentIQDepositResponse } from '@lib/payment-client';
import { PlayerPaymentCard } from '@sharedTypes/api/player';

import { AmountInput, Layout } from '../../components';
import { getProviderName } from '../../consts';
import { usePaymentIqScript } from '../../utils/usePaymentIqScript';
import { Loading } from '../Loading';
import { messages } from './translations';

type SavedCardsProps = {
  providerId: string;
  cards: PlayerPaymentCard[];
  onAddNewCard?: () => void;
  onSubmit?: (data?: PaymentIQDepositResponse) => void;
  onError?: () => void;
  onClose: () => void;
  onBackClick?: () => void;
};

export const SavedCards = ({
  cards,
  providerId,
  onAddNewCard,
  onSubmit,
  onError,
  onClose,
  onBackClick,
}: SavedCardsProps) => {
  const { formatMessage } = useIntl();
  const [subPage, setSubPage] = useState<'list' | 'cvv'>('list');
  const { encryptCardData } = usePaymentIqScript();
  const [cvv, setCvv] = useState('');
  const {
    state: { amount, paymentProvider, card, flow, bonusId },
    actions: { setCard },
  } = usePaymentContext();

  const { isLoading, mutate } = useMutation(postPaymentiqDepositRequestAuthorized, {
    onSuccess: onSubmit,
    onError: onError,
  });

  const onCardChange = useCallback(
    (cardId: string) => setCard(cards.find(({ externalAccountId }) => externalAccountId === cardId)),
    [cards, setCard],
  );

  const onCvvChange = useCallback(
    // Regexp check if from 1 to 3 digits were input and only then update the state
    (e: ChangeEvent<HTMLInputElement>) => e.target.value.match(/^\d{0,3}$/) && setCvv(e.target.value),
    [],
  );

  const onSubmitClick = useCallback(() => {
    if (subPage === 'cvv' && card && cvv) {
      return mutate({
        amount: String(amount),
        encCvv: encryptCardData(cvv),
        paymentProviderId: paymentProvider,
        paymentAccountId: card.externalAccountId,
        bonusId: bonusId,
      });
    }
    if (flow === 'deposit') {
      return setSubPage('cvv');
    }
    onSubmit?.();
  }, [amount, card, cvv, encryptCardData, flow, mutate, onSubmit, paymentProvider, subPage, bonusId]);

  if (isLoading) {
    return <Loading onClose={onClose} />;
  }

  return (
    <Layout
      title={<FormattedMessage {...messages.title} />}
      onClose={onClose}
      onClick={onSubmitClick}
      onBackClick={onBackClick}
      button={{
        type: 'submit',
        disabled: (subPage === 'list' && !card) || (subPage === 'cvv' && cvv.length !== 3),
        children: formatMessage(messages.continue),
      }}
      modalBodyProps={{
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <AmountInput disabled marginBottom={5} />
      {subPage === 'cvv' && card && (
        <>
          <ProviderListItemCard
            key={card.externalAccountId}
            hideControl
            iconSrc={`/images/payment-logos/${providerId}.png`}
            iconAlt={formatMessage(messages.paymentProviderIconAlt, { provider: getProviderName(providerId) })}
            title={`${getProviderName(providerId)} ${card.maskedCardNumber}`}
            description={
              <FormattedMessage
                {...messages.paymentProviderExpiration}
                values={{
                  month: card.expirationMonth,
                  year: card.expirationYear,
                }}
              />
            }
            value={card.externalAccountId}
            bgColor="gray.-50"
            cursor="initial"
          />
          <Grid as="form" onSubmit={onSubmitClick} gridTemplateColumns="1fr 1fr" marginTop={6}>
            <Input
              id="cvv"
              value={cvv}
              onChange={onCvvChange}
              label={<FormattedMessage {...messages.cardCvvPlaceholder} />}
              data-testid="cvv-field"
              type="password"
              placeholder="***"
            />
          </Grid>
        </>
      )}
      {subPage === 'list' && (
        <>
          <Text marginBottom={2}>
            <FormattedMessage {...messages.savedCardsDescription} />
          </Text>
          <RadioGroup
            value={card?.externalAccountId}
            onChange={onCardChange}
            marginBottom={5}
            flex="1 1 0"
            display="grid"
            gridTemplateRows={`repeat(${cards.length}, auto) 1fr`}
            gridGap={1}
            overflowY="auto"
            width="full"
          >
            {cards.map((card) => (
              <ProviderListItemCard
                key={card.externalAccountId}
                iconSrc={`/images/payment-logos/${providerId}.png`}
                iconAlt={formatMessage(messages.paymentProviderIconAlt, { provider: getProviderName(providerId) })}
                title={`${getProviderName(providerId)} ${card.maskedCardNumber}`}
                description={
                  <FormattedMessage
                    {...messages.paymentProviderExpiration}
                    values={{
                      month: card.expirationMonth,
                      year: card.expirationYear,
                    }}
                  />
                }
                onClick={onCardChange}
                value={card.externalAccountId}
              />
            ))}
            {flow === 'deposit' && (
              <Button
                variant="ghost"
                height={16}
                width="full"
                borderWidth={1}
                borderStyle="dashed"
                borderColor="gray.80"
                borderRadius={8}
                cursor="pointer"
                onClick={onAddNewCard}
              >
                <FormattedMessage {...messages.saveCardsAddNew} />
              </Button>
            )}
          </RadioGroup>
        </>
      )}
    </Layout>
  );
};
