import {
  Admin,
  User,
  InternalServerError,
  NotFoundError,
  CampusEnum,
  BadRequestError,
  Attendance,
  RoleUser,
  Photo,
} from '@impulsou/models';
import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  UsersDbService,
  AttendanceDbService,
  PhotosDbService,
} from '@impulsou/services';
import { CurrentUser, GqlAuthGuard } from '@impulsou/shared';

import { CreateUserInput, UpdateUserInput } from './dto';
import { Between, EntityNotFoundError } from 'typeorm';
import dayjs from 'dayjs';

@Resolver(() => User)
export class UsersResolver {
  private readonly logger = new Logger(UsersResolver.name);
  constructor(
    private readonly usersDbService: UsersDbService,
    private readonly attendanceDbService: AttendanceDbService,
    private readonly photosDbService: PhotosDbService
  ) {}

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
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
        role: RoleUser.STUDENT,
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
  async findAllUsers(@CurrentUser() admin: Admin) {
    try {
      const { campus } = admin;
      this.logger.log('Finding all users-db.');
      const allUsers = await this.usersDbService.findAll({
        where: { campus, role: RoleUser.STUDENT },
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
  async searchAllUsers(
    @Args('campus', { type: () => CampusEnum }) campus: CampusEnum,
    @Args('generation', { type: () => Int }) generation: number,
    @Args('date', { type: () => String, nullable: true }) date?: string
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
  @UseGuards(GqlAuthGuard)
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
  @UseGuards(GqlAuthGuard)
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

  @ResolveField(() => [Attendance], { nullable: true })
  async attendanceMap(@Parent() user: User, @Args('date') date: string) {
    const userId = user.id;

    const currentDate = dayjs(date);
    const startOfMonth = currentDate
      .startOf('month')
      .format('YYYY-MM-DD HH:mm:ss');
    const endOfMonth = currentDate.endOf('month').format('YYYY-MM-DD HH:mm:ss');

    const attendanceData = await this.attendanceDbService.findAll({
      where: { userId, checkIn: Between(startOfMonth, endOfMonth) },
    });
    return attendanceData || null;
  }

  @ResolveField(() => [Photo])
  async images(@Parent() user: User) {
    const { id } = user;
    return this.photosDbService.findAll({
      where: { userId: id, admin: true },
      order: { createdAt: 'DESC' },
    });
  }
}
