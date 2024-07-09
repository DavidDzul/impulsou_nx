import {
  UsersDbModule,
  PhotosDbModule,
  ConstancyDbModule,
} from '@impulsou/services';
import { SharedModule } from '@impulsou/shared';
import { Module } from '@nestjs/common';

import { FilesController } from './files.controller';

@Module({
  imports: [SharedModule, UsersDbModule, PhotosDbModule, ConstancyDbModule],
  controllers: [FilesController],
})
export class FilesModule {}
