import { Req, Res, Injectable, HttpStatus } from '@nestjs/common';
import * as multer from 'multer';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import 'dotenv/config';
const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
const s3 = new AWS.S3();
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
@Injectable()
export class ImageService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  /**
   * 이미지 업로드
   * @param req
   * @param res
   */
  async fileupload(@Req() req, @Res() res) {
    try {
      this.upload(req, res, function (error) {
        if (error) {
          console.log(error);
          return res.status(404).json({
            status: HttpStatus.NOT_FOUND,
            eroor: `Failed to upload image file: ${error}`,
          });
        }
        if (!req.files[0]) {
          return res.status(404).json({
            status: HttpStatus.NOT_FOUND,
            eroor: 'Not upload file',
          });
        }
        console.log(req.files);
        return res.status(201).json({
          status: HttpStatus.CREATED,
          file: req.files[0].location,
        });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `Failed to upload image file: ${error}`,
      });
    }
  }
  upload = multer({
    fileFilter: function fileFilter(req, file, cb) {
      if (file.mimetype.substring(0, 'image'.length) == 'image') {
        cb(null, true);
      } else {
        cb(null, false);
      }
    },
    storage: multerS3({
      s3: s3,
      bucket: AWS_S3_BUCKET_NAME,
      acl: 'public-read',
      key: function (request, file, cb) {
        cb(null, `uploads/${Date.now().toString()} - ${file.originalname}`);
      },
    }),
    limits: { fileSize: 20 * 1024 * 1024 },
  }).array('upload', 1);
}
