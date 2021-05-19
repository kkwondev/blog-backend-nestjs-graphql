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
exports.User = void 0;
const graphql_1 = require("@nestjs/graphql");
const core_entity_1 = require("../../common/entities/core.entity");
const posts_entity_1 = require("../../posts/entities/posts.entity");
const typeorm_1 = require("typeorm");
let User = class User extends core_entity_1.CoreEntity {
};
__decorate([
    graphql_1.Field((type) => String),
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    graphql_1.Field((type) => String, { nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    graphql_1.Field((type) => String, { nullable: true }),
    typeorm_1.Column({ length: 255, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "photo_url", void 0);
__decorate([
    graphql_1.Field((type) => String),
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "nickname", void 0);
__decorate([
    typeorm_1.OneToMany((type) => posts_entity_1.Post, (post) => post.user),
    __metadata("design:type", Array)
], User.prototype, "posts", void 0);
User = __decorate([
    typeorm_1.Entity({
        name: 'users',
    }),
    graphql_1.ObjectType('User')
], User);
exports.User = User;
//# sourceMappingURL=users.entity.js.map