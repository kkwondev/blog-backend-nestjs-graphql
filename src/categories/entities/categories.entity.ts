import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Post } from 'src/posts/entities/posts.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('Category')
@InputType('CategoryInputType', { isAbstract: true })
@ObjectType('Category')
export class Category extends CoreEntity {
  @Field((type) => String)
  @Column()
  @IsString()
  name: string;

  @OneToMany((type) => Post, (posts) => posts.category)
  posts: Post[];
}
