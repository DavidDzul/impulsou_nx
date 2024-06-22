import { Attendance } from '@impulsou/models';
import { Module } from '@nestjs/common';

import { ServicesModule } from '../services.module';
import { AttendanceDbService } from './attendance-db.service';

@Module({
  imports: [ServicesModule.forFeature([Attendance])],
  providers: [AttendanceDbService],
  exports: [AttendanceDbService],
})
export class AttendanceDbModule {}
