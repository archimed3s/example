import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

const baseUrl = `https://${process.env.LADESK_DOMAIN_NAME}.ladesk.com/api/v3`;

type LadeskFile = {
  id: 'string';
  name: 'string';
  type: 'string';
  size: number;
};

export const addFile = async (filePathname: string) => {
  const formData = new FormData();
  formData.append('file', fs.createReadStream(filePathname));

  const { data } = await axios.post<LadeskFile>(`${baseUrl}/files`, formData, {
    headers: {
      apikey: process.env.LADESK_API_KEY || '',
      'Content-Type': 'multipart/form-data',
      ...formData.getHeaders(),
    },
  });

  return data;
};

export const createNewTicket = async ({
  email,
  message,
  name,
  reason,
  departmentid = 'default',
  attachments,
}: {
  message: string;
  email: string;
  reason: string;
  name: string;
  departmentid?: string;
  attachments?: string;
}) => {
  await axios.post(
    `${baseUrl}/tickets`,
    {
      useridentifier: email,
      recipient_name: name,
      subject: reason,
      departmentid,
      recipient: process.env.LADESK_SUPPORT_EMAIL,
      message,
      attachments,
    },
    { headers: { apikey: process.env.LADESK_API_KEY || '' } },
  );
};
