import { Repository } from 'typeorm';
import { CreateUserDto } from './interfaces/create-user.dto';
import { User } from './entities/users.entity';
import { SocialAccount } from './entities/socialAccount.entity';
import { GoogleCheckOutput } from './interfaces/google-user.dto';
export declare class UsersService {
    private readonly userRepository;
    private readonly socialRepository;
    constructor(userRepository: Repository<User>, socialRepository: Repository<SocialAccount>);
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User | undefined>;
    getUserByEmail(email: string): Promise<User>;
    createUser(user: CreateUserDto): Promise<User>;
    validateGoogleAccount(googleUser: GoogleCheckOutput): Promise<User>;
}
