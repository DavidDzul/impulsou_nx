import { Module } from '@nestjs/common';
import { ConstancyResolver } from './constancy.resolver';
import { ConstancyDbModule, UsersDbModule } from '@impulsou/services';
import { SharedModule } from '@impulsou/shared';

@Module({
  imports: [ConstancyDbModule, UsersDbModule, SharedModule],
  providers: [ConstancyResolver],
})
export class ConstancyModule {}
