import { Content } from 'pdfmake/interfaces';

export const footerSection = (
  currentPage: number,
  pageCount: number,
): Content => {
  return {
    text: `Página ${currentPage} de ${pageCount}`,
    alignment: 'right',
    bold: true,
    margin: [0, 40, 20, 0],
  };
};
