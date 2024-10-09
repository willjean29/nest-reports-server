import {
  chartJsToImage,
  NAMED_COLORS,
  numbers,
  transparentize,
} from 'src/helpers';

export const generatetLineChart = async (): Promise<string> => {
  const data = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'],
    datasets: [
      {
        label: 'Movimiento de inventario',
        data: numbers({ count: 6, min: -100, max: 100 }),
        borderColor: NAMED_COLORS.blue,
        backgroundColor: transparentize(NAMED_COLORS.blue, 0.5),
        pointStyle: 'circle',
        pointRadius: 5,
      },
    ],
  };

  const config = {
    type: 'line',
    data: data,
  };

  return chartJsToImage(config, { width: 500, height: 200 });
};
