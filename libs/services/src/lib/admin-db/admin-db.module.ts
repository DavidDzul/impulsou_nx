import { Admin } from '@impulsou/models';
import { Module } from '@nestjs/common';

import { ServicesModule } from '../services.module';
import { AdminDbService } from './admin-db.service';

@Module({
  imports: [ServicesModule.forFeature([Admin])],
  providers: [AdminDbService],
  exports: [AdminDbService],
})
export class AdminDbModule {}
