// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as next from 'next';

// Extend NextApiRequest for parsing files from multipart/form-data requests
declare module 'next' {
  interface NextApiRequest {
    files: unknown;
  }
}
