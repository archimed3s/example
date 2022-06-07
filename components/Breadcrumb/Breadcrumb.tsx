import { useRouter } from 'next/router';
import { FC } from 'react';
import { defineMessages, useIntl } from 'react-intl';

import { Button, ButtonProps } from '@components/Button/Button';

const messages = defineMessages({
  goBack: {
    id: 'Navigation.goBack',
    defaultMessage: 'Back to previous page',
  },
});

type BreadcrumbProps = {
  buttonTitle?: string;
} & ButtonProps;

export const Breadcrumb: FC<BreadcrumbProps> = ({ buttonTitle, ...props }) => {
  const { formatMessage } = useIntl();
  const { back } = useRouter();

  return (
    <Button variant="link" onClick={back} {...props}>
      {buttonTitle || formatMessage(messages.goBack)}
    </Button>
  );
};
