import { Photo } from '@impulsou/models';
import { Injectable } from '@nestjs/common';

import { Resource } from '../abstract';

@Injectable()
export class PhotosDbService extends Resource(Photo) {}
