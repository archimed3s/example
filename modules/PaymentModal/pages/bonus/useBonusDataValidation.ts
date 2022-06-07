import { isRight } from 'fp-ts/Either';
import * as t from 'io-ts';
import { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useMutation } from 'react-query';

import { validateBonusCode } from '@api/bonus';
import { stringLength } from '@utils/io-ts';

import { messages } from './transaltions';

const bonusDataStructure = t.strict({
  code: t.string,
});
const bonusData = t.strict({
  code: stringLength(16),
});

export const useBonusDataValidation = () => {
  const { formatMessage } = useIntl();
  const { mutateAsync: validateCode, isLoading: isValidating, data: validationResult } = useMutation(validateBonusCode);

  const validate = useCallback(
    async (data: unknown) => {
      const structure = bonusDataStructure.decode(data);
      if (isRight(structure) && structure.right.code.length === 0) {
        return {
          values: structure.right,
          errors: {},
        };
      }
      const decoded = bonusData.decode(data);
      if (isRight(decoded)) {
        const result = await validateCode(decoded.right);
        if (result.isCodeValid) {
          return {
            values: decoded.right,
            errors: {},
          };
        }
      }
      return {
        values: {},
        errors: {
          code: {
            type: 'validation',
            message: formatMessage(messages.promoCodeErrorMessage, { length: 16 }),
          },
        },
      };
    },
    [formatMessage, validateCode],
  );

  return {
    validate,
    isValidating,
    bonusId: validationResult?.isCodeValid && validationResult.bonusId,
  };
};
