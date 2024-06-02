import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersDbModule } from '@impulsou/services';

@Module({
  imports: [UsersDbModule],
  providers: [UsersResolver],
})
export class UsersModule {}
