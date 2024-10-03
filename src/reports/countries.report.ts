import { TableCell, TDocumentDefinitions } from 'pdfmake/interfaces';
import { footerSection, headerSection } from './sections';
import { countries as Country } from '@prisma/client';
interface RecordOptions {
  title?: string;
  subTitle?: string;
  countries: Country[];
}

export const getCountryReport = (
  options: RecordOptions,
): TDocumentDefinitions => {
  const { title, subTitle, countries } = options;

  const headerTable: TableCell[] = [
    { text: 'ID', bold: true },
    { text: 'ISO2', bold: true },
    { text: 'ISO3', bold: true },
    { text: 'NAME', bold: true },
    { text: 'CONTINENT', bold: true },
    { text: 'LOCAL NAME', bold: true },
  ];

  const countriesContent: TableCell[][] = countries.map((country) => [
    country.id.toString(),
    country.iso2,
    country.iso3,
    { text: country.name, bold: true },
    country.continent,
    country.local_name,
  ]);

  return {
    pageOrientation: 'landscape',
    header: headerSection({
      title: title ?? 'Country Report',
      subTitle: subTitle ?? 'List of countries',
    }),
    pageMargins: [40, 100],
    content: [
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: [50, 50, 50, '*', '*', '*'],
          body: [headerTable, ...countriesContent],
        },
      },
    ],
    footer: footerSection,
  };
};
