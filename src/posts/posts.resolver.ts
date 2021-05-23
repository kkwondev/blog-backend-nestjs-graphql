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
  async getPosts(@Args('lastId') lastId: number) {
    return await this.postsService.getPosts(lastId);
  }
  @Query(() => PostOutput)
  async getPost(@Args('id') id: number) {
    return await this.postsService.getPost(id);
  }

  @Query(() => [PostTag])
  async getPostTags(@Args('id') postId: number) {
    return await this.postsService.getPostTags(postId);
  }

  @Query(() => [Post])
  async getPostByUserId(@Args('id') userId: number) {
    return await this.postsService.getPostByUserId(userId);
  }

  @Mutation(() => CreatePostOutput)
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
  async deletePost(
    @AuthUser() authUser: User,
    @Args('postId') deletePostInput: DeletePostInput,
  ) {
    return await this.postsService.deletePost(authUser, deletePostInput);
  }

  @Query(() => [Post])
  async getCategoryPost(@Args('id') categoryId: number) {
    return await this.postsService.getCategoryPost(categoryId);
  }
}
