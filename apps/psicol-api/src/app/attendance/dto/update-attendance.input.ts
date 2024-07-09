// NestJS Modules
import { Field, InputType, Int, OmitType, PartialType } from '@nestjs/graphql';
// Third-Party Libraries
import { IsBoolean, IsOptional, IsString } from 'class-validator';

// Dto's
import { CreateAttendanceInput } from './create-attendance.input';

@InputType()
export class UpdateAttendanceInput extends PartialType(CreateAttendanceInput) {
  @Field(() => Int)
  id: number;
}
