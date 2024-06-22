import { User } from './user.entity';
import { Admin } from './admin.entity';
import { Generation } from './generation.entity';
import { Attendance } from './attendance.entity';

export const typeOrmEntities = [User, Admin, Generation, Attendance];

export * from './token.entity';
export * from './user.entity';
export * from './admin.entity';
export * from './campus.entity';
export * from './generation.entity';
export * from './attendance.entity';
