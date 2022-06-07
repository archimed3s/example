import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import { CheckboxButtons, Tag } from './CheckboxButtons';

export default {
  title: 'CheckboxButtons',
  component: CheckboxButtons,
  argTypes: {
    tags: {
      control: false,
    },
    setTags: {
      control: false,
    },
  },
} as ComponentMeta<typeof CheckboxButtons>;

const Template: ComponentStory<typeof CheckboxButtons> = (args) => {
  const [tags, setTags] = useState<Tag[]>(args.tags);

  return <CheckboxButtons tags={tags} setTags={setTags} />;
};

export const BasicUsage = Template.bind({});
BasicUsage.args = {
  tags: [
    {
      id: '1',
      name: 'tag1',
      isActive: true,
    },
    {
      id: '2',
      name: 'tag2',
      isActive: false,
    },
    {
      id: '3',
      name: 'tag3',
      isActive: false,
    },
  ],
};
