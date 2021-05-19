import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class GoogleGuard implements CanActivate {
    constructor();
    canActivate(context: ExecutionContext): Promise<boolean>;
    validateRequest(ctx: any): Promise<boolean>;
}
