import { Attendance, CampusEnum } from '@impulsou/models';
import { Injectable } from '@nestjs/common';

import { Resource } from '../abstract';

@Injectable()
export class AttendanceDbService extends Resource(Attendance) {
  async getAttendanceByDate(
    campus: CampusEnum,
    generation: number,
    searchDate: string
  ) {
    const result = await this.repository
      .createQueryBuilder('att')
      .innerJoin('users', 'user', 'user.id = att.userId')
      .where('user.campus = :campus', { campus })
      .andWhere('user.generationId = :generation', { generation })
      .andWhere('att.recordDate = :searchDate', { searchDate })
      // .andWhere('(att.checkIn BETWEEN :startOfDay AND :endOfDay)', {
      //   startOfDay,
      //   endOfDay,
      // })
      .getMany();
    return result;
  }
}
