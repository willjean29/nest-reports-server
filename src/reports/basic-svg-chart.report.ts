import { TDocumentDefinitions } from 'pdfmake/interfaces';
import fs from 'fs';
import { chartJsToImage, months } from 'src/helpers';
const svgContent = fs.readFileSync('assets/ford.svg', 'utf8');

const generateChartImage = async (): Promise<string> => {
  const chartConfig = {
    type: 'bar', // Show a bar chart
    data: {
      labels: months({ count: 7 }), // Set X-axis labels
      datasets: [
        {
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
          ],
          borderWidth: 1,
        },
      ],
    },
  };
  return chartJsToImage(chartConfig, {});
};

const generateDounutChartImage = async (): Promise<string> => {
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

export const getBasicSvgChart = async (): Promise<TDocumentDefinitions> => {
  const chartContent = await generateChartImage();
  const dounatChartContent = await generateDounutChartImage();
  return {
    content: [
      {
        svg: svgContent,
        width: 100,
        fit: [100, 100],
      },
      {
        image: chartContent,
        width: 500,
      },
      {
        image: dounatChartContent,
        width: 500,
      },
    ],
  };
};
