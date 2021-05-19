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
exports.Category = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const core_entity_1 = require("../../common/entities/core.entity");
const posts_entity_1 = require("../../posts/entities/posts.entity");
const typeorm_1 = require("typeorm");
let Category = class Category extends core_entity_1.CoreEntity {
};
__decorate([
    graphql_1.Field((type) => String),
    typeorm_1.Column(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    typeorm_1.OneToMany((type) => posts_entity_1.Post, (posts) => posts.category),
    __metadata("design:type", Array)
], Category.prototype, "posts", void 0);
Category = __decorate([
    typeorm_1.Entity({
        name: 'categories',
    }),
    graphql_1.InputType('CategoryInputType', { isAbstract: true }),
    graphql_1.ObjectType('Category')
], Category);
exports.Category = Category;
//# sourceMappingURL=categories.entity.js.map