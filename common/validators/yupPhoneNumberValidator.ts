import { string as yupString } from 'yup';

export const yupPhoneNumberValidator = (
  countryCodeFieldName: string,
  errors: {
    wrongFormat: string;
    required: string;
  },
) =>
  yupString()
    // phone number. 7 - 9 digits depends on the country code
    .matches(/[\d ]{9,12}/, {
      message: errors.wrongFormat,
    })
    .when(countryCodeFieldName, {
      is: ({ length }: string) => length === 1,
      then: (schema) =>
        // Number format: ### ### ####
        schema.matches(/\d{3} \d{3} \d{4}/, {
          message: errors.wrongFormat,
        }),
    })
    .when(countryCodeFieldName, {
      is: ({ length }: string) => length === 2,
      then: (schema) =>
        // Number format: ### ### ###
        schema.matches(/(\d{3} ){2}\d{3}/, {
          message: errors.wrongFormat,
        }),
    })
    .when(countryCodeFieldName, {
      is: ({ length }: string) => length === 3,
      then: (schema) =>
        // Number format: #### ####
        schema.matches(/\d{4} \d{4}/, {
          message: errors.wrongFormat,
        }),
    })
    .required(errors.required);
