import { Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Category } from 'src/categories/entities/categories.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/users.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Tag } from './tags.entity';

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

  @ManyToOne((type) => User, (user) => user.posts)
  user: User;

  @OneToMany((type) => Tag, (tags) => tags.post)
  tags: Tag[];

  @ManyToOne((type) => Category, (category) => category.posts)
  category: Category;
}
