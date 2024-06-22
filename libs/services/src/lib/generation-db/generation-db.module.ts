import { Generation } from '@impulsou/models';
import { Module } from '@nestjs/common';

import { ServicesModule } from '../services.module';
import { GenerationDbService } from './generation-db.service';

@Module({
  imports: [ServicesModule.forFeature([Generation])],
  providers: [GenerationDbService],
  exports: [GenerationDbService],
})
export class GenerationDbModule {}
