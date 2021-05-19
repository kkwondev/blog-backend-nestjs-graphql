import { User } from './entities/users.entity';
import { InputUser } from './interfaces/user.input';
import { UsersService } from './users.service';
export declare class UsersResolver {
    private readonly userService;
    constructor(userService: UsersService);
    getUsers(): Promise<User[]>;
    getUser(id: number): Promise<User>;
    createUser(user: InputUser): Promise<User>;
    currentUser(authUser: User): User;
}
