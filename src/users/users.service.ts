import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './interfaces/create-user.dto';
import { User } from './entities/users.entity';
import * as bcrypt from 'bcrypt';
import { SocialAccount } from './entities/socialAccount.entity';
import { GoogleCheckOutput } from './interfaces/google-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(SocialAccount)
    private readonly socialRepository: Repository<SocialAccount>,
  ) {}

  /**
   * 전체 유저 조회
   * @returns User[]
   */

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  /**
   * 하나 유저 조회
   * @param id
   * @returns User |
   */

  async findOne(id: number): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ id });
    if (!user)
      throw new HttpException('없는 회원입니다.', HttpStatus.NOT_FOUND);
    return user;
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
   * 유저 생성 (일반 유저)
   * @param user
   * @returns User
   */
  async createUser(user: CreateUserDto): Promise<User> {
    const comfirm = await this.getUserByEmail(user.email);
    if (comfirm)
      throw new HttpException(
        '이미 생성된 이메일 입니다.',
        HttpStatus.BAD_REQUEST,
      );
    const hashPassword = await bcrypt.hash(user.password, 10);
    return await this.userRepository.save({
      email: user.email,
      password: hashPassword,
      nickname: user.nickname,
    });
  }

  /**
   * validate Google Account
   * @param googleUser
   * @returns User
   */

  async validateGoogleAccount(googleUser: GoogleCheckOutput) {
    const googleAccout = await this.socialRepository.findOne({
      where: {
        social_id: googleUser.socialId,
      },
    });
    console.log(googleAccout);
    if (googleAccout) {
      return await this.userRepository.findOne({
        where: {
          id: googleAccout.user_id,
        },
      });
    } else {
      // const newUser = await this.userRepository.save({
      //   email: googleUser.email,
      //   nickname: googleUser.displayName,
      //   photo_url: googleUser.photo,
      // });
      // const sosialGoogle = this.socialRepository.create(new SocialAccount());
      // sosialGoogle.user = newUser;
      // sosialGoogle.provider = 'google';
      // sosialGoogle.social_id = googleUser.socialId;
      // await this.socialRepository.save(sosialGoogle);
      // return newUser;
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: '현재 회원가입을 할수 없는 기간입니다.',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
