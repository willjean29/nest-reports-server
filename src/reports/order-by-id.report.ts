import {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';

const logoContent: Content = {
  image: 'assets/tucan-banner.png',
  width: 100,
  height: 30,
  margin: [30, 10],
};

const styles: StyleDictionary = {
  title: {
    fontSize: 16,
    bold: true,
    marginBottom: 20,
  },
  date: {
    alignment: 'right',
  },
  qr: {
    alignment: 'right',
    margin: [0, 20],
  },
};

export const orderByIdReport = (): TDocumentDefinitions => {
  return {
    header: logoContent,
    content: [
      {
        text: 'Tucan Code',
        style: 'title',
      },
      {
        columns: [
          {
            text: `
            15 Montgomery Str, Suite 100,
            Ottawa ON K2Y 9X1, CANADA 
            BN: 12783671823 
            https://devtalles.com`,
            bold: true,
          },
          {
            text: `Recibo No#: 10255 
            Fecha del recibo: 11 de julio de 2021 
            Pagar antes de: 18 de mayo de 2024`,
            style: 'date',
          },
        ],
      },
      {
        qr: 'https://cursos.devtalles.com/',
        fit: 75,
        style: 'qr',
      },
    ],
    styles: styles,
    pageMargins: [40, 60],
  };
};
