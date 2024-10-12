import { Injectable } from '@nestjs/common';
import fs from 'fs';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { getHtmlContent } from 'src/helpers/html-to-pdfmake';
import { PrinterService } from 'src/printer/printer.service';
import { headerSection } from 'src/reports/sections';
import { footerSection } from '../reports/sections/footer.section';

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
}
