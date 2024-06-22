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
import { CampusEnum } from '@impulsou/models';

@InputType()
export class CreateGenerationInput {
  @Field(() => Int)
  @IsNumber()
  generation: number;

  @Field()
  @IsBoolean()
  inProgress: boolean;

  @Field(() => CampusEnum)
  @IsOptional()
  @IsEnum(CampusEnum)
  campus: CampusEnum;
}
