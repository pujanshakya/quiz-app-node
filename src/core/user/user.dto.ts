import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from "class-validator";
import { IsPasswordConfirmed } from "../../decorators/validation.decorator";

export interface Params {
  id: string;
}
export class CommonUserCreateDto {
  @IsDefined()
  @IsNotEmpty()
  @Length(3, 20)
  first_name!: string;

  @IsDefined()
  @IsNotEmpty()
  @Length(3, 20)
  last_name!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;
}

export class CreateUserDto extends CommonUserCreateDto {
  @IsNotEmpty()
  @IsPasswordConfirmed("confirmPassword", {
    message: "Password does not match.",
  })
  @IsString()
  password!: string;

  @IsNotEmpty()
  @IsString()
  confirmPassword!: string;
}

export class UpdateUserDto extends CommonUserCreateDto {}
