import { Box, Stack, StackProps, Text, TextProps } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';

import { Breadcrumb } from '@components/Breadcrumb/Breadcrumb';
import { Dropdown, DropdownItem } from '@components/Dropdown';
import { GameHistoryTable } from '@modules/GameHistoryTable/GameHistoryTable';

const messages = defineMessages({
  from: {
    id: 'from',
    defaultMessage: 'From',
  },
  to: {
    id: 'to',
    defaultMessage: 'To',
  },
  selectDate: {
    id: 'selectDate',
    defaultMessage: 'Select date',
  },
  gameHistoryFiltersInfo: {
    id: 'gameHistoryFiltersIngo',
    defaultMessage: `
      Note: You can choose only up to 3 months date range.
      If you wish to check the history for a longer period
      please contact customer support at {supportLink}
    `,
  },
  today: {
    id: 'today',
    defaultMessage: 'Today',
  },
  yesterday: {
    id: 'yesterday',
    defaultMessage: 'Yesterday',
  },
  weekAgo: {
    id: 'weekAgo',
    defaultMessage: 'Week ago',
  },
  monthAgo: {
    id: 'montAgo',
    defaultMessage: 'Month ago',
  },
  twoMonthAgo: {
    id: 'twoMonthAgo',
    defaultMessage: '2 month ago',
  },
  threeMonthAgo: {
    id: 'threeMonthAgo',
    defaultMessage: '3 Month ago',
  },
});

const PageContent = (props: StackProps) => (
  <Stack direction="column" width="full" alignItems="flex-start" paddingY={9} {...props} />
);

const PageTitle = (props: TextProps) => <Text color="white" textStyle="lg2" fontWeight={400} {...props} />;

const PageHeader = (props: StackProps) => (
  <Stack
    direction={{
      md: 'row',
      base: 'column',
    }}
    spacing={6}
    justify="space-between"
    width="full"
    {...props}
  />
);

const PageControls = (props: StackProps) => <Stack direction="row" alignItems="center" spacing={4} {...props} />;

const GameHistoryPage = () => {
  const intl = useIntl();

  const dropdownItems: DropdownItem[] = useMemo(
    () => [
      {
        value: '1',
        label: intl.formatMessage(messages.today),
      },
      {
        value: '2',
        label: intl.formatMessage(messages.yesterday),
      },
      {
        value: '7',
        label: intl.formatMessage(messages.weekAgo),
      },
      {
        value: '30',
        label: intl.formatMessage(messages.monthAgo),
      },
      {
        value: '60',
        label: intl.formatMessage(messages.twoMonthAgo),
      },
      {
        value: '90',
        label: intl.formatMessage(messages.threeMonthAgo),
      },
    ],
    [intl],
  );

  const [selectedFromItem, setSelectedFromItem] = useState(dropdownItems[0]);

  const supportLink = <a href="test">rest</a>;

  return (
    <PageContent>
      <Breadcrumb />
      <PageHeader>
        <PageTitle>Game History</PageTitle>
        <PageControls>
          <Dropdown
            width="208px"
            label={intl.formatMessage(messages.from)}
            placeholder={intl.formatMessage(messages.selectDate)}
            items={dropdownItems}
            selectedItem={selectedFromItem}
            onChange={setSelectedFromItem}
          />
        </PageControls>
      </PageHeader>
      <Box paddingTop={6} width="full">
        <GameHistoryTable key={selectedFromItem.value} days={parseInt(selectedFromItem.value)} pageLimit={10} />
      </Box>
    </PageContent>
  );
};

export default GameHistoryPage;
