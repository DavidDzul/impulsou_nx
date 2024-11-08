import { User } from './user.entity';
import { Admin } from './admin.entity';
import { Generation } from './generation.entity';
import { Attendance } from './attendance.entity';
import { Photo } from './photo.entity';
import { UserCertificate } from './user-certificate.entity';
import { Autorization } from './autorization.entity';
import { Calendar } from './calendar.entity';
import { UserDetails } from './user-details.entity';

export const typeOrmEntities = [
  User,
  Admin,
  Generation,
  Attendance,
  Photo,
  UserCertificate,
  Autorization,
  Calendar,
  UserDetails,
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
export * from './user-certificate.entity';
export * from './autorization.entity';
export * from './calendar.entity';
export * from './user-details.entity';
