import { registerEnumType } from '@nestjs/graphql';

export enum CampusEnum {
  MERIDA = 'MERIDA',
  VALLADOLID = 'VALLADOLID',
  TIZIMIN = 'TIZIMIN',
  OXKUTZCAB = 'OXKUTZCAB',
}

registerEnumType(CampusEnum, {
  name: 'CampusEnum',
});
