import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { User } from './entities/users.entity';
import { InputUser } from './interfaces/user.input';
import { UsersService } from './users.service';
@Resolver('User')
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(() => [User])
  @UseGuards(AuthGuard)
  async getUsers() {
    return await this.userService.findAll();
  }

  @Query(() => User)
  @UseGuards(AuthGuard)
  async getUser(@Args('id') id: number) {
    return await this.userService.findOne(id);
  }

  @Mutation(() => User)
  // @UseGuards(AuthGuard)
  async createUser(@Args('user') user: InputUser) {
    return await this.userService.createUser(user);
  }

  @Query(() => User)
  @UseGuards(AuthGuard)
  currentUser(@AuthUser() authUser: User) {
    return authUser;
  }
}
