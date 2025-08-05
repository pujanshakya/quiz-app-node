import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseEntity } from "../../shared/entities/base-entity";
import { UserRole } from "./user.dto";

@Entity("users")
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar" })
  first_name!: string;

  @Column({ type: "varchar" })
  last_name!: string;

  @Column({ type: "varchar" })
  email!: string;

  @Column({ type: "varchar" })
  password!: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
  role!: UserRole;
}
