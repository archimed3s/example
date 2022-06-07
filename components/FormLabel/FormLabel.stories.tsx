import { FormLabel } from './FormLabel';

export default {
  title: 'FormLabel',
  component: FormLabel,
};

export const Default = () => <FormLabel>Label</FormLabel>;
export const Required = () => <FormLabel isRequired>Required</FormLabel>;
