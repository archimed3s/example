import { ReactElement } from 'react';

type Props = {
  children: ReactElement;
};

export const EmptyLayout = (props: Props) => props.children;
