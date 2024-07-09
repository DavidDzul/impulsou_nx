import { CampusEnum, User } from '@impulsou/models';
import { Injectable } from '@nestjs/common';

import { Resource } from '../abstract';

@Injectable()
export class UsersDbService extends Resource(User) {
  async usersAttendance(
    campus: CampusEnum,
    generation: number,
    startOfDay: string,
    endOfDay: string
  ) {
    const users = await this.repository
      .createQueryBuilder('user')
      .innerJoin('attendance', 'att', 'user.id = att.userId')
      .where('user.campus = :campus', { campus })
      .andWhere('user.generationId = :generation', { generation })
      .andWhere('(att.checkIn BETWEEN :startOfDay AND :endOfDay)', {
        startOfDay,
        endOfDay,
      })
      .getMany();
    return users;
  }
}
