import { Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ObjectType()
export class AuthResponseDto {
  @Field()
  @IsString()
  readonly access_token: string;
}
