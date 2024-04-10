import { User } from '@impulsou/models';
import { Injectable } from '@nestjs/common';

import { Resource } from '../abstract';

@Injectable()
export class UsersDbService extends Resource(User) {}
