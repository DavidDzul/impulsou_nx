import { Calendar } from '@impulsou/models';
import { Module } from '@nestjs/common';

import { ServicesModule } from '../services.module';
import { CalendarDbService } from './calendar-db.service';

@Module({
  imports: [ServicesModule.forFeature([Calendar])],
  providers: [CalendarDbService],
  exports: [CalendarDbService],
})
export class CalendarDbModule {}
