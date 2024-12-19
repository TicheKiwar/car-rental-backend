import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Employees } from "./Employees.entity";
import { Reservations } from "./Reservations.entity";
import { Returns } from "./Returns.entity";

// @Index("rentals_pkey", ["rentalId"], { unique: true })
@Entity("rentals", { schema: "public" })
export class Rentals {
  @PrimaryGeneratedColumn({ type: "integer", name: "rental_id" })
  rentalId: number;

  @Column("character varying", { name: "initial_status", length: 20, nullable: true })
  initialStatus: string;

  @Column("character varying", {
    name: "final_status",
    nullable: true,
    length: 20,
  })
  finalStatus: string | null;

  @Column("numeric", {
    name: "inital_fuel_level",
    nullable: true,
    precision: 5,
    scale: 2
  })
  initialFuelLevel: number | null;

  @Column("numeric", {
    name: "final_fuel_level",
    nullable: true,
    precision: 5,
    scale: 2
  })
  finalFuelLevel: number | null;

  @Column("integer", { name: "initial_mileage", nullable: true })
  initialMileage: number | null;

  @Column("integer", { name: "final_mileage", nullable: true })
  finalMileage: number | null;

  @Column("integer", { name: "total_days", nullable: true })
  totalDays: number | null;

  @Column("numeric", { name: "total_cost", precision: 10, scale: 2, nullable: true })
  totalCost: string;

  @Column("character varying", { name: "rental_status", length: 20 })
  status: string;

  @ManyToOne(() => Employees, (employees) => employees.rentals)
  @JoinColumn([{ name: "employee_id", referencedColumnName: "employeeId" }])
  employee: Employees;

  @ManyToOne(() => Reservations, (reservations) => reservations.rentals)
  @JoinColumn([
    { name: "reservation_id", referencedColumnName: "reservationId" },
  ])
  reservation: Reservations;

  @OneToMany(() => Returns, (returns) => returns.rental)
  returns: Returns[];
}
