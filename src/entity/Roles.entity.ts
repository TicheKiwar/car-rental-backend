import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users.entity";

@Index("roles_pkey", ["roleId"], { unique: true })
@Index("roles_role_name_key", ["roleName"], { unique: true })
@Entity("roles", { schema: "public" })
export class Roles {
  @PrimaryGeneratedColumn({ type: "integer", name: "role_id" })
  roleId: number;

  @Column("character varying", { name: "role_name", unique: true, length: 50 })
  roleName: string;

  @OneToMany(() => Users, (users) => users.role)
  users: Users[];
}
