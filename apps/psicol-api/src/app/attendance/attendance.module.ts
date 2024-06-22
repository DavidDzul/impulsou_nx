import { Module } from '@nestjs/common';
import { AttendanceResolver } from './attendance.resolver';
import { AttendanceDbModule, UsersDbModule } from '@impulsou/services';

@Module({
  imports: [AttendanceDbModule, UsersDbModule],
  providers: [AttendanceResolver],
})
export class AttendanceModule {}
