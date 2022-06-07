import { Image } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';

import { Dropdown, DropdownItem } from '@components/Dropdown';
import { useSiteSettings } from '@hooks/useSiteSettings';

import { CashierLayout } from '../../layouts/CashierLayout';
import { ShortFAQ } from './ShortFAQ';
import { TransactionsList } from './TransactionsList';
import transactionsIcon from './static/transactionsIcon.png';

const getDateBeforeDays = (days: number) => {
  return new Date(new Date().getTime() - days * 24 * 60 * 60 * 1000);
};

const messages = defineMessages({
  pageTitle: {
    id: 'TransactionsPage.pageTitle',
    defaultMessage: 'Transactions',
  },
  paymentTypeFilterLabel: {
    id: 'TransactionsPage.paymentTypeFilterLabel',
    defaultMessage: 'Type',
  },
  paymentTypeAllFilterOption: {
    id: 'TransactionsPage.paymentTypeAllFilterOption',
    defaultMessage: 'All types',
  },
  paymentTypeWithdrawalFilterOption: {
    id: 'TransactionsPage.paymentTypeWithdrawalFilterOption',
    defaultMessage: 'Withdrawal',
  },
  paymentTypeDepositFilterOption: {
    id: 'TransactionsPage.paymentTypeDepositFilterOption',
    defaultMessage: 'Deposit',
  },
  dateFilterLabel: {
    id: 'TransactionsPage.dateFilterLabel',
    defaultMessage: 'Date',
  },
  dateAllFilterOption: {
    id: 'TransactionsPage.dateAllFilterOption',
    defaultMessage: 'All time',
  },
  dateTodayFilterOption: {
    id: 'TransactionsPage.dateTodayFilterOption',
    defaultMessage: 'Today',
  },
  dateWeekFilterOption: {
    id: 'TransactionsPage.dateWeekFilterOption',
    defaultMessage: 'This week',
  },
  dateMonthFilterOption: {
    id: 'TransactionsPage.dateMonthFilterOption',
    defaultMessage: 'This month',
  },
  currencyFilterLabel: {
    id: 'TransactionsPage.currencyFilterLabel',
    defaultMessage: 'Currency',
  },
  currencyAllFilterOption: {
    id: 'TransactionsPage.currencyAllFilterOption',
    defaultMessage: 'All currencies',
  },
});

export const TransactionsPage = () => {
  const intl = useIntl();

  const transactionTypes: DropdownItem[] = [
    {
      value: 'all',
      label: intl.formatMessage(messages.paymentTypeAllFilterOption),
    },
    {
      value: 'withdrawal',
      label: intl.formatMessage(messages.paymentTypeWithdrawalFilterOption),
    },
    {
      value: 'deposit',
      label: intl.formatMessage(messages.paymentTypeDepositFilterOption),
    },
  ];
  const [transactionType, setTransactionType] = useState(transactionTypes[0]);

  const currencies: DropdownItem[] = [
    { value: 'all', label: intl.formatMessage(messages.currencyAllFilterOption) },
    ...(useSiteSettings()?.currencies ?? []).map((value) => ({ value, label: value })),
  ];
  const [currency, setCurrency] = useState(currencies[0]);

  const dates: DropdownItem[] = [
    { value: 'all', label: intl.formatMessage(messages.dateAllFilterOption) },
    { value: '1', label: intl.formatMessage(messages.dateTodayFilterOption) },
    { value: '7', label: intl.formatMessage(messages.dateWeekFilterOption) },
    { value: '30', label: intl.formatMessage(messages.dateMonthFilterOption) },
  ];
  const [date, setDate] = useState(dates[0]);

  const filter = {
    type: transactionType.value !== 'all' ? transactionType.value : undefined,
    currency: currency.value !== 'all' ? currency.value : undefined,
    after: useMemo(() => (date.value !== 'all' ? getDateBeforeDays(parseInt(date.value)) : undefined), [date]),
  };

  return (
    <CashierLayout
      titleImage={<Image height="44px" width="63px" src={transactionsIcon.src} alt="Transactions icon" />}
      title={intl.formatMessage(messages.pageTitle)}
      controls={
        <>
          <Dropdown
            width="182px"
            label={intl.formatMessage(messages.paymentTypeFilterLabel)}
            items={transactionTypes}
            selectedItem={transactionType}
            onChange={setTransactionType}
          />
          <Dropdown
            width="182px"
            label={intl.formatMessage(messages.currencyFilterLabel)}
            items={currencies}
            selectedItem={currency}
            onChange={setCurrency}
          />
          <Dropdown
            width="182px"
            label={intl.formatMessage(messages.dateFilterLabel)}
            items={dates}
            selectedItem={date}
            onChange={setDate}
          />
        </>
      }
      mainContent={<TransactionsList key={JSON.stringify(filter)} filter={filter} />}
      sidebarContent={<ShortFAQ />}
    />
  );
};
