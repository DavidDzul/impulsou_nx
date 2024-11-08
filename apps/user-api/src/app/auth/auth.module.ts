import {
  AuthDbModule,
  LocalStrategy,
  UsersDbModule,
  JwtStrategy,
} from '@impulsou/services';
import { Module } from '@nestjs/common';

import { AuthResolver } from './auth.resolver';

@Module({
  imports: [AuthDbModule, UsersDbModule],
  providers: [AuthResolver, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
