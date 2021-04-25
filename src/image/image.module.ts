import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
