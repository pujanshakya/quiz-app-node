import { IBaseRepository, IBaseService } from "../interfaces/common.interface";

// Abstract Base Service Implementation
export abstract class BaseService<T> implements IBaseService<T> {
  constructor(protected repository: IBaseRepository<T>) {}

  async findAll(): Promise<T[]> {
    return await this.repository.findAll();
  }

  async findById(id: string): Promise<T | null> {
    return await this.repository.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    return await this.repository.delete(id);
  }
}
