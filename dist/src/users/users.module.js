"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../auth/auth.module");
const auth_service_1 = require("../auth/auth.service");
const socialAccount_entity_1 = require("./entities/socialAccount.entity");
const users_entity_1 = require("./entities/users.entity");
const users_resolver_1 = require("./users.resolver");
const users_service_1 = require("./users.service");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    common_1.Module({
        imports: [
            common_1.forwardRef(() => auth_module_1.AuthModule),
            typeorm_1.TypeOrmModule.forFeature([users_entity_1.User, socialAccount_entity_1.SocialAccount]),
        ],
        providers: [users_resolver_1.UsersResolver, users_service_1.UsersService, auth_service_1.AuthService],
        exports: [users_service_1.UsersService],
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map