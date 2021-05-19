import { CoreOutput } from 'src/common/interfaces/output.dto';
import { Post } from '../entities/posts.entity';
declare const CreatePostInput_base: import("@nestjs/common").Type<Pick<Post, "title" | "content" | "thumbnail_img">>;
export declare class CreatePostInput extends CreatePostInput_base {
    categoryName: string;
    tags: string[];
}
export declare class CreatePostOutput extends CoreOutput {
    post: Post;
}
export {};
