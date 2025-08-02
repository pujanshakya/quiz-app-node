import { CONSTANT } from "../../configs/constant.config";
import { HttpException } from "../../exceptions/http.exception";
import { CreateUserDto, UpdateUserDto } from "./user.dto";
import { UserRepository } from "./user.repository";
import bcrypt from "bcrypt";

export class UserService {
  private readonly userRepo: UserRepository;
  constructor() {
    this.userRepo = new UserRepository();
  }

  async store(data: CreateUserDto) {
    const salt = await bcrypt.genSalt(Number(CONSTANT.SALT_ROUNDS));
    const hashPassword = await bcrypt.hash(data.password as string, salt);

    data.password = hashPassword;
    return await this.userRepo.create(data);
  }

  async getAllUsers() {
    return await this.userRepo.findAll({
      select: ["id", "first_name", "last_name", "email"],
    });
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) {
      throw new HttpException("404", "User not found!");
    }

    return await this.userRepo.update(id, { ...data });
  }

  async getUserById(id: number) {
    const user = await this.userRepo.findOne({
      where: { id: +id },
      select: ["id", "first_name", "last_name", "email"],
    });

    if (!user) {
      throw new HttpException("404", "User not found!");
    }

    return user;
  }

  async delete(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) {
      throw new HttpException("404", "User not found!");
    }

    const isUserDeleted = await this.userRepo.delete(id);

    if (!isUserDeleted) {
      throw new HttpException("400", "Unable to delete user!");
    }

    return isUserDeleted;
  }
}
