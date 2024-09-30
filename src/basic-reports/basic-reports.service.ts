import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  onModuleInit() {
    this.$connect();
  }
  async getBasicReports() {
    return { message: 'Hello from BasicReportsService!' };
  }
}
