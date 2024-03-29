import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Public } from 'src/decorators';
import { CreatePostInput } from 'src/graphql/graphql';
import { PostService } from './post.service';

@Resolver('Post')
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Public()
  @Mutation('createPost')
  async createPost(@Args('data') data: CreatePostInput) {
    return this.postService.create(data);
  }

  @Public()
  @Query('posts')
  async posts() {
    return this.postService.findAll();
  }
}
