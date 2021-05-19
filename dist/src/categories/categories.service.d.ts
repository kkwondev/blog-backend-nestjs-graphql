import { Repository } from 'typeorm';
import { Category } from './entities/categories.entity';
import { CreateCategoryInput } from './interfaces/create-category.dto';
export declare class CategoriesService {
    private readonly categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    getCategories(): Promise<Category[]>;
    findByName(name: string): Promise<Category | undefined>;
    findByid(id: number): Promise<Category | undefined>;
    createCategory(createCategoryInput: CreateCategoryInput): Promise<Category>;
}
