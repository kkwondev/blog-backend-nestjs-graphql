import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ImageService } from './image.service';

@Controller('api/v1')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  async upload(@Req() request, @Res() response) {
    try {
      await this.imageService.fileupload(request, response);
    } catch (error) {
      return response
        .status(500)
        .json(`Failed to upload image file: ${error.message}`);
    }
  }
}
