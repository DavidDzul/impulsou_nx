import {
  Admin,
  User,
  InternalServerError,
  NotFoundError,
  CampusEnum,
  BadRequestError,
} from '@impulsou/models';
import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersDbService } from '@impulsou/services';
import { CurrentUser, GqlAuthGuard } from '@impulsou/shared';

import { CreateUserInput, UpdateUserInput } from './dto';
import { EntityNotFoundError } from 'typeorm';

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
      if (
        await this.usersDbService.findOne(
          { where: { email: createUserInput.email } },
          false
        )
      ) {
        this.logger.log('Register User Fail: Duplicate Email');
        throw new BadRequestException({
          status: 400,
          message: BadRequestError.EMAIL_USED,
        });
      }

      if (
        await this.usersDbService.findOne(
          { where: { enrollment: createUserInput.enrollment } },
          false
        )
      ) {
        this.logger.log('Register User Fail: Duplicate Enrollment');
        throw new BadRequestException({
          status: 400,
          message: BadRequestError.ENROLLMENT_USED,
        });
      }

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
        message: InternalServerError.SERVER,
      });
    }
  }

  @Query(() => [User])
  @UseGuards(GqlAuthGuard)
  async findAllUsers(
    @Args('campus', { type: () => CampusEnum }) campus: CampusEnum,
    @Args('generation', { type: () => Int }) generation: number
  ) {
    try {
      this.logger.log('Finding all users-db.');
      const allUsers = await this.usersDbService.findAll({
        where: { campus, generationId: generation },
      });
      return allUsers;
    } catch (e) {
      this.logger.error('Error finding all users-db.', e);
      throw new InternalServerErrorException({
        status: 500,
        message: InternalServerError.SERVER,
      });
    }
  }

  @Mutation(() => [User])
  @UseGuards(GqlAuthGuard)
  async testFindUsers(
    @Args('campus', { type: () => CampusEnum }) campus: CampusEnum,
    @Args('generation', { type: () => Int }) generation: number
  ) {
    try {
      this.logger.log('Finding all users-db.');
      const allUsers = await this.usersDbService.findAll({
        where: { campus, generationId: generation },
      });
      return allUsers;
    } catch (e) {
      this.logger.error('Error finding all users-db.', e);
      throw new InternalServerErrorException({
        status: 500,
        message: InternalServerError.SERVER,
      });
    }
  }

  @Query(() => User)
  async findOneUser(@Args('id', { type: () => Int }) id: number) {
    try {
      this.logger.log(`Finding user with id: ${id}.`);
      return await this.usersDbService.findOne({ where: { id } });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        this.logger.log('Error finding user. Id not founded.');
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

  @Mutation(() => User)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    try {
      this.logger.log(`Finding user with id: ${updateUserInput.id}.`);
      const user = await this.usersDbService.findOne({
        where: { id: updateUserInput.id },
      });
      this.logger.log(`Updating user with id: ${updateUserInput.id}.`);
      return await this.usersDbService.update(updateUserInput, user);
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        this.logger.log('Error finding user. Id not founded.');
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
