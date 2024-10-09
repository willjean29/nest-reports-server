import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections';
import { chartJsToImage } from 'src/helpers';
export interface TopCountries {
  _count: number;
  country: string;
}
interface StadisticsReportOptions {
  topCountruies: TopCountries[];
}

const generateTopCountriesChart = async (): Promise<string> => {
  const data = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
        ],
        hoverOffset: 4,
      },
    ],
  };
  const config = {
    type: 'doughnut',
    data: data,
  };

  return chartJsToImage(config, {});
};

export const getStadistics = async (
  options: StadisticsReportOptions,
): Promise<TDocumentDefinitions> => {
  console.log({ options });
  const data = await generateTopCountriesChart();
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
