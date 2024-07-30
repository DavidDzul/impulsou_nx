import { Autorization } from '@impulsou/models';
import { Module } from '@nestjs/common';

import { ServicesModule } from '../services.module';
import { AutorizationDbService } from './autorization-db.service';

@Module({
  imports: [ServicesModule.forFeature([Autorization])],
  providers: [AutorizationDbService],
  exports: [AutorizationDbService],
})
export class AutorizationDbModule {}
