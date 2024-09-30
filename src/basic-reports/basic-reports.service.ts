import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import { getHelloWordReport } from 'src/reports';
import { getEmployeeLetterReport } from '../reports/employee-letter.report';

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

  async getEmployeeLetter() {
    const doc = this.printerService.createPdf(getEmployeeLetterReport());
    return doc;
  }

  async getEmployeeLetterById(id: number) {
    const employee = await this.employees.findUnique({
      where: { id },
    });
    if (!employee) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }
    console.log({ employee });
    const doc = this.printerService.createPdf(getEmployeeLetterReport());
    return doc;
  }
}
