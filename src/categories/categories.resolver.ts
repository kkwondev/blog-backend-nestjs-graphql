import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { Category } from './entities/categories.entity';
import { CreateCategoryInput } from './interfaces/create-category.dto';

@Resolver()
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query(() => [Category])
  async getCategories(): Promise<Category[]> {
    return await this.categoriesService.getCategories();
  }

  @Query(() => Category)
  async getCategory(@Args('id') id: number): Promise<Category> {
    return await this.categoriesService.findByid(id);
  }
  @Mutation(() => Category)
  async createCategory(
    @Args('category') category: CreateCategoryInput,
  ): Promise<Category> {
    return await this.categoriesService.createCategory(category);
  }
}
