import { PlayerInfoResponse } from '@lib/core-client/api';
import { Player } from '@sharedTypes/api';

export const getPlayerInfoResponse = (data: PlayerInfoResponse): Player.PlayerInfoResponse => ({
  playerId: data.playerId,
  externalPlayerId: data.externalPlayerId,
  firstName: data.firstName,
  lastName: data.lastName,
  email: data.email,
  countryId: data.countryId,
  phoneNumber: data.phoneNumber,
  dateOfBirth: data.dateOfBirth,
  languageId: data.languageId,
  phoneCode: data.phoneCode,
  street: data.street,
  genderId: data.genderId,
  zipCode: data.postalCode,
  currency: data.currency,
  agreementTermsAccepted: data.agreementTermsAccepted,
  subscriptionSmsEnabled: data.subscriptionSmsEnabled,
  subscriptionEmailEnabled: data.subscriptionEmailEnabled,
  consentPhone: data.consentPhone,
  consentPostmail: data.consentPostmail,
  consentPush: data.consentPush,
  playerPermissions: data.permissions,
  displayName: data.displayName,
});
