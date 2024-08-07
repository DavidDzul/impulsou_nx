import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmEntities } from '@impulsou/models';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GenerationModule } from './generation/generation.module';
import { AttendanceModule } from './attendance/attendance.module';
import { PhotosModule } from './photos/photos.module';
import { FilesModule } from './files/files.module';
import { ConstancyModule } from './constancy/constancy.module';
import { AutorizationModule } from './autorization/autorization.module';
import { CalendarModule } from './calendar/calendar.module';

export const PsicoModules = [
  AuthModule,
  UsersModule,
  GenerationModule,
  AttendanceModule,
  PhotosModule,
  FilesModule,
  ConstancyModule,
  AutorizationModule,
  CalendarModule,
];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.get<'postgres'>('DB_TYPE'),
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          supportBigNumbers: true,
          bigNumberStrings: false,
          autoLoadEntities: false,
          entities: [...typeOrmEntities],
          synchronize: configService.get<boolean>('DB_SYNC'),
          legacySpatialSupport: false,
          debug: false,
        };
      },
      inject: [ConfigService],
    }),
    ...PsicoModules,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => ({
        autoSchemaFile: join(process.cwd(), 'schemas/psicol-schema.gql'),
        playground: false,
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        path: '/graphql/psicol',
        include: [...PsicoModules],
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
