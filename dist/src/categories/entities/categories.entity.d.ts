import { CoreEntity } from 'src/common/entities/core.entity';
import { Post } from 'src/posts/entities/posts.entity';
export declare class Category extends CoreEntity {
    name: string;
    posts: Post[];
}
