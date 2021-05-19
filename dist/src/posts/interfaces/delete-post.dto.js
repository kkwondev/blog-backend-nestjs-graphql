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
exports.DeletePostOutput = exports.DeletePostInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const output_dto_1 = require("../../common/interfaces/output.dto");
let DeletePostInput = class DeletePostInput {
};
__decorate([
    graphql_1.Field((type) => Number),
    __metadata("design:type", Number)
], DeletePostInput.prototype, "id", void 0);
DeletePostInput = __decorate([
    graphql_1.InputType()
], DeletePostInput);
exports.DeletePostInput = DeletePostInput;
let DeletePostOutput = class DeletePostOutput extends output_dto_1.CoreOutput {
};
DeletePostOutput = __decorate([
    graphql_1.ObjectType()
], DeletePostOutput);
exports.DeletePostOutput = DeletePostOutput;
//# sourceMappingURL=delete-post.dto.js.map