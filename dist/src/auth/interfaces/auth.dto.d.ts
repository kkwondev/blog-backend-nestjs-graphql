import { User } from 'src/users/entities/users.entity';
export declare class AuthResponseDto {
    readonly access_token: string;
    user: User;
}
