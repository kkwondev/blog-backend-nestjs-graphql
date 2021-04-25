import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { User } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { CreatePostInput } from './interfaces/create-post.dto';
import { Post } from './entities/posts.entity';
import { PostTag } from './entities/postTags.entity';
import { Tag } from './entities/tags.entity';
import { DeletePostInput } from './interfaces/delete-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
    @InjectRepository(PostTag)
    private readonly posttagsRepository: Repository<PostTag>,
    private readonly categoriesservice: CategoriesService,
  ) {}

  /**
   * 전체 포스토 조회
   * @returns post[]
   */
  async getPosts() {
    const find = await this.postRepository.find();
    return find;
  }

  async createPost(user: User, post: CreatePostInput) {
    const category = await this.categoriesservice.findByName(post.categoryName);
    if (!category) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '존재하지 않는 카테고리입니다.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    try {
      const newPost = this.postRepository.create(post);
      newPost.user = user;
      newPost.category = category;
      const savePost = await this.postRepository.save(newPost);
      post.tags.map(async (tag) => await this.createTag(tag));
      post.tags.map(async (tag) => await this.addTag(tag, savePost));
      return {
        success: true,
        post: savePost,
      };
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: e,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createTag(title: string) {
    const tag = await this.tagRepository.findOne({ title });
    if (tag) {
      return tag;
    }
    const freshTag = new Tag();
    freshTag.title = title;
    await this.tagRepository.save(freshTag);
  }

  async addTag(title: string, post: Post) {
    const tag = await this.tagRepository.findOne({ title });
    const postTags = this.posttagsRepository.create(new PostTag());
    postTags.tags = tag;
    postTags.post = post;
    return await this.posttagsRepository.save(postTags);
  }

  async getPostTags(postId: number) {
    const PostTags = await this.posttagsRepository.find({ postId });
    console.log(PostTags);
    return PostTags;
  }

  async getPostByUserId(userId: number) {
    const UserPosts = await this.postRepository.find({
      where: {
        userId: userId,
      },
    });
    return UserPosts;
  }

  async deletePost(user: User, { id }: DeletePostInput) {
    const post = await this.postRepository.findOne({ id });
    console.log(post);
    if (!post) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '포스트가 존재하지 않습니다.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    if (user.id !== post.userId) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: '타인의 게시글을 삭제할수 없습니다.',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    const tags = await this.posttagsRepository.find({
      where: {
        postId: id,
      },
    });
    console.log(tags);
    if (tags) {
      tags.map((tag) => this.deleteTag(tag.id));
      await this.postRepository.delete({ id });
    } else {
      await this.postRepository.delete({ id });
    }
    return {
      success: true,
    };
  }

  async deleteTag(id: number) {
    return await this.posttagsRepository.delete({ id });
  }
}
