import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TagService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.tag.findMany();
  }

  async findOne(id: string) {
    return await this.prismaService.tag.findUnique({ where: { id } });
  }

  async findPartial(value: string) {
    return await this.prismaService.tag.findMany({
      orderBy: { value: 'asc' },
      where: {
        value: {
          contains: value,
          mode: 'insensitive'
        },
      },
    });
  }

  async findOrCreate(value: string) {
    const tags = await this.findPartial(value);
    console.log("tags: ", tags.length);
    
    if (tags && tags.length > 0) {
      return tags[0];
    }
    return await this.create(value);
  }

  async create(value: string) {
    return await this.prismaService.tag.create({ data: { value } });
  }

  async delete(id: string) {
    return await this.prismaService.tag.delete({ where: { id } });
  }
}
