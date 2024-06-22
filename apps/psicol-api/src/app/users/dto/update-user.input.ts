// NestJS Modules
import { Field, InputType, Int, OmitType, PartialType } from '@nestjs/graphql';
// Third-Party Libraries
import { IsBoolean, IsOptional, IsString } from 'class-validator';

// Dto's
import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(
  OmitType(CreateUserInput, ['enrollment', 'campus'] as const)
) {
  @Field(() => Int)
  id: number;
}
