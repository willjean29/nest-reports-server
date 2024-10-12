import { Injectable } from '@nestjs/common';
import fs from 'fs';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { getHtmlContent } from 'src/helpers/html-to-pdfmake';
import { PrinterService } from 'src/printer/printer.service';
import { headerSection } from 'src/reports/sections';
import { footerSection } from '../reports/sections/footer.section';
import { getCommunityReport } from 'src/reports';

@Injectable()
export class ExtraReportsService {
  constructor(private readonly printerService: PrinterService) {}
  async getBasicReports() {
    const html = fs.readFileSync(
      'src/reports/html/basic-report-03.html',
      'utf8',
    );
    const content = getHtmlContent(html, {
      client: 'Jean Osco',
    });
    const docDefinition: TDocumentDefinitions = {
      header: headerSection({
        title: 'Html to pdfmake',
        subTitle: 'Conversión de html a pdfmake',
      }),
      pageMargins: [40, 80],
      content: content,
      footer: footerSection,
    };
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

  getCommunity() {
    const docDefinition = getCommunityReport();

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  getCustomSize() {
    const doc = this.printerService.createPdf({
      // pageSize: 'TABLOID',
      pageSize: {
        width: 150,
        height: 300,
      },
      content: [
        {
          qr: 'https://devtalles.com',
          fit: 100,
          alignment: 'center',
        },
        {
          text: 'Reporte con tamaño',
          fontSize: 10,
          alignment: 'center',
          margin: [0, 20],
        },
      ],
    });

    return doc;
  }
}
