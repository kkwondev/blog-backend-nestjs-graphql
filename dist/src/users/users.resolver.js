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
exports.UsersResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const auth_user_decorator_1 = require("../auth/decorators/auth-user.decorator");
const google_decorator_1 = require("../auth/decorators/google.decorator");
const auth_guard_1 = require("../auth/guards/auth.guard");
const google_guard_1 = require("../auth/guards/google.guard");
const users_entity_1 = require("./entities/users.entity");
const user_input_1 = require("./interfaces/user.input");
const users_service_1 = require("./users.service");
let UsersResolver = class UsersResolver {
    constructor(userService) {
        this.userService = userService;
    }
    async getUsers() {
        return await this.userService.findAll();
    }
    async getUser(id) {
        return await this.userService.findOne(id);
    }
    async createUser(user) {
        return await this.userService.createUser(user);
    }
    currentUser(authUser) {
        return authUser;
    }
};
__decorate([
    graphql_1.Query(() => [users_entity_1.User]),
    common_1.UseGuards(auth_guard_1.AuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "getUsers", null);
__decorate([
    graphql_1.Query(() => users_entity_1.User),
    common_1.UseGuards(auth_guard_1.AuthGuard),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "getUser", null);
__decorate([
    graphql_1.Mutation(() => users_entity_1.User),
    __param(0, graphql_1.Args('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_input_1.InputUser]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "createUser", null);
__decorate([
    graphql_1.Query(() => users_entity_1.User),
    common_1.UseGuards(auth_guard_1.AuthGuard),
    __param(0, auth_user_decorator_1.AuthUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_entity_1.User]),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "currentUser", null);
UsersResolver = __decorate([
    graphql_1.Resolver('User'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersResolver);
exports.UsersResolver = UsersResolver;
//# sourceMappingURL=users.resolver.js.map