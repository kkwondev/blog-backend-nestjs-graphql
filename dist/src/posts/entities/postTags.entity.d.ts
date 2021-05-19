import { Post } from './posts.entity';
import { Tag } from './tags.entity';
export declare class PostTag {
    id: number;
    postId: number;
    tagId: number;
    post: Post;
    tags: Tag;
}
