import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class InputUser {
  @Field()
  @IsEmail()
  readonly email: string;

  @Field()
  readonly password: string;

  @Field()
  readonly nickname: string;
}
