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
exports.PostTag = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const posts_entity_1 = require("./posts.entity");
const tags_entity_1 = require("./tags.entity");
let PostTag = class PostTag {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    graphql_1.Field((type) => Number),
    __metadata("design:type", Number)
], PostTag.prototype, "id", void 0);
__decorate([
    graphql_1.Field((type) => Number),
    typeorm_1.Column('int', { primary: true, name: 'postId' }),
    __metadata("design:type", Number)
], PostTag.prototype, "postId", void 0);
__decorate([
    graphql_1.Field((type) => Number),
    typeorm_1.Column('int', { primary: true, name: 'tagId' }),
    __metadata("design:type", Number)
], PostTag.prototype, "tagId", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => posts_entity_1.Post, { cascade: true }),
    typeorm_1.JoinColumn([{ name: 'postId', referencedColumnName: 'id' }]),
    __metadata("design:type", posts_entity_1.Post)
], PostTag.prototype, "post", void 0);
__decorate([
    graphql_1.Field((type) => tags_entity_1.Tag, { nullable: true }),
    typeorm_1.ManyToOne((type) => tags_entity_1.Tag, { cascade: true, eager: true, nullable: true }),
    typeorm_1.JoinColumn([{ name: 'tagId', referencedColumnName: 'id' }]),
    __metadata("design:type", tags_entity_1.Tag)
], PostTag.prototype, "tags", void 0);
PostTag = __decorate([
    typeorm_1.Entity('post_tags'),
    graphql_1.ObjectType('PostTag')
], PostTag);
exports.PostTag = PostTag;
//# sourceMappingURL=postTags.entity.js.map