import { Photo } from '@impulsou/models';
import { Module } from '@nestjs/common';

import { ServicesModule } from '../services.module';
import { PhotosDbService } from './photo-db.service';

@Module({
  imports: [ServicesModule.forFeature([Photo])],
  providers: [PhotosDbService],
  exports: [PhotosDbService],
})
export class PhotosDbModule {}
