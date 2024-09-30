import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
const fontDescriptors = {
  Roboto: {
    normal: 'fonts/Roboto/Roboto-Regular.ttf',
    bold: 'fonts/Roboto/Roboto-Medium.ttf',
    italics: 'fonts/Roboto/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto/Roboto-MediumItalic.ttf',
  },
};
@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  onModuleInit() {
    this.$connect();
  }
  async getBasicReports() {
    const printer = new PdfPrinter(fontDescriptors);
    const docDefinition: TDocumentDefinitions = {
      content: ['Hello world!'],
    };
    const doc = printer.createPdfKitDocument(docDefinition);
    return doc;
  }
}
