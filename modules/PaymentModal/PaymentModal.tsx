import { useBreakpointValue } from '@chakra-ui/react';
import { useCallback, useEffect } from 'react';

import { Modal } from '@components/Modal/Modal';
import { usePaymentContext } from '@hooks/usePaymentContext';

import { DepositContainer } from './DepositContainer';
import { WithdrawContainer } from './WithdrawContainer';

export const PaymentModal = () => {
  const { size, ...additionalStyles } =
    useBreakpointValue({
      base: { size: 'full', height: '100vh' },
      md: { size: 'md', minHeight: 'min(930px, 100vh)', maxHeight: 'min(930px, 100vh)' },
    }) ?? {};

  const {
    state: { flow, isOpen },
    actions: { setState },
  } = usePaymentContext();

  const closeModal = useCallback(() => setState({ isOpen: false }), [setState]);

  useEffect(() => {
    const handler = (message: MessageEvent) => message.data === 'paymentModal.close' && closeModal();
    addEventListener('message', handler);
    return () => removeEventListener('message', handler);
  }, [closeModal]);

  const onClose = useCallback(() => {
    closeModal();
    if (window.frameElement) {
      window.top?.postMessage('paymentModal.close', '*');
    }
  }, [closeModal]);

  return (
    <Modal
      variant="payment"
      dataTestId={`${flow}-modal`}
      motionPreset="slideInBottom"
      isOpen={!!flow && isOpen}
      isCentered
      onClose={onClose}
      size={size}
      contentProps={{
        width: 'min(496px, 100vw)',
        margin: 0,
        ...additionalStyles,
      }}
    >
      {flow === 'withdraw' && <WithdrawContainer onClose={onClose} />}
      {flow === 'deposit' && <DepositContainer onClose={onClose} />}
    </Modal>
  );
};
