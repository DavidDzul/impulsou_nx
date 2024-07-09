import { Constancy } from '@impulsou/models';
import { Injectable } from '@nestjs/common';

import { Resource } from '../abstract';

@Injectable()
export class ConstancyDbService extends Resource(Constancy) {}
