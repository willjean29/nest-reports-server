import { Content } from 'pdfmake/interfaces';
import { DateFormatter } from 'src/helpers';

interface HeaderSectionOptions {
  title?: string;
  subTitle?: string;
  showLogo?: boolean;
  showDate?: boolean;
}

export const headerSection = (options: HeaderSectionOptions): Content => {
  const { showLogo = true, showDate = true } = options;
  const logo: Content = {
    image: 'assets/tucan-code-logo.png',
    width: 60,
    height: 60,
    alignment: 'left',
    margin: [30, 10],
    background: 'red',
  };
  const headerLogo: Content = showLogo ? logo : null;
  const headerDate: Content = showDate
    ? {
        text: DateFormatter.getFullDate(new Date()),
        alignment: 'right',
        margin: [30, 10],
      }
    : null;
  return {
    columns: [headerLogo, headerDate],
  };
};
