import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateUserDto } from './interfaces/create-user.dto';
import { InputUser } from './interfaces/user.input';
import { UsersService } from './users.service';
@Resolver('User')
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(() => [CreateUserDto])
  @UseGuards(AuthGuard)
  async getUsers() {
    return await this.userService.findAll();
  }

  @Query(() => CreateUserDto)
  @UseGuards(AuthGuard)
  async getUser(@Args('id') id: number) {
    return await this.userService.findOne(id);
  }

  @Mutation(() => CreateUserDto)
  @UseGuards(AuthGuard)
  async createUser(@Args('user') user: InputUser) {
    return await this.userService.createUser(user);
  }
}
