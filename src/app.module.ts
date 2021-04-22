import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import { CategoriesModule } from './categories/categories.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
    }),
    UsersModule,
    AuthModule,
    PostsModule,
    CategoriesModule,
    CommonModule,
  ],
})
export class AppModule {}
