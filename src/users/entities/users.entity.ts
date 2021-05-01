import { ObjectType, Field } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Post } from 'src/posts/entities/posts.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({
  name: 'users',
})
@ObjectType('User')
export class User extends CoreEntity {
  @Field((type) => String)
  @Column()
  email: string;

  @Field((type) => String, { nullable: true })
  @Column({ nullable: true })
  password?: string;

  @Field((type) => String, { nullable: true })
  @Column({ length: 255, nullable: true })
  photo_url?: string;

  @Field((type) => String)
  @Column()
  nickname: string;

  @OneToMany((type) => Post, (post) => post.user)
  posts: Post[];
}
