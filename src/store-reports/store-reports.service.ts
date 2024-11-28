import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import { orderByIdReport } from 'src/reports';

@Injectable()
export class StoreReportsService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
        // console.log('Connected to the database');
    }
    constructor(private readonly printerService: PrinterService) {
        super();
    }

    async getOrderByIdReport(orderId: string) {

        const docDefinition = orderByIdReport()

        const doc = this.printerService.createPdf(docDefinition);

        return doc;

    }
}