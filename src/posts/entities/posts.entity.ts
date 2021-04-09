import { Field, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { User } from 'src/users/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tag } from './tags.entity';

@Entity('Post')
@ObjectType('Post')
export class Post {
  @PrimaryGeneratedColumn()
  @Field((type) => Number)
  @IsNumber()
  id: number;

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne((type) => User, (user) => user.posts)
  user: User;

  @OneToMany((type) => Tag, (tags) => tags.post)
  tags: Tag[];
}
