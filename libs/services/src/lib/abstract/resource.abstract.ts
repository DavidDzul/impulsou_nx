import { Logger, NotFoundException, Type } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeepPartial,
  DeleteResult,
  In,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { InsertResult } from 'typeorm/query-builder/result/InsertResult';

export class BaseClass {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;
}

export interface IResource<T extends BaseClass> {
  readonly logger: Logger;
  readonly repository: Repository<T>;

  findAll(options?: FindManyOptions<T>): Promise<T[]>;
  findOne(options?: FindOneOptions<T>, throwError?: boolean): Promise<T>;
  create(entity: DeepPartial<T>): Promise<T>;
  createSeveral(entities: DeepPartial<T>[]): Promise<T[]>;
  insertSeveral(entities: DeepPartial<T>[]): Promise<InsertResult>;
  updateSeveral(entities: DeepPartial<T>[]): Promise<T[]>;
  update(updateEntity: DeepPartial<T>, entity: T): Promise<T>;
  remove(entity: T): Promise<T>;
  removeBy(options: FindOptionsWhere<T>): Promise<DeleteResult>;
  count(options?: FindManyOptions<T>): Promise<number>;
}

type Constructor<I> = new (...args: any[]) => I; // Main Point

export function Resource<T extends BaseClass>(
  model: Constructor<T>
): Type<IResource<T>> {
  class ResourceHost implements IResource<T> {
    public readonly logger = new Logger(`${model.name} Service`);
    @InjectRepository(model) public readonly repository: Repository<T>;

    create(entity: DeepPartial<T>): Promise<T> {
      const value = this.repository.create(entity);
      return this.repository.save(value);
    }

    createSeveral(entities: DeepPartial<T>[]): Promise<T[]> {
      const value = this.repository.create(entities);
      return this.repository.save(value);
    }

    insertSeveral(entities: DeepPartial<T>[]): Promise<InsertResult> {
      const value = this.repository.create(entities);
      return this.repository.insert(value as QueryDeepPartialEntity<T>);
    }

    async updateSeveral(entities: DeepPartial<T>[]): Promise<T[]> {
      const ids = entities.map((map) => map?.id || 0);
      const findOptions: FindManyOptions<BaseClass> = {
        where: { id: In(ids) },
      };
      const data = await this.repository.find(
        findOptions as FindManyOptions<T>
      );
      if (entities.length !== data.length) {
        throw new NotFoundException({
          status: 404,
          message: 'Labels not found',
        });
      }
      return this.repository.save(entities);
    }

    remove(entity: T): Promise<T> {
      return this.repository.remove(entity);
    }

    removeBy(options: FindOptionsWhere<T>): Promise<DeleteResult> {
      return this.repository.delete(options);
    }

    findAll(options?: FindManyOptions<T>): Promise<T[]> {
      return this.repository.find(options);
    }

    findOne(options?: FindOneOptions<T>, throwError = true): Promise<T> {
      if (throwError) {
        return this.repository.findOneOrFail(options);
      }
      return this.repository.findOne(options);
    }

    update(updateEntity: DeepPartial<T>, entity: T): Promise<T> {
      const createdEntity = this.repository.create(updateEntity);
      Object.keys(updateEntity).forEach((key) => {
        entity[key] = createdEntity[key];
      });
      return this.repository.save(entity);
    }

    count(options?: FindManyOptions<T>): Promise<number> {
      return this.repository.count(options);
    }
  }
  return ResourceHost;
}
