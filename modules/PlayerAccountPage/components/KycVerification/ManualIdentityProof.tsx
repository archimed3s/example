import { Box, Text } from '@chakra-ui/react';
import { FC, useCallback } from 'react';
import { useIntl } from 'react-intl';

import { ButtonGroup } from '@components/ButtonGroup/ButtonGroup';
import { UploadInput } from '@components/UploadInput/UploadInput';

import { KycAlert } from '../KycAlert/KycAlert';
import { kycMessages } from './messages';
import { FormStepProps, documentsMapping } from './types';

export const ManualIdentityProof: FC<FormStepProps> = ({ formData, onFormDataChanged }) => {
  const { formatMessage } = useIntl();

  const onOptionChanged = useCallback(
    (value: string) => {
      onFormDataChanged({
        documentType: value as keyof typeof documentsMapping,
      });
    },
    [onFormDataChanged],
  );

  const onImageChanged = useCallback(
    (images: File[]) => {
      onFormDataChanged({
        identityDocs: images,
      });
    },
    [onFormDataChanged],
  );

  return (
    <>
      <Text as="h2" fontSize="xl" fontWeight="600" mb={2}>
        {formatMessage(kycMessages.confirmYourProof, { proof: formatMessage(kycMessages.identity) })}
      </Text>

      <Text as="h3" fontSize="md" fontWeight="600" mb={2}>
        {formatMessage(kycMessages.documentToUpload)}
      </Text>
      <ButtonGroup
        options={Object.values(documentsMapping).map(({ id, label }) => ({
          name: id,
          value: formatMessage(label),
        }))}
        activeButton={formData.documentType}
        onOptionChanged={onOptionChanged}
        name="documentType"
        maxW={300}
        flexWrap="wrap"
      />

      <Box mt={4} mb={4}>
        <KycAlert content={formatMessage(kycMessages.infoMessage)} />
      </Box>

      <Text as="h3" fontSize="md" fontWeight="600" mb={2}>
        {formatMessage(kycMessages.uploadDocument)}
      </Text>

      <UploadInput images={formData.identityDocs} onImageChanged={onImageChanged} />
    </>
  );
};
