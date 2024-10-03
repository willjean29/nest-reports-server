import { Content } from 'pdfmake/interfaces';
import { DateFormatter } from 'src/helpers';

interface HeaderSectionOptions {
  title?: string;
  subTitle?: string;
  showLogo?: boolean;
  showDate?: boolean;
}

const logoContent: Content = {
  image: 'assets/tucan-code-logo.png',
  width: 60,
  height: 60,
  alignment: 'left',
  margin: [20, 10],
  background: 'red',
};

const dateContent: Content = {
  text: DateFormatter.getFullDate(new Date()),
  alignment: 'right',
  margin: [20, 20],
  width: 180,
};

const subTitleContent = (subTitle: string): Content => ({
  text: subTitle,
  style: {
    bold: true,
    fontSize: 16,
    marginTop: 5,
  },
});

const titleContent = (title: string): Content => ({
  text: title,
  style: {
    bold: true,
    fontSize: 22,
  },
});

export const headerSection = (options: HeaderSectionOptions): Content => {
  const { title, subTitle, showLogo = true, showDate = true } = options;
  const headerLogo: Content = showLogo ? logoContent : null;
  const headerDate: Content = showDate ? dateContent : null;
  const headerSubtTitle: Content = subTitle ? subTitleContent(subTitle) : null;
  const headerTitle: Content = title
    ? {
        stack: [titleContent(title), headerSubtTitle],
        margin: [80, 10, 0, 0],
        alignment: 'center',
      }
    : null;
  return {
    columns: [headerLogo, headerTitle, headerDate],
  };
};
