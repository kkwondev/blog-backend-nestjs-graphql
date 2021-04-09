import { ObjectType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './posts.entity';

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

  @ManyToOne((type) => Post, (post) => post.tags)
  post: Post;
}
