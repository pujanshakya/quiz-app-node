import { BaseRepository } from "../../shared/repositories/base-repository";
import { UserEntity } from "./user.entity";

export class UserRepository extends BaseRepository<UserEntity> {
  constructor() {
    super(UserEntity);
  }
}
