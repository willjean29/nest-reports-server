import { Injectable } from '@nestjs/common';
import { PrinterService } from 'src/printer/printer.service';
import { getHelloWordReport } from 'src/reports';

@Injectable()
export class ExtraReportsService {
  constructor(private readonly printerService: PrinterService) {}
  async getBasicReports() {
    const doc = this.printerService.createPdf(
      getHelloWordReport({ name: 'Jean' }),
    );
    return doc;
  }
}
