import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

import { ServicesModuleAsyncOptions } from './interfaces';

@Module({
  imports: [],
  exports: [],
})
export class ServicesModule {
  public static forRootAsync(
    options: ServicesModuleAsyncOptions
  ): DynamicModule {
    return {
      module: ServicesModule,
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: options.useFactory || undefined,
          useClass: options.useClass || undefined,
          useExisting: options.useExisting || undefined,
          inject: options.inject || [],
        }),
        ...(options.imports || []),
      ],
      providers: [],
      exports: [TypeOrmModule],
    };
  }
  public static forFeature(entities: EntityClassOrSchema[]): DynamicModule {
    return {
      module: ServicesModule,
      imports: [TypeOrmModule.forFeature(entities)],
      exports: [TypeOrmModule],
    };
  }
}
