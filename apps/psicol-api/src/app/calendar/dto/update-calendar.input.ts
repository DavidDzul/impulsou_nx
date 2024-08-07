// NestJS Modules
import { Field, InputType, Int, OmitType, PartialType } from '@nestjs/graphql';
// Third-Party Libraries
import { IsBoolean, IsOptional, IsString } from 'class-validator';

// Dto's
import { CreateCalendarInput } from './create-calendar.input';

@InputType()
export class UpdateCalendarInput extends PartialType(CreateCalendarInput) {
  @Field(() => Int)
  id: number;
}
