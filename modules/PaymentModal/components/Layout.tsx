import { ButtonProps, ModalBodyProps } from '@chakra-ui/react';
import { PropsWithChildren, ReactChild, ReactNode } from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';

import { Button } from '@components/Button/Button';
import { IconButton, IconButtonSizeEnum } from '@components/IconButton/IconButton';
import { ModalBody } from '@components/Modal/ModalBody';
import { ModalFooter } from '@components/Modal/ModalFooter';
import { ModalHeader } from '@components/Modal/ModalHeader';

const messages = defineMessages({
  closeBtn: {
    id: 'Withdrawal.Deny.closeBtn',
    defaultMessage: 'Close',
  },
});

type TitleProps = { title: ReactNode; onBackClick?: () => void };
const ModalTitle = ({ onBackClick, title }: TitleProps) => (
  <>
    {onBackClick && (
      <IconButton
        aria-label="modal back"
        size={IconButtonSizeEnum.SMALL}
        isRound
        variant="primary"
        onClick={onBackClick}
        mr={4}
      />
    )}
    {title}
  </>
);

type LayoutProps = {
  title: ReactNode;
  onClose: () => void;
  onClick?: () => void;
  onBackClick?: () => void;
  button?: {
    type?: ButtonProps['type'];
    children?: ReactChild;
    disabled?: boolean;
  };
  modalBodyProps?: ModalBodyProps;
};
export const Layout = ({
  title,
  children,
  button,
  modalBodyProps,
  onBackClick,
  onClick,
  onClose,
}: PropsWithChildren<LayoutProps>) => (
  <>
    <ModalHeader onClose={onClose} title={<ModalTitle title={title} onBackClick={onBackClick} />} />
    <ModalBody
      flex={5}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      paddingY={1}
      {...modalBodyProps}
    >
      {children}
    </ModalBody>
    <ModalFooter>
      <Button variant="primary" width="full" {...button} onClick={onClick ?? onClose} data-testid="btn-submit">
        {button?.children ?? <FormattedMessage {...messages.closeBtn} />}
      </Button>
    </ModalFooter>
  </>
);
