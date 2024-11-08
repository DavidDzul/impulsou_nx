import { UserCertificate } from '@impulsou/models';
import { Injectable } from '@nestjs/common';

import { Resource } from '../abstract';

@Injectable()
export class UserCertificateDbService extends Resource(UserCertificate) {}
