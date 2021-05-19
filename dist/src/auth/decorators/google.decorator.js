"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleUser = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
exports.GoogleUser = common_1.createParamDecorator((data, context) => {
    const gqlContext = graphql_1.GqlExecutionContext.create(context).getContext();
    const google = gqlContext.google;
    return google;
});
//# sourceMappingURL=google.decorator.js.map