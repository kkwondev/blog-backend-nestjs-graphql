import { CoreOutput } from 'src/common/interfaces/output.dto';
import { Post } from '../entities/posts.entity';
export declare class PostOutput extends CoreOutput {
    post: Post;
}
