import {
  AuthDbModule,
  LocalStrategy,
  AdminDbModule,
  JwtStrategy,
} from '@impulsou/services';
import { Module } from '@nestjs/common';

import { AuthResolver } from './auth.resolver';

@Module({
  imports: [AuthDbModule, AdminDbModule],
  providers: [AuthResolver, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
