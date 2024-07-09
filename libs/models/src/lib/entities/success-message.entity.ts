// NestJS Modules
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SuccessMessage {
  @Field()
  message: string;
}
