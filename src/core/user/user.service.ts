import { UserRepository } from "./user.repository";

export class UserService {
  private readonly userRepo: UserRepository;
  constructor() {
    this.userRepo = new UserRepository();
  }
}
