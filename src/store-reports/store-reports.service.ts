import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import {
  CompleteOrder,
  getBasicSvgChart,
  getStadistics,
  orderByIdReport,
} from 'src/reports';

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
    const content = await getBasicSvgChart();
    const doc = this.printerService.createPdf(content);
    return doc;
  }

  async getStadistics() {
    const topCountries = await this.customers.groupBy({
      by: ['country'],
      _count: true,
      orderBy: {
        _count: {
          country: 'desc',
        },
      },
      take: 10,
    });
    console.log({ topCountries });
    const data = topCountries.map((item) => ({
      customers: item._count,
      country: item.country,
    }));
    const contentDoc = await getStadistics({ topCountruies: data });
    const doc = this.printerService.createPdf(contentDoc);
    return doc;
  }
}
