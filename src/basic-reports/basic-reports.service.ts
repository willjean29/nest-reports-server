import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import { getHelloWordReport } from 'src/reports';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  onModuleInit() {
    this.$connect();
  }
  constructor(private readonly printerService: PrinterService) {
    super();
  }
  async getBasicReports() {
    const doc = this.printerService.createPdf(
      getHelloWordReport({ name: 'Jean' }),
    );
    return doc;
  }
}
