import { UserService } from "./user.service";

export class UserController {
  private readonly userService: UserService;
  constructor() {
    this.userService = new UserService();
  }
}
