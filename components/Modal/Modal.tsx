import {
  Modal as ChakraModal,
  ModalContent,
  ModalContentProps,
  ModalOverlay,
  ModalProps,
  useBreakpointValue,
} from '@chakra-ui/react';

type Props = ModalProps & {
  isOpen: boolean;
  onClose: () => void;
  contentProps?: ModalContentProps;
  dataTestId?: string;
};

export const Modal = ({ isOpen, onClose, children, contentProps, dataTestId, ...props }: Props) => {
  const size = useBreakpointValue({ base: 'full', md: 'lg' });

  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} size={size} {...props}>
      <ModalOverlay />
      <ModalContent data-testid={dataTestId} {...contentProps}>
        {children}
      </ModalContent>
    </ChakraModal>
  );
};
