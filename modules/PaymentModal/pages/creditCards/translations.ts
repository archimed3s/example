import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'PaymentModal.title',
    defaultMessage: 'Payment details',
  },
  savedCardsDescription: {
    id: 'PaymentModal.SavedCards.description',
    defaultMessage: 'Saved cards',
  },
  saveCardsAddNew: {
    id: 'PaymentModal.SavedCards.addNew',
    defaultMessage: '+ Add new card',
  },
  paymentProviderIconAlt: {
    id: 'PaymentModal.PaymentProvider.iconAlt',
    defaultMessage: '{provider} logo',
  },
  paymentProviderExpiration: {
    id: 'PaymentModal.PaymentProvider.cardExpiration',
    defaultMessage: 'Expires {month} / {year}',
  },

  cardNumPlaceholder: {
    id: 'PaymentModal.NewCard.cardNumPlaceholder',
    defaultMessage: 'Card Number',
  },
  cardHolderLabel: {
    id: 'PaymentModal.NewCard.cardHolder',
    defaultMessage: 'Cardholder name',
  },
  cardHolderPlaceholder: {
    id: 'PaymentModal.NewCard.cardHolderPlaceHolder',
    defaultMessage: 'Name Surname',
  },
  expireDatePlaceholder: {
    id: 'PaymentModal.NewCard.expireDatePlaceholder',
    defaultMessage: 'Expire Date',
  },
  cardCvvPlaceholder: {
    id: 'PaymentModal.NewCard.cardCvvPlaceholder',
    defaultMessage: 'CVC/CVV',
  },

  errorRequired: {
    id: 'PaymentModal.error.required',
    defaultMessage: 'Value required',
  },
  errorFormat: {
    id: 'PaymentModal.error.format',
    defaultMessage: 'Incorrect format',
  },
  continue: {
    id: 'PaymentModal.continue',
    defaultMessage: 'Continue',
  },

  cardWithdrawError: {
    id: 'PaymentModal.CardWithdraw.error',
    defaultMessage: 'Unexpected error happen. Sorry',
  },
});
