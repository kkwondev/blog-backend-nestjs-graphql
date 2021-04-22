import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { CoreEntity } from 'src/common/entities/core.entity';

@Entity('Tag')
@ObjectType('Tag')
@InputType('TagInputType', { isAbstract: true })
export class Tag extends CoreEntity {
  @Field((type) => String)
  @Column()
  @IsString()
  title: string;

  // @ManyToOne((type) => Post, (post) => post.tags)
  // post: Post;
  // @OneToMany((type) => Post, (postTags) => postTags.tags)
  // postTags: Post[];
}
