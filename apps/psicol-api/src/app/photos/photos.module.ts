import { Module } from '@nestjs/common';
import { PhotosResolver } from './photos.resolver';
import { PhotosDbModule, UsersDbModule } from '@impulsou/services';
import { SharedModule } from '@impulsou/shared';

@Module({
  imports: [PhotosDbModule, UsersDbModule, SharedModule],
  providers: [PhotosResolver],
})
export class PhotosModule {}
