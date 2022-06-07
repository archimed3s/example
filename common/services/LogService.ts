/* eslint-disable no-console */
import { useEffect } from 'react';

type Data = undefined | number | string | boolean | Record<string, unknown>;

export const log = (message: string, data?: Data) => {
  console.log(message, data);
};

export const error = (message: string, data?: Data) => {
  console.error(message, data);
};

export const useLogOnChange = (varName: string, value: Data) => {
  useEffect(() => {
    log(`Value of ${varName} changed:`, value);
  }, [value, varName]);
};
