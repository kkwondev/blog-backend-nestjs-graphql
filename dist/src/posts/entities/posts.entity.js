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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const categories_entity_1 = require("../../categories/entities/categories.entity");
const core_entity_1 = require("../../common/entities/core.entity");
const users_entity_1 = require("../../users/entities/users.entity");
const typeorm_1 = require("typeorm");
let Post = class Post extends core_entity_1.CoreEntity {
};
__decorate([
    graphql_1.Field((type) => String),
    typeorm_1.Column(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    graphql_1.Field((type) => String),
    typeorm_1.Column(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Post.prototype, "slug", void 0);
__decorate([
    graphql_1.Field((type) => String),
    typeorm_1.Column(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Post.prototype, "content", void 0);
__decorate([
    graphql_1.Field((type) => String, { nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Post.prototype, "thumbnail_img", void 0);
__decorate([
    graphql_1.Field((type) => Number),
    typeorm_1.Column('int', { primary: true, name: 'userId' }),
    __metadata("design:type", Number)
], Post.prototype, "userId", void 0);
__decorate([
    graphql_1.Field((type) => Number),
    typeorm_1.Column('int', { primary: true, name: 'categoryId' }),
    __metadata("design:type", Number)
], Post.prototype, "categoryId", void 0);
__decorate([
    graphql_1.Field((type) => users_entity_1.User),
    typeorm_1.ManyToOne((type) => users_entity_1.User, (user) => user.posts),
    typeorm_1.JoinColumn([{ name: 'userId', referencedColumnName: 'id' }]),
    __metadata("design:type", users_entity_1.User)
], Post.prototype, "user", void 0);
__decorate([
    graphql_1.Field((type) => categories_entity_1.Category),
    typeorm_1.ManyToOne((type) => categories_entity_1.Category, (category) => category.posts),
    typeorm_1.JoinColumn([{ name: 'categoryId', referencedColumnName: 'id' }]),
    __metadata("design:type", categories_entity_1.Category)
], Post.prototype, "category", void 0);
Post = __decorate([
    typeorm_1.Entity({
        name: 'posts',
    }),
    graphql_1.InputType('PostInputType', { isAbstract: true }),
    graphql_1.ObjectType('Post')
], Post);
exports.Post = Post;
//# sourceMappingURL=posts.entity.js.map