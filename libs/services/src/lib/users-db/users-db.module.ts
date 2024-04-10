import { User } from '@impulsou/models';
import { Module } from '@nestjs/common';

import { ServicesModule } from '../services.module';
import { UsersDbService } from './users-db.service';

@Module({
  imports: [ServicesModule.forFeature([User])],
  providers: [UsersDbService],
  exports: [UsersDbService],
})
export class UsersDbModule {}
