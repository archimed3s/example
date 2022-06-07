// based on: https://www.fasttrack-solutions.com/en/resources/integration/channels/inbox-on-site-messages/api-integration
export type FasttrackNotification = {
  MessageId: number;
  UserId: number;
  Event: 'shoutout' | 'message' | 'inbox';
  Title: string;
  Message: string; // Can contain HTML
  PreviewText: string; // Cannot contain HTML
  FooterText: string; // Can contain HTML
  Data: object; // Extra fields for your usage
  CTAButtonLink: string;
  CTAButtonText: string;
  CTAButton2Link: string;
  CTAButton2Text: string;
  ImageUrl: string;
  IsRead: boolean;
  Date: string; // '2019-02-14 13:07:00';
  Expires: string; // '2019-12-12 12:00:00';
};
