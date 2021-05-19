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
exports.PostsResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const auth_user_decorator_1 = require("../auth/decorators/auth-user.decorator");
const auth_guard_1 = require("../auth/guards/auth.guard");
const users_entity_1 = require("../users/entities/users.entity");
const create_post_dto_1 = require("./interfaces/create-post.dto");
const posts_entity_1 = require("./entities/posts.entity");
const postTags_entity_1 = require("./entities/postTags.entity");
const posts_service_1 = require("./posts.service");
const delete_post_dto_1 = require("./interfaces/delete-post.dto");
const post_dto_1 = require("./interfaces/post.dto");
const update_post_dto_1 = require("./interfaces/update-post.dto");
let PostsResolver = class PostsResolver {
    constructor(postsService) {
        this.postsService = postsService;
    }
    async getPosts() {
        return await this.postsService.getPosts();
    }
    async getPost(id) {
        return await this.postsService.getPost(id);
    }
    async getPostTags(postId) {
        return await this.postsService.getPostTags(postId);
    }
    async getPostByUserId(userId) {
        return await this.postsService.getPostByUserId(userId);
    }
    async createPost(authUser, post) {
        return await this.postsService.createPost(authUser, post);
    }
    async updatePost(authUser, id, post) {
        return await this.postsService.updatePost(authUser, id, post);
    }
    async deletePost(authUser, deletePostInput) {
        return await this.postsService.deletePost(authUser, deletePostInput);
    }
    async getCategoryPost(categoryId) {
        return await this.postsService.getCategoryPost(categoryId);
    }
};
__decorate([
    graphql_1.Query(() => [posts_entity_1.Post]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "getPosts", null);
__decorate([
    graphql_1.Query(() => post_dto_1.PostOutput),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "getPost", null);
__decorate([
    graphql_1.Query(() => [postTags_entity_1.PostTag]),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "getPostTags", null);
__decorate([
    graphql_1.Query(() => [posts_entity_1.Post]),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "getPostByUserId", null);
__decorate([
    graphql_1.Mutation(() => create_post_dto_1.CreatePostOutput),
    common_1.UseGuards(auth_guard_1.AuthGuard),
    __param(0, auth_user_decorator_1.AuthUser()),
    __param(1, graphql_1.Args('post')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_entity_1.User,
        create_post_dto_1.CreatePostInput]),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "createPost", null);
__decorate([
    graphql_1.Mutation(() => update_post_dto_1.UpdatePostOutput),
    common_1.UseGuards(auth_guard_1.AuthGuard),
    __param(0, auth_user_decorator_1.AuthUser()),
    __param(1, graphql_1.Args('id')),
    __param(2, graphql_1.Args('post')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_entity_1.User, Number, update_post_dto_1.UpdatePostInput]),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "updatePost", null);
__decorate([
    graphql_1.Mutation(() => delete_post_dto_1.DeletePostOutput),
    common_1.UseGuards(auth_guard_1.AuthGuard),
    __param(0, auth_user_decorator_1.AuthUser()),
    __param(1, graphql_1.Args('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_entity_1.User,
        delete_post_dto_1.DeletePostInput]),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "deletePost", null);
__decorate([
    graphql_1.Query(() => [posts_entity_1.Post]),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "getCategoryPost", null);
PostsResolver = __decorate([
    graphql_1.Resolver(),
    __metadata("design:paramtypes", [posts_service_1.PostsService])
], PostsResolver);
exports.PostsResolver = PostsResolver;
//# sourceMappingURL=posts.resolver.js.map