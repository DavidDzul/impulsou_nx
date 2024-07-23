import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import {
  UsersDbModule,
  AttendanceDbModule,
  PhotosDbModule,
  ConstancyDbModule,
} from '@impulsou/services';

@Module({
  imports: [
    UsersDbModule,
    AttendanceDbModule,
    PhotosDbModule,
    ConstancyDbModule,
  ],
  providers: [UsersResolver],
})
export class UsersModule {}
