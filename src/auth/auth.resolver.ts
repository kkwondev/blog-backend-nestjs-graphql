import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { GoogleCheckOutput } from 'src/users/interfaces/google-user.dto';
import { AuthService } from './auth.service';
import { GoogleUser } from './decorators/google.decorator';
import { GoogleGuard } from './guards/google.guard';
import { AuthResponseDto } from './interfaces/auth.dto';
import { InputAuth } from './interfaces/auth.input';

@Resolver('auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponseDto)
  async login(@Args('user') user: InputAuth) {
    return this.authService.login(user);
  }

  @Query(() => AuthResponseDto)
  @UseGuards(GoogleGuard)
  async googleLogin(@GoogleUser() googleUser: GoogleCheckOutput) {
    return this.authService.googleLogin(googleUser);
  }
}
