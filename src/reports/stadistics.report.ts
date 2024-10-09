import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections';
import { chartJsToImage } from 'src/helpers';
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
    pageMargins: [40, 60],
    content: [
      {
        image: data,
        width: 500,
      },
    ],
  };
};
