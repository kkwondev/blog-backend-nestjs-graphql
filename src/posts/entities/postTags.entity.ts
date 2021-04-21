import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './posts.entity';
import { Tag } from './tags.entity';

@Entity('PostTag')
@ObjectType('PostTag')
export class PostTag {
  @PrimaryGeneratedColumn()
  @Field((type) => Number)
  id: number;
  @ManyToOne((type) => Post, (post) => post.postTags)
  post: Post;
  @ManyToOne((type) => Tag, (tags) => tags.postTags)
  tags: Tag;
}
