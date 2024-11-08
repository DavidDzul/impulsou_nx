import { UserCertificate } from '@impulsou/models';
import { Module } from '@nestjs/common';

import { ServicesModule } from '../services.module';
import { UserCertificateDbService } from './user-certificate-db.service';

@Module({
  imports: [ServicesModule.forFeature([UserCertificate])],
  providers: [UserCertificateDbService],
  exports: [UserCertificateDbService],
})
export class UserCertificateDbModule {}
