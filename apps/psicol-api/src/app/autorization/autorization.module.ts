import { Module } from '@nestjs/common';
import { AutorizationResolver } from './autorization.resolver';
import { AutorizationDbModule, UsersDbModule } from '@impulsou/services';

@Module({
  imports: [AutorizationDbModule, UsersDbModule],
  providers: [AutorizationResolver],
})
export class AutorizationModule {}
