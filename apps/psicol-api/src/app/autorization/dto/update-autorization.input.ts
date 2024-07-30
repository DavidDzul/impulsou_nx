// NestJS Modules
import { Field, InputType, Int, OmitType, PartialType } from '@nestjs/graphql';
// Third-Party Libraries
import { IsBoolean, IsOptional, IsString } from 'class-validator';

// Dto's
import { CreateAutorizationInput } from './create-autorization.input';

@InputType()
export class UpdateAutorizationInput extends PartialType(
  CreateAutorizationInput
) {
  @Field(() => Int)
  id: number;
}
