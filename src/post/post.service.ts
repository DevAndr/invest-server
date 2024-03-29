import { Injectable } from '@nestjs/common';
import { CreatePostInput } from 'src/graphql/graphql';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreatePostInput) {
    return this.prismaService.post.create({
      data: {
        ...data,
      },
    });
  }

  async findAll() {
    return this.prismaService.post.findMany();
  }
}
