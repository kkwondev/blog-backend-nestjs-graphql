import { Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Category } from 'src/categories/entities/categories.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/users.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { PostTag } from './postTags.entity';

@Entity('Post')
@ObjectType('Post')
export class Post extends CoreEntity {
  @Field((type) => String)
  @Column()
  @IsString()
  title: string;

  @Field((type) => String)
  @Column()
  @IsString()
  content: string;

  @Field((type) => String)
  @Column()
  @IsString()
  thumbnail_img?: string;

  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.posts)
  user: User;

  @Field((type) => [PostTag], { nullable: true })
  @OneToMany((type) => PostTag, (postTags) => postTags.post)
  postTags: PostTag[];

  @Field((type) => Category)
  @ManyToOne((type) => Category, (category) => category.posts)
  category: Category;
}
