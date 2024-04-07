import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TagService } from './tag.service';
import { Public } from 'src/decorators';

@Resolver()
export class TagResolver {
    constructor(private readonly tagService: TagService) {}

    @Query('allTags')
    async allTags() {
        return await this.tagService.findAll();
    }

    @Query('tag')
    async tag(@Args('id') id: string) {
        return await this.tagService.findOne(id);
    }

    @Public()
    @Mutation('findOrCreateTag')
    async findOrCreateTag(@Args('value') value: string) {
        return await this.tagService.findOrCreate(value);
    }

    @Public()
    @Mutation('findPartialTags')
    async findPartial(@Args('value') value: string) {
        return await this.tagService.findPartial(value);
    }

    @Public()
    @Mutation('createTag')
    async createTag(@Args('value') value: string) {
        return await this.tagService.create(value);
    }

    @Mutation('deleteTag')
    async deleteTag(@Args('id') id: string) {
        return await this.tagService.delete(id);
    }
}
