import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
export declare class AuthGuard implements CanActivate {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    validateRequest(ctx: any): Promise<boolean>;
    private unAuthorized;
}
