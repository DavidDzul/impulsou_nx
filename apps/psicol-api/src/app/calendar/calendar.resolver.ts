import {
  Calendar,
  InternalServerError,
  NotFoundError,
  SuccessMessage,
  Admin,
} from '@impulsou/models';
import { CalendarDbService, UsersDbService } from '@impulsou/services';
import { CurrentUser, GqlAuthGuard } from '@impulsou/shared';
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
  Query,
} from '@nestjs/graphql';
import dayjs from 'dayjs';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { v4 as uuidv4 } from 'uuid';

import { CreateCalendarInput, UpdateCalendarInput } from './dto';
import { EntityNotFoundError } from 'typeorm';

@Resolver(() => Calendar)
export class CalendarResolver {
  private readonly logger = new Logger(CalendarResolver.name);
  constructor(
    private readonly calendarDbService: CalendarDbService,
    private readonly usersDbService: UsersDbService
  ) {}

  @Query(() => [Calendar])
  @UseGuards(GqlAuthGuard)
  async findAllCalendar(@CurrentUser() admin: Admin) {
    try {
      this.logger.log('Finding all calendar-db.');
      const data = await this.calendarDbService.findAll({
        where: { campus: admin.campus },
      });
      return data;
    } catch (e) {
      this.logger.error('Error finding all calendar-db.', e);
      throw new InternalServerErrorException({
        status: 500,
        message: InternalServerError.SERVER,
      });
    }
  }

  @Mutation(() => Calendar)
  @UseGuards(GqlAuthGuard)
  async createCalendar(
    @Args('createCalendarInput')
    createCalendarInput: CreateCalendarInput
  ) {
    try {
      this.logger.log(
        `create calendar by generation with id ${createCalendarInput.generationId}.`
      );
      const formatDate = dayjs(createCalendarInput.date);
      const date = formatDate.format('YYYY-MM-DD');
      const calendar = await this.calendarDbService.create({
        ...createCalendarInput,
        date,
      });
      return calendar;
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        this.logger.log('Error creating calendar. Id not founded.');
        throw new NotFoundException({
          status: 404,
          message: NotFoundError.CALENDAR,
        });
      }
      this.logger.error('Error finding user.', e);
      throw new InternalServerErrorException({
        status: 500,
        message: InternalServerError.SERVER,
      });
    }
  }

  @Mutation(() => Calendar)
  @UseGuards(GqlAuthGuard)
  async updateCalendar(
    @Args('updateCalendarInput') updateCalendarInput: UpdateCalendarInput
  ) {
    try {
      this.logger.log(`Finding calendar with id: ${updateCalendarInput.id}.`);
      const calendar = await this.calendarDbService.findOne({
        where: { id: updateCalendarInput.id },
      });
      this.logger.log(`Updating calendar with id: ${updateCalendarInput.id}.`);
      return await this.calendarDbService.update(
        { ...updateCalendarInput },
        calendar
      );
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        this.logger.log('Error finding calendar. Id not founded.');
        throw new NotFoundException({
          status: 404,
          message: NotFoundError.CALENDAR,
        });
      }
      this.logger.error('Error finding user.', e);
      throw new InternalServerErrorException({
        status: 500,
        message: InternalServerError.SERVER,
      });
    }
  }

  @Mutation(() => SuccessMessage)
  async removeCalendar(
    @Args({ name: 'id', type: () => Int })
    id: number
  ) {
    try {
      const calendar = await this.calendarDbService.findOne({ where: { id } });
      await this.calendarDbService.remove(calendar);
      return { message: 'Fecha eliminada exitosamente' };
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException();
    }
  }
}
