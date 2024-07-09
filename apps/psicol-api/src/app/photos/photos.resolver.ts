import { Photo, SuccessMessage } from '@impulsou/models';
import { PhotosDbService, UsersDbService } from '@impulsou/services';
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
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@Resolver(() => Photo)
export class PhotosResolver {
  private readonly logger = new Logger(PhotosResolver.name);
  constructor(
    private readonly photosDbService: PhotosDbService,
    private readonly usersDbService: UsersDbService,
    private readonly s3Service: S3Service
  ) {}

  @Mutation(() => Photo)
  async createPhoto(
    @Args({ name: 'userId', type: () => Int })
    userId: number,
    @Args({ name: 'photo', type: () => GraphQLUpload })
    photo: FileUpload
  ) {
    try {
      this.logger.log('Uploading photo. Check user data.');
      const user = await this.usersDbService.findOne({
        where: { id: userId },
      });

      const validate = await this.photosDbService.findOne(
        { where: { userId: user.id, admin: true } },
        false
      );

      if (validate) {
        await this.photosDbService.removeBy({ userId: user.id });
        await this.s3Service.deleteFile(validate.url);
      }

      const res = await this.s3Service.uploadImageFile(photo, user.id);
      const photoRes = await this.photosDbService.create({
        url: res.Key,
        userId: user.id,
        admin: true,
      });
      return photoRes;
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException();
    }
  }

  @Mutation(() => SuccessMessage)
  async removePhoto(
    @Args({ name: 'id', type: () => Int, nullable: true })
    id: number,
    @Args({ name: 'userId', type: () => Int })
    userId: number
  ) {
    try {
      const photo = await this.photosDbService.findOne({ where: { id } });
      this.s3Service.deleteFile(photo.url).then().catch();
      await this.photosDbService.remove(photo);
      return { message: 'Foto eliminada exitosamente' };
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException();
    }
  }
}
