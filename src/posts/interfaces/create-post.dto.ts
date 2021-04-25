import { InputType, PickType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/interfaces/output.dto';
import { Post } from '../entities/posts.entity';

@InputType()
export class CreatePostInput extends PickType(Post, [
  'title',
  'content',
  'thumbnail_img',
]) {
  @Field((type) => String)
  categoryName: string;
  @Field((type) => [String])
  tags: string[];
}

@ObjectType()
export class CreatePostOutput extends CoreOutput {
  @Field((type) => Post, { nullable: true })
  post: Post;
}
