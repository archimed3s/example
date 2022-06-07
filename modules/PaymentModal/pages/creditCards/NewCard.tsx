import { Grid } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import NumberFormat from 'react-number-format';
import { useMutation } from 'react-query';
import { InferType, object as yupObject, string as yupString } from 'yup';

import { postPaymentiqDepositRequest } from '@api/deposit';
import { Input } from '@components/Input/Input';
import { usePaymentContext } from '@hooks/usePaymentContext';
import { PaymentIQDepositResponse } from '@lib/payment-client';

import { AmountInput, Layout } from '../../components';
import { usePaymentIqScript } from '../../utils/usePaymentIqScript';
import { Loading } from '../index';
import { messages } from './translations';

type NewCardProps = {
  onClose: () => void;
  onSubmit: (data: PaymentIQDepositResponse) => void;
  onError: () => void;
  onBackClick: () => void;
};

const FIELDS = {
  cardNum: 'cardNum',
  cardHolder: 'cardHolder',
  expireDate: 'expireDate',
  cardCvv: 'cardCvv',
} as const;

const gridTemplateAreas = `"amount amount" "number number" "expire cvv" "holder holder"`;

export const NewCard = (props: NewCardProps) => {
  const { formatMessage } = useIntl();
  const schema = useMemo(
    () =>
      yupObject({
        cardNum: yupString()
          // Regexp for: '#### #### #### ####' string
          // 3 blocks of 4 digits with space between blocks + one block of 4 digits
          .matches(/(\d{4} ){3}\d{4}/, {
            message: formatMessage(messages.errorFormat),
          })
          .required(formatMessage(messages.errorRequired)),
        cardHolder: yupString().required(formatMessage(messages.errorRequired)),
        expireDate: yupString()
          // Regexp for date: '## / ##' string
          // Check month in 01-12 diapason and year 22-99
          .matches(/(0\d|1[1-2]) \/ (2[2-9]|[3-9]\d)/, {
            message: formatMessage(messages.errorFormat),
          })
          .required(formatMessage(messages.errorRequired)),
        cardCvv: yupString()
          // Regexp for cvc/cvv: just 3 digits
          .matches(/\d{3}/, {
            message: formatMessage(messages.errorFormat),
          })
          .required(formatMessage(messages.errorRequired)),
      }).required(),
    [formatMessage],
  );
  const { encryptCardData } = usePaymentIqScript();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InferType<typeof schema>>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  });

  const { isLoading, mutate } = useMutation(postPaymentiqDepositRequest, {
    onSuccess: props.onSubmit,
    onError: props.onError,
  });

  const {
    state: { amount, paymentProvider },
  } = usePaymentContext();

  const onSubmit = useMemo(
    () =>
      handleSubmit((values) => {
        const [cardMon, cardYear] = values.expireDate.split(' / ');
        mutate({
          amount: String(amount),
          cardHolder: values.cardHolder,
          encCreditcardNumber: encryptCardData(values.cardNum),
          encCvv: encryptCardData(values.cardCvv),
          paymentProviderId: paymentProvider,
          expiryMonth: cardMon,
          expiryYear: `20${cardYear}`,
        });
      }),
    [handleSubmit, mutate, amount, encryptCardData, paymentProvider],
  );

  if (isLoading) {
    return <Loading onClose={props.onClose} />;
  }

  return (
    <Layout
      title={<FormattedMessage {...messages.title} />}
      onClose={props.onClose}
      onClick={onSubmit}
      onBackClick={props.onBackClick}
      button={{
        type: 'submit',
        children: formatMessage(messages.continue),
      }}
      modalBodyProps={{
        justifyContent: 'flex-start',
      }}
    >
      <AmountInput marginBottom={2} gridArea="amount" disabled />
      <Grid
        as="form"
        width="full"
        gridRowGap={4}
        gridColumnGap={6}
        gridTemplateAreas={gridTemplateAreas}
        onSubmit={onSubmit}
      >
        <Controller
          render={({ field }) => (
            <Input
              {...field}
              wrapperProps={{
                gridArea: 'number',
              }}
              as={NumberFormat}
              label={<FormattedMessage {...messages.cardNumPlaceholder} />}
              id={FIELDS.cardNum}
              data-testid={`${FIELDS.cardNum}-field`}
              format="#### #### #### ####"
              placeholder="0000 0000 0000 0000"
              errorText={errors.cardNum?.message}
            />
          )}
          name={FIELDS.cardNum}
          control={control}
        />

        <Controller
          render={({ field }) => (
            <Input
              {...field}
              wrapperProps={{
                gridArea: 'expire',
              }}
              as={NumberFormat}
              label={<FormattedMessage {...messages.expireDatePlaceholder} />}
              id={FIELDS.expireDate}
              data-testid={`${FIELDS.expireDate}-field`}
              format="## / ##"
              placeholder="MM / YY"
              errorText={errors.expireDate?.message}
            />
          )}
          name={FIELDS.expireDate}
          control={control}
        />

        <Controller
          render={({ field }) => (
            <Input
              {...field}
              wrapperProps={{
                gridArea: 'cvv',
              }}
              as={NumberFormat}
              label={<FormattedMessage {...messages.cardCvvPlaceholder} />}
              id={FIELDS.cardCvv}
              data-testid={`${FIELDS.cardCvv}-field`}
              type="password"
              placeholder="***"
              errorText={errors.cardCvv?.message}
            />
          )}
          name={FIELDS.cardCvv}
          control={control}
        />

        <Input
          {...register('cardHolder')}
          wrapperProps={{
            gridArea: 'holder',
          }}
          label={<FormattedMessage {...messages.cardHolderLabel} />}
          id={FIELDS.cardHolder}
          data-testid={`${FIELDS.cardHolder}-field`}
          placeholder={formatMessage(messages.cardHolderPlaceholder)}
          errorText={errors.cardHolder?.message}
        />
      </Grid>
    </Layout>
  );
};
