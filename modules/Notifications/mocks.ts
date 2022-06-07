import { FasttrackNotification } from './types';

export const mockedNotifications: FasttrackNotification[] = [
  'Your withdrawal of 14,4 USD has been processed',
  'Hey Federico, your “Special” bonus have been activated',
  'Hey Federico, your “Special” bonus have been activated',
  'Your withdrawal of 68,02 USD has been processed',
  'Your withdrawal of 106,54 USD has been processed',
].map((title, index) => ({
  MessageId: Number(`123${index}}`),
  UserId: 123,
  Event: 'message',
  Title: title,
  Message: '<div>This is message body</div>', // Can contain HTML
  PreviewText: 'Preview text', // Cannot contain HTML
  FooterText: '<div>This is footer text</div>', // Can contain HTML
  Data: {}, // Extra fields for your usage
  CTAButtonLink: 'https://www.example.com',
  CTAButtonText: 'Click here!',
  CTAButton2Link: 'https://www.example.com',
  CTAButton2Text: 'Read more!',
  ImageUrl: 'https://www.example.com/image.jpg',
  IsRead: true,
  Date: '2021-02-14 13:07:00',
  Expires: '2021-12-12 12:00:00',
}));
