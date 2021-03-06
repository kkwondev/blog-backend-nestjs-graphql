import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { User } from 'src/users/entities/users.entity';
import {
  CreatePostInput,
  CreatePostOutput,
} from './interfaces/create-post.dto';
import { Post } from './entities/posts.entity';
import { PostTag } from './entities/postTags.entity';
import { PostsService } from './posts.service';
import {
  DeletePostInput,
  DeletePostOutput,
} from './interfaces/delete-post.dto';
import { PostOutput } from './interfaces/post.dto';
import {
  UpdatePostInput,
  UpdatePostOutput,
} from './interfaces/update-post.dto';
import { PostsOutput } from './interfaces/posts.dto';

@Resolver()
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => PostsOutput)
  async getPosts(@Args('lastId', { nullable: true }) lastId: number) {
    return await this.postsService.getPosts(lastId);
  }
  // @Query(() => PostOutput)
  // async getPost(@Args('id') id: number) {
  //   return await this.postsService.getPost(id);
  // }

  @Query(() => PostOutput)
  async readPost(@Args('url_slug') url_slug: string) {
    return await this.postsService.getPost(url_slug);
  }

  @Query(() => [PostTag])
  async getPostTags(@Args('id') postId: number) {
    return await this.postsService.getPostTags(postId);
  }

  @Query(() => [Post])
  async getPostByUserId(@Args('id') userId: number) {
    return await this.postsService.getPostByUserId(userId);
  }

  @Query(() => PostsOutput)
  async searchPost(@Args('keyword') keyword: string) {
    return await this.postsService.searchPost(keyword);
  }

  @Mutation(() => PostOutput)
  @UseGuards(AuthGuard)
  async createPost(
    @AuthUser() authUser: User,
    @Args('post') post: CreatePostInput,
  ) {
    return await this.postsService.createPost(authUser, post);
  }

  @Mutation(() => UpdatePostOutput)
  @UseGuards(AuthGuard)
  async updatePost(
    @AuthUser() authUser: User,
    @Args('id') id: number,
    @Args('post') post: UpdatePostInput,
  ) {
    return await this.postsService.updatePost(authUser, id, post);
  }

  @Mutation(() => DeletePostOutput)
  @UseGuards(AuthGuard)
  async deletePost(@AuthUser() authUser: User, @Args('postId') id: number) {
    return await this.postsService.deletePost(authUser, id);
  }

  @Query(() => PostsOutput)
  async getCategoryPost(
    @Args('name') name: string,
    @Args('lastId', { nullable: true }) lastId: number,
  ) {
    return await this.postsService.getCategoryPost(name, lastId);
  }

  @Query(() => PostsOutput)
  async getTagPost(@Args('name') name: string) {
    return await this.postsService.getTagPost(name);
  }
}
