import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './interfaces/create-user.dto';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  /**
   * 전체 유저 조회
   * @returns User[]
   */

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  /**
   * 유저 이메일 조회
   * @param email
   * @returns user | undefiend
   */

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ email });
    return user;
  }

  /**
   * 유저 생성
   * @param user
   * @returns User
   */
  async createUser(user: CreateUserDto): Promise<User> {
    const comfirm = await this.getUserByEmail(user.email);
    if (comfirm)
      throw new HttpException(
        '이미 생성된 이메일 입니다.',
        HttpStatus.NOT_FOUND,
      );
    const hashPassword = await bcrypt.hash(user.password, 10);
    return await this.userRepository.save({
      email: user.email,
      password: hashPassword,
      nickname: user.nickname,
    });
  }
}
