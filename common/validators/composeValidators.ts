import { FieldValidator } from 'final-form';

export const composeValidators =
  (...validators: FieldValidator<string>[]): FieldValidator<string> =>
  (...args) =>
    validators.reduce((error, validator) => error || validator(...args), undefined);
