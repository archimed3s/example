import { Grid, Text } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { InferType, object as yupObject, string as yupString } from 'yup';

import { postPaymentiqDepositRequest } from '@api/deposit';
import { yupPhoneNumberValidator } from '@common/validators';
import { PaymentModalPage, usePaymentContext } from '@hooks/usePaymentContext';
import { PhoneNumberInput } from '@modules/PaymentModal/components/PhoneNumberInput';

import { AmountInput, CountryCodeDropdown, Layout } from '../components';
import { Loading } from './Loading';
import { PaymentPageProps } from './types';

const FIELDS = {
  countryCode: 'countryCode',
  phoneNumber: 'phoneNumber',
} as const;

type PhoneNumberProviderDepositProps = PaymentPageProps & {
  messages: {
    title: string;
    titleDeposit: string;
    phoneNumber: string;
    continue: string;
    errorFormat: string;
    errorRequired: string;
  };
};

export const PhoneNumberProviderDeposit = ({ messages, ...props }: PhoneNumberProviderDepositProps) => {
  const router = useRouter();
  const schema = useMemo(
    () =>
      yupObject({
        countryCode: yupString()
          // country code. 1 - 3 digits
          .matches(/\d{1,3}/, {
            message: messages.errorFormat,
          })
          .required(messages.errorRequired),
        phoneNumber: yupPhoneNumberValidator('countryCode', {
          wrongFormat: messages.errorFormat,
          required: messages.errorRequired,
        }),
      }).required(),
    [messages.errorFormat, messages.errorRequired],
  );
  const {
    state: { amount, paymentProvider },
    actions: { setPage },
  } = usePaymentContext();

  const onBackClick = useCallback(() => setPage(PaymentModalPage.AMOUNT_AND_PROVIDER), [setPage]);

  const { mutate, isLoading } = useMutation(postPaymentiqDepositRequest, {
    onSuccess: (response) => {
      if (response.status && response.url?.url) {
        router.push(response.url.url);
      } else {
        setPage(PaymentModalPage.SUCCESS);
      }
    },
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InferType<typeof schema>>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = useMemo(
    () =>
      handleSubmit((values) => {
        mutate({
          amount: String(amount),
          paymentProviderId: paymentProvider,
          phoneNumber: `+${values.countryCode}${values.phoneNumber.replaceAll(' ', '')}`,
        });
      }),
    [amount, handleSubmit, mutate, paymentProvider],
  );

  if (isLoading) {
    return <Loading onClose={props.onClose} />;
  }

  return (
    <Layout
      title={messages.titleDeposit}
      onClose={props.onClose}
      onClick={onSubmit}
      onBackClick={onBackClick}
      button={{
        type: 'submit',
        children: messages.continue,
      }}
      modalBodyProps={{
        justifyContent: 'flex-start',
      }}
    >
      <AmountInput marginBottom={2} gridArea="amount" disabled />
      <Grid as="form" width="full" gridTemplateColumns="30% 1fr" onSubmit={onSubmit} gap={2}>
        <Text gridColumn="1 / span 2" margin={1}>
          {`${messages.title} `}
          <Text as="span" color="white">
            {messages.phoneNumber}
          </Text>
        </Text>
        <CountryCodeDropdown name={FIELDS.countryCode} control={control} />
        <Controller
          render={({ field }) => (
            <PhoneNumberInput
              {...field}
              id={FIELDS.phoneNumber}
              countryCode={watch('countryCode')}
              errorText={errors.phoneNumber?.message ?? ''}
            />
          )}
          name={FIELDS.phoneNumber}
          control={control}
        />
      </Grid>
    </Layout>
  );
};
