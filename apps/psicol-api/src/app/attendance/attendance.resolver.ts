import {
  Attendance,
  InternalServerError,
  NotFoundError,
  CampusEnum,
  BadRequestError,
  User,
} from '@impulsou/models';
import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import dayjs from 'dayjs';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AttendanceDbService, UsersDbService } from '@impulsou/services';
import { CurrentUser, GqlAuthGuard } from '@impulsou/shared';

import { AttendanceInput } from './dto';
import { Between, EntityNotFoundError } from 'typeorm';

@Resolver(() => Attendance)
export class AttendanceResolver {
  private readonly logger = new Logger(AttendanceResolver.name);
  constructor(
    private readonly attendanceDbService: AttendanceDbService,
    private readonly usersDbService: UsersDbService
  ) {}

  @Mutation(() => User)
  async generateAttendance(
    @Args('attendanceInput') attendanceInput: AttendanceInput
  ) {
    try {
      this.logger.log(
        `find user with enrollment ${attendanceInput.enrollment}.`
      );

      const user = await this.usersDbService.findOne({
        where: { enrollment: attendanceInput.enrollment },
      });
      this.logger.log('user found');
      const currentDate = dayjs();
      const date = currentDate.format('YYYY-MM-DD HH:mm:ss');

      const startOfDay = currentDate
        .startOf('day')
        .format('YYYY-MM-DD HH:mm:ss');
      const endOfDay = currentDate.endOf('day').format('YYYY-MM-DD HH:mm:ss');

      this.logger.log(`find attendance with date ${date}.`);
      const findAttendance = await this.attendanceDbService.findOne(
        { where: { userId: user.id, checkIn: Between(startOfDay, endOfDay) } },
        false
      );

      if (!findAttendance) {
        this.logger.log(`Attendance NOT FOUND with user id:  ${user.id}. `);
        const lateThreshold = dayjs().hour(9).minute(0).second(0);
        const isLate = currentDate.isAfter(lateThreshold);
        await this.attendanceDbService.create({
          userId: user.id,
          checkIn: date,
          late: isLate,
        });
      } else {
        this.logger.log(`Attendance FOUND with user id:  ${user.id}. `);
        await this.attendanceDbService.update(
          { checkOut: date },
          findAttendance
        );
      }
      return user;
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        this.logger.log('Error creating attendance. Id not founded.');
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
