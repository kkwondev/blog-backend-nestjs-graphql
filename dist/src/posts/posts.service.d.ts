import { CategoriesService } from 'src/categories/categories.service';
import { User } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { CreatePostInput } from './interfaces/create-post.dto';
import { Post } from './entities/posts.entity';
import { PostTag } from './entities/postTags.entity';
import { Tag } from './entities/tags.entity';
import { DeletePostInput } from './interfaces/delete-post.dto';
import { UpdatePostInput } from './interfaces/update-post.dto';
export declare class PostsService {
    private readonly postRepository;
    private readonly tagRepository;
    private readonly posttagsRepository;
    private readonly categoriesservice;
    constructor(postRepository: Repository<Post>, tagRepository: Repository<Tag>, posttagsRepository: Repository<PostTag>, categoriesservice: CategoriesService);
    getPosts(): Promise<Post[]>;
    getPost(id: number): Promise<{
        success: boolean;
        post: Post;
    }>;
    createPost(user: User, post: CreatePostInput): Promise<{
        success: boolean;
        post: Post;
    }>;
    updatePost(user: User, id: number, { tags, categoryName }: UpdatePostInput): Promise<{
        success: boolean;
        post: Post;
    }>;
    createTag(title: string): Promise<Tag>;
    addTag(tag: Tag, post: Post): Promise<PostTag>;
    getPostTags(postId: number): Promise<PostTag[]>;
    getPostByUserId(userId: number): Promise<Post[]>;
    deletePost(user: User, { id }: DeletePostInput): Promise<{
        success: boolean;
    }>;
    deleteTag(id: number): Promise<import("typeorm").DeleteResult>;
    getCategoryPost(categoryId: number): Promise<Post[]>;
}
