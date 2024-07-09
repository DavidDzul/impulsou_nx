import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import { CampusEnum, RoleUser } from '@impulsou/models';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  firstName: string;

  @Field()
  @IsString()
  lastName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @MinLength(6)
  password: string;

  @Field()
  @IsString()
  @Length(9, 9)
  enrollment: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(13, 13)
  phone?: string;

  @Field(() => Int)
  @IsNumber()
  generationId: number;

  @Field(() => CampusEnum)
  @IsOptional()
  @IsEnum(CampusEnum)
  campus: CampusEnum;

  @Field(() => RoleUser)
  @IsEnum(RoleUser)
  role: RoleUser;
}
