"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../auth/auth.module");
const categories_module_1 = require("../categories/categories.module");
const users_module_1 = require("../users/users.module");
const posts_entity_1 = require("./entities/posts.entity");
const postTags_entity_1 = require("./entities/postTags.entity");
const tags_entity_1 = require("./entities/tags.entity");
const posts_resolver_1 = require("./posts.resolver");
const posts_service_1 = require("./posts.service");
let PostsModule = class PostsModule {
};
PostsModule = __decorate([
    common_1.Module({
        imports: [
            categories_module_1.CategoriesModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            typeorm_1.TypeOrmModule.forFeature([posts_entity_1.Post, tags_entity_1.Tag, postTags_entity_1.PostTag]),
        ],
        providers: [posts_resolver_1.PostsResolver, posts_service_1.PostsService],
    })
], PostsModule);
exports.PostsModule = PostsModule;
//# sourceMappingURL=posts.module.js.map