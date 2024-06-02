import { Admin, User } from '@impulsou/models';
import {
  InternalServerErrorException,
  Logger,
  NotFoundException,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UsersDbService } from '@impulsou/services';
import { CurrentUser, GqlAuthGuard } from '@impulsou/shared';

import { CreateUserInput } from './dto';
import { EntityNotFoundError } from 'typeorm';
import { NotFoundError } from 'rxjs';

@Resolver(() => User)
export class UsersResolver {
  private readonly logger = new Logger(UsersResolver.name);
  constructor(private readonly usersDbService: UsersDbService) {}

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async createUser(
    @CurrentUser() user: User,
    @Args('createUserInput') createUserInput: CreateUserInput
  ) {
    try {
      this.logger.log('Create user');
      const retunUser = await this.usersDbService.create({
        ...createUserInput,
      });
      return retunUser;
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        this.logger.log('Error finding user. Id not founded.');
        throw new NotFoundException({
          status: 404,
          message: 'Error al crear el usuario. Intente más tarde.',
        });
      }
      this.logger.error('Error finding user.', e);
      throw new InternalServerErrorException({
        status: 500,
        message: 'Error de servidor. Intente mas tarde.',
      });
    }
  }
}
