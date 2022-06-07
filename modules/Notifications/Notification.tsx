import { Center, Grid, Text } from '@chakra-ui/react';
import { FormattedDate, FormattedMessage, defineMessages } from 'react-intl';

import { Button } from '@components/Button/Button';
import { NotificationIcon } from '@modules/Notifications/NotificationIcon';
import { FasttrackNotification } from '@modules/Notifications/types';

const messages = defineMessages({
  check: {
    id: 'Notifications.Notification.check',
    defaultMessage: 'Check',
  },
});

type NotificationProps = {
  notification: FasttrackNotification;
};

export const Notification = ({ notification }: NotificationProps) => {
  return (
    <Grid
      bgColor="gray.-120"
      borderRadius={12}
      width="full"
      gridTemplateColumns={{ base: '1fr', md: '50px 1fr 100px' }}
      gridTemplateAreas={{ base: `"title" "date" "actions"`, md: `"icon title actions" "icon date actions"` }}
      gridColumnGap={2}
      padding={4}
    >
      <NotificationIcon gridArea="icon" display={{ base: 'none', md: 'grid' }} />
      <Text gridArea="title" textStyle="s" color="white" fontWeight="600">
        {notification.Title}
      </Text>
      <Text gridArea="date" textStyle="s">
        <FormattedDate value={notification.Date} month="short" day="2-digit" weekday="long" />
      </Text>
      <Center gridArea="actions" paddingTop={{ base: 3, md: 0 }}>
        <Button variant="flatGray" width={{ base: 'full', md: 'auto' }}>
          <FormattedMessage {...messages.check} />
        </Button>
      </Center>
    </Grid>
  );
};
