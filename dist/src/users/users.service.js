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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_entity_1 = require("./entities/users.entity");
const bcrypt = require("bcrypt");
const socialAccount_entity_1 = require("./entities/socialAccount.entity");
let UsersService = class UsersService {
    constructor(userRepository, socialRepository) {
        this.userRepository = userRepository;
        this.socialRepository = socialRepository;
    }
    findAll() {
        return this.userRepository.find();
    }
    async findOne(id) {
        const user = await this.userRepository.findOne({ id });
        if (!user)
            throw new common_1.HttpException('없는 회원입니다.', common_1.HttpStatus.NOT_FOUND);
        return user;
    }
    async getUserByEmail(email) {
        const user = await this.userRepository.findOne({ email });
        return user;
    }
    async createUser(user) {
        const comfirm = await this.getUserByEmail(user.email);
        if (comfirm)
            throw new common_1.HttpException('이미 생성된 이메일 입니다.', common_1.HttpStatus.BAD_REQUEST);
        const hashPassword = await bcrypt.hash(user.password, 10);
        return await this.userRepository.save({
            email: user.email,
            password: hashPassword,
            nickname: user.nickname,
        });
    }
    async validateGoogleAccount(googleUser) {
        const googleAccout = await this.socialRepository.findOne({
            where: {
                social_id: googleUser.socialId,
            },
        });
        console.log(googleAccout);
        if (googleAccout) {
            return await this.userRepository.findOne({
                where: {
                    id: googleAccout.user_id,
                },
            });
        }
        else {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.UNAUTHORIZED,
                error: '현재 회원가입을 할수 없는 기간입니다.',
            }, common_1.HttpStatus.UNAUTHORIZED);
        }
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(users_entity_1.User)),
    __param(1, typeorm_1.InjectRepository(socialAccount_entity_1.SocialAccount)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map