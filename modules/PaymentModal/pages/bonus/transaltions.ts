import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'PaymentModal.bonus.title',
    defaultMessage: 'Activate bonus',
  },
  selectLabel: {
    id: 'PaymentModal.bonus.selectLabel',
    defaultMessage: 'Select you bonus',
  },
  selectNoBonus: {
    id: 'PaymentModal.bonus.selectNoBonus',
    defaultMessage: "I don't want a bonus",
  },
  promoCodeLabel: {
    id: 'PaymentModal.bonus.promoCodeLabel',
    defaultMessage: 'I have a promocode',
  },
  promoCodePlaceholder: {
    id: 'PaymentModal.bonus.promoCodePlaceholder',
    defaultMessage: 'Type here...',
  },
  promoCodeErrorMessage: {
    id: 'PaymentModal.bonus.promoCodeErrorMessage',
    defaultMessage: 'Promocode length should be {length} symbols',
  },
  continue: {
    id: 'PaymentModal.continue',
    defaultMessage: 'Continue',
  },
});
