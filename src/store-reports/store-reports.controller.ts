import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { StoreReportsService } from './store-reports.service';
import { Response } from 'express';

@Controller('store-reports')
export class StoreReportsController {
  constructor(private readonly storeReportsService: StoreReportsService) {}

  @Get('orders/:orderId')
  async getStoreOrderReport(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Res() res: Response,
  ) {
    const pdfDoc = await this.storeReportsService.getStoreOrderReport(orderId);
    res.setHeader('Content-Type', 'application/pdf');
    pdfDoc.pipe(res);
    pdfDoc.end();
  }

  @Get('svg-charts')
  async getSvgCharts(@Res() res: Response) {
    const pdfDoc = await this.storeReportsService.getSvgCharts();
    res.setHeader('Content-Type', 'application/pdf');
    pdfDoc.pipe(res);
    pdfDoc.end();
  }
}
