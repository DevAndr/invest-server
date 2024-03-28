import { Module } from '@nestjs/common';
import { InvestmentResolver } from './investment.resolver';
import { InvestmentService } from './investment.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';

@Module({
  providers: [InvestmentResolver, InvestmentService, PrismaService, UserService]
})
export class InvestmentModule {}
