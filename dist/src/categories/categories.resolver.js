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
exports.CategoriesResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const auth_guard_1 = require("../auth/guards/auth.guard");
const categories_service_1 = require("./categories.service");
const categories_entity_1 = require("./entities/categories.entity");
const create_category_dto_1 = require("./interfaces/create-category.dto");
let CategoriesResolver = class CategoriesResolver {
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    async getCategories() {
        return await this.categoriesService.getCategories();
    }
    async getCategory(id) {
        return await this.categoriesService.findByid(id);
    }
    async createCategory(category) {
        return await this.categoriesService.createCategory(category);
    }
};
__decorate([
    graphql_1.Query(() => [categories_entity_1.Category]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoriesResolver.prototype, "getCategories", null);
__decorate([
    graphql_1.Query(() => categories_entity_1.Category),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoriesResolver.prototype, "getCategory", null);
__decorate([
    graphql_1.Mutation(() => categories_entity_1.Category),
    common_1.UseGuards(auth_guard_1.AuthGuard),
    __param(0, graphql_1.Args('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_dto_1.CreateCategoryInput]),
    __metadata("design:returntype", Promise)
], CategoriesResolver.prototype, "createCategory", null);
CategoriesResolver = __decorate([
    graphql_1.Resolver(),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService])
], CategoriesResolver);
exports.CategoriesResolver = CategoriesResolver;
//# sourceMappingURL=categories.resolver.js.map