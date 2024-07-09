import { Constancy, SuccessMessage } from '@impulsou/models';
import { ConstancyDbService, UsersDbService } from '@impulsou/services';
import { S3Service } from '@impulsou/shared';
import { InternalServerErrorException, Logger } from '@nestjs/common';
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

@Resolver(() => Constancy)
export class ConstancyResolver {
  private readonly logger = new Logger(ConstancyResolver.name);
  constructor(
    private readonly constancyDbService: ConstancyDbService,
    private readonly usersDbService: UsersDbService,
    private readonly s3Service: S3Service
  ) {}

  @Mutation(() => Constancy)
  async createConstancy(
    @Args({ name: 'userId', type: () => Int })
    userId: number,
    @Args({ name: 'recordFile', type: () => GraphQLUpload })
    recordFile: FileUpload,
    @Args({ name: 'startDate', type: () => String })
    startDate: string,
    @Args({ name: 'endDate', type: () => String })
    endDate: string
  ) {
    try {
      this.logger.log('Uploading record. Check user data.');
      const user = await this.usersDbService.findOne({
        where: { id: userId },
      });

      const currentDate = dayjs();
      const date = currentDate.format('YYYY-MM-DD HH:mm:ss');

      const res = await this.s3Service.uploadRecordFile(recordFile, user.id);
      const result = await this.constancyDbService.create({
        name: date,
        fileId: uuidv4(),
        url: res.Key,
        userId: user.id,
        startDate,
        endDate,
      });
      return result;
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException();
    }
  }

  //   @Mutation(() => SuccessMessage)
  //   async removePhoto(
  //     @Args({ name: 'id', type: () => Int, nullable: true })
  //     id: number,
  //     @Args({ name: 'userId', type: () => Int })
  //     userId: number
  //   ) {
  //     try {
  //       const photo = await this.photosDbService.findOne({ where: { id } });
  //       this.s3Service.deleteFile(photo.url).then().catch();
  //       await this.photosDbService.remove(photo);
  //       return { message: 'Foto eliminada exitosamente' };
  //     } catch (e) {
  //       this.logger.error(e);
  //       throw new InternalServerErrorException();
  //     }
  //   }
}
