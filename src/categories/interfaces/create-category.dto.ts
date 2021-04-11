import { InputType, PickType } from '@nestjs/graphql';
import { Category } from '../entities/categories.entity';

@InputType()
export class CreateCategoryInput extends PickType(Category, ['name']) {}
