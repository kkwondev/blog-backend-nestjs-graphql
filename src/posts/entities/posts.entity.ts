import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Category } from 'src/categories/entities/categories.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/users.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({
  name: 'posts',
})
@InputType('PostInputType', { isAbstract: true })
@ObjectType('Post')
export class Post extends CoreEntity {
  @Field((type) => String)
  @Column()
  @IsString()
  title: string;

  @Field((type) => String)
  @Column()
  @IsString()
  slug: string;

  @Field((type) => String)
  @Column()
  @IsString()
  content: string;

  @Field((type) => String, { nullable: true })
  @Column({ nullable: true })
  thumbnail_img?: string;

  @Field((type) => Number)
  @Column('int', { primary: true, name: 'userId' })
  userId: number;

  @Field((type) => Number)
  @Column('int', { primary: true, name: 'categoryId' })
  categoryId: number;

  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.posts)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: User;

  @Field((type) => Category)
  @ManyToOne((type) => Category, (category) => category.posts)
  @JoinColumn([{ name: 'categoryId', referencedColumnName: 'id' }])
  category: Category;
}
