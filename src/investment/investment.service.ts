import { Injectable } from '@nestjs/common';
import { CreateCommentInput, CreateInvestmentInput, UpdateInvestmentInput } from 'src/graphql/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';

@Injectable()
export class InvestmentService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {
  }

  async create(data: CreateInvestmentInput, userId: string) {
    return this.prismaService.investment.create({
      data: {
        ...data,
        description: data?.description || '',
        user: { connect: { id: userId } },
      },
    });
  }

  async createComment(data: CreateCommentInput, userId: string) {
    const { investmentId
      , ...rest } = data;
    return this.prismaService.comment.create({
      data: {
        ...rest,
        investment: { connect: { id: investmentId } },
        author: { connect: { id: userId } },
      },
    });
  }

  async getInvests() {
    return this.prismaService.investment.findMany();
  }

  async getInvest(investID: string) {
    return this.prismaService.investment.findUnique({ where: { id: investID } });
  }

  async getCommentsByInvest(investID: string) {
    return this.prismaService.comment.findMany({ where: { investmentId: investID } });
  }

  async addCommentToInvest(data: CreateCommentInput, userId: string) {
    return this.prismaService.investment.update({
      where: { id: data.investmentId },
      data: {
        comments: {
          create: {
            text: data.text,
            author: { connect: { id: userId } },
          },
        },
      },
    });
  }

  async update(data: UpdateInvestmentInput, userId: string) {
    return this.prismaService.investment.update({
      where: { id: data.id, userId },
      data: {
        ...data,
      },
    });
  }
}
