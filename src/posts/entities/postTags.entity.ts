import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './posts.entity';
import { Tag } from './tags.entity';

@Entity('post_Tags')
@ObjectType('PostTag')
export class PostTag {
  @PrimaryGeneratedColumn()
  @Field((type) => Number)
  id: number;

  @Field((type) => Number)
  @Column('int', { primary: true, name: 'postId' })
  postId: number;

  @Field((type) => Number)
  @Column('int', { primary: true, name: 'tagId' })
  tagId: number;

  @ManyToOne((type) => Post, { cascade: true })
  @JoinColumn([{ name: 'postId', referencedColumnName: 'id' }])
  post: Post;

  @Field((type) => Tag, { nullable: true })
  @ManyToOne((type) => Tag, { cascade: true, eager: true, nullable: true })
  @JoinColumn([{ name: 'tagId', referencedColumnName: 'id' }])
  tags: Tag;
}
