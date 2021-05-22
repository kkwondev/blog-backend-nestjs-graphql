import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import { CategoriesModule } from './categories/categories.module';
import { CommonModule } from './common/common.module';
import { ImageModule } from './image/image.module';
import { AppController } from './app.controller';
import connectionOptions from '../ormconfig';
import { GraphQLError } from 'graphql';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(connectionOptions),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
      debug: false,
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError = {
          message: error.extensions.exception.response.error || error.message,
          status: error.extensions.exception.response.status,
        };
        return graphQLFormattedError;
      },
    }),
    UsersModule,
    AuthModule,
    PostsModule,
    CategoriesModule,
    CommonModule,
    ImageModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
