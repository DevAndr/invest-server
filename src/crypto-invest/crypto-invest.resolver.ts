
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CryptoInvestService } from './crypto-invest.service';
import { CreateCryptoInvestInput } from 'src/graphql/graphql';
import { InvestmentStatus } from '@prisma/client';
import { Public } from 'src/decorators';

@Public()
@Resolver()
export class CryptoInvestResolver {
    constructor(private readonly cryptoInvestService: CryptoInvestService) {}

 @Query('getAllCryptoInvestments')
  async getAllCryptoInvestments() {
      return this.cryptoInvestService.getAllCryptoInvestments();
  }

  @Query('getAnalyzeAllCryptoInvestments')
  async getAnalyzeAllCryptoInvestments() {
    return this.cryptoInvestService.getAnalyzeAllCryptoInvestments();
  }

  @Query('getProfitCryptoInvestments')
  async getProfitCryptoInvestments() {
    return this.cryptoInvestService.getProfitCryptoInvestments();
  }

  @Query('getLossCryptoInvestments')
  async getLossCryptoInvestments() {
    return this.cryptoInvestService.getLossCryptoInvestments();
  }

  @Mutation('addCoin')
  async addCoin(@Args('symbol') symbol: string) {
    return this.cryptoInvestService.addCoin(symbol);
  }

  @Mutation('createCryptoInvestment')
  async createCryptoInvestment(@Args('data') data: CreateCryptoInvestInput) {
    return this.cryptoInvestService.createCryptoInvestment(data);
  }

  @Mutation('updateCryptoInvestment')
  async updateCryptoInvestment(@Args('data') data: CreateCryptoInvestInput, @Args('idInvest') id: string) {
    return this.cryptoInvestService.updateCryptoInvestment(data, id);
  }

  @Mutation('closeCryptoInvestment')
  async closeCryptoInvestment(@Args('status') status: InvestmentStatus, @Args('idInvest') id: string) {
    return this.cryptoInvestService.closeCryptoInvestment(status, id);
  }

  @Mutation('deleteCryptoInvestment')
  async deleteCryptoInvestment(@Args('idInvest') id: string) {
    return this.cryptoInvestService.deleteCryptoInvestment(id);
  }

  @Mutation('analyzeCryptoInvestment')
  async analyzeCryptoInvestment(@Args('idInvest') id: string) {
    return this.cryptoInvestService.analyzeCryptoInvestment(id);
  }
}
