import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { UsersModule } from 'src/users/users.module';
import { Post } from './entities/posts.entity';
import { PostTag } from './entities/postTags.entity';
import { Tag } from './entities/tags.entity';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';

@Module({
  imports: [
    CategoriesModule,
    AuthModule,
    UsersModule,
    TypeOrmModule.forFeature([Post, Tag, PostTag]),
  ],
  providers: [PostsResolver, PostsService],
})
export class PostsModule {}
