import { ModuleMetadata, Type } from '@nestjs/common';

import { ServicesModuleOptions, ServicesModuleOptionsFactory } from './';

export interface ServicesModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useExisting?: Type<ServicesModuleOptionsFactory>;
  useClass?: Type<ServicesModuleOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<ServicesModuleOptions> | ServicesModuleOptions;
}
