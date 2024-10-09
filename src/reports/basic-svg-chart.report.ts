import { TDocumentDefinitions } from 'pdfmake/interfaces';
import fs from 'fs';
const svgContent = fs.readFileSync('assets/ford.svg', 'utf8');

export const getBasicSvgChart = (): TDocumentDefinitions => {
  return {
    content: [
      {
        svg: svgContent,
        width: 100,
        fit: [100, 100],
      },
    ],
  };
};
