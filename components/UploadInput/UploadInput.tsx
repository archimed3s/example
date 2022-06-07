import { Flex, FlexProps, Image, Text } from '@chakra-ui/react';
import { FC, ReactNode, SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';

import { useFileUpload } from '@hooks/useFileUpload';
import { useToast } from '@hooks/useToast';

import { DropArea, Input, UploadLabel } from './styles';

const messages = defineMessages({
  uploadTheDocument: {
    id: 'Input.uploadTheDocument',
    defaultMessage: 'Upload the document',
  },
  imageUploadErrorToast: {
    id: 'Input.Validation.imageUploadErrorToast',
    defaultMessage: 'Sorry, something went wrong. Please make sure to only upload image files',
  },
});

type UploadInputProps = FlexProps & {
  images?: File[];
  label?: ReactNode;
  onImageChanged: (images: File[]) => void;
};

export const UploadInput: FC<UploadInputProps> = ({ images: defaultImages, onImageChanged, label, ...flexProps }) => {
  const [images, setImages] = useState<File[]>(defaultImages || []);
  const { formatMessage } = useIntl();
  const toast = useToast();

  const onFileChange = useCallback(
    (files: File[]) => {
      files.forEach((file) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onloadend = () => {
          if (/image\//g.test(file.type) && !reader.error && typeof reader.result === 'string') {
            setImages((prevState) => prevState.concat(file));
          } else {
            toast.error({
              title: formatMessage(messages.imageUploadErrorToast),
            });
          }
        };
      });
    },
    [formatMessage, toast],
  );
  const { inputProps, containerProps } = useFileUpload({ onFileChange });

  useEffect(() => {
    onImageChanged(images);
  }, [images, onImageChanged]);

  const removeImage = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setImages((prevState) => prevState.filter((_, i) => i !== Number((e.target as HTMLElement).dataset.index)));
  };

  return (
    <>
      {images.map((image, i) => (
        <Flex
          key={image.name}
          alignItems="center"
          backgroundColor="gray.-80"
          borderRadius={8}
          p={2}
          pr={2}
          mb={2}
          {...flexProps}
        >
          <Image
            src={URL.createObjectURL(image)}
            alt={image.name}
            objectFit="cover"
            w={9}
            h={9}
            borderRadius={6}
            mr={2}
          />

          <Text
            fontSize="md"
            fontWeight={600}
            mr="auto"
            pr={1}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {image.name}
          </Text>
        </Flex>
      ))}

      <DropArea {...containerProps}>
        <Input {...inputProps} id="fileElem" required={!images.length} />

        <UploadLabel htmlFor="fileElem" className="upload-label">
          <Text className="upload-text" fontSize="md" color="gray.160" mr={2}>
            {label || formatMessage(messages.uploadTheDocument)}
          </Text>
        </UploadLabel>
      </DropArea>
    </>
  );
};
