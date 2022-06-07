import { Box, Flex, Grid, GridItem, HStack } from '@chakra-ui/react';
import getConfig from 'next/config';
import { useEffect, useMemo, useRef, useState } from 'react';
// Recaptcha work only with the default import
// eslint-disable-next-line import/no-named-as-default
import ReCAPTCHA from 'react-google-recaptcha';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import { useMutation } from 'react-query';

import { QUERY_KEYS, sendContactForm } from '@api/contact-us';
import { Button } from '@components/Button/Button';
import { Dropdown, DropdownItem } from '@components/Dropdown';
import { FormLabel } from '@components/FormLabel/FormLabel';
import { IconButton } from '@components/IconButton/IconButton';
import { Input } from '@components/Input';
import { Textarea } from '@components/Textarea/Textarea';
import { useBreakpoint } from '@hooks/useBreakpoint';
import { useFileUpload } from '@hooks/useFileUpload';
import { usePlayerState } from '@hooks/usePlayerState';
import { useToast } from '@hooks/useToast';
import { FormSuccessState } from '@modules/ContactForm/FormSuccessState';
import { ImageItem } from '@modules/ContactForm/components/ImageItem';
import { LiveChatSection } from '@modules/ContactForm/components/LiveChatSection/LiveChatSection';

import { AttacheFileIcon } from './components/AttacheFileIcon';

const { publicRuntimeConfig } = getConfig();

const messages = defineMessages({
  nameLabel: {
    id: 'ContactForm.nameLabel',
    defaultMessage: 'Your name',
  },
  requestError: {
    id: 'ContactForm.requestError',
    defaultMessage: 'Something went wrong. Try onre more time',
  },
  namePlaceholder: {
    id: 'ContactForm.namePlaceholder',
    defaultMessage: 'Name Surname',
  },
  emailLabel: {
    id: 'ContactForm.emailLabel',
    defaultMessage: 'Email',
  },
  emailPlaceholder: {
    id: 'ContactForm.emailPlaceholder',
    defaultMessage: 'Enter your email',
  },
  questionLabel: {
    id: 'ContactForm.questionLabel',
    defaultMessage: 'Choose your question',
  },
  messageLabel: {
    id: 'ContactForm.messageLabel',
    defaultMessage: 'Message',
  },
  messagePlaceholder: {
    id: 'ContactForm.messagePlaceholder',
    defaultMessage: 'Your Message',
  },
  attachFile: {
    id: 'ContactForm.attachFile',
    defaultMessage: 'Attach File',
  },
  submitButton: {
    id: 'ContactForm.submitButton',
    defaultMessage: 'Send Message',
  },
});

const questionsMessages = defineMessages({
  payments: {
    id: 'ContactForm.questions.payments',
    defaultMessage: 'Payments (deposit / cashout)',
  },
  bonus: {
    id: 'ContactForm.questions.bonus',
    defaultMessage: 'Bonus request',
  },
  technical: {
    id: 'ContactForm.questions.technical',
    defaultMessage: 'Technical support',
  },
  accountClosure: {
    id: 'ContactForm.questions.accountClosure',
    defaultMessage: 'Account closure',
  },
  verification: {
    id: 'ContactForm.questions.verification',
    defaultMessage: 'Verification',
  },
  feedback: {
    id: 'ContactForm.questions.feedback',
    defaultMessage: 'Feedback',
  },
  other: {
    id: 'ContactForm.questions.other',
    defaultMessage: 'Other',
  },
});

type FormValues = {
  email: string;
  name: string;
  reason: string;
  message: string;
};

