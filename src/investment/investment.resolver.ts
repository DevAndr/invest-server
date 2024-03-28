import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InvestmentService } from './investment.service';
import { CreateCommentInput, CreateInvestmentInput, UpdateInvestmentInput } from '../graphql/graphql';
import { Public } from 'src/decorators';

@Resolver('Investment')
export class InvestmentResolver {
  constructor(private readonly investmentService: InvestmentService) {
  }

  @Query('getInvests')
  async getInvests() {
    return this.investmentService.getInvests();
  }

  @Query('getInvest')
  async getInvest(investID: string) {
    return this.investmentService.getInvest(investID);
  }

  @Query('getCommentsByInvest')
  async getCommentsByInvest(investID: string) {
    return this.investmentService.getCommentsByInvest(investID);
  }

  @Mutation('addCommentToInvest')
  async addCommentToInvest(data: CreateCommentInput, userId: string) {
    return this.investmentService.addCommentToInvest(data, userId);
  }

  @Public()
  @Mutation('createInvest')
  async create(@Args('data') data: CreateInvestmentInput, @Args('userId') userId: string) {
    return this.investmentService.create(data, userId);
  }

  @Mutation('updateInvest')
  async update(data: UpdateInvestmentInput, userId: string) {
    return this.investmentService.update(data, userId);
  }

  @Public()
  @Query('test')
  test() {
    return 'test';
  }
}
