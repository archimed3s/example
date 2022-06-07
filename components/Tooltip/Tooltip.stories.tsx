import { Tooltip } from './Tooltip';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Tooltip',
  component: Tooltip,
};

export const BasicUsage = () => (
  <Tooltip label="Hey, I'm here!" aria-label="A tooltip" isOpen={true}>
    Hover me
  </Tooltip>
);
