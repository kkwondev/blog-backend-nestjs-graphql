import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './interfaces/create-user.dto';
import { User } from './users.entity';

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
   * 유저 생성
   * @param user
   * @returns User
   */
  async createUser(user: CreateUserDto): Promise<User> {
    return await this.userRepository.save(user);
  }
}
