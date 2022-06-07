import { CircularProgress, Grid, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Resolver } from 'react-hook-form/dist/types/resolvers';
import { useMutation } from 'react-query';

import { postPaymentiqDepositRequest, postValidateVoucher } from '@api/deposit';
import { Input, InputProps } from '@components/Input';
import { PaymentModalPage, usePaymentContext } from '@hooks/usePaymentContext';
import { AmountInput, Layout } from '@modules/PaymentModal/components';
import { Loading } from '@modules/PaymentModal/pages';
import { PaymentPageProps } from '@modules/PaymentModal/pages/types';
import { Payment } from '@sharedTypes/api';
import { ValidateVoucherResponse } from '@sharedTypes/api/payment';

type VoucherData = {
  pin: string;
};

type VoucherProviderDepositProps = PaymentPageProps & {
  messages: {
    titleDeposit: string;
    title: string;
    continue: string;
    voucherNumber: string;
  };
  inputProps?: InputProps;
  validationResolver: (
    mutate: (req: Payment.ValidateVoucherRequest) => Promise<ValidateVoucherResponse>,
  ) => Resolver<VoucherData>;
};

export const VoucherProviderDeposit = ({
  onSubmit,
  onClose,
  messages,
  inputProps,
  validationResolver,
}: VoucherProviderDepositProps) => {
  const router = useRouter();
  const {
    state: { amount, paymentProvider },
    actions: { setPage },
  } = usePaymentContext();

  const { mutateAsync, isLoading: isValidating, data } = useMutation(postValidateVoucher);
  const { mutate, isLoading } = useMutation(postPaymentiqDepositRequest, {
    onSuccess: (response) => {
      if (response.status && response.url?.url) {
        router.push(response.url.url);
      } else {
        onSubmit?.() ?? setPage(PaymentModalPage.SUCCESS);
      }
    },
    onError: () => setPage(PaymentModalPage.ERROR),
  });

  const {
    handleSubmit,
    register,
    formState: { isSubmitted, isSubmitSuccessful, isValid, isDirty, errors },
  } = useForm<VoucherData>({
    resolver: validationResolver(mutateAsync),
    mode: 'onChange',
  });

  const onSubmitForm = useMemo(
    () =>
      handleSubmit((values) => {
        mutate({
          amount: String(amount),
          paymentProviderId: paymentProvider,
          voucherNumber: values.pin,
        });
      }),
    [amount, handleSubmit, mutate, paymentProvider],
  );
  const onBackClick = useCallback(() => setPage(PaymentModalPage.AMOUNT_AND_PROVIDER), [setPage]);

  const rightElement = useMemo(() => {
    if (isValidating) {
      return <CircularProgress isIndeterminate size={5} thickness={10} color="purple" />;
    }
    return <span />;
  }, [isValidating, data?.status, isSubmitSuccessful, isSubmitted, isDirty, isValid]);

  if (isLoading) {
    return <Loading onClose={onClose} />;
  }

  return (
    <Layout
      title={messages.titleDeposit}
      onClose={onClose}
      onClick={onSubmitForm}
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
      <Grid as="form" width="full" onSubmit={onSubmitForm} gap={2}>
        <Text marginTop={6}>
          {messages.title}{' '}
          <Text as="span" color="white">
            {messages.voucherNumber}
          </Text>
        </Text>
        <Input
          {...inputProps}
          {...register('pin')}
          placeholder="Voucher number"
          width="full"
          rightElement={rightElement}
          errorText={errors?.pin?.message ?? ''}
        />
      </Grid>
    </Layout>
  );
};
