import { Injectable } from '@nestjs/common';
import fs from 'fs';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { getHtmlContent } from 'src/helpers/html-to-pdfmake';
import { PrinterService } from 'src/printer/printer.service';
import { headerSection } from 'src/reports/sections';

@Injectable()
export class ExtraReportsService {
  constructor(private readonly printerService: PrinterService) {}
  async getBasicReports() {
    const html = fs.readFileSync('src/reports/html/basic-report.html', 'utf8');
    const content = getHtmlContent(html);
    const docDefinition: TDocumentDefinitions = {
      header: headerSection({}),
      content: content,
    };
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }
}
