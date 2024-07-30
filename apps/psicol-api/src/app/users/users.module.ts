import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import {
  UsersDbModule,
  AttendanceDbModule,
  PhotosDbModule,
  ConstancyDbModule,
  AutorizationDbModule,
} from '@impulsou/services';

@Module({
  imports: [
    UsersDbModule,
    AttendanceDbModule,
    PhotosDbModule,
    ConstancyDbModule,
    AutorizationDbModule,
  ],
  providers: [UsersResolver],
})
export class UsersModule {}
