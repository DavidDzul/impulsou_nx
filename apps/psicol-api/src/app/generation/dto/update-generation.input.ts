// NestJS Modules
import { Field, InputType, Int, OmitType, PartialType } from '@nestjs/graphql';
// Third-Party Libraries
import { IsBoolean, IsOptional, IsString } from 'class-validator';

// Dto's
import { CreateGenerationInput } from './create-generation.input';

@InputType()
export class UpdateGenerationInput extends PartialType(CreateGenerationInput) {
  @Field(() => Int)
  id: number;
}
