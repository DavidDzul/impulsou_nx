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
} from 'class-validator';
import { CauseEmun, StatusAutorizationEmun } from '@impulsou/models';

@InputType()
export class CreateAutorizationInput {
  @Field(() => Int)
  @IsNumber()
  userId: number;

  @Field(() => Int)
  @IsNumber()
  percentage: number;

  @Field(() => StatusAutorizationEmun)
  @IsEnum(StatusAutorizationEmun)
  status: StatusAutorizationEmun;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  previousPayment?: boolean;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  numberMonths?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  previousMonths?: string;

  @Field(() => CauseEmun, { nullable: true })
  @IsOptional()
  @IsEnum(CauseEmun)
  cause?: CauseEmun;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  otherCause?: string;
}
