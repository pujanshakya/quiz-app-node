import {
  Repository,
  FindManyOptions,
  DeepPartial,
  EntityTarget,
  QueryRunner,
  ObjectLiteral,
} from "typeorm";
import { AppDataSource } from "./../../configs/database.config";
import {
  PaginationOptions,
  PaginationResult,
} from "../interfaces/common.interface";

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

  async findById(id: string): Promise<T | null> {
    return await this.repository.findOne({ where: { id } as any });
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    await this.repository.update(id, data as any);
    return await this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }

  async count(options?: any): Promise<number> {
    return await this.repository.count(options);
  }
}
