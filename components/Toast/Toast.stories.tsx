import { WrapItem } from '@chakra-ui/react';
import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Toast } from './Toast';

export default {
  title: 'Toast',
  component: Toast,
} as ComponentMeta<typeof Toast>;

const Template: ComponentStory<typeof Toast> = (args) => (
  <WrapItem maxWidth="800px">
    <Toast {...args} />
  </WrapItem>
);

export const Success = Template.bind({});
Success.args = {
  type: 'success',
  id: 'status-success',
  onClose: () => {
    action('onClose');
  },
  closeText: 'Close',
  title: 'Success toast toast toast toast toast toast toast toast toast toast toast toast toast toast',
};

export const Error = Template.bind({});
Error.args = {
  type: 'error',
  id: 'status-error',
  onClose: () => {
    action('onClose');
  },
  closeText: 'Close',
  title: 'Error toast toast toast toast toast toast toast toast toast toast toast toast toast toast',
};
