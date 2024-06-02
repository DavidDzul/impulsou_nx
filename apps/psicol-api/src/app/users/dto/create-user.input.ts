import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import { UserTypeEnum, CampusEnum } from '@impulsou/models';

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

  @Field(() => CampusEnum)
  @IsOptional()
  @IsEnum(CampusEnum)
  campus: CampusEnum;

  @Field(() => UserTypeEnum)
  @IsOptional()
  @IsEnum(UserTypeEnum)
  role: UserTypeEnum;
}
