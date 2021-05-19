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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const google_user_dto_1 = require("../users/interfaces/google-user.dto");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUser(email, pass) {
        const user = await this.usersService.getUserByEmail(email);
        if (user) {
            const { password } = user, result = __rest(user, ["password"]);
            const match = await bcrypt.compare(pass, password);
            if (match) {
                return result;
            }
        }
        return null;
    }
    async login(user) {
        const validateUser = await this.validateUser(user.email, user.password);
        if (!validateUser) {
            throw new common_1.HttpException('아이디 비밀번호 확인', common_1.HttpStatus.UNAUTHORIZED);
        }
        const payload = { email: validateUser.email, id: validateUser.id };
        return {
            access_token: this.jwtService.sign(payload),
            user: validateUser,
        };
    }
    async googleLogin(googleUser) {
        const socialAccount = await this.usersService.validateGoogleAccount(googleUser);
        try {
            const payload = { email: socialAccount.email, id: socialAccount.id };
            return {
                access_token: this.jwtService.sign(payload),
                user: socialAccount,
            };
        }
        catch (e) {
            return e;
        }
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(common_1.forwardRef(() => users_service_1.UsersService))),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map