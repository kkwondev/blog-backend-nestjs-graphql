import { CoreOutput } from 'src/common/interfaces/output.dto';
import { Post } from '../entities/posts.entity';
declare const UpdatePostInput_base: import("@nestjs/common").Type<Pick<Post, "title" | "content" | "thumbnail_img">>;
export declare class UpdatePostInput extends UpdatePostInput_base {
    tags: string[];
    categoryName: string;
}
export declare class UpdatePostOutput extends CoreOutput {
    post: Post;
}
export {};
