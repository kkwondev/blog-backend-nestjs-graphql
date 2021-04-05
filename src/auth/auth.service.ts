import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { AuthResponseDto } from './interfaces/auth.dto';
import { InputAuth } from './interfaces/auth.input';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private JwtService: JwtService,
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
      access_token: this.JwtService.sign(payload),
    };
  }
}
