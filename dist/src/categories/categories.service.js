"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const categories_entity_1 = require("./entities/categories.entity");
let CategoriesService = class CategoriesService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    getCategories() {
        return this.categoryRepository.find();
    }
    async findByName(name) {
        const category = await this.categoryRepository.findOne({ name });
        return category;
    }
    async findByid(id) {
        const category = await this.categoryRepository.findOne({ id });
        if (!category)
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: '없는 카테고리 입니다',
            }, common_1.HttpStatus.NOT_FOUND);
        return category;
    }
    async createCategory(createCategoryInput) {
        const category = await this.findByName(createCategoryInput.name);
        console.log(category);
        if (category) {
            throw new common_1.HttpException('이미 존재하는 카테고리 입니다.', common_1.HttpStatus.BAD_REQUEST);
        }
        return await this.categoryRepository.save(createCategoryInput);
    }
};
CategoriesService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(categories_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoriesService);
exports.CategoriesService = CategoriesService;
//# sourceMappingURL=categories.service.js.map