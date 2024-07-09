import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Module } from 'nestjs-s3';
import { services } from './services';

@Module({
  imports: [
    S3Module.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        config: {
          accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
          secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'),
          region: configService.get<string>('AWS_DEFAULT_REGION'),
          s3ForcePathStyle: true,
          signatureVersion: 'v4',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [...services],
  exports: [...services],
})
export class SharedModule {}
