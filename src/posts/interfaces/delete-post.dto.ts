import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/interfaces/output.dto';

@InputType()
export class DeletePostInput {
  @Field((type) => Number)
  id: number;
}

@ObjectType()
export class DeletePostOutput extends CoreOutput {}
