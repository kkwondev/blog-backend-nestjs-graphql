import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/categories.entity';
import { CreateCategoryInput } from './interfaces/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  /**
   * 전체 카테고리 조회
   * @returns Category[]
   */
  getCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  /**
   * 카테고리 중복 검사
   * @param name:string
   * @returns Category | undefined
   */
  async findByName(name: string): Promise<Category | undefined> {
    const category = await this.categoryRepository.findOne({ name });
    return category;
  }

  /**
   * 카테고리 등록
   * @param createCategoryInput
   * @returns Category | HttpException
   */
  async createCategory(
    createCategoryInput: CreateCategoryInput,
  ): Promise<Category> {
    const category = await this.findByName(createCategoryInput.name);
    console.log(category);
    if (category) {
      throw new HttpException(
        '이미 존재하는 카테고리 입니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.categoryRepository.save(createCategoryInput);
  }
}
