import { Injectable } from '@nestjs/common';
import { SigInInputDto } from 'src/auth/dto/sig-in.input';
import { UpdateDataUserInput } from '../graphql/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateEmailDto } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Omit<CreateUserInput, 'password'>) {
    return this.prismaService.user.create({
      data: { ...data },
    });
  }

  async findOne(id: string) {
    this.prismaService.user.findUnique({ where: { id } });
  }

  async findAll() {
    return this.prismaService.user.findMany();
  }

  async update(id: string, data: UpdateDataUserInput) {
    return this.prismaService.user.update({
      where: { id },
      data,
    });
  }

  async checkUser(data: SigInInputDto) {
    const foundUser = await this.prismaService.user.findFirst({
      where: {
        email: data.email,
        username: data.username,
      },
    });
    return !!foundUser;
  }

  async findByUsername(username: string) {
    return this.prismaService.user.findFirst({ where: { username } });
  }

  async updateEmail(data: UpdateEmailDto) {
    return this.prismaService.user.update({
      where: {
        id: data.id,
      },
      data: {
        email: data.email,
      },
    });
  }

  async remove(id: string) {
    return this.prismaService.user.delete({ where: { id } });
  }
}
