import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MinLength,
  IsISO8601,
} from 'class-validator';
import { ReasonEmun } from '@impulsou/models';

@InputType()
export class CreateAttendanceInput {
  @Field(() => Int)
  @IsNumber()
  userId: number;

  @Field()
  @IsISO8601()
  date: string;

  @Field()
  @IsBoolean()
  @IsOptional()
  delay?: boolean;

  @Field()
  @IsBoolean()
  @IsOptional()
  justifiedDelay?: boolean;

  @Field()
  @IsBoolean()
  @IsOptional()
  justifiedAbsence?: boolean;

  @Field(() => ReasonEmun, { nullable: true })
  @IsOptional()
  @IsEnum(ReasonEmun)
  reason?: ReasonEmun;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  descripcion?: string;
}
