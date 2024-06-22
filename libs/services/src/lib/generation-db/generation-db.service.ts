import { Generation } from '@impulsou/models';
import { Injectable } from '@nestjs/common';

import { Resource } from '../abstract';

@Injectable()
export class GenerationDbService extends Resource(Generation) {}
