import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  AnalyzeCryptoInvestment,
  CreateCryptoInvestInput,
  UpdateCryptoInvestInput,
} from '../graphql/graphql';
import { calcTimeToInvest } from '../math/AnalyzeService';
import { AnalyzeResultInvest } from '../types';
import { InvestmentStatus } from '@prisma/client';
import { DateTime } from 'luxon';
import e from 'express';

@Injectable()
export class CryptoInvestService {
  constructor(private readonly prismaService: PrismaService) {}

  async addCoin(symbol: string) {
    const coin = await this.prismaService.coin.findFirst({ where: { symbol } });
    return coin ? coin : this.prismaService.coin.create({ data: { symbol } });
  }

  async getCryptoInvestment(idInvest: string) {
    return this.prismaService.cryptoInvestment.findUnique({ where: { id: idInvest } });
  }

  async createCryptoInvestment(data: CreateCryptoInvestInput) {
    const { symbol, ...otherData } = data; 
    const foundCoin = await this.prismaService.coin.findFirst({
      where: { symbol: data.symbol },
    });

    const orderDate = new Date(data.orderDate);

    if (foundCoin) { 
      return this.prismaService.cryptoInvestment.create({
        data: {
          ...otherData,
          orderDate,
          currentAmount: 0,  
          profit: -data.amountInvest,
          coinId: foundCoin.id,
        }, include: { coin: true },
      });
    } else {
      console.log("createCryptoInvestment - symbol: ", symbol); 
      return this.prismaService.cryptoInvestment.create({ data: {    ...otherData,
        orderDate,
        currentAmount: 0,  
        profit: -data.amountInvest,    
        coin: {create: {symbol: data.symbol}}
      }, include: { coin: true }});
    }
  }

  async updateCryptoInvestment(
    data: UpdateCryptoInvestInput,
    idInvest: string,
  ) {
    const foundInvest = await this.prismaService.cryptoInvestment.findUnique({
      where: { id: idInvest },
    }) 

    let profit = 0;

    if(data?.amountInvest !== null && data?.amountInvest !== undefined) {
      if(data.currentAmount !== null && data.currentAmount !== undefined){
        profit = data.currentAmount - data.amountInvest;
      }
      else {
        profit = foundInvest && foundInvest.currentAmount ? foundInvest.currentAmount - data.amountInvest : 0
      }      
    } else {
      if(data.currentAmount !== null && data.currentAmount !== undefined) {
        if (foundInvest) {      
          profit = data.currentAmount - foundInvest.amountInvest
        }
      }
    }
    
    return this.prismaService.cryptoInvestment.update({
      where: { id: idInvest },
      data: { ...data, profit: profit || 0, }, include: { coin: true },
    });
  }

  async closeCryptoInvestment(status: InvestmentStatus, idInvest: string) {
    return this.prismaService.cryptoInvestment.update({
      where: { id: idInvest },
      data: { status: status },
    });
  }

  async deleteCryptoInvestment(idInvest: string) {
    return this.prismaService.cryptoInvestment.delete({ where: { id: idInvest } });
  }

  async getAllCryptoInvestments() {
    return this.prismaService.cryptoInvestment.findMany({include: {coin: true}});
  }

  async getAnalyzeAllCryptoInvestments() {
    const all = await this.prismaService.cryptoInvestment.findMany();
    const allAnalyzed: AnalyzeResultInvest[] = all.map((invest) => {
      const analytics = calcTimeToInvest(
        invest.orderDate,
        invest.amountInvest,
        invest.currentAmount,
        invest.goal,
      );
      const percentProfit = Math.ceil(
        (invest.currentAmount / invest.amountInvest) * 100,
      );

      return {
        investment: invest,
        ...analytics,
        forecastToGoal: analytics.comment,
        percentProfit,
      };
    });

    return allAnalyzed;
  }

  async getProfitCryptoInvestments() {
    return this.prismaService.cryptoInvestment.findMany({
      where: { profit: { gt: 0 } },
    });
  }

  async getLossCryptoInvestments() {
    return this.prismaService.cryptoInvestment.findMany({
      where: { profit: { lt: 0 } },
    });
  }

  async analyzeCryptoInvestment(
    idInvest: string,
  ): Promise<AnalyzeResultInvest> {
    console.log("analyzeCryptoInvestment - idInvest: ", idInvest);
    
    const investment = await this.prismaService.cryptoInvestment.findUnique({
      where: { id: idInvest }, include: { coin: true },
    });

    console.log({ investment });
    

    const analytics = calcTimeToInvest(
      investment.orderDate,
      investment.amountInvest,
      investment.currentAmount,
      investment.goal,
    );
    const percentProfit = Math.ceil(
      (investment.currentAmount / investment.amountInvest) * 100,
    );

    return {
      investment,
      ...analytics,
      forecastToGoal: analytics.comment,
      percentProfit,
    };
  }
}
