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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const categories_service_1 = require("../categories/categories.service");
const users_entity_1 = require("../users/entities/users.entity");
const typeorm_2 = require("typeorm");
const posts_entity_1 = require("./entities/posts.entity");
const postTags_entity_1 = require("./entities/postTags.entity");
const tags_entity_1 = require("./entities/tags.entity");
let PostsService = class PostsService {
    constructor(postRepository, tagRepository, posttagsRepository, categoriesservice) {
        this.postRepository = postRepository;
        this.tagRepository = tagRepository;
        this.posttagsRepository = posttagsRepository;
        this.categoriesservice = categoriesservice;
    }
    async getPosts() {
        const find = await this.postRepository.find();
        return find;
    }
    async getPost(id) {
        const post = await this.postRepository.findOne({ id });
        if (!post) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: '존재하지 않는 포스트입니다..',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        return {
            success: true,
            post: post,
        };
    }
    async createPost(user, post) {
        const category = await this.categoriesservice.findByName(post.categoryName);
        if (!category) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: '존재하지 않는 카테고리입니다.',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        try {
            const newPost = this.postRepository.create(post);
            const reqExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi;
            const specialCharacters = post.title.replace(reqExp, '');
            const slug_title = specialCharacters.replace(/ /g, '-');
            newPost.user = user;
            newPost.category = category;
            newPost.slug = slug_title;
            const savePost = await this.postRepository.save(newPost);
            const tags = await Promise.all(post.tags.map((tag) => this.createTag(tag)));
            tags.map((tag) => this.addTag(tag, savePost));
            return {
                success: true,
                post: savePost,
            };
        }
        catch (e) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: e,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updatePost(user, id, { tags, categoryName }) {
        const post = await this.postRepository.findOne({ id });
        const category = await this.categoriesservice.findByName(categoryName);
        if (!category) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: '존재하지 않는 카테고리입니다.',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        if (!post) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: '포스트가 존재하지 않습니다.',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        if (user.id !== post.userId) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.UNAUTHORIZED,
                error: '타인의 게시글을 수정 할수 없습니다.',
            }, common_1.HttpStatus.UNAUTHORIZED);
        }
        const prevTags = await this.posttagsRepository.find({
            where: {
                postId: id,
            },
        });
        if (prevTags) {
            prevTags.map((tag) => this.deleteTag(tag.id));
            await this.postRepository.delete({ id });
        }
        else {
            await this.postRepository.delete({ id });
        }
        try {
            const newPost = this.postRepository.create(post);
            const slug_title = post.title.replace(/ /g, '-');
            newPost.user = user;
            newPost.category = category;
            newPost.slug = slug_title;
            const savePost = await this.postRepository.save(newPost);
            const updateTags = await Promise.all(tags.map((tag) => this.createTag(tag)));
            updateTags.map((tag) => this.addTag(tag, savePost));
            return {
                success: true,
                post: savePost,
            };
        }
        catch (e) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: e,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createTag(title) {
        const tag = await this.tagRepository.findOne({ title });
        if (!tag) {
            const freshTag = new tags_entity_1.Tag();
            freshTag.title = title;
            return await this.tagRepository.save(freshTag);
        }
        else {
            return tag;
        }
    }
    async addTag(tag, post) {
        console.log(tag);
        const postTags = this.posttagsRepository.create(new postTags_entity_1.PostTag());
        postTags.tags = tag;
        postTags.post = post;
        return await this.posttagsRepository.save(postTags);
    }
    async getPostTags(postId) {
        const PostTags = await this.posttagsRepository.find({ postId });
        console.log(PostTags);
        return PostTags;
    }
    async getPostByUserId(userId) {
        const UserPosts = await this.postRepository.find({
            where: {
                userId: userId,
            },
        });
        return UserPosts;
    }
    async deletePost(user, { id }) {
        const post = await this.postRepository.findOne({ id });
        console.log(post);
        if (!post) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                error: '포스트가 존재하지 않습니다.',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        if (user.id !== post.userId) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.UNAUTHORIZED,
                error: '타인의 게시글을 삭제 할수 없습니다.',
            }, common_1.HttpStatus.UNAUTHORIZED);
        }
        const tags = await this.posttagsRepository.find({
            where: {
                postId: id,
            },
        });
        if (tags) {
            tags.map((tag) => this.deleteTag(tag.id));
            await this.postRepository.delete({ id });
        }
        else {
            await this.postRepository.delete({ id });
        }
        return {
            success: true,
        };
    }
    async deleteTag(id) {
        return await this.posttagsRepository.delete({ id });
    }
    async getCategoryPost(categoryId) {
        return await this.postRepository.find({
            where: {
                categoryId: categoryId,
            },
        });
    }
};
PostsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(posts_entity_1.Post)),
    __param(1, typeorm_1.InjectRepository(tags_entity_1.Tag)),
    __param(2, typeorm_1.InjectRepository(postTags_entity_1.PostTag)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        categories_service_1.CategoriesService])
], PostsService);
exports.PostsService = PostsService;
//# sourceMappingURL=posts.service.js.map