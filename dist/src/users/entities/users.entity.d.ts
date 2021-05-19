import { CoreEntity } from 'src/common/entities/core.entity';
import { Post } from 'src/posts/entities/posts.entity';
export declare class User extends CoreEntity {
    email: string;
    password?: string;
    photo_url?: string;
    nickname: string;
    posts: Post[];
}
