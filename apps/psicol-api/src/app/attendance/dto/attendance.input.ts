import { Field, InputType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';

@InputType()
export class AttendanceInput {
  @Field()
  @IsString()
  @Length(9, 9)
  enrollment: string;
}
