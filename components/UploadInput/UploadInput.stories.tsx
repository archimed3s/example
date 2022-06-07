import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { UploadInput } from './UploadInput';

export default {
  title: 'UploadInput',
  component: UploadInput,
} as ComponentMeta<typeof UploadInput>;

const Template: ComponentStory<typeof UploadInput> = () => {
  const onImageChanged = () => {
    action('onImageChanged');
  };

  return <UploadInput images={[]} onImageChanged={onImageChanged} />;
};

export const BasicUsage = Template.bind({});
BasicUsage.args = {};
