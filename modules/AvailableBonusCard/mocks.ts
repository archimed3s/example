import { AvailableBonusCardProps } from '@modules/AvailableBonusCard/AvailableBonusCard';

export const availableBonusCards: AvailableBonusCardProps[] = [
  {
    id: 'n1',
    caption: '1ST DEPOSIT',
    title: 'Get 100% up to € 500',
    code: 'BLAZE001',
    text: 'Available only 7 days from registration.',
    claimURL: '#',
    linkText: 'Welcome Bonus T&C',
    linkURL: '#',
    variant: 'claimed',
  },
  {
    id: 'n2',
    caption: '2ND DEPOSIT',
    title: 'Get 100% up to € 500',
    code: 'BLAZE002',
    text: 'Available only 7 days from registration.',
    cancelURL: '#',
    linkText: 'Welcome Bonus T&C',
    linkURL: '#',
    variant: 'available',
  },
  {
    id: 'n3',
    caption: '3RD DEPOSIT',
    title: 'Get 100% up to € 500',
    code: 'BLAZE003',
    text: 'Available only 7 days from registration.',
    linkText: 'Welcome Bonus T&C',
    linkURL: '#',
    variant: 'locked',
  },
];
