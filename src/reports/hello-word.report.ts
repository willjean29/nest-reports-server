import { TDocumentDefinitions } from 'pdfmake/interfaces';

interface ReportOptions {
  name: string;
}
export const getHelloWordReport = (options: ReportOptions) => {
  const { name } = options;
  const docDefinition: TDocumentDefinitions = {
    content: [`Hello ${name}`],
  };
  return docDefinition;
};
