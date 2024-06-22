import { Module } from '@nestjs/common';
import { GenerationResolver } from './generation.resolver';
import { GenerationDbModule } from '@impulsou/services';

@Module({
  imports: [GenerationDbModule],
  providers: [GenerationResolver],
})
export class GenerationModule {}
