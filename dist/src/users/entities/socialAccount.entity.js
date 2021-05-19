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
exports.SocialAccount = void 0;
const typeorm_1 = require("typeorm");
const users_entity_1 = require("./users.entity");
let SocialAccount = class SocialAccount {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], SocialAccount.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ length: 12 }),
    __metadata("design:type", String)
], SocialAccount.prototype, "provider", void 0);
__decorate([
    typeorm_1.Column({ length: 255 }),
    __metadata("design:type", String)
], SocialAccount.prototype, "social_id", void 0);
__decorate([
    typeorm_1.Column('int', { primary: true, name: 'user_id' }),
    __metadata("design:type", Number)
], SocialAccount.prototype, "user_id", void 0);
__decorate([
    typeorm_1.OneToOne((type) => users_entity_1.User, { onDelete: 'CASCADE' }),
    typeorm_1.JoinColumn({ name: 'user_id' }),
    __metadata("design:type", users_entity_1.User)
], SocialAccount.prototype, "user", void 0);
SocialAccount = __decorate([
    typeorm_1.Entity({
        name: 'social_accounts',
    }),
    typeorm_1.Index(['provider', 'social_id', 'user_id'])
], SocialAccount);
exports.SocialAccount = SocialAccount;
//# sourceMappingURL=socialAccount.entity.js.map