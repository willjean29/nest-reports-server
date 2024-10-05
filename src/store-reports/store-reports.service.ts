import { Injectable } from '@nestjs/common';
import { PrinterService } from 'src/printer/printer.service';
import { orderByIdReport } from 'src/reports';

@Injectable()
export class StoreReportsService {
  constructor(private readonly printerService: PrinterService) {}
  async getStoreOrderReport(orderId: number) {
    console.log({ orderId });
    const doc = this.printerService.createPdf(orderByIdReport());
    return doc;
  }
}
