import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class InputUser {
  @Field()
  @IsString()
  readonly email: string;

  @Field()
  readonly password: string;

  @Field()
  readonly nickname: string;
}
