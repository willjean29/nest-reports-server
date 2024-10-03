import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { Response } from 'express';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}
  @Get()
  async getBasicReports(@Res() res: Response) {
    const pdfDoc = await this.basicReportsService.getBasicReports();
    res.setHeader('Content-Type', 'application/pdf');
    pdfDoc.pipe(res);
    pdfDoc.end();
  }

  @Get('employee-letter')
  async getEmployeeLetter(@Res() res: Response) {
    const pdfDoc = await this.basicReportsService.getEmployeeLetter();
    res.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Employee Letter';
    pdfDoc.pipe(res);
    pdfDoc.end();
  }

  @Get('employee-letter/:id')
  async getEmployeeLetterById(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const pdfDoc = await this.basicReportsService.getEmployeeLetterById(id);
    res.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Employee Letter';
    pdfDoc.pipe(res);
    pdfDoc.end();
  }

  @Get('countries')
  async getCountries(@Res() res: Response) {
    const pdfDoc = await this.basicReportsService.getCountries();
    res.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Countries Report';
    pdfDoc.pipe(res);
    pdfDoc.end();
  }
}
