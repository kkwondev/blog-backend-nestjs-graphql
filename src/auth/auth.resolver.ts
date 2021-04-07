import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthResponseDto } from './interfaces/auth.dto';
import { InputAuth } from './interfaces/auth.input';

@Resolver('auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponseDto)
  async login(@Args('user') user: InputAuth) {
    return this.authService.login(user);
  }
}
