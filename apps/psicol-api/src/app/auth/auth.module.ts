import {
  AuthDbModule,
  LocalStrategy,
  AdminDbModule,
  JwtStrategy,
} from '@impulsou/services';
import { Module } from '@nestjs/common';

import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET_KEY'),
          signOptions: {
            expiresIn: configService.get<string | number>(
              'JWT_EXPIRATION_TIME'
            ),
          },
        };
      },
      inject: [ConfigService],
    }),
    PassportModule,
    AuthDbModule,
    AdminDbModule,
  ],
  providers: [AuthResolver, LocalStrategy, JwtStrategy],
  exports: [JwtModule],
})
export class AuthModule {}
