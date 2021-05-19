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
exports.Tag = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const core_entity_1 = require("../../common/entities/core.entity");
let Tag = class Tag extends core_entity_1.CoreEntity {
};
__decorate([
    graphql_1.Field((type) => String),
    typeorm_1.Column(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Tag.prototype, "title", void 0);
Tag = __decorate([
    typeorm_1.Entity({
        name: 'tags',
    }),
    graphql_1.ObjectType('Tag'),
    graphql_1.InputType('TagInputType', { isAbstract: true })
], Tag);
exports.Tag = Tag;
//# sourceMappingURL=tags.entity.js.map