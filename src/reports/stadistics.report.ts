import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { generateDoughnutChart } from './charts/doughnut.chart';
import { headerSection } from './sections';
import { generatetLineChart } from './charts/line.chart';
export interface TopCountries {
  customers: number;
  country: string;
}
interface StadisticsReportOptions {
  topCountruies: TopCountries[];
}

export const getStadistics = async (
  options: StadisticsReportOptions,
): Promise<TDocumentDefinitions> => {
  const [donutChart, lineChart] = await Promise.all([
    generateDoughnutChart({
      entries: options.topCountruies.map((item) => ({
        label: item.country,
        value: item.customers,
      })),
      position: 'left',
    }),
    generatetLineChart(),
  ]);
  return {
    header: headerSection({
      title: 'Estadísticas',
      subTitle: 'Gráficos y estadísticas de la tienda',
    }),
    pageMargins: [40, 80],
    content: [
      {
        columns: [
          {
            width: '*',
            stack: [
              {
                text: 'Top 10 de países con más clientes',
                alignment: 'center',
                style: {
                  fontSize: 10,
                },
                marginBottom: 10,
              },
              {
                image: donutChart,
                width: 300,
                alignment: 'center',
              },
            ],
          },
          {
            width: 'auto',
            layout: 'lightHorizontalLines',
            table: {
              headerRows: 1,
              widths: ['*', 'auto'],
              body: [
                ['Country', 'Customers'],
                ...options.topCountruies.map((item) => [
                  item.country,
                  item.customers,
                ]),
              ],
            },
          },
        ],
      },
      {
        image: lineChart,
        width: 500,
      },
    ],
  };
};
