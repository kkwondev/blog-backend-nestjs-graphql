import { ObjectType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { PostTag } from './postTags.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Tag')
@ObjectType('Tag')
export class Tag {
  @PrimaryGeneratedColumn()
  @Field((type) => Number)
  id: number;

  @Field((type) => String)
  @Column()
  @IsString()
  title: string;

  // @ManyToOne((type) => Post, (post) => post.tags)
  // post: Post;
  @OneToMany((type) => PostTag, (postTags) => postTags.tags)
  postTags: PostTag[];
}
