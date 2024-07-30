import { Autorization } from '@impulsou/models';
import { Injectable } from '@nestjs/common';

import { Resource } from '../abstract';

@Injectable()
export class AutorizationDbService extends Resource(Autorization) {}
