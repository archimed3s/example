import { VStack } from '@chakra-ui/react';

import { Input } from './Input';

const CalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.75 8.29877C15.75 8.02517 15.75 7.88837 15.6984 7.78314C15.6489 7.68238 15.5674 7.60091 15.4665 7.55155C15.3611 7.5 15.2241 7.5 14.9501 7.5H3.05701C2.78346 7.5 2.64668 7.5 2.5414 7.55144C2.44059 7.60069 2.35903 7.682 2.30953 7.78257C2.25783 7.88762 2.25759 8.02421 2.25711 8.29737L2.25 12.3587C2.25 13.5583 2.25 14.1581 2.48749 14.6146C2.68762 14.9993 3.00174 15.313 3.38701 15.5128C3.84419 15.75 4.44482 15.75 5.64609 15.75H12.3539C13.5552 15.75 14.1558 15.75 14.613 15.5128C14.9983 15.313 15.3124 14.9993 15.5125 14.6146C15.75 14.1581 15.75 13.5583 15.75 12.3587V8.29877Z"
      fill="#FDFDFF"
    />
    <path
      d="M5.99566 2.98414C5.99566 2.76927 5.99566 2.66183 5.96304 2.57611C5.91141 2.44042 5.80315 2.33333 5.66596 2.28226C5.5793 2.25 5.47068 2.25 5.25345 2.25C5.03622 2.25 4.9276 2.25 4.84094 2.28226C4.70375 2.33333 4.59548 2.44042 4.54385 2.57611C4.51124 2.66183 4.51124 2.76927 4.51124 2.98414V3.63795C3.99296 3.65836 3.64649 3.71344 3.35716 3.8621C2.96985 4.0611 2.65405 4.37347 2.45286 4.75657C2.38558 4.88467 2.33726 5.0241 2.30256 5.18503C2.25417 5.40941 2.22998 5.5216 2.27052 5.64839C2.30524 5.75699 2.40431 5.87808 2.50445 5.93434C2.62135 6 2.76472 6 3.05146 6H14.9485C15.2353 6 15.3787 6 15.4956 5.93434C15.5957 5.87808 15.6948 5.75699 15.7295 5.64839C15.77 5.5216 15.7458 5.40941 15.6974 5.18503C15.6627 5.0241 15.6144 4.88467 15.5471 4.75657C15.346 4.37347 15.0302 4.0611 14.6428 3.8621C14.3535 3.71341 14.0069 3.65834 13.4884 3.63794V2.98414C13.4884 2.76927 13.4884 2.66183 13.4558 2.57611C13.4042 2.44042 13.2959 2.33333 13.1588 2.28226C13.0721 2.25 12.9635 2.25 12.7462 2.25C12.529 2.25 12.4204 2.25 12.3337 2.28226C12.1965 2.33333 12.0883 2.44042 12.0366 2.57611C12.004 2.66183 12.004 2.76927 12.004 2.98414V3.62594H5.99566V2.98414Z"
      fill="#FDFDFF"
    />
  </svg>
);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Input',
  component: Input,
};

export const AllInputs = () => (
  <VStack spacing={4} align="stretch">
    <Input placeholder="Placeholder" />
    <Input placeholder="Placeholder" label="Label" isRequired />
    <Input placeholder="Placeholder" infoText="Use at least 6 charachters" />
    <Input placeholder="Placeholder" rightElement={<CalendarIcon />} />
    <Input placeholder="Placeholder" leftElement={<CalendarIcon />} />
    <Input
      placeholder="Placeholder"
      isInvalid={true}
      errorText="Error message that can take up to two lines in height, just like this one"
    />
  </VStack>
);
export const Primary = () => <Input placeholder="Placeholder" />;
export const WithInfo = () => <Input placeholder="Placeholder" infoText="Use at least 6 charachters" />;
export const WithIcon = () => (
  <Input placeholder="Placeholder" rightElement={<CalendarIcon />} leftElement={<CalendarIcon />} />
);
export const Error = () => (
  <Input
    placeholder="Placeholder"
    isInvalid={true}
    errorText="Error message that can take up to two lines in height, just like this one"
  />
);
