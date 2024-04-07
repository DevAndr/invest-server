import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Public } from 'src/decorators';
import { CreatePostInput, LikePostInput } from 'src/graphql/graphql';
import { PostService } from './post.service';

@Resolver('Post')
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query('posts')
  async posts() {
    return this.postService.findAll();
  }

  @Query('likedPosts')
  async getLikedPosts() {
  return this.postService.findLikedPosts('75de9eb6-530b-476f-babc-3acbd8c0e03d');
  }


   // @Public()
   @Mutation('createPost')
   async createPost(@Args('data') data: CreatePostInput) {
    const authorId = '75de9eb6-530b-476f-babc-3acbd8c0e03d';
     return this.postService.create(data, authorId);
   }

   @Public()
   @Mutation('likePost')
   async likePost(@Args('data') data: LikePostInput) {
     return this.postService.setLikePost(data, '75de9eb6-530b-476f-babc-3acbd8c0e03d');
   }
}
