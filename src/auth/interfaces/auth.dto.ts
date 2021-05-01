import { Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { User } from 'src/users/entities/users.entity';

@ObjectType()
export class AuthResponseDto {
  @Field((type) => String)
  @IsString()
  readonly access_token: string;

  @Field((type) => User)
  user: User;
}
