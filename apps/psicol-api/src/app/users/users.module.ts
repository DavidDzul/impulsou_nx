import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import {
  UsersDbModule,
  AttendanceDbModule,
  PhotosDbModule,
  UserCertificateDbModule,
  AutorizationDbModule,
} from '@impulsou/services';

@Module({
  imports: [
    UsersDbModule,
    AttendanceDbModule,
    PhotosDbModule,
    UserCertificateDbModule,
    AutorizationDbModule,
  ],
  providers: [UsersResolver],
})
export class UsersModule {}
