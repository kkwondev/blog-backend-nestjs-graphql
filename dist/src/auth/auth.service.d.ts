import { JwtService } from '@nestjs/jwt';
import { GoogleCheckOutput } from 'src/users/interfaces/google-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthResponseDto } from './interfaces/auth.dto';
import { InputAuth } from './interfaces/auth.input';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<{
        email: string;
        photo_url?: string;
        nickname: string;
        posts: import("../posts/entities/posts.entity").Post[];
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(user: InputAuth): Promise<AuthResponseDto>;
    googleLogin(googleUser: GoogleCheckOutput): Promise<any>;
}
