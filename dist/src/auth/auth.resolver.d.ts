import { GoogleCheckOutput } from 'src/users/interfaces/google-user.dto';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './interfaces/auth.dto';
import { InputAuth } from './interfaces/auth.input';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    login(user: InputAuth): Promise<AuthResponseDto>;
    googleLogin(googleUser: GoogleCheckOutput): Promise<any>;
}
