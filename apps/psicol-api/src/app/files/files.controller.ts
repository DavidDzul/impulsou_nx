import {
  UsersDbService,
  PhotosDbService,
  ConstancyDbService,
} from '@impulsou/services';
import { S3Service } from '@impulsou/shared';
import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('user/api/files')
export class FilesController {
  constructor(
    private readonly s3Service: S3Service,
    private readonly usersDbService: UsersDbService,
    private readonly photosDbService: PhotosDbService,
    private readonly constancyDbService: ConstancyDbService
  ) {}

  @Get('users/:id/images')
  async getImageFile(
    @Req() req: Request,
    @Param('id') id: number,
    @Res() response: Response
  ) {
    try {
      const photo = await this.photosDbService.findOne({
        where: {
          id: parseInt(req.query.s3 as string),
        },
      });
      const res = await this.s3Service.getFile(photo.url);
      response.set({ 'Content-Type': res.ContentType });
      return response.send(res.Body);
    } catch (e) {
      console.error(e);
      throw new NotFoundException();
    }
  }

  @Get('users/:id/records')
  async getConstancyFile(
    @Req() req: Request,
    @Param('id') id: number,
    @Res() response: Response
  ) {
    try {
      const fileId: string = req.query.s3 as string;
      const constancy = await this.constancyDbService.findOne({
        where: {
          fileId,
          userId: id,
        },
      });
      const res = await this.s3Service.getFile(constancy.url);
      response.set({
        'Content-Type': res.ContentType,
        'Content-disposition': `filename=${constancy.name}`,
      });
      return response.send(res.Body);
    } catch (e) {
      console.error(e);
      throw new NotFoundException();
    }
  }
}
