import {
  Generation,
  User,
  InternalServerError,
  NotFoundError,
  Admin,
  CampusEnum,
} from '@impulsou/models';
import {
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GenerationDbService } from '@impulsou/services';
import { CurrentUser, GqlAuthGuard } from '@impulsou/shared';

import { EntityNotFoundError } from 'typeorm';
import { CreateGenerationInput, UpdateGenerationInput } from './dto';

@Resolver(() => Generation)
export class GenerationResolver {
  private readonly logger = new Logger(GenerationResolver.name);
  constructor(private readonly generationDbService: GenerationDbService) {}

  @Query(() => [Generation])
  @UseGuards(GqlAuthGuard)
  async findAllGenerations(@CurrentUser() admin: Admin) {
    try {
      this.logger.log('Finding all generations-db.');
      if (admin.campus === CampusEnum.MERIDA) {
        return await this.generationDbService.findAll();
      }
      return await this.generationDbService.findAll({
        where: { campus: admin.campus },
      });
    } catch (e) {
      this.logger.error('Error finding all users-db.', e);
      throw new InternalServerErrorException({
        status: 500,
        message: InternalServerError.SERVER,
      });
    }
  }

  @Mutation(() => Generation)
  @UseGuards(GqlAuthGuard)
  async createGeneration(
    @CurrentUser() admin: Admin,
    @Args('createGenerationInput') createGenerationInput: CreateGenerationInput
  ) {
    try {
      this.logger.log('Create generation');
      const retunGeneration = await this.generationDbService.create({
        ...createGenerationInput,
      });
      return retunGeneration;
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        this.logger.log('Error creating generation. Id not founded.');
        throw new NotFoundException({
          status: 404,
          message: NotFoundError.GENERATION,
        });
      }
      this.logger.error('Error finding generation.', e);
      throw new InternalServerErrorException({
        status: 500,
        message: InternalServerError.SERVER,
      });
    }
  }

  @Mutation(() => Generation)
  @UseGuards(GqlAuthGuard)
  async updateGeneration(
    @Args('updateGenerationInput') updateGenerationInput: UpdateGenerationInput
  ) {
    try {
      this.logger.log(
        `Finding generation with id: ${updateGenerationInput.id}.`
      );
      const generation = await this.generationDbService.findOne({
        where: { id: updateGenerationInput.id },
      });
      this.logger.log(
        `Updating generation with id: ${updateGenerationInput.id}.`
      );
      return await this.generationDbService.update(
        updateGenerationInput,
        generation
      );
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        this.logger.log('Error finding user. Id not founded.');
        throw new NotFoundException({
          status: 404,
          message: NotFoundError.GENERATION,
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
