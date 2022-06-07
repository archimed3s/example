import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'PaymentModal.flexepin.title',
    defaultMessage: 'Flexepin',
  },

  titleDeposit: {
    id: 'PaymentModal.flexepin.titleDeposit',
    defaultMessage: 'Flexepin deposit',
  },

  voucherNumber: {
    id: 'PaymentModal.voucherNumber',
    defaultMessage: 'voucherNumber',
  },

  errorFormat: {
    id: 'PaymentModal.flexepin.error.format',
    defaultMessage: 'Flexepin voucher length is 16 characters',
  },
  wrongVoucher: {
    id: 'PaymentModal.flexepin.error.wrongVoucher',
    defaultMessage: 'Voucher validation failed',
  },
  wrongAmount: {
    id: 'PaymentModal.flexepin.error.wrongAmount',
    defaultMessage: 'Voucher amount {amount} is not the same as selected',
  },

  continue: {
    id: 'PaymentModal.continue',
    defaultMessage: 'Continue',
  },
});
