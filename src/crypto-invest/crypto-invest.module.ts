import { Module } from '@nestjs/common';
import { CryptoInvestService } from './crypto-invest.service';
import { CryptoInvestResolver } from './crypto-invest.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [CryptoInvestService, CryptoInvestResolver, PrismaService]
})
export class CryptoInvestModule {}
