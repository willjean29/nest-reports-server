import axios from 'axios';

interface ChartOptions {
  with?: number;
  height?: number;
}
export const chartJsToImage = async (
  chartConfig: unknown,
  options: ChartOptions,
) => {
  const params = new URLSearchParams();
  if (options.with) params.append('width', options.with.toString());
  if (options.height) params.append('height', options.height.toString());
  const encondedUri = encodeURIComponent(JSON.stringify(chartConfig));
  const chartUri = `https://quickchart.io/chart?c=${encondedUri}&${params.toString()}`;
  const response = await axios.get(chartUri, { responseType: 'arraybuffer' });
  return `data:image/png;base64,${Buffer.from(response.data).toString('base64')}`;
};
