// First, let's define an interface for common operations
export interface IBaseRepository<T> {
  create(data: Partial<T>): Promise<T>;
  findAll(options?: any): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  update(id: string, data: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
  count(): Promise<number>;
}
