import { Flex, Image, Text } from '@chakra-ui/react';
import { defineMessages, useIntl } from 'react-intl';

import { IconButton } from '@components/IconButton/IconButton';

const messages = defineMessages({
  removeFile: {
    id: 'ContactForm.ImageItem.attachFile',
    defaultMessage: 'Remove File',
  },
});

type ImageItemProps = {
  image: File;
  onImageRemoveClick: () => void;
};

export const ImageItem = ({ image, onImageRemoveClick }: ImageItemProps) => {
  const intl = useIntl();

  return (
    <Flex bg="gray.-80" p={2} alignItems="center" borderRadius={8}>
      <Image src={URL.createObjectURL(image)} alt={image.name} objectFit="cover" w={9} h={9} borderRadius={6} mr={2} />

      <Text color="white" fontSize="xs2" fontWeight="semibold" flex={1}>
        {image.name}
      </Text>

      <IconButton variant="link" onClick={onImageRemoveClick} aria-label={intl.formatMessage(messages.removeFile)} />
    </Flex>
  );
};
