import { User } from 'src/users/entities/users.entity';
import { CreatePostInput } from './interfaces/create-post.dto';
import { Post } from './entities/posts.entity';
import { PostTag } from './entities/postTags.entity';
import { PostsService } from './posts.service';
import { DeletePostInput } from './interfaces/delete-post.dto';
import { UpdatePostInput } from './interfaces/update-post.dto';
export declare class PostsResolver {
    private readonly postsService;
    constructor(postsService: PostsService);
    getPosts(): Promise<Post[]>;
    getPost(id: number): Promise<{
        success: boolean;
        post: Post;
    }>;
    getPostTags(postId: number): Promise<PostTag[]>;
    getPostByUserId(userId: number): Promise<Post[]>;
    createPost(authUser: User, post: CreatePostInput): Promise<{
        success: boolean;
        post: Post;
    }>;
    updatePost(authUser: User, id: number, post: UpdatePostInput): Promise<{
        success: boolean;
        post: Post;
    }>;
    deletePost(authUser: User, deletePostInput: DeletePostInput): Promise<{
        success: boolean;
    }>;
    getCategoryPost(categoryId: number): Promise<Post[]>;
}
