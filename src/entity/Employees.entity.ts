import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Positions } from "./Positions.entity";
import { Users } from "./Users.entity";
import { Rentals } from "./Rentals.entity";
import { Reservations } from "./Reservations.entity";

// @Index("employees_pkey", ["employeeId"], { unique: true })
// @Index("employees_user_id_key", ["userId"], { unique: true })
@Entity("employees", { schema: "public" })
export class Employees {
  @PrimaryGeneratedColumn({ type: "integer", name: "employee_id" })
  employeeId: number;

  @Column("integer", { name: "user_id", unique: true })
  userId: number;

  @Column("character", { name: "dni", unique: true, length: 10 })
  dni: string;

  @Column("character varying", { name: "first_name", length: 50 })
  firstName: string;

  @Column("character varying", { name: "last_name", length: 50 })
  lastName: string;

  @Column("character", { name: "phone", nullable: true, length: 10 })
  phone: string | null;

  @Column("date", { name: "hire_date" })
  hireDate: string;

  @Column("numeric", { name: "salary", precision: 10, scale: 2 })
  salary: number;

  @ManyToOne(() => Positions, (positions) => positions.employees)
  @JoinColumn([{ name: "position_id", referencedColumnName: "positionId" }])
  position: Positions;

  @OneToOne(() => Users, (users) => users.employees)
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: Users;

  @OneToMany(() => Rentals, (rentals) => rentals.employee)
  rentals: Rentals[];

  @OneToMany(() => Reservations, (reservations) => reservations.employee)
  reservations: Reservations[];
}
