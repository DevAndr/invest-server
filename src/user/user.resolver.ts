import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UpdateDataUserInput } from 'src/graphql/graphql';
import { Public } from 'src/decorators/public.decorator';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query('user')
  findOne(@Args('id') id: string) {
    return this.userService.findOne(id);
  }

  @Mutation('update')
  async update(uid: string, @Args('data') data: UpdateDataUserInput) {
    return this.userService.update(uid, data);
  }

  @Mutation('removeUser')
  remove(@Args('id') id: string) {
    return this.userService.remove(id);
  }

  @Public()
  @Query('test')
  test() {
    return 'test';
  }
}
