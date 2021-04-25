import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/interfaces/output.dto';
import { Post } from '../entities/posts.entity';

@ObjectType()
export class PostOutput extends CoreOutput {
  @Field((type) => Post, { nullable: true })
  post: Post;
}
