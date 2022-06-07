import { Box, Button, ButtonGroup, Flex, Select, Text, useToast } from '@chakra-ui/react';
import clm from 'country-locale-map';
import { Field, Form } from 'react-final-form';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import { useMutation } from 'react-query';

import { changePlayerInformation } from '@api/player';
import { composeValidators } from '@common/validators/composeValidators';
import { useValidatorRequired } from '@common/validators/useValidatorRequired';
import { Input } from '@components/Input/Input';
import { useDateTimeFormat } from '@hooks/useDateTimeFormat';
import { usePlayerState, usePlayerStateActions } from '@hooks/usePlayerState/useStateReducer';
import { Player, PlayerGender } from '@sharedTypes/Player';

const FIELDS = {
  genderId: 'genderId',
  phoneNumber: 'phoneNumber',
  phoneCode: 'phoneCode',
  displayName: 'displayName',
} as const;

type FormValues = {
  genderId: string;
  phoneNumber: string;
  phoneCode: string;
  displayName: string;
};

const messages = defineMessages({
  email: {
    id: 'User.email',
    defaultMessage: 'Email',
  },
  displayName: {
    id: 'User.displayName',
    defaultMessage: 'Player name',
  },
  dateOfBirth: {
    id: 'User.dateOfBirth',
    defaultMessage: 'Date of birth',
  },
  verifyPhone: {
    id: 'User.verifyPhone',
    defaultMessage: 'Verify',
  },
  country: {
    id: 'User.country',
    defaultMessage: 'Country',
  },
  zipCode: {
    id: 'User.zipCode',
    defaultMessage: 'Zip code',
  },
  address: {
    id: 'User.address',
    defaultMessage: 'Address',
  },
  gender: {
    id: 'User.gender',
    defaultMessage: 'Gender',
  },
  male: {
    id: 'User.male',
    defaultMessage: 'Male',
  },
  female: {
    id: 'User.female',
    defaultMessage: 'Female',
  },
  phoneNumber: {
    id: 'User.phoneNumber',
    defaultMessage: 'Phone number',
  },
  saveChangesBtn: {
    id: 'User.saveChangesBtn',
    defaultMessage: 'Save changes',
  },
  updateInfoFailed: {
    id: 'User.updateInfoFailed',
    defaultMessage: 'Updating info failed, please try again later',
  },
  updateInfoSucceed: {
    id: 'User.updateInfoSucceed',
    defaultMessage: 'Player information changed successfully',
  },
});

export const PlayerEditForm = () => {
  const intl = useIntl();
  const required = useValidatorRequired();
  const toast = useToast();
  const { player } = usePlayerState();
  const { updatePlayer } = usePlayerStateActions();

  const { getDateFormat } = useDateTimeFormat();
  const { mutate, isLoading } = useMutation(changePlayerInformation, {
    onSuccess: (data: Player) => {
      updatePlayer(data);
      toast({
        title: intl.formatMessage(messages.updateInfoSucceed),
        status: 'success',
      });
    },
    onError: () => {
      toast({
        title: intl.formatMessage(messages.updateInfoFailed),
        status: 'error',
      });
    },
  });

  const onSubmit = (values: FormValues) => {
    mutate({ ...values });
  };

  const formInitialValues = {
    phoneNumber: player?.phoneNumber || '',
    phoneCode: player?.phoneCode || '',
    genderId: player?.gender || '',
    displayName: player?.displayName || '',
  };

  return (
    <Form
      initialValues={formInitialValues}
      onSubmit={onSubmit}
      render={({ handleSubmit, form, values, valid }) => (
        <form onSubmit={handleSubmit}>
          <Box mt={2}>
            <Text color="white" fontSize="s1" fontWeight={600}>
              <FormattedMessage {...messages.phoneNumber} />
            </Text>
            <Flex mt={2}>
              <Box maxW="35%" minWidth="35%">
                {/* TODO: options should be as dropdown with allowed phoneCodes */}
                <Field name={FIELDS.phoneCode} component="select" options={[player?.phoneCode]}>
                  {({ input, options }) => (
                    <Select {...input} bg="gray.-140" isFullWidth>
                      {options?.map((option: string) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Select>
                  )}
                </Field>
              </Box>
              <Box ml={2}>
                <Field name={FIELDS.phoneNumber} validate={composeValidators(required)}>
                  {({ input, meta }) => <Input errorText={meta.error} {...input} data-testid="phone-number" />}
                </Field>
              </Box>
            </Flex>
          </Box>
          <Button variant="security" isFullWidth mt={6} isDisabled>
            {intl.formatMessage(messages.verifyPhone)}
          </Button>
          <Box mt={6}>
            <Input
              isDisabled
              isReadOnly
              label={intl.formatMessage(messages.email)}
              data-testid="login-email"
              value={player?.email}
            />
          </Box>
          <Box mt={6}>
            <Field name={FIELDS.displayName}>
              {({ input }) => (
                <Input label={intl.formatMessage(messages.displayName)} {...input} data-testid="displayName" />
              )}
            </Field>
          </Box>
          <Box mt={6}>
            <Input
              isDisabled
              isReadOnly
              label={intl.formatMessage(messages.dateOfBirth)}
              data-testid="date-of-birth"
              value={getDateFormat({ date: player?.dateOfBirth }) || ''}
            />
          </Box>
          <Box mt={6}>
            <Text color="white" fontSize="s1" fontWeight={600}>
              <FormattedMessage {...messages.gender} />
            </Text>
            <ButtonGroup spacing={2} mt={2}>
              <Button
                onClick={() => {
                  form.change(FIELDS.genderId, PlayerGender.MALE);
                }}
                variant={values[FIELDS.genderId] === PlayerGender.MALE ? 'primary' : 'alternate'}
              >
                {intl.formatMessage(messages.male)}
              </Button>
              <Button
                onClick={() => {
                  form.change(FIELDS.genderId, PlayerGender.FEMALE);
                }}
                variant={values[FIELDS.genderId] === PlayerGender.FEMALE ? 'primary' : 'alternate'}
              >
                {intl.formatMessage(messages.female)}
              </Button>
            </ButtonGroup>
          </Box>
          <Flex mt={6}>
            <Input
              isDisabled
              isReadOnly
              label={intl.formatMessage(messages.country)}
              data-testid="country"
              value={(player?.countryId && clm.getCountryByAlpha2(player?.countryId)?.name) || ''}
            />
            <Box ml={2} maxW="35%">
              <Input
                isDisabled
                isReadOnly
                label={intl.formatMessage(messages.zipCode)}
                data-testid="country"
                value={player?.zipCode || ''}
              />
            </Box>
          </Flex>
          <Box mt={6}>
            <Input
              isDisabled
              isReadOnly
              label={intl.formatMessage(messages.address)}
              data-testid="address"
              value={player?.street || ''}
            />
          </Box>
          <Box mt={6}>
            <Button isDisabled={!valid} type="submit" isLoading={isLoading} variant="primary" isFullWidth ml={2}>
              {intl.formatMessage(messages.saveChangesBtn)}
            </Button>
          </Box>
        </form>
      )}
    />
  );
};
