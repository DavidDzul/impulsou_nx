import { User } from './user.entity';
import { Admin } from './admin.entity';

export const typeOrmEntities = [User, Admin];

export * from './token.entity';
export * from './user.entity';
export * from './admin.entity';
