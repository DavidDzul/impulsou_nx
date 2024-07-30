import {
  Autorization,
  InternalServerError,
  NotFoundError,
  SuccessMessage,
} from '@impulsou/models';
import { AutorizationDbService, UsersDbService } from '@impulsou/services';
import { GqlAuthGuard } from '@impulsou/shared';
import {
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Resolver,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import dayjs from 'dayjs';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { v4 as uuidv4 } from 'uuid';

import { CreateAutorizationInput } from './dto';
import { EntityNotFoundError } from 'typeorm';

@Resolver(() => Autorization)
export class AutorizationResolver {
  private readonly logger = new Logger(AutorizationResolver.name);
  constructor(
    private readonly autorizationDbService: AutorizationDbService,
    private readonly usersDbService: UsersDbService
  ) {}

  @Mutation(() => Autorization)
  @UseGuards(GqlAuthGuard)
  async createAutorization(
    @Args('createAutorizationInput')
    createAutorizationInput: CreateAutorizationInput
  ) {
    try {
      this.logger.log(
        `create autorization with user id ${createAutorizationInput.userId}.`
      );
      const date = dayjs().format('YYYY-MM-DD');
      const autorization = await this.autorizationDbService.create({
        ...createAutorizationInput,
        date,
      });
      return autorization;
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        this.logger.log('Error creating autorization. Id not founded.');
        throw new NotFoundException({
          status: 404,
          message: NotFoundError.USER,
        });
      }
      this.logger.error('Error finding user.', e);
      throw new InternalServerErrorException({
        status: 500,
        message: InternalServerError.SERVER,
      });
    }
  }
}
