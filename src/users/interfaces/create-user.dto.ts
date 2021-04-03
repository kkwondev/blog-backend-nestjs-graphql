import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';

@ObjectType()
export class CreateUserDto {
  @Field(() => Int)
  @IsInt()
  readonly id?: number;

  @Field(() => String)
  @IsString()
  email: string;

  @Field(() => String)
  @IsString()
  password: string;

  @Field(() => String)
  @IsString()
  nickname: string;
}
