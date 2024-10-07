import {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { footerSection } from './sections';
import { CurrencyFormatter, DateFormatter } from 'src/helpers';

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

export interface CompleteOrder {
  order_id: number;
  customer_id: number;
  order_date: Date;
  customers: Customers;
  order_details: OrderDetail[];
}

export interface Customers {
  customer_id: number;
  customer_name: string;
  contact_name: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
}

export interface OrderDetail {
  order_detail_id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  products: Products;
}

export interface Products {
  product_id: number;
  product_name: string;
  category_id: number;
  unit: string;
  price: string;
}

interface ReportValues {
  title?: string;
  subTitle?: string;
  data: CompleteOrder;
}

export const orderByIdReport = (values: ReportValues): TDocumentDefinitions => {
  const { data } = values;
  const { order_id, order_date, customers, order_details } = data;
  const subTotal = order_details.reduce(
    (acc, detail) => acc + detail.quantity * +detail.products.price,
    0,
  );

  const total = subTotal * 1.15;
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
            text: `Recibo No#: ${order_id} 
            Fecha del recibo: ${DateFormatter.getFullDate(order_date)}
            Pagar antes de: ${DateFormatter.getFullDate(new Date())}`,
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
          `Razón Social: ${customers.customer_name}
          Contacto: ${customers.contact_name}`,
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
            ...order_details.map((detail) => [
              detail.order_detail_id.toString(),
              detail.products.product_name,
              detail.quantity.toString(),
              {
                text: CurrencyFormatter.formatCurrency(+detail.products.price),
                alignment: 'right',
              },
              {
                text: CurrencyFormatter.formatCurrency(
                  +detail.products.price * detail.quantity,
                ),
                alignment: 'right',
              },
            ]),
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
                  {
                    text: CurrencyFormatter.formatCurrency(subTotal),
                    bold: true,
                    alignment: 'right',
                  },
                ],
                [
                  { text: 'Total ', fontSize: 14 },
                  {
                    text: CurrencyFormatter.formatCurrency(total),
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
