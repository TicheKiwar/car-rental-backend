import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Employees } from "./Employees.entity";
import { Returns } from "./Returns.entity";
import { Payments } from "./Payments.entity";
import { Clients } from "./Clients.entity";
import { Vehicles } from "./Vehicles.entity";

// @Index("rentals_pkey", ["rentalId"], { unique: true })
@Entity("rentals", { schema: "public" })
export class Rentals {
  @PrimaryGeneratedColumn({ type: "integer", name: "rental_id" })
  rentalId: number;

  @Column("date", { name: "rental_date" })
  rentalDate: Date;

  @Column("integer", { name: "rental_days",})
  rentalDays: number | null;

  @Column("timestamp", {
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column("timestamp", {
    name: 'mark_at',
    nullable: true,
  })
  markAt: Date;

  @Column("numeric", {
    name: "initial_fuel_level",
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

  @Column("character varying", { name: "rental_status", length: 20,default: () => "'SIN PAGO INICIAL'" })
  status: string;

  @ManyToOne(() => Employees, (employees) => employees.rentals)
  @JoinColumn([{ name: "employee_id", referencedColumnName: "employeeId", }])
  employee: Employees;

  @OneToMany(() => Returns, (returns) => returns.rental)
  returns: Returns[];

  @OneToMany(() => Payments, (payment) => payment.rental)
  payments: Payments[];

  @ManyToOne(() => Clients, (clients) => clients.reservations)
  @JoinColumn([{ name: "client_id", referencedColumnName: "clientId" }])
  client: Clients;

  @ManyToOne(() => Vehicles, (vehicles) => vehicles.reservations)
  @JoinColumn([{ name: "vehicle_id", referencedColumnName: "vehicleId" }])
  vehicle: Vehicles;

}
