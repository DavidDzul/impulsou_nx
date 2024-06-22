import { Attendance } from '@impulsou/models';
import { Injectable } from '@nestjs/common';

import { Resource } from '../abstract';

@Injectable()
export class AttendanceDbService extends Resource(Attendance) {}
