import { Textarea } from './Textarea';

export default {
  title: 'Textarea',
  component: Textarea,
};

export const Primary = () => <Textarea placeholder="Placeholder" />;
export const Required = () => <Textarea placeholder="Placeholder" label="Label" isRequired />;
