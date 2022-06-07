import {
  Box,
  ButtonGroup,
  Link as ChakraLink,
  Checkbox,
  FormControl,
  FormErrorMessage,
  HStack,
  Text,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import NRouter from 'next/router';
import { useCallback, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { defineMessages, useIntl } from 'react-intl';
import { useMutation } from 'react-query';
import * as yup from 'yup';

import { registerUser } from '@api/auth';
import { useRouteService } from '@common/services/RouteService';
import { PasswordRulesType } from '@common/validators/constants';
import { Button } from '@components/Button/Button';
import { Dropdown, DropdownItem } from '@components/Dropdown';
import { FormLabel } from '@components/FormLabel/FormLabel';
import { Input } from '@components/Input/Input';
import { ProgressBar } from '@components/ProgressBar/ProgressBar';
import { Tooltip } from '@components/Tooltip/Tooltip';
import { useSiteSettings } from '@hooks/useSiteSettings';
import { useToast } from '@hooks/useToast';
import { PasswordInput } from '@modules/SignUpForm/utils/PasswordInput';
import { usePasswordYupValidation } from '@modules/SignUpForm/utils/usePasswordYupValidation';
import { PlayerGender } from '@sharedTypes/Player';

import { ServerError } from '../../types/ServerError';
import { formatDropdownCountry } from './utils/formatDropdownCountry';

type FormValues = {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  genderId: string;
  countryId: string;
  currency: string;
};

const messages = defineMessages({
  signUp: {
    id: 'SignUpForm.signUp',
    defaultMessage: 'Sign up',
  },
  alreadyHaveAccount: {
    id: 'SignUpForm.alreadyHaveAccount',
    defaultMessage: 'Already have an account?',
  },
  signIn: {
    id: 'SignUpForm.signIn',
    defaultMessage: 'Sign in',
  },
  usernamePlaceholder: {
    id: 'SignUpForm.usernamePlaceholder',
    defaultMessage: 'Enter your username',
  },
  emailPlaceholder: {
    id: 'SignUpForm.emailPlaceholder',
    defaultMessage: 'Enter your email',
  },
  passwordPlaceholder: {
    id: 'SignUpForm.passwordPlaceholder',
    defaultMessage: 'Enter your password',
  },
  firstNamePlaceholder: {
    id: 'SignUpForm.firstNamePlaceholder',
    defaultMessage: 'Enter your first name',
  },
  lastNamePlaceholder: {
    id: 'SignUpForm.lastNamePlaceholder',
    defaultMessage: 'Enter your last name',
  },
  birthdayPlaceholder: {
    id: 'SignUpForm.birthdayPlaceholder',
    defaultMessage: 'Enter your birthday',
  },
  birthdayInfoText: {
    id: 'SignUpForm.birthdayInfoText',
    defaultMessage: 'Other players won’t be able to see this',
  },
  usernameLabel: {
    id: 'SignUpForm.usernameLabel',
    defaultMessage: 'Username',
  },
  usernameInfoLabel: {
    id: 'SignUpForm.usernameInfoLabel',
    defaultMessage: 'Username is a unique name that will be visible to other players',
  },
  emailLabel: {
    id: 'SignUpForm.emailLabel',
    defaultMessage: 'Email',
  },
  passwordLabel: {
    id: 'SignUpForm.passwordLabel',
    defaultMessage: 'Password',
  },
  firstNameLabel: {
    id: 'SignUpForm.firstNameLabel',
    defaultMessage: 'First name',
  },
  lastNameLabel: {
    id: 'SignUpForm.lastNameLabel',
    defaultMessage: 'Last name',
  },
  birthdayLabel: {
    id: 'SignUpForm.birthdayLabel',
    defaultMessage: 'Date of birth',
  },
  genderLabel: {
    id: 'SignUpForm.genderLabel',
    defaultMessage: 'Gender',
  },
  genderMaleLabel: {
    id: 'SignUpForm.genderMaleLabel',
    defaultMessage: 'Male',
  },
  genderFemaleLabel: {
    id: 'SignUpForm.genderFemaleLabel',
    defaultMessage: 'Female',
  },
  passwordToggle: {
    id: 'LoginForm.passwordToggle',
    defaultMessage: 'Toggle password',
  },
  accept18YearsOld1: {
    id: 'SignUpForm.accept18YearsOld1',
    defaultMessage: "I'm at least 18 years old and accept",
  },
  termsAndConditions: {
    id: 'SignUpForm.termsAndConditions',
    defaultMessage: 'Terms & Conditions',
  },
  accept18YearsOld2: {
    id: 'SignUpForm.accept18YearsOld2',
    defaultMessage: 'and',
  },
  privacyPolicy: {
    id: 'SignUpForm.privacyPolicy',
    defaultMessage: 'Privacy Policy',
  },
  somethingWentWrong: {
    id: 'SignUpForm.somethingWentWrong',
    defaultMessage: 'Something went wrong',
  },
  continue: {
    id: 'SignUpForm.continue',
    defaultMessage: 'Continue',
  },
  previousStep: {
    id: 'SignUpForm.previousStep',
    defaultMessage: 'Previous step',
  },
  submit: {
    id: 'SignUpForm.submit',
    defaultMessage: 'Start playing',
  },
  PlayerEmailIsAlreadyTaken: {
    id: 'SignUpForm.PlayerEmailIsAlreadyTaken',
    defaultMessage: 'Player email is already taken',
  },
  maxDateOfBirth: {
    id: 'SignUpForm.maxDateOfBirth',
    defaultMessage: 'Date of birthday must be earlier than {maxDate}',
  },
  checkEmail: {
    id: 'SignUpForm.checkEmail',
    defaultMessage: 'Check your email with verification link',
  },
  countryLabel: {
    id: 'SignUpForm.countryLabel',
    defaultMessage: 'Country',
  },
  currencyLabel: {
    id: 'SignUpForm.currencyLabel',
    defaultMessage: 'Currency',
  },
  selectCountry: {
    id: 'SignUpForm.selectCountry',
    defaultMessage: 'Select country',
  },
  selectCurrency: {
    id: 'SignUpForm.selectCurrency',
    defaultMessage: 'Select currency',
  },
});

type SignUpFormProps = {
  passwordRules: PasswordRulesType;
};

export const SignUpForm = ({ passwordRules }: SignUpFormProps) => {
  const toast = useToast();
  const intl = useIntl();
  const [acceptTerms, setAcceptTerms] = useState(false);
  const appRoutes = useRouteService();
  const { countries = [], currencies = [] } = useSiteSettings() ?? {};
  const formattedCountries = useMemo(() => countries.map((item) => formatDropdownCountry(item)), [countries]);
  const formattedCurrencies = useMemo(() => currencies.map((value) => ({ value, label: value })), [currencies]);
  const passwordYupValidation = usePasswordYupValidation(passwordRules);
  const [step, setStep] = useState(1);
  const numberOfSteps = 3;

  const schema = useMemo(() => {
    const maxDateOfBirth = new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate());
    return yup.object().shape({
      username: yup.string().required(),
      email: yup.string().email().required(),
      password: passwordYupValidation,
      currency: yup.string().required(),
      firstName: yup.string().nullable(),
      lastName: yup.string().nullable(),
      dateOfBirth: yup
        .date()
        .max(
          maxDateOfBirth,
          intl.formatMessage(messages.maxDateOfBirth, { maxDate: maxDateOfBirth.toLocaleDateString() }),
        )
        .required()
        .transform((curr, orig) => (orig === '' ? null : curr)),
      genderId: yup.mixed<PlayerGender>().oneOf([PlayerGender.MALE, PlayerGender.FEMALE]).required(),
      countryId: yup.string().nullable(),
    });
  }, [passwordYupValidation, intl]);

  const createMessageText = useCallback(
    (code: string) => {
      switch (code) {
        case 'PlayerEmailIsAlreadyTaken': {
          return intl.formatMessage(messages.PlayerEmailIsAlreadyTaken);
        }
        default: {
          return intl.formatMessage(messages.somethingWentWrong);
        }
      }
    },
    [intl],
  );

  const { isLoading, mutate } = useMutation(registerUser, {
    onSuccess: () => {
      toast.success({
        title: intl.formatMessage(messages.checkEmail),
      });
      NRouter.replace(appRoutes.getHomePagePath());
    },
    onError: (error: ServerError) => {
      toast.error({
        title: createMessageText(error.code),
      });
    },
  });
  const {
    handleSubmit,
    watch,
    setValue,
    control,
    register,
    formState: { errors, dirtyFields, isValidating },
  } = useForm<FormValues>({
    mode: 'onChange',
    criteriaMode: 'all',
    resolver: yupResolver(schema),
  });

  const onSubmit = (values: FormValues) => {
    mutate({
      displayName: values.username,
      email: values.email,
      password: values.password,
      currency: values.currency,
      firstName: values.firstName,
      lastName: values.lastName,
      countryId: values.countryId,
      genderId: values.genderId,
      dateOfBirth: values.dateOfBirth ?? '',
    });
  };

  const disableStep1 =
    !acceptTerms ||
    (dirtyFields.username && dirtyFields.email && dirtyFields.password
      ? !!errors.username || !!errors.email || !!errors.password
      : true);
  const disableStep2 = !watch('genderId') || (dirtyFields.dateOfBirth ? !!errors.dateOfBirth : true);
  const disableStep3 = !watch('currency');

  const increaseStep = () => {
    if (step < numberOfSteps && !isLoading) setStep(step + 1);
  };

  const decreaseStep = () => {
    if (step > 1 && !isLoading) setStep(step - 1);
  };

  return (
    <Box minWidth={500} data-testid="signup-form">
      <Text color="white" fontSize="m3" fontWeight="600">
        {intl.formatMessage(messages.signUp)}
      </Text>
      <Text color="gray.120" pt={2}>
        {intl.formatMessage(messages.alreadyHaveAccount)}{' '}
        <ChakraLink href={appRoutes.getSignInPagePath()}>
          <Text color="primary.30" as="span">
            {intl.formatMessage(messages.signIn)}
          </Text>
        </ChakraLink>
      </Text>
      <Box mt={8}>
        <ProgressBar currentStep={step} nSteps={numberOfSteps} />
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && (
          <Box as={motion.div} initial={{ x: -200, opacity: 0 }} animate={{ x: 0, opacity: 1 }} mt={8}>
            <Box>
              <Input
                id="username"
                label={
                  <Box>
                    <Text color="white" fontSize="s" fontWeight="600" as="span">
                      {intl.formatMessage(messages.usernameLabel)}{' '}
                    </Text>
                    <Text as="span" color="watermelon" mr={1}>
                      *
                    </Text>
                    <Tooltip
                      placement="right"
                      label={intl.formatMessage(messages.usernameInfoLabel)}
                      hasArrow
                      bg="gray.0"
                      color="white"
                    ></Tooltip>
                  </Box>
                }
                data-testid="signup-username"
                placeholder={intl.formatMessage(messages.usernamePlaceholder)}
                isInvalid={!!errors?.username?.message}
                errorText={errors?.username?.message}
                {...register('username')}
              />
            </Box>
            <Box pt={3}>
              <Input
                id="email"
                isRequired
                label={intl.formatMessage(messages.emailLabel)}
                data-testid="signup-email"
                placeholder={intl.formatMessage(messages.emailPlaceholder)}
                isInvalid={!!errors?.email?.message}
                errorText={errors?.email?.message}
                {...register('email')}
              />
            </Box>
            <Box pt={3}>
              <PasswordInput
                isRequired
                control={control}
                name={'password'}
                data-testid="signup-password"
                label={intl.formatMessage(messages.passwordLabel)}
                placeholder={intl.formatMessage(messages.passwordPlaceholder)}
                passwordRules={passwordRules}
              />
            </Box>
            <Box pt={3}>
              <Checkbox
                data-testid="signup-accept-checkbox"
                colorScheme="purple"
                p={2}
                onChange={() => setAcceptTerms(!acceptTerms)}
                isChecked={acceptTerms}
              >
                <Text color="white">
                  {intl.formatMessage(messages.accept18YearsOld1)}{' '}
                  <ChakraLink>
                    <Text color="primary.30" as="span">
                      {intl.formatMessage(messages.termsAndConditions)}{' '}
                    </Text>
                  </ChakraLink>
                  {intl.formatMessage(messages.accept18YearsOld2)}{' '}
                  <ChakraLink>
                    <Text color="primary.30">{intl.formatMessage(messages.privacyPolicy)}</Text>
                  </ChakraLink>
                </Text>
              </Checkbox>
            </Box>
            <Button
              variant="primary"
              mt="24px"
              mb="19x"
              w="100%"
              textAlign="center"
              alignItems="center"
              colorScheme="purple"
              isDisabled={disableStep1}
              type="button"
              data-testid="signup-continue-step-1"
              onClick={increaseStep}
            >
              {intl.formatMessage(messages.continue)}
            </Button>
          </Box>
        )}
        {step === 2 && (
          <Box as={motion.div} initial={{ x: -200, opacity: 0 }} animate={{ x: 0, opacity: 1 }} mt={8}>
            <HStack spacing={2} pt={3}>
              <Input
                id="first-name"
                label={intl.formatMessage(messages.firstNameLabel)}
                data-testid="signup-first-name"
                placeholder={intl.formatMessage(messages.firstNamePlaceholder)}
                isInvalid={!!errors?.firstName?.message}
                errorText={errors?.firstName?.message}
                wrapperProps={{ w: '100%' }}
                {...register('firstName')}
              />
              <Input
                id="last-name"
                label={intl.formatMessage(messages.lastNameLabel)}
                data-testid="signup-last-name"
                placeholder={intl.formatMessage(messages.lastNamePlaceholder)}
                isInvalid={!!errors?.lastName?.message}
                errorText={errors?.lastName?.message}
                wrapperProps={{ w: '100%' }}
                {...register('lastName')}
              />
            </HStack>
            <Box pt={3}>
              <Input
                isRequired
                id="dateOfBirth"
                type="date"
                label={intl.formatMessage(messages.birthdayLabel)}
                data-testid="signup-birthday"
                placeholder={intl.formatMessage(messages.birthdayPlaceholder)}
                isInvalid={!!errors?.dateOfBirth?.message}
                errorText={errors?.dateOfBirth?.message}
                infoText={intl.formatMessage(messages.birthdayInfoText)}
                {...register('dateOfBirth')}
              />
            </Box>
            <Box pt={3}>
              <FormLabel htmlFor={'genderId'}>
                {intl.formatMessage(messages.genderLabel)}
                <Text as="span" color="watermelon" mr={1}>
                  *
                </Text>
              </FormLabel>
              <ButtonGroup spacing={2}>
                <Button
                  data-testid="signup-gender-male-btn"
                  onClick={() => setValue('genderId', PlayerGender.MALE)}
                  variant={watch('genderId') === PlayerGender.MALE ? 'primary' : 'alternate'}
                >
                  {intl.formatMessage(messages.genderMaleLabel)}
                </Button>
                <Button
                  onClick={() => setValue('genderId', PlayerGender.FEMALE)}
                  variant={watch('genderId') === PlayerGender.FEMALE ? 'primary' : 'alternate'}
                >
                  {intl.formatMessage(messages.genderFemaleLabel)}
                </Button>
              </ButtonGroup>
            </Box>
            <ButtonGroup spacing={2} w="100%">
              <Button
                variant="default"
                mt="24px"
                mb="19x"
                w="100%"
                textAlign="center"
                alignItems="center"
                type="button"
                data-testid="signup-previous-step"
                onClick={decreaseStep}
              >
                {intl.formatMessage(messages.previousStep)}
              </Button>
              <Button
                variant="primary"
                mt="24px"
                mb="19x"
                w="100%"
                textAlign="center"
                alignItems="center"
                colorScheme="purple"
                type="button"
                data-testid="signup-continue-step-2"
                isDisabled={disableStep2}
                onClick={increaseStep}
              >
                {intl.formatMessage(messages.continue)}
              </Button>
            </ButtonGroup>
          </Box>
        )}
        {step === 3 && (
          <Box as={motion.div} initial={{ x: -200, opacity: 0 }} animate={{ x: 0, opacity: 1 }} mt={8}>
            <HStack spacing={2} pt={3}>
              <Controller
                name="countryId"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => {
                  const onSelectChange = (item: DropdownItem) => onChange(item.value);
                  return (
                    <FormControl isInvalid={!!error?.message}>
                      <FormLabel htmlFor={'country'}>{intl.formatMessage(messages.countryLabel)}</FormLabel>
                      <Dropdown
                        selectedItem={formatDropdownCountry(value)}
                        items={formattedCountries}
                        onChange={onSelectChange}
                        placeholder={intl.formatMessage(messages.selectCountry)}
                      />
                      <FormErrorMessage>{error?.message}</FormErrorMessage>
                    </FormControl>
                  );
                }}
              />
              <Controller
                name="currency"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => {
                  const onSelectChange = (item: DropdownItem) => onChange(item.value);
                  return (
                    <FormControl isInvalid={!!error?.message}>
                      <FormLabel isRequired htmlFor={'currency'}>
                        {intl.formatMessage(messages.currencyLabel)}
                      </FormLabel>
                      <Dropdown
                        selectedItem={{ value, label: value }}
                        items={formattedCurrencies}
                        onChange={onSelectChange}
                        placeholder={intl.formatMessage(messages.selectCurrency)}
                      />
                      <FormErrorMessage>{error?.message}</FormErrorMessage>
                    </FormControl>
                  );
                }}
              />
            </HStack>
            <ButtonGroup spacing={2} w="100%">
              <Button
                variant="default"
                mt="24px"
                mb="19x"
                w="100%"
                textAlign="center"
                alignItems="center"
                type="button"
                data-testid="signup-continue-step-3"
                isDisabled={isLoading || isValidating}
                onClick={decreaseStep}
              >
                {intl.formatMessage(messages.previousStep)}
              </Button>
              <Button
                variant="primary"
                mt="24px"
                mb="19x"
                w="100%"
                textAlign="center"
                alignItems="center"
                colorScheme="purple"
                type="submit"
                data-testid="signup-submit"
                isDisabled={disableStep3}
                isLoading={isLoading || isValidating}
              >
                {intl.formatMessage(messages.submit)}
              </Button>
            </ButtonGroup>
          </Box>
        )}
      </form>
    </Box>
  );
};
