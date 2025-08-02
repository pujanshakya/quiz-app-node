import {
  Repository,
  FindManyOptions,
  DeepPartial,
  EntityTarget,
  QueryRunner,
  ObjectLiteral,
  FindOneOptions,
} from "typeorm";
import { AppDataSource } from "./../../configs/database.config";

export abstract class BaseRepository<T extends ObjectLiteral> {
  protected repository: Repository<T>;
  protected entity: EntityTarget<T>;

  constructor(entity: EntityTarget<T>) {
    this.entity = entity;
    this.repository = AppDataSource.getRepository(entity);
  }

  // =====================================
  // BASIC CRUD OPERATIONS
  // =====================================

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return await this.repository.save(entity);
  }

  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.repository.find(options);
  }

  async findOne(options: FindOneOptions): Promise<T | null> {
    return await this.repository.findOne(options);
  }

  async update(id: number, data: Partial<T>): Promise<T | null> {
    await this.repository.update(id, data as any);
    return await this.findOne({ where: { id } });
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }

  async count(options?: any): Promise<number> {
    return await this.repository.count(options);
  }
}
