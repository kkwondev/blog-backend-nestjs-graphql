import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GoogleCheckOutput {
  @Field(() => String)
  socialId: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  photo: string;

  @Field(() => String)
  displayName: string;
}
