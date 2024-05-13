import { Admin } from '@impulsou/models';
import { Injectable } from '@nestjs/common';

import { Resource } from '../abstract';

@Injectable()
export class AdminDbService extends Resource(Admin) {}
