import { registerEnumType } from '@nestjs/graphql';

export enum ReasonEmun {
  ACADEMIC = 'ACADEMIC',
  PERSONAL = 'PERSONAL',
  OTHER = 'OTHER',
}

registerEnumType(ReasonEmun, {
  name: 'ReasonEmun',
});
