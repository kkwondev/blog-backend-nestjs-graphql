import { User } from './users.entity';
export declare class SocialAccount {
    id: number;
    provider: string;
    social_id: string;
    user_id: number;
    user: User;
}
