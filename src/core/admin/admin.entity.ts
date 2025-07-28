import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseEntity } from "../../shared/entities/base-entity";

@Entity("admins")
export class AdminEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar" })
  first_name!: string;

  @Column({ type: "varchar" })
  last_name!: string;

  @Column({ type: "varchar" })
  email!: string;
}
