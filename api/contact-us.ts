import { routeService } from '@common/services/RouteService';
import { ContactUsRequest } from '@sharedTypes/api/contact-us';
import { post } from '@utils/fetcher';

export const QUERY_KEYS = {
  contactUs: 'ContactUs',
};

const getFormDataFromParams = (params: Record<string, string | File | File[] | Blob | Blob[] | string[]>) => {
  const formData = new FormData();

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.map((v) => formData.append(key, v));
    } else {
      formData.append(key, value);
    }
  });

  return formData;
};

export const sendContactForm = (body: ContactUsRequest) =>
  post(routeService().api.contactUs(), getFormDataFromParams(body), {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
