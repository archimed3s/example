import { Stack, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';

import { Select } from '@components/Select/Select';

import { Notification } from './Notification';
import { mockedNotifications } from './mocks';

const messages = defineMessages({
  title: {
    id: 'Notifications.title',
    defaultMessage: 'Notifications',
  },
  daysAgo: {
    id: 'Notifications.daysAgo',
    defaultMessage: 'Days ago',
  },
});

// TODO Replace with site config
const options = [
  {
    value: '',
    text: 'All',
  },
  {
    value: '1',
    text: '1 day',
  },
  {
    value: '3',
    text: '3 days',
  },
  {
    value: '7',
    text: 'Week',
  },
  {
    value: '30',
    text: 'Month',
  },
  {
    value: '365',
    text: 'Year',
  },
];

export const Notifications = () => {
  const { formatMessage } = useIntl();
  const [filter, setFilter] = useState('');

  return (
    <VStack width={{ base: 'full', md: 'min(100%, 752px)' }} marginY={12} spacing={4}>
      {/* Add go back link */}
      <Stack
        flexDirection={{ base: 'column', md: 'row' }}
        justifyContent="space-between"
        width="full"
        marginBottom={4}
        spacing={4}
      >
        <Text flexGrow={2} color="white" textStyle="lg2" fontWeight="400">
          <FormattedMessage {...messages.title} />
        </Text>
        <Select
          width={{ base: 'full', md: '208px' }}
          label={formatMessage(messages.daysAgo)}
          options={options}
          activeOption={filter}
          setActiveOption={setFilter}
          placeholder=""
        />
      </Stack>
      {mockedNotifications.map((notification) => (
        <Notification notification={notification} key={notification.MessageId} />
      ))}
    </VStack>
  );
};