export const ContactForm = () => {
  const { player } = usePlayerState();
  const { isMobile } = useBreakpoint();
  const toast = useToast();
  const intl = useIntl();
  const inputRef = useRef<HTMLInputElement>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [image, setImage] = useState<File | undefined>();

  const onFileChange = (files: File[]) => {
    setImage(files[0]);
  };

  const { inputProps, containerProps } = useFileUpload({ onFileChange, multiple: false });
  const questions = useMemo(
    () =>
      Object.values(questionsMessages).map((message) => ({
        label: intl.formatMessage(message),
        value: message.defaultMessage,
      })),
    [intl],
  );
  const defaultQuestion = questions[0];

  const { register, handleSubmit, control, getValues, setValue } = useForm<FormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      reason: defaultQuestion.value,
    },
  });

  const { mutate, isLoading, isSuccess } = useMutation(QUERY_KEYS.contactUs, sendContactForm, {
    onError: () => {
      toast.error({ title: intl.formatMessage(messages.requestError) });
      recaptchaRef.current?.reset();
    },
  });

  useEffect(() => {
    if (player) {
      setValue('email', player.email);
      setValue('name', `${player.firstName} ${player.lastName}`);
    }
  }, [player, setValue]);

  const onSubmit = async (values: FormValues) => {
    const recaptchaValue = await recaptchaRef.current?.executeAsync();

    if (recaptchaValue) {
      mutate({ ...values, recaptchaValue, files: image ? [image] : [] });
    } else {
      toast.error({ title: intl.formatMessage(messages.requestError) });
      recaptchaRef.current?.reset();
    }
  };

  const onUploadCLick = () => {
    inputRef.current?.click();
  };

  const onImageRemoveClick = () => {
    setImage(undefined);
  };

  return (
    <Grid
      templateColumns={{
        lg: '2fr 1fr',
        base: '1fr',
      }}
      gap={{ lg: 8, base: 5 }}
    >
      <GridItem bg="gray.-120" p={6} borderRadius="16px">
        {isSuccess ? (
          <FormSuccessState email={getValues('email')} />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex mb={{ base: 4, md: 6 }} flexDirection={{ base: 'column', md: 'row' }}>
              <Box flex={1} mb={{ base: 4, md: 0 }}>
                <Input
                  {...register('name', { required: true })}
                  label={intl.formatMessage(messages.nameLabel)}
                  placeholder={intl.formatMessage(messages.namePlaceholder)}
                  name="name"
                  isRequired
                />
              </Box>
              <Box flex={1} ml={{ base: 0, md: 4 }}>
                <Input
                  {...register('email', { required: true })}
                  label={intl.formatMessage(messages.emailLabel)}
                  placeholder={intl.formatMessage(messages.emailPlaceholder)}
                  name="email"
                  type="email"
                  isRequired
                />
              </Box>
            </Flex>
            <Box mb={{ base: 4, md: 6 }}>
              <FormLabel>
                <FormattedMessage {...messages.questionLabel} />
              </FormLabel>
              <Controller
                render={({ field }) => {
                  const onSelectChange = (item: DropdownItem) => field.onChange(item.value);
                  return <Dropdown selectedItem={defaultQuestion} items={questions} onChange={onSelectChange} />;
                }}
                name="reason"
                control={control}
              />
            </Box>

            <Box mb={{ base: 4, md: 6 }}>
              <Textarea
                {...register('message')}
                rows={12}
                label={intl.formatMessage(messages.messageLabel)}
                placeholder={intl.formatMessage(messages.messagePlaceholder)}
                name="message"
              />
            </Box>

            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={publicRuntimeConfig.recaptchaSiteKey || ''}
              size="invisible"
              theme="dark"
            />

            {image && (
              <Box mb={{ base: 4, md: 6 }}>
                <ImageItem image={image} onImageRemoveClick={onImageRemoveClick} />
              </Box>
            )}

            <HStack spacing={4}>
              {isMobile ? (
                <Box {...containerProps}>
                  <input {...inputProps} ref={inputRef} style={{ display: 'none' }} />
                  <IconButton
                    onClick={onUploadCLick}
                    variant="outline"
                    aria-label={intl.formatMessage(messages.attachFile)}
                    icon={<AttacheFileIcon />}
                  />
                </Box>
              ) : (
                <Button width="full" variant="outline" onClick={onUploadCLick}>
                  <Flex {...containerProps} alignItems="center">
                    <input {...inputProps} ref={inputRef} style={{ display: 'none' }} />
                    <Box mr={3}>
                      <AttacheFileIcon />
                    </Box>

                    <FormattedMessage {...messages.attachFile} />
                  </Flex>
                </Button>
              )}
              <Button width="full" type="submit" isLoading={isLoading}>
                <FormattedMessage {...messages.submitButton} />
              </Button>
            </HStack>
          </form>
        )}
      </GridItem>
      <GridItem>
        <LiveChatSection />
      </GridItem>
    </Grid>
  );
};
