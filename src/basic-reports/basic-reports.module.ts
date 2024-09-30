import { Module } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { BasicReportsController } from './basic-reports.controller';
import { PrinterService } from 'src/printer/printer.service';

@Module({
  controllers: [BasicReportsController],
  providers: [BasicReportsService, PrinterService],
})
export class BasicReportsModule {}
