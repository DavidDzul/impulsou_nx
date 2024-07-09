import { Module } from '@nestjs/common';
import { AuthDbService } from './auth-db.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategies/';
import { PassportModule } from '@nestjs/passport';
import { AdminDbModule } from '../admin-db';
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
    AdminDbModule,
  ],
  providers: [AuthDbService, LocalStrategy],
  exports: [AuthDbService, JwtModule, LocalStrategy],
})
export class AuthDbModule {}
