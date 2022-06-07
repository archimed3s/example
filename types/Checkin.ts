type CheckinPlayer = {
  addressDeliverable: null;
  auth: false;
  birthdate: Date;
  city: string;
  country: null;
  existing: boolean;
  firstName: string;
  gender: string;
  houseNumber: string;
  lastName: string;
  phone: string;
  postalCode: string;
  provinceName: null;
  signature: null;
  streetName: string;
  currency?: string;
};

type Credentials = { email: string; password: string; username: string; consent: boolean };

type CheckInCompletedData = {
  acceptEmailsOffer: boolean;
  acceptPrivacy: boolean;
  acceptSmsOffer: boolean;
  acceptTermsConditions: boolean;
  address1: string;
  birthdate: string;
  bonusCode: null;
  city: string;
  country: string;
  currency: string;
  email: string;
  firstname: string;
  gender: string;
  lastname: string;
  password: string;
  phone: string;
  username: string;
  phonePrefix: string;
  postalCode: string;
  provinceCode?: string;
  provinceName?: string;
};

type CheckInData = {
  bankNameCheck: null;
  company: { name: '' };
  consent: {
    age: { consent: boolean };
    // eslint-disable-next-line camelcase
    offers_email: { consent: boolean };
    // eslint-disable-next-line camelcase
    offers_sms: { consent: boolean };
    privacy: { consent: boolean };
    responsibility: { consent: boolean };
    terms: { consent: boolean };
  };
  credentials: Credentials;
  flowStatus: { doneChapter: null | string };
  identIdAdressCheck: null;
  identity: null;
  sanction: { flag: false; category: null; source: null; program: null };
  socialMediaData: { socialSignIn: boolean };
  sofortIdent: null;
  player: CheckinPlayer;
};

export type CheckInDataDiff = {
  flowStatus?: {
    doneChapter: string | null;
  };
  credentials?: Partial<Credentials>;
  player?: Partial<CheckinPlayer>;
};

type CheckInEventHandler<T = unknown> = (handler: (event: T) => void) => void;

export type CheckInSdk = {
  dataFlow: {
    setOnUpdate: (fn: (data: CheckInData, dataDiff: CheckInDataDiff) => void) => void;
    setOnComplete: (fn: (props: { data: CheckInCompletedData }) => void) => void;
  };

  events: {
    setOnAny: CheckInEventHandler<{ action: string; flowStatus: { complete: boolean } }>;
    setOnCloseModule: CheckInEventHandler<{ flowCompleted: boolean }>;
    setOnOpenModule: CheckInEventHandler<{ flowCompleted: boolean }>;
    setOnScreenCompleted: CheckInEventHandler;
    setOnScreenStart: CheckInEventHandler;
  };
};

export type CheckIn = {
  settings: {
    currencies: {
      setSelectable: (currencies: string[]) => void;
    };

    setLang: (lang: string) => void;

    countries: {
      setRestricted: (countries: string[]) => void;
      setFeatured: (countries: string[]) => void;
    };
  };

  generate: {
    successScreenObject: (data: { body: string }) => void;
    dataError: {
      custom: (data: { title: string; message: string; type: string }) => void;
    };
  };

  signUp: {
    open: () => void;
  };
} & CheckInSdk;
