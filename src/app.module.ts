import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.MTSQL_USERNAME,
      password: process.env.MTSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE
        ? process.env.MTSQL_DATABSE
        : 'kbloglocal',
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrations: ['migration/*{.ts,.js}'],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      debug: true,
      playground: true,
    }),
  ],
})
export class AppModule {}
