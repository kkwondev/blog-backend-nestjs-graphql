import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { SocialAccount } from './entities/socialAccount.entity';
import { User } from './entities/users.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User, SocialAccount]),
  ],
  providers: [UsersResolver, UsersService, AuthService],
  exports: [UsersService],
})
export class UsersModule {}
