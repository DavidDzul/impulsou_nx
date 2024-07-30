import { User } from './user.entity';
import { Admin } from './admin.entity';
import { Generation } from './generation.entity';
import { Attendance } from './attendance.entity';
import { Photo } from './photo.entity';
import { Constancy } from './constancy.entity';
import { Autorization } from './autorization.entity';

export const typeOrmEntities = [
  User,
  Admin,
  Generation,
  Attendance,
  Photo,
  Constancy,
  Autorization,
];

export * from './token.entity';
export * from './user.entity';
export * from './admin.entity';
export * from './campus.entity';
export * from './generation.entity';
export * from './attendance.entity';
export * from './raeason-attendance.entity';
export * from './photo.entity';
export * from './success-message.entity';
export * from './constancy.entity';
export * from './autorization.entity';
