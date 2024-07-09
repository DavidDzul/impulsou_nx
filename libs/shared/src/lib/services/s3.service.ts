import { generatePrefix } from '@impulsou/models';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as dayjs from 'dayjs';
import { FileUpload } from 'graphql-upload';
import { InjectS3, S3 } from 'nestjs-s3';

@Injectable()
export class S3Service {
  private readonly logger = new Logger(S3Service.name);
  constructor(
    @InjectS3() private readonly s3: S3,
    private readonly configService: ConfigService
  ) {}

  uploadRecordFile(file: FileUpload, userId: number) {
    const getExtension = file.filename.split('.').pop();
    const removeAccents = file.filename
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const withoutExtension = removeAccents.replace(/\.[^.]*$/, '');
    const cleanName = withoutExtension.replace(/[\W]+/g, '');
    const fileName = `${generatePrefix()}_${cleanName}.${getExtension}`;
    return this.s3
      .upload({
        Key: `${userId}/records/${fileName}`,
        Bucket: this.configService.get('AWS_BUCKET'),
        Body: file.createReadStream(),
        ContentType: file.mimetype,
        Metadata: { 'Content-Type': file.mimetype },
      })
      .promise();
  }

  async uploadImageFile(file: FileUpload, userId: number) {
    return this.s3
      .upload({
        Key: `${userId}/images/${generatePrefix()}_${file.filename}`,
        Bucket: this.configService.get('AWS_BUCKET'),
        Body: file.createReadStream(),
        ContentType: file.mimetype,
        Metadata: { 'Content-Type': file.mimetype },
      })
      .promise();
  }

  getFile(url: string) {
    return this.s3
      .getObject({
        Bucket: this.configService.get('AWS_BUCKET'),
        Key: url,
      })
      .promise();
  }

  deleteFile(url: string) {
    return this.s3
      .deleteObject({
        Key: url,
        Bucket: this.configService.get('AWS_BUCKET'),
      })
      .promise();
  }
}
