import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AnalyzeCryptoInvestment, CreateCryptoInvestment, UpdateCryptoInvestment } from '../graphql/graphql';
import { calcTimeToInvest } from '../math/AnalyzeService';
import { AnalyzeResultInvest } from '../types';
import { InvestmentStatus } from '@prisma/client';

@Injectable()
export class CryptoInvestService {
  constructor(private readonly prismaService: PrismaService) {
  }

  async addCoin(symbol: string) {
    const coin = await this.prismaService.coin.findFirst({ where: { symbol } });
    return coin ? coin : this.prismaService.coin.create({ data: { symbol } });
  }

  async getCryptoInvestment(id: string) {
    return this.prismaService.cryptoInvestment.findUnique({ where: { id } });
  }

  async createCryptoInvestment(data: CreateCryptoInvestment) {
    const foundCoin = await this.prismaService.coin.findFirst({ where: { symbol: data.symbol } });

    if (foundCoin) {
      return this.prismaService.cryptoInvestment.create({
        data: { ...data, currentAmount: 0, coinId: foundCoin.id, profit: -data.amountInvest },
      });
    }
  }

  async updateCryptoInvestment(data: UpdateCryptoInvestment, investmentId: string) {
    const profit = data.currentAmount - data.amountInvest;
    return this.prismaService.cryptoInvestment.update({
      where: { id: investmentId }, data: { ...data, profit },
    });
  }

  async closeCryptoInvestment(status: InvestmentStatus, investmentId: string) {
    return this.prismaService.cryptoInvestment.update({
      where: { id: investmentId }, data: { status: status },
    });
  }

  async deleteCryptoInvestment(id: string) {
    return this.prismaService.cryptoInvestment.delete({ where: { id } });
  }

  async getAllCryptoInvestments() {
    return this.prismaService.cryptoInvestment.findMany();
  }

  async getAnalyzeAllCryptoInvestments() {
    const all = await this.prismaService.cryptoInvestment.findMany();
    const allAnalyzed: AnalyzeResultInvest[] = all.map(invest => {
      const analytics =
        calcTimeToInvest(invest.orderDate,
          invest.amountInvest,
          invest.currentAmount, invest.goal);
      const percentProfit = Math.ceil(invest.currentAmount / invest.amountInvest * 100);

      return {
        investment: invest,
        ...analytics, forecastToGoal: analytics.comment, percentProfit,
      };
    });

    return allAnalyzed;
  }

  async getProfitCryptoInvestments() {
    return this.prismaService.cryptoInvestment.findMany({ where: { profit: { gt: 0 } } });
  }

  async getLossCryptoInvestments() {
    return this.prismaService.cryptoInvestment.findMany({ where: { profit: { lt: 0 } } });
  }

  async analyzeCryptoInvestment(idInvestment: string): Promise<AnalyzeResultInvest> {
    const investment = await
      this.prismaService.cryptoInvestment.findUnique({ where: { id: idInvestment } });
    const analytics =
      calcTimeToInvest(investment.orderDate, investment.amountInvest,
        investment.currentAmount, investment.goal);
    const percentProfit = Math.ceil(investment.currentAmount / investment.amountInvest * 100);

    return {
      investment,
      ...analytics, forecastToGoal: analytics.comment, percentProfit,
    };
  }
}
