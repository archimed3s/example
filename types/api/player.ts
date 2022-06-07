import * as t from 'io-ts';

export type PlayerBalance = {
  totalAmount: string;
  totalBonusAmount: string;
  withdrawableAmount: string;
};

export type PlayerPaymentCard = {
  cardHolder: string;
  maskedCardNumber: string;
  currency: string;
  expirationYear: string;
  expirationMonth: string;
  externalAccountId: string;
  paymentProviderId: string;
  schema: string;
};

export type PlayerInfoResponse = {
  playerId: number;
  externalPlayerId: string;
  email: string;
  agreementTermsAccepted: boolean;
  subscriptionSmsEnabled: boolean;
  subscriptionEmailEnabled: boolean;
  consentPhone: boolean;
  consentPostmail: boolean;
  consentPush: boolean;
  firstName: string;
  lastName: string;
  countryId: string;
  phoneNumber: string;
  dateOfBirth: string;
  zipCode: string;
  languageId: string;
  phoneCode: string;
  street: string;
  genderId: string;
  currency: string;
  playerPermissions: string[];
  displayName?: string | null;
};

export const changePersonalInformationRequest = t.strict({
  genderId: t.string,
  phoneNumber: t.string,
  phoneCode: t.string,
  displayName: t.string,
});
export type ChangePersonalInformationRequest = t.TypeOf<typeof changePersonalInformationRequest>;

export const changeConsentsRequest = t.partial({
  enableSmsSubscription: t.boolean,
  enableEmailSubscription: t.boolean,
  consentPhone: t.boolean,
  consentPostmail: t.boolean,
  consentPush: t.boolean,
});
export type ChangeConsentsRequest = t.TypeOf<typeof changeConsentsRequest>;

export const verifyPinRequest = t.strict({
  phonePin: t.string,
});
export type VerifyPinRequest = t.TypeOf<typeof verifyPinRequest>;

export type PlayerTransactionStatus = 'pending' | 'cancelled' | 'confirmed';

export type PlayerPaymentMethodType = 'Card' | 'BankTransfer' | 'Voucher';

export type PlayerTransaction = {
  id: number;
  status: PlayerTransactionStatus;
  amount: number;
  currency: string;
  createdAt: string | null;
  info: string | null;
};

export const kycReqDoc = t.strict({
  document_type: t.string,
  urls: t.array(t.string),
});
export type KycReqDoc = t.TypeOf<typeof kycReqDoc>;

export const kycApplicationRequest = t.strict({
  docs: t.array(kycReqDoc),
});
export type KycApplicationRequest = t.TypeOf<typeof kycApplicationRequest>;

export type GameHistoryItem = {
  txid?: number;
  amount?: string;
  currency?: string;
  createdAt?: string;
  gameName?: string;
  game?: {
    id: number;
    name: string;
    externalGameId: string;
    provider: string;
  };
};

export type PlayerEligibleBonus = {
  autoforfeitMaxAmount?: string;
  awardMaxAmount?: string | null;
  betMaxAmount?: string;
  bonusId?: number;
  bonusName?: string;
  createdAt?: string;
  currencyId?: string;
  depositMinAmount?: string;
  depositNumber?: number | null;
  endsAt?: string;
  expiresInDays?: number;
  maxReceivedCount?: number | null;
  maxReceivedResetInDays?: number;
  productTypeId?: number;
  rewardPercent?: number;
  rewardType?: string;
  startsAt?: string;
  storyBlockId?: string;
  triggerDescription?: string;
  triggerName?: string;
  triggerTypeId?: number;
  utcOffset?: number;
  wagerMultiplier?: number | null;
  dateUntil?: string;
};

export type PlayerActiveBonus = {
  bonus: string;
  bonusStatus?: string;
  cancelledAmount: string;
  convertedAmount: string;
  expiredAmount: string;
  forfeitedAmount: string;
  id: number;
  initialBonus: string;
  playerBonusId: number;
  restrictedAmount: string;
  wagerRequiredAmount: string;
  wagerTotalAmount: string;
  currencyId?: string;
  endsAt?: string;
  bonusName?: string;
  storyBlokId?: string;
};

export type PlayerRecentlyPlayedGames = {
  playerId: number;
  gameProvider: string;
  gameExternalId: string;
  playedAt: Date;
  slug: string;
};

export type RecentlyGamesResponse = {
  games: PlayerRecentlyPlayedGames[];
};
