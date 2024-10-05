import { Module } from '@nestjs/common';
import { StoreReportsService } from './store-reports.service';
import { StoreReportsController } from './store-reports.controller';
import { PrinterService } from 'src/printer/printer.service';

@Module({
  controllers: [StoreReportsController],
  providers: [StoreReportsService, PrinterService],
})
export class StoreReportsModule {}
