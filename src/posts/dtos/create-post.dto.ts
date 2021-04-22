import { InputType, PickType, Field } from '@nestjs/graphql';
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
