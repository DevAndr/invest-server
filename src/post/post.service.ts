import { Injectable } from '@nestjs/common';
import { CreatePostInput, LikePostInput } from 'src/graphql/graphql';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreatePostInput, authorId: string) {
    return this.prismaService.post.create({
      data: {
        ...data,
        authorId: authorId,
      },
    });
  }

  async setLikePost(data: LikePostInput, uid: string) {
    return this.prismaService.profile.update({
      where: { userId: uid },
      data: {
        likedPosts: data.isLiked
          ? { connect: { id: data.id } }
          : { disconnect: { id: data.id } },
      },
    });
  }

  async findLikedPosts(uid: string) {
    return await this.prismaService.post.findMany({
      where: {
        authorId: uid,
        profileUser: {
          some: { userId: uid },
        },
      },
    });
  }

  async findAll() {
    return this.prismaService.post.findMany();
  }

  async deletePost(id: string, uid: string) {
    return this.prismaService.post.delete({ where: { id, authorId: uid } });
  }
}
