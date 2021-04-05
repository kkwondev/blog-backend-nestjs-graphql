import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class InputAuth {
  @Field()
  @IsString()
  readonly email: string;

  @Field()
  @IsString()
  readonly password: string;
}
