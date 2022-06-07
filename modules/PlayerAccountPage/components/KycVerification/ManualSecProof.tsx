import { Box, Text } from '@chakra-ui/react';
import { FC, useCallback } from 'react';
import { useIntl } from 'react-intl';

import { UploadInput } from '@components/UploadInput/UploadInput';
import { usePlayerState } from '@hooks/usePlayerState';

import { KycAlert } from '../KycAlert/KycAlert';
import { kycMessages } from './messages';
import { FormStepProps } from './types';

const secProofsMapping = Object.freeze({
  address: {
    id: 'proof_of_address',
    label: kycMessages.address,
  },
  payment: {
    id: 'proof_of_payment',
    label: kycMessages.payment,
  },
});

export const ManualSecProof: FC<FormStepProps> = ({ formData, onFormDataChanged }) => {
  const { formatMessage } = useIntl();
  const { player } = usePlayerState();

  const proofType = Object.values(secProofsMapping).find((proof) => proof.id === player?.kyc?.proofId);

  const onImageChanged = useCallback(
    (images: File[]) => {
      onFormDataChanged({
        secProofDocs: images,
      });
    },
    [onFormDataChanged],
  );

  if (!proofType) {
    return null;
  }

  return (
    <>
      <Text as="h2" fontSize="xl" fontWeight="600" mb={2}>
        {formatMessage(kycMessages.confirmYourProof, { proof: formatMessage(proofType.label) })}
      </Text>

      <Text fontSize="sm" color="gray.160" mb={2}>
        {formatMessage(kycMessages.secondaryProof, { documentType: formatMessage(proofType.label) })}
      </Text>

      <Box mt={4} mb={4}>
        <KycAlert content={formatMessage(kycMessages.infoMessage)} />
      </Box>

      <Text as="h3" fontSize="md" fontWeight="600" mb={2}>
        {formatMessage(kycMessages.uploadDocument)}
      </Text>

      <UploadInput images={formData.secProofDocs} onImageChanged={onImageChanged} />
    </>
  );
};
