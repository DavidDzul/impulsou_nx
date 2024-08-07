import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsISO8601,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateCalendarInput {
  @Field()
  @IsString()
  name: string;

  @Field(() => Int)
  @IsNumber()
  generationId: number;

  @Field()
  @IsISO8601()
  date: string;
}
