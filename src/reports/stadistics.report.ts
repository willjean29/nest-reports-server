import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections';
import { CHART_COLORS, chartJsToImage } from 'src/helpers';
export interface TopCountries {
  customers: number;
  country: string;
}
interface StadisticsReportOptions {
  topCountruies: TopCountries[];
}

const generateTopCountriesChart = async (
  topCountries: TopCountries[],
): Promise<string> => {
  const data = {
    labels: topCountries.map((item) => item.country),
    datasets: [
      {
        label: 'My First Dataset',
        data: topCountries.map((item) => item.customers),
        backgroundColor: CHART_COLORS,
        hoverOffset: 4,
      },
    ],
  };
  const config = {
    type: 'doughnut',
    data: data,
    options: {
      legend: {
        position: 'left',
      },
      plugins: {
        datalabels: {
          color: 'white',
          font: {
            weight: 'bold',
            size: 16,
          },
        },
      },
    },
  };

  return chartJsToImage(config);
};

export const getStadistics = async (
  options: StadisticsReportOptions,
): Promise<TDocumentDefinitions> => {
  const data = await generateTopCountriesChart(options.topCountruies);
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
                image: data,
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
    ],
  };
};
