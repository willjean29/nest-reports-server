import {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { footerSection } from './sections';

const logoContent: Content = {
  image: 'assets/tucan-banner.png',
  width: 100,
  height: 30,
  margin: [30, 50],
};

const styles: StyleDictionary = {
  title: {
    fontSize: 14,
    bold: true,
    marginBottom: 10,
  },
  date: {
    alignment: 'right',
  },
  qr: {
    alignment: 'right',
    margin: [0, 20],
  },
  charge: {
    bold: true,
    lineHeight: 1.5,
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
      {
        text: [
          { text: 'Cobrar a:\n', style: 'charge' },
          `Razón Social: Richter Supermarkt 
          Michael Holz 
          Grenzacherweg 237`,
        ],
        fontSize: 10,
      },
      {
        layout: 'headerLineOnly',
        margin: [0, 20],
        table: {
          headerRows: 1,
          widths: [50, '*', 'auto', 'auto', 'auto'],
          body: [
            ['ID', 'Descripción', 'Cantidad', 'Precio', 'Total'],
            [
              '2',
              'Chang',
              20,
              '$19.00',
              { text: '$380.00', bold: true, alignment: 'right' },
            ],
            [
              '16',
              'Pavlova',
              35,
              '$17.45',
              { text: '$610.75', bold: true, alignment: 'right' },
            ],
            [
              '36',
              'Inlagd Sill',
              25,
              '$19.00',
              { text: '$475.00', bold: true, alignment: 'right' },
            ],
            [
              '59',
              'Raclette Courdavault',
              30,
              '$55.00',
              { text: '$1,650.00', bold: true, alignment: 'right' },
            ],
          ],
        },
      },
      {
        columns: [
          {
            width: '*',
            text: '',
          },
          {
            marginTop: 20,
            width: 'auto',
            layout: 'noBorders',
            table: {
              widths: ['auto', 'auto'],
              body: [
                [
                  { text: 'SubTotal ' },
                  { text: '$3,115.75', bold: true, alignment: 'right' },
                ],
                [
                  { text: 'Total ', fontSize: 14 },
                  {
                    text: '$3,520.80',
                    bold: true,
                    fontSize: 14,
                    alignment: 'right',
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
    styles: styles,
    pageMargins: [40, 100],
    footer: footerSection,
  };
};
