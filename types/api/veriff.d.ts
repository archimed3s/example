declare module '@veriff/js-sdk' {
  type PersonData = {
    givenName?: string;
    lastName?: string;
    idNumber?: string;
  };

  type FormLabel = {
    [P: string]: string;
  };

  type SessionResponse = {
    status: string;
    verification: {
      host: string;
      id: string;
      sessionToken: string;
      status: string;
      url: string;
      vendorData: string;
    };
  };

  type Options = {
    host?: string;
    apiKey: string;
    parentId: string;
    onSession: (err: unknown, response: SessionResponse) => void;
  };

  type MountOptions = {
    formLabel?: FormLabel;
    submitBtnText?: string;
    loadingText?: string;
  };

  type Params = {
    person?: PersonData;
    vendorData?: string;
  };

  export const Veriff: (options: Options) => {
    params: Params;
    setParams: (newParams: Params) => void;
    mount: (mountOptions?: MountOptions) => void;
  };
}
