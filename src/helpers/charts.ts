import axios from 'axios';

export const chartJsToImage = async (chartConfig: unknown) => {
  const encondedUri = encodeURIComponent(JSON.stringify(chartConfig));
  const chartUri = `https://quickchart.io/chart?c=${encondedUri}`;
  const response = await axios.get(chartUri, { responseType: 'arraybuffer' });
  return `data:image/png;base64,${Buffer.from(response.data).toString('base64')}`;
};
