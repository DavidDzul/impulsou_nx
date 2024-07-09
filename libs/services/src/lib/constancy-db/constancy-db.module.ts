import { Constancy } from '@impulsou/models';
import { Module } from '@nestjs/common';

import { ServicesModule } from '../services.module';
import { ConstancyDbService } from './constancy-db.service';

@Module({
  imports: [ServicesModule.forFeature([Constancy])],
  providers: [ConstancyDbService],
  exports: [ConstancyDbService],
})
export class ConstancyDbModule {}
