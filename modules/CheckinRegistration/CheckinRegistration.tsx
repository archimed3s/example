import { useDisclosure } from '@chakra-ui/react';
import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useMutation } from 'react-query';

import { signUpCheckIn, validateCheckin } from '@api/auth';
import { useSiteSettings } from '@hooks/useSiteSettings';
import { SignUpSuccessDialog } from '@modules/SignUpForm/SignUpSuccessDialog';
import { CheckIn, CheckInSdk } from '@sharedTypes/Checkin';
import { isServerError } from '@sharedTypes/ServerError';

const messages = defineMessages({
  checkEmail: {
    id: 'SignUpCheckIn.checkEmail',
    defaultMessage: 'Check your email with verification link',
  },
  somethingWentWrong: {
    id: 'SignUpCheckIn.somethingWentWrong',
    defaultMessage: 'Something went wrong',
  },
  errorTitle: {
    id: 'SignUpCheckIn.errorTitle',
    defaultMessage: 'Error during registration',
  },
});

const validationMessages = {
  email: defineMessages({
    title: {
      id: 'SignUpCheckIn.emailErrorTitle',
      defaultMessage: 'Email is already in use',
    },
    message: {
      id: 'SignUpCheckIn.emailErrorTitle',
      defaultMessage:
        'If your already registered then click the Login button and then “forgot your password?” or contact us and we will help you',
    },
  }),
  displayName: defineMessages({
    title: {
      id: 'SignUpCheckIn.usernameErrorTitle',
      defaultMessage: 'Username is already in use',
    },
    message: {
      id: 'SignUpCheckIn.usernameErrorTitle',
      defaultMessage: 'Please choose another username',
    },
  }),
  country: defineMessages({
    title: {
      id: 'SignUpCheckIn.countryErrorTitle',
      defaultMessage: 'Country does not supported',
    },
    message: {
      id: 'SignUpCheckIn.countryErrorMessage',
      defaultMessage: 'Please choose another supported country from the list',
    },
  }),
  currency: defineMessages({
    title: {
      id: 'SignUpCheckIn.countryErrorTitle',
      defaultMessage: 'Currency does not supported',
    },
    message: {
      id: 'SignUpCheckIn.countryErrorMessage',
      defaultMessage: 'Please choose another supported currency from the list',
    },
  }),
};

declare global {
  interface Window {
    onCheckinLoad: (sdk: CheckInSdk) => void;
    checkin?: CheckIn;
  }
}

type ContextValue = () => void;

const Context = createContext<ContextValue | null>(null);

type Props = {
  children?: ReactNode;
};

export const CheckinRegistrationProvider = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const locale = 'en';
  const { currencies = [], countries = [] } = useSiteSettings() ?? {};

  const intl = useIntl();

  const { mutateAsync: mutateAsyncSignUp } = useMutation(signUpCheckIn);
  const { mutateAsync: mutateAsyncValidate } = useMutation(validateCheckin);

  const successDialogDisclosure = useDisclosure();

  useEffect(() => {
    window.onCheckinLoad = (sdk) => {
      sdk.dataFlow.setOnComplete(async ({ data }) => {
        await mutateAsyncSignUp({
          acceptEmailsOffer: data.acceptEmailsOffer,
          acceptPrivacy: data.acceptPrivacy,
          acceptSmsOffer: data.acceptSmsOffer,
          acceptTermsConditions: data.acceptTermsConditions,
          address: data.address1,
          birthdate: new Date(data.birthdate).toISOString(),
          city: data.city,
          country: data.country,
          currency: data.currency.toUpperCase(),
          email: data.email,
          firstName: data.firstname,
          lastName: data.lastname,
          password: data.password,
          phoneNumber: data.phone,
          phonePrefix: data.phonePrefix,
          postalCode: data.postalCode,
          provinceCode: data.provinceCode,
          provinceName: data.provinceName,
          genderId: data.gender,
          displayName: data.username,
        });

        if (window.checkin) {
          return window.checkin.generate.successScreenObject({
            body: intl.formatMessage(messages.checkEmail),
          });
        }
      });
    };
  }, [mutateAsyncSignUp, intl]);

  useEffect(() => {
    if (!window.checkin || !isOpen) {
      return undefined;
    }

    window.checkin.settings.currencies.setSelectable(currencies);
    window.checkin.settings.setLang(locale);
    window.checkin.settings.countries.setFeatured(countries);
    window.checkin.settings.countries.setRestricted([]);
    window.checkin.signUp.open();

    window.checkin.events.setOnAny((event) => {
      if (event.action === 'close-module') {
        if (event.flowStatus.complete) {
          successDialogDisclosure.onOpen();
        } else {
          setIsOpen(false);
        }
      }
    });

    const validateField = async (
      fieldName: 'email' | 'country' | 'currency' | 'displayName',
      value: string,
      onReject: (param: unknown) => void,
    ) => {
      try {
        await mutateAsyncValidate({ [fieldName]: value });
      } catch (e) {
        if (isServerError(e) && e.code === 'PlayerEmailIsAlreadyTaken') {
          onReject(
            window.checkin?.generate.dataError.custom({
              title: intl.formatMessage(validationMessages[fieldName].title),
              message: intl.formatMessage(validationMessages[fieldName].message),
              type: 'Custom Type',
            }),
          );
        }
      }
    };

    window.checkin.dataFlow.setOnUpdate((data, dataDiff) => {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        if (dataDiff.credentials && dataDiff.credentials.email) {
          await validateField('email', dataDiff.credentials.email, reject);
        }

        if (dataDiff.credentials && dataDiff.credentials.username) {
          await validateField('displayName', dataDiff.credentials.username, reject);
        }

        if (dataDiff.player && dataDiff.player.country) {
          await validateField('country', dataDiff.player.country, reject);
        }

        if (dataDiff.player && dataDiff.player.currency) {
          await validateField('currency', dataDiff.player.currency.toUpperCase(), reject);
        }
      });
    });
  }, [isOpen, currencies, countries, intl, mutateAsyncValidate, successDialogDisclosure]);

  const openCheckin = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  return (
    <Context.Provider value={openCheckin}>
      {props.children}
      <SignUpSuccessDialog
        isOpen={successDialogDisclosure.isOpen}
        onClose={() => {
          setIsOpen(false);
          successDialogDisclosure.onClose();
        }}
      />
    </Context.Provider>
  );
};

export const useCheckinOpen = () => {
  return useContext(Context);
};
