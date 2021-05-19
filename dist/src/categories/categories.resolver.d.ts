import { CategoriesService } from './categories.service';
import { Category } from './entities/categories.entity';
import { CreateCategoryInput } from './interfaces/create-category.dto';
export declare class CategoriesResolver {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    getCategories(): Promise<Category[]>;
    getCategory(id: number): Promise<Category>;
    createCategory(category: CreateCategoryInput): Promise<Category>;
}
