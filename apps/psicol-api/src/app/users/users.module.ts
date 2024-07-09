import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import {
  UsersDbModule,
  AttendanceDbModule,
  PhotosDbModule,
} from '@impulsou/services';

@Module({
  imports: [UsersDbModule, AttendanceDbModule, PhotosDbModule],
  providers: [UsersResolver],
})
export class UsersModule {}
