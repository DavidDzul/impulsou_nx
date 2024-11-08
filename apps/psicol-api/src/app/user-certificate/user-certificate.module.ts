import { Module } from '@nestjs/common';
import { UserCertificateResolver } from './user-certificate.resolver';
import { UserCertificateDbModule, UsersDbModule } from '@impulsou/services';
import { SharedModule } from '@impulsou/shared';

@Module({
  imports: [UserCertificateDbModule, UsersDbModule, SharedModule],
  providers: [UserCertificateResolver],
})
export class UserCertificateModule {}
