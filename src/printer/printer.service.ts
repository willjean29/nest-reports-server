import { Injectable } from '@nestjs/common';
import PdfPrinter from 'pdfmake';
import { BufferOptions, TDocumentDefinitions } from 'pdfmake/interfaces';
const fontDescriptors = {
  Roboto: {
    normal: 'fonts/Roboto/Roboto-Regular.ttf',
    bold: 'fonts/Roboto/Roboto-Medium.ttf',
    italics: 'fonts/Roboto/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto/Roboto-MediumItalic.ttf',
  },
};
@Injectable()
export class PrinterService {
  private printer = new PdfPrinter(fontDescriptors);

  createPdf(docDefinition: TDocumentDefinitions, options: BufferOptions = {}) {
    return this.printer.createPdfKitDocument(docDefinition, options);
  }
}
