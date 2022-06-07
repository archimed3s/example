import { kycMessages } from './messages';

export const documentsMapping = {
  passport: {
    id: 'passport',
    label: kycMessages.passport,
  },
  driverLicense: {
    id: 'driver_license',
    label: kycMessages.driverLicense,
  },
  residentPermit: {
    id: 'resident_permit',
    label: kycMessages.residentPermit,
  },
  idCard: {
    id: 'idcard',
    label: kycMessages.idCard,
  },
};

export type KycFormData = {
  documentType: keyof typeof documentsMapping | '';
  identityDocs: File[];
  secProofDocs: File[];
};

export type FormStepProps = {
  formData: KycFormData;
  onFormDataChanged: (data: Partial<KycFormData>) => void;
};
