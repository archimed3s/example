import { useRouter } from 'next/router';

import { usePlayerState } from '@hooks/usePlayerState';

type Props = { currency?: string };

export const useCurrency = ({ currency }: Props = {}) => {
  const { player } = usePlayerState();
  const { locale } = useRouter();

  const defaultCurrency = currency ?? player?.currency ?? '';

  const getCurrencySymbol = ({ currency: inCurrency }: Props = {}) =>
    new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: inCurrency ?? defaultCurrency,
    })
      .formatToParts()
      .find((p) => p.type === 'currency')?.value || '';

  const getCurrencyFormatted = (amount: number | string | undefined, inCurrency = defaultCurrency) => {
    const isAmount = amount !== undefined && amount >= 0;
    return player?.currency && isAmount
      ? amount.toLocaleString(locale, {
          style: 'currency',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
          currency: inCurrency,
        })
      : amount;
  };

  // There is no currency validation so formatter could throw an error.
  // Also it is not recommended to use formatter while player info is not loaded.
  // Otherwise glitches possible on values.
  // Example:
  //   on the first render it returns 100
  //   on the second render it returns $100
  const formatAmount = (amount: number, currency = defaultCurrency) => {
    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
      }).format(amount);
    } catch (error) {
      return amount;
    }
  };

  return { getCurrencySymbol, getCurrencyFormatted, formatAmount };
};
