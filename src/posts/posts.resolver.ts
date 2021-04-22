import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { User } from 'src/users/entities/users.entity';
import { CreatePostInput } from './dtos/create-post.dto';
import { Post } from './entities/posts.entity';
import { PostTag } from './entities/postTags.entity';
import { PostsService } from './posts.service';

@Resolver()
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => [Post])
  async getPosts() {
    return await this.postsService.getPosts();
  }
  @Query(() => [PostTag])
  async getPostTags(@Args('id') postId: number) {
    return await this.postsService.getPostTags(postId);
  }

  @Query(() => [Post])
  async getPostByUserId(@Args('id') userId: number) {
    return await this.postsService.getPostByUserId(userId);
  }

  @Mutation(() => Post)
  @UseGuards(AuthGuard)
  async createPost(
    @AuthUser() authUser: User,
    @Args('post') post: CreatePostInput,
  ) {
    return await this.postsService.createPost(authUser, post);
  }

  @Mutation(() => [Post])
  @UseGuards(AuthGuard)
  async deletePost(@AuthUser() authUser: User, @Args('id') postId: number) {
    return await this.postsService.deletePost(authUser, postId);
  }
}
