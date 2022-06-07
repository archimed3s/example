import { Box, HStack, useDisclosure } from '@chakra-ui/react';
import { useS3Upload } from 'next-s3-upload';
import { FC, FormEvent, useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import { useMutation } from 'react-query';

import { submitKycApplications } from '@api/player';
import { Button } from '@components/Button/Button';
import { Modal } from '@components/Modal/Modal';
import { ModalBody } from '@components/Modal/ModalBody';
import { ModalFooter } from '@components/Modal/ModalFooter';
import { ModalHeader } from '@components/Modal/ModalHeader';
import { ProgressBar } from '@components/ProgressBar/ProgressBar';
import { usePlayerState } from '@hooks/usePlayerState';
import { useToast } from '@hooks/useToast';
import { KycVerificationMessages } from '@sharedTypes/Player';
import { ServerError } from '@sharedTypes/ServerError';
import { KycReqDoc } from '@sharedTypes/api/player';

import { ConfirmationMessage } from './ConfirmationMessage';
import { ManualIdentityProof } from './ManualIdentityProof';
import { ManualSecProof } from './ManualSecProof';
import { Switch } from './Switch';
import { kycMessages } from './messages';
import { KycFormData } from './types';

type S3Doc = {
  type: string;
  url: string;
};

export type ManualAuthProps = {
  messages: KycVerificationMessages;
};

export const ManualAuth: FC<ManualAuthProps> = ({ messages }) => {
  const toast = useToast();
  const { formatMessage } = useIntl();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { player } = usePlayerState();
  const { uploadToS3, files } = useS3Upload();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [nSteps, setNSteps] = useState<number>(0);
  const [formData, setFormData] = useState<KycFormData>({
    documentType: '',
    identityDocs: [],
    secProofDocs: [],
  });
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const { isLoading, mutate } = useMutation(submitKycApplications, {
    onSuccess: () => {
      setIsSubmitted(true);
      setIsUploading(false);
      setCurrentStep((prevState) => prevState + 1);
    },
    onError: (error: ServerError) => {
      toast.error({
        title: formatMessage(kycMessages.requestFailed, { error: error.toString() }),
      });
    },
  });

  const uploadProgress = Math.round(
    files.reduce((prevValue, currentValue) => prevValue + (currentValue.progress || 0), 0) /
      (formData.identityDocs.length + formData.secProofDocs.length) || 0,
  );

  const onFormDataChanged = useCallback((data: Partial<KycFormData>) => {
    setFormData((prevState) => ({
      ...prevState,
      ...data,
    }));
  }, []);

  const goToPreviousStep = () => {
    setCurrentStep((prevState) => prevState - 1);
  };

  const uploadDocsToS3 = async (): Promise<S3Doc[] | void> => {
    const docs: S3Doc[] = [];
    const images = [...formData.identityDocs, ...formData.secProofDocs];
    let hasErrored = false;

    for (let i = 0; i < images.length; i++) {
      const image = images[i];

      try {
        const { url } = await uploadToS3(image);

        docs.push({
          url,
          type: i < formData.identityDocs.length ? formData.documentType : (player?.kyc?.proofId as string),
        });
      } catch (err) {
        toast.error({
          title: formatMessage(kycMessages.s3RequestFailed),
        });
        setIsUploading(false);
        hasErrored = true;
        break;
      }
    }

    return hasErrored ? undefined : docs;
  };

  const submitDocsToApi = (docs: S3Doc[]) => {
    const reqBody: Record<string, KycReqDoc> = {
      [formData.documentType]: {
        document_type: formData.documentType,
        urls: [],
      },
      [player?.kyc?.proofId as string]: {
        document_type: player?.kyc?.proofId as string,
        urls: [],
      },
    };

    docs.forEach((doc) => {
      reqBody[doc.type].urls.push(doc.url);
    });

    mutate({ docs: [...Object.values(reqBody)] });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    switch (currentStep) {
      case nSteps:
        return onClose();
      case nSteps - 1: {
        setIsUploading(true);
        const docs = await uploadDocsToS3();
        docs?.length && submitDocsToApi(docs);
        return;
      }
      default:
        return setCurrentStep((prevState) => prevState + 1);
    }
  };

  return (
    <>
      <Button variant="security" isFullWidth onClick={onOpen} disabled={isSubmitted}>
        {formatMessage(isSubmitted ? messages.verificationSubmitted : messages.completeVerification)}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} dataTestId="kyc-manual-modal">
        <ModalHeader
          title={formatMessage(kycMessages.kyc)}
          subtitle={formatMessage(kycMessages.manualAuthSubtitle)}
          onClose={onClose}
        />

        <form onSubmit={handleSubmit}>
          <ModalBody pt={0} pb={6}>
            <Box mb={4}>
              <ProgressBar nSteps={nSteps} currentStep={currentStep} />
            </Box>

            <Switch currentStep={currentStep} setNSteps={setNSteps}>
              <ManualIdentityProof formData={formData} onFormDataChanged={onFormDataChanged} />
              <ManualSecProof formData={formData} onFormDataChanged={onFormDataChanged} />
              <ConfirmationMessage />
            </Switch>
          </ModalBody>

          <ModalFooter pt={0}>
            <HStack width="full">
              {currentStep !== 1 && currentStep !== nSteps && (
                <Button data-testid="btn-previous" variant="default" isFullWidth onClick={goToPreviousStep}>
                  {formatMessage(kycMessages.previousStep)}
                </Button>
              )}

              <Button
                type="submit"
                data-testid="btn-submit"
                variant="primary"
                width="full"
                isLoading={isUploading}
                loadingText={
                  isLoading
                    ? formatMessage(kycMessages.almostThere)
                    : `${uploadProgress}% - ${formatMessage(kycMessages.submitting)}`
                }
              >
                {formatMessage(
                  currentStep === nSteps
                    ? kycMessages.close
                    : currentStep === nSteps - 1
                    ? kycMessages.submit
                    : kycMessages.continue,
                )}
              </Button>
            </HStack>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
};
