import { ObjectType, Field } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Post } from 'src/posts/entities/posts.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('User')
@ObjectType('User')
export class User extends CoreEntity {
  @Field((type) => String)
  @Column()
  email: string;

  @Field((type) => String)
  @Column()
  password: string;

  @Field((type) => String)
  @Column()
  nickname: string;

  @OneToMany((type) => Post, (post) => post.user)
  posts: Post[];
}
