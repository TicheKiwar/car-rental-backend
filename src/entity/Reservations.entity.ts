import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Rentals } from "./Rentals.entity";
import { Clients } from "./Clients.entity";
import { Vehicles } from "./Vehicles.entity";

// @Index("reservations_pkey", ["reservationId"], { unique: true })
@Entity("reservations", { schema: "public" })
export class Reservations {
  @PrimaryGeneratedColumn({ type: "integer", name: "reservation_id" })
  reservationId: number;

  @Column("date", { name: "reservation_date" })
  reservationDate: string;

  @Column("integer", { name: "reservation_days", nullable: true })
  reservationDays: number | null;

  @Column("numeric", { name: "subtotal_cost", precision: 10, scale: 2 })
  totalCost: string;

  @OneToMany(() => Rentals, (rentals) => rentals.reservation)
  rentals: Rentals[];

  @ManyToOne(() => Clients, (clients) => clients.reservations)
  @JoinColumn([{ name: "client_id", referencedColumnName: "clientId" }])
  client: Clients;


  @ManyToOne(() => Vehicles, (vehicles) => vehicles.reservations)
  @JoinColumn([{ name: "vehicle_id", referencedColumnName: "vehicleId" }])
  vehicle: Vehicles;
}
