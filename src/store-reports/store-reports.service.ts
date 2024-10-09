import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import { CompleteOrder, getBasicSvgChart, orderByIdReport } from 'src/reports';

@Injectable()
export class StoreReportsService extends PrismaClient implements OnModuleInit {
  constructor(private readonly printerService: PrinterService) {
    super();
  }
  onModuleInit() {
    this.$connect();
  }

  async getStoreOrderReport(orderId: number) {
    const order = await this.orders.findUnique({
      where: {
        order_id: orderId,
      },
      include: {
        customers: true,
        order_details: {
          include: {
            products: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${orderId} not found`);
    }
    const doc = this.printerService.createPdf(
      orderByIdReport({
        data: order as any as CompleteOrder,
      }),
    );
    return doc;
  }

  async getSvgCharts() {
    const doc = this.printerService.createPdf(getBasicSvgChart());
    return doc;
  }
}
