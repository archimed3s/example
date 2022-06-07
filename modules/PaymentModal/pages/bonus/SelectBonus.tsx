import { Box, CircularProgress, Text } from '@chakra-ui/react';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { useQuery } from 'react-query';

import { QUERY_KEYS, getAvailableBonuses } from '@api/bonus';
import { Dropdown, DropdownItem } from '@components/Dropdown';
import { Input } from '@components/Input';
import { usePaymentContext } from '@hooks/usePaymentContext';

import { BonusAppliedAlert, Layout } from '../../components';
import { PaymentPageProps } from '../types';
import { messages } from './transaltions';
import { useBonusDataValidation } from './useBonusDataValidation';

export const SelectBonus = (props: PaymentPageProps) => {
  const { formatMessage } = useIntl();
  const {
    state: { bonusId },
    actions: { setBonusId },
  } = usePaymentContext();
  const [selectedDropdown, setSelectedDropdown] = useState<number | undefined>();

  const { isLoading: isBonusesLoading, data: bonuses } = useQuery(QUERY_KEYS.getAvailableBonuses, async () => [
    { label: formatMessage(messages.selectNoBonus), value: '', icon: <NoStopIcon color="red.0" /> },
    ...(await getAvailableBonuses()).map((bonus) => ({
      label: bonus.name,
      value: String(bonus.id),
      icon: <DefaultPromoIcon />,
    })),
  ]);
  const { validate, isValidating, bonusId: codeBonusId } = useBonusDataValidation();

  const onDropdownChange = useCallback(
    (value: DropdownItem) => {
      const numValue = Number(value.value);
      const nextValue = numValue && !Number.isNaN(numValue) ? numValue : undefined;
      setBonusId(nextValue);
      setSelectedDropdown(nextValue);
    },
    [setBonusId],
  );

  const {
    handleSubmit,
    register,
    watch,
    formState: { isSubmitted, isSubmitSuccessful, isValid, isDirty, errors },
  } = useForm<{ code: string }>({
    resolver: validate,
    mode: 'onChange',
  });
  const onSubmitForm = useMemo(
    () =>
      handleSubmit(() => {
        codeBonusId && setBonusId(codeBonusId);
        props.onSubmit?.();
      }),
    [codeBonusId, handleSubmit, props, setBonusId],
  );
  const code = watch('code');
  const rightElement = useMemo(() => {
    if (isValidating) {
      return <CircularProgress isIndeterminate size={5} thickness={10} color="purple" />;
    }
    if ((isSubmitted && !isSubmitSuccessful) || (isDirty && !isValid)) {
      return <CloseIcon size={20} color="red" />;
    }
    if (isValid && code) {
      return <CheckmarkIcon size={20} color="green" />;
    }
    return <span />;
  }, [isValidating, isSubmitted, isSubmitSuccessful, isDirty, isValid, code]);

  return (
    <Layout
      title={formatMessage(messages.title)}
      onClose={props.onClose}
      onClick={props.onSubmit}
      button={{
        type: 'submit',
        children: formatMessage(messages.continue),
      }}
      modalBodyProps={{
        justifyContent: 'flex-start',
      }}
    >
      <Box width="full" as="form" onSubmit={onSubmitForm}>
        <Text color="white" fontWeight={600}>
          <FormattedMessage {...messages.selectLabel} />
        </Text>
        <Dropdown
          width="full"
          items={bonuses ?? []}
          disabled={!!(isBonusesLoading || (!selectedDropdown && code && isValid))}
          selectedItem={bonuses?.[0]}
          onChange={onDropdownChange}
          placeholder={formatMessage(messages.selectNoBonus)}
          marginTop={2}
        />
        <Text color="white" marginTop={5} fontWeight={600}>
          <FormattedMessage {...messages.promoCodeLabel} />
        </Text>
        <Input
          wrapperProps={{ width: 'full' }}
          type="text"
          rightElement={rightElement}
          maxLength={16}
          disabled={selectedDropdown}
          {...register('code')}
          errorText={errors?.code?.message ?? ''}
          placeholder={formatMessage(messages.promoCodePlaceholder)}
          marginTop={2}
        />
        {!!(bonusId || (isValid && code)) && <BonusAppliedAlert marginTop={10} />}
      </Box>
    </Layout>
  );
};
