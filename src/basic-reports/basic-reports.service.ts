import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import {
  getCountryReport,
  getEmployeeLetterReport,
  getEmployeeLetterReportById,
  getHelloWordReport,
} from 'src/reports';

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
    const doc = this.printerService.createPdf(
      getEmployeeLetterReportById({
        employerName: 'Jean',
        employerPosition: 'Software Engineer',
        companyName: "Jean's Company",
        employeeName: employee.name,
        employeePosition: employee.position,
        startDate: employee.start_date,
        weeklyHours: employee.hours_per_day,
        workSchedule: employee.work_schedule,
      }),
    );
    return doc;
  }

  async getCountries() {
    const countries = await this.countries.findMany({
      where: {
        local_name: {
          not: null,
        },
      },
    });
    const doc = this.printerService.createPdf(getCountryReport({ countries }));
    return doc;
  }
}
