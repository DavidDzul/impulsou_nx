import { Module } from '@nestjs/common';
import { AuthDbService } from './auth-db.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy, LocalStrategy } from './strategies/';
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
  providers: [AuthDbService, LocalStrategy, JwtStrategy],
  exports: [AuthDbService, JwtModule],
})
export class AuthDbModule {}
