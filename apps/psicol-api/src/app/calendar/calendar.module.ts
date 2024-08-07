import { Module } from '@nestjs/common';
import { CalendarResolver } from './calendar.resolver';
import { CalendarDbModule, UsersDbModule } from '@impulsou/services';

@Module({
  imports: [CalendarDbModule, UsersDbModule],
  providers: [CalendarResolver],
})
export class CalendarModule {}
