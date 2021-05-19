import { ImageService } from './image.service';
export declare class ImageController {
    private readonly imageService;
    constructor(imageService: ImageService);
    upload(request: any, response: any): Promise<any>;
}
