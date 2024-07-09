import {
  Attendance,
  InternalServerError,
  NotFoundError,
  CampusEnum,
  BadRequestError,
  User,
  ReasonEmun,
} from '@impulsou/models';
import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import dayjs from 'dayjs';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AttendanceDbService, UsersDbService } from '@impulsou/services';
import { CurrentUser, GqlAuthGuard } from '@impulsou/shared';

import {
  AttendanceInput,
  CreateAttendanceInput,
  UpdateAttendanceInput,
} from './dto';
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
          delay: isLate,
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

  @Mutation(() => Attendance)
  @UseGuards(GqlAuthGuard)
  async createAttendance(
    @Args('createAttendanceInput') createAttendanceInput: CreateAttendanceInput
  ) {
    try {
      this.logger.log(
        `create attendance with user id ${createAttendanceInput.userId}.`
      );

      const currentDate = dayjs(createAttendanceInput.date);
      const startOfDay = currentDate
        .startOf('day')
        .add(1, 'second')
        .format('YYYY-MM-DD HH:mm:ss');
      const endOfDay = currentDate.endOf('day').format('YYYY-MM-DD HH:mm:ss');

      const attendance = await this.attendanceDbService.create({
        ...createAttendanceInput,
        checkIn: startOfDay,
        checkOut: endOfDay,
      });

      return attendance;
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

  @Mutation(() => Attendance)
  @UseGuards(GqlAuthGuard)
  async updateAttendance(
    @Args('updateAttendanceInput') updateAttendanceInput: UpdateAttendanceInput
  ) {
    try {
      this.logger.log(
        `Finding attendance with id: ${updateAttendanceInput.id}.`
      );
      const attendance = await this.attendanceDbService.findOne({
        where: { id: updateAttendanceInput.id },
      });
      this.logger.log(
        `Updating attendance with id: ${updateAttendanceInput.id}.`
      );
      return await this.attendanceDbService.update(
        {
          ...updateAttendanceInput,
          descripcion:
            updateAttendanceInput.reason === ReasonEmun.OTHER
              ? null
              : updateAttendanceInput.descripcion,
        },
        attendance
      );
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        this.logger.log('Error finding user. Id not founded.');
        throw new NotFoundException({
          status: 404,
          message: NotFoundError.ATTENDANCE,
        });
      }
      this.logger.error('Error finding user.', e);
      throw new InternalServerErrorException({
        status: 500,
        message: InternalServerError.SERVER,
      });
    }
  }

  @Mutation(() => [Attendance])
  @UseGuards(GqlAuthGuard)
  async findAttendanceUsers(
    @Args('campus', { type: () => CampusEnum }) campus: CampusEnum,
    @Args('generation', { type: () => Int }) generation: number,
    @Args('date', { type: () => String }) date: string
  ) {
    try {
      this.logger.log('Finding all attendance by campus and generation.');
      const currentDate = dayjs(date);
      const startOfDay = currentDate
        .startOf('day')
        .add(1, 'second')
        .format('YYYY-MM-DD HH:mm:ss');
      const endOfDay = currentDate.endOf('day').format('YYYY-MM-DD HH:mm:ss');
      const attendance = await this.attendanceDbService.getAttendanceByDate(
        campus,
        generation,
        startOfDay,
        endOfDay
      );
      return attendance;
    } catch (e) {
      this.logger.error('Error finding all attendance-db.', e);
      throw new InternalServerErrorException({
        status: 500,
        message: InternalServerError.SERVER,
      });
    }
  }

  @ResolveField(() => User, { nullable: true })
  async userAttendance(@Parent() attendance: Attendance) {
    const userId = attendance.userId;
    const user = await this.usersDbService.findOne({
      where: { id: userId },
    });
    return user;
  }
}
