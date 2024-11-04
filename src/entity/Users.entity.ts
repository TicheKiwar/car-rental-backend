import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Clients } from "./Clients.entity";
import { Employees } from "./Employees.entity";
import { Roles } from "./Roles.entity";
import { hash } from "bcrypt";

@Index("users_email_key", ["email"], { unique: true })
@Index("users_pkey", ["userId"], { unique: true })
@Entity("users", { schema: "public" })
export class Users {
  @PrimaryGeneratedColumn({ type: "integer", name: "user_id" })
  userId: number;

  @Column("character varying", { name: "email", unique: true, length: 75 })
  email: string;

  @Column("text", { name: "password" })
  password: string;

  @Column("timestamp without time zone", {
    name: "delete_date",
    nullable: true,
  })
  deleteDate: Date | null;

  @OneToOne(() => Clients, (clients) => clients.user)
  clients: Clients;

  @OneToOne(() => Employees, (employees) => employees.user)
  employees: Employees;

  @ManyToOne(() => Roles, (roles) => roles.users)
  @JoinColumn([{ name: "role_id", referencedColumnName: "roleId" }])
  role: Roles;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.password) {
      return;
    }
    this.password = await hash(this.password, 10);
  }

}