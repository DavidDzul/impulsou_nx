import { Calendar } from '@impulsou/models';
import { Injectable } from '@nestjs/common';

import { Resource } from '../abstract';

@Injectable()
export class CalendarDbService extends Resource(Calendar) {}
