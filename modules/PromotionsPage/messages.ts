import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  availableFor: {
    id: 'PromotionsPage.Countdown.availableFor',
    defaultMessage: 'Available {days, select, 0{} other{{days}d}} {hours}h {minutes}m',
  },
  joinNow: {
    id: 'PromotionsPage.Countdown.joinNow',
    defaultMessage: 'Join Now',
  },
  days: {
    id: 'PromotionsPage.Countdown.days',
    defaultMessage: 'Days',
  },
  hours: {
    id: 'PromotionsPage.Countdown.hours',
    defaultMessage: 'Hours',
  },
  minutes: {
    id: 'PromotionsPage.Countdown.minutes',
    defaultMessage: 'Minutes',
  },
});
