import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { User } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { CreatePostInput } from './dtos/create-post.dto';
import { Post } from './entities/posts.entity';
import { PostTag } from './entities/postTags.entity';
import { Tag } from './entities/tags.entity';

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
    post.tags.map(async (tag) => await this.createTag(tag));
    const newPost = this.postRepository.create(post);
    newPost.user = user;
    newPost.category = category;
    const savePost = await this.postRepository.save(newPost);
    post.tags.map(async (tag) => await this.addTag(tag, savePost));
    return savePost;
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
}
