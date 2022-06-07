type Props = { locale?: string; date?: string | null | undefined };
type ReturnType = {
  getDateFormat: (props: Props) => string;
};

export const useDateTimeFormat = ({ locale }: Props = {}): ReturnType => {
  const getDateFormat = ({ locale: inLocale, date }: Props) => {
    if (!date) {
      return '';
    }
    return new Intl.DateTimeFormat(locale || inLocale).format(new Date(date));
  };

  return { getDateFormat };
};
