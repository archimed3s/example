export const AUTH_COOKIE_NAME = 'auth_session';

export enum PlayerRuleId {
  KycVerified = 'kyc_verified',
}

export enum PlayerCommunicationTypes {
  'post-promotions' = 'consentPostmail',
  'phone-promotions' = 'consentPhone',
  'sms-promotions' = 'enableSmsSubscription',
  'email-promotions' = 'enableEmailSubscription',
  'push-promotions' = 'consentPush',
}

export const enum KycProvider {
  VERIFF = 1,
  MANUAL = 2,
}

export const enum PlayerKycStatus {
  SUBMITTED = 'Submitted',
  APPROVED = 'Approved',
  RESUBMISSION_REQUESTED = 'Resubmission requested',
  DECLINED = 'Declined',
  EXPIRED = 'Expired',
  ABANDONED = 'Abandoned',
}

export const enum PlayerGender {
  MALE = 'male',
  FEMALE = 'female',
}

export type VerificationMessage = {
  id: string;
  defaultMessage: string;
};

export type KycVerificationMessages = {
  completeVerification: VerificationMessage;
  verificationSubmitted: VerificationMessage;
  verificationCompleted: VerificationMessage;
  veriffUnavailableToast: VerificationMessage;
};

export type PlayerKycInfo = {
  status: PlayerKycStatus;
  lastUpdatedAt: Date;
  expiresAt: Date | null;
  reason: string | null;
};

export type PlayerKyc = {
  info: PlayerKycInfo | null;
  providerId?: number;
  proofId?: string | null;
};

export type Player = {
  firstName: string | null;
  lastName: string | null;
  displayName: string | null;
  email: string;
  countryId: string | null;
  phoneNumber: string | null;
  dateOfBirth: string | null;
  zipCode: string | null;
  languageId: string;
  isVerified: boolean;
  playerPermissions: string[];
  kyc?: PlayerKyc;
  phoneCode: string | null;
  street: string | null;
  gender: string | null;
  agreementTermsAccepted: boolean;
  externalPlayerId: string;
  playerId: number;
  currency: string;
  subscriptionSmsEnabled: boolean;
  subscriptionEmailEnabled: boolean;
  consentPhone: boolean;
  consentPostmail: boolean;
  consentPush: boolean;
  externalToken: string;
};

export type PlayerConsentValues = {
  enableSmsSubscription?: boolean;
  enableEmailSubscription?: boolean;
  consentPhone?: boolean;
  consentPostmail?: boolean;
  consentPush?: boolean;
};
