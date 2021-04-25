import { InputType, PickType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/interfaces/output.dto';
import { Post } from '../entities/posts.entity';

@InputType()
export class UpdatePostInput extends PickType(Post, [
  'title',
  'content',
  'thumbnail_img',
]) {
  @Field((type) => [String])
  tags: string[];
  @Field((type) => String)
  categoryName: string;
}

@ObjectType()
export class UpdatePostOutput extends CoreOutput {
  @Field((type) => Post, { nullable: true })
  post: Post;
}
