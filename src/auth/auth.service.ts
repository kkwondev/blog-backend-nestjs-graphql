import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { google } from 'googleapis';
import { GoogleCheckOutput } from 'src/users/interfaces/google-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthResponseDto } from './interfaces/auth.dto';
import { InputAuth } from './interfaces/auth.input';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 유저 확인
   * @param email
   * @param pass
   */
  async validateUser(email: string, pass: string) {
    const user = await this.usersService.getUserByEmail(email);
    if (user) {
      const { password, ...result } = user;
      const match = await bcrypt.compare(pass, password);
      if (match) {
        return result;
      }
    }
    return null;
  }
  /**
   * 유저 로그인
   * @param user
   */

  async login(user: InputAuth): Promise<AuthResponseDto> {
    const validateUser = await this.validateUser(user.email, user.password);
    if (!validateUser) {
      throw new HttpException('아이디 비밀번호 확인', HttpStatus.UNAUTHORIZED);
    }
    const payload = { email: validateUser.email, id: validateUser.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: validateUser,
    };
  }

  async googleLogin(googleUser: GoogleCheckOutput) {
    const socialAccount = await this.usersService.validateGoogleAccount(
      googleUser,
    );
    try {
      const payload = { email: socialAccount.email, id: socialAccount.id };
      return {
        access_token: this.jwtService.sign(payload),
        user: socialAccount,
      };
    } catch (e) {
      return e;
    }
  }

  async validateGoogle(access_token: string) {
    try {
      const { data } = await google.people('v1').people.get({
        access_token: access_token,
        resourceName: 'people/me',
        personFields: 'names,emailAddresses,photos',
      });

      const profile = {
        socialId: data.resourceName?.replace('people/', '') ?? '',
        email: data.emailAddresses?.[0].value ?? '',
        photo: data.photos?.[0].url ?? null,
        displayName: data.names?.[0].displayName?.split(' (')[0] ?? '',
      };
      return this.googleLogin(profile);
    } catch (e) {
      throw new HttpException(
        {
          status: 401,
          error: 'Google Login Error',
          message: 'Failed to retrieve google profile',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
