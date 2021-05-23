import { Field, ObjectType } from '@nestjs/graphql';
import { Category } from 'src/categories/entities/categories.entity';
import { CoreOutput } from 'src/common/interfaces/output.dto';
import { User } from 'src/users/entities/users.entity';
import { Post } from '../entities/posts.entity';

@ObjectType()
export class PostsOutput extends CoreOutput {
  @Field((type) => [Post], { nullable: true })
  post: Post;
  @Field((type) => Boolean)
  hasMorePost: boolean;
}
