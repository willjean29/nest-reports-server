import { CHART_COLORS, chartJsToImage } from 'src/helpers';

interface DoughnutEntry {
  label: string;
  value: number;
}

interface DoughnutOptions {
  entries: DoughnutEntry[];
  position: 'left' | 'right' | 'top' | 'bottom';
}

export const generateDoughnutChart = async (
  options: DoughnutOptions,
): Promise<string> => {
  const { entries, position } = options;
  const data = {
    labels: entries.map((item) => item.label),
    datasets: [
      {
        label: 'My First Dataset',
        data: entries.map((item) => item.value),
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
        position,
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
