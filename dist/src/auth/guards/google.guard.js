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
exports.GoogleGuard = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const googleapis_1 = require("googleapis");
let GoogleGuard = class GoogleGuard {
    constructor() { }
    async canActivate(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        return await this.validateRequest(ctx.getContext());
    }
    async validateRequest(ctx) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const authHeaders = ctx.req.headers.google;
        if (authHeaders && authHeaders.split(' ')[1]) {
            const token = authHeaders.split(' ')[1];
            try {
                const { data } = await googleapis_1.google.people('v1').people.get({
                    access_token: token,
                    resourceName: 'people/me',
                    personFields: 'names,emailAddresses,photos',
                });
                const profile = {
                    socialId: (_b = (_a = data.resourceName) === null || _a === void 0 ? void 0 : _a.replace('people/', '')) !== null && _b !== void 0 ? _b : '',
                    email: (_d = (_c = data.emailAddresses) === null || _c === void 0 ? void 0 : _c[0].value) !== null && _d !== void 0 ? _d : '',
                    photo: (_f = (_e = data.photos) === null || _e === void 0 ? void 0 : _e[0].url) !== null && _f !== void 0 ? _f : null,
                    displayName: (_j = (_h = (_g = data.names) === null || _g === void 0 ? void 0 : _g[0].displayName) === null || _h === void 0 ? void 0 : _h.split(' (')[0]) !== null && _j !== void 0 ? _j : '',
                };
                ctx.google = profile;
                return true;
            }
            catch (e) {
                console.log(e);
                throw new common_1.HttpException({
                    status: 401,
                    error: 'Google Login Error',
                    message: 'Failed to retrieve google profile',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
        }
    }
};
GoogleGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], GoogleGuard);
exports.GoogleGuard = GoogleGuard;
//# sourceMappingURL=google.guard.js.map