import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Reservations } from "./Reservations.entity";
import { Model } from "./Model.entity";

@Index("vehicles_license_plate_key", ["licensePlate"], { unique: true })
@Index("vehicles_pkey", ["vehicleId"], { unique: true })
@Entity("vehicles", { schema: "public" })
export class Vehicles {
  @PrimaryGeneratedColumn({ type: "integer", name: "vehicle_id" })
  vehicleId: number;

  @Column("character varying", {
    name: "license_plate",
    unique: true,
    length: 20,
  })
  licensePlate: string;

  @Column("character varying", { name: "type", length: 50 })
  type: string;

  @Column("character varying", { name: "status", length: 20 })
  status: string;

  @Column("numeric", { name: "daily_rate", precision: 10, scale: 2 })
  dailyRate: string;

  @Column("integer", { name: "capacity", nullable: true })
  capacity: number | null;

  @Column("integer", { name: "max_speed", nullable: true })
  maxSpeed: number | null;

  @Column("character varying", { name: "color", nullable: true, length: 30 })
  color: string | null;

  @Column("character varying", {
    name: "transmission",
    nullable: true,
    length: 20,
  })
  transmission: string | null;

  @Column("integer", { name: "door_count", nullable: true })
  doorCount: number | null;

  @Column("character varying", {
    name: "fuel_type",
    nullable: true,
    length: 20,
  })
  fuelType: string | null;

  @Column("integer", { name: "mileage", nullable: true, default: () => "0" })
  mileage: number | null;

  @Column("date", { name: "last_revision_date", nullable: true })
  lastRevisionDate: string | null;

  @Column("date", { name: "registration_date" })
  registrationDate: string;

  @Column("numeric", {
    name: "cost_day_delay",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  costDayDelay: string | null;

  @Column("timestamp without time zone", {
    name: "delete_date",
    nullable: true,
  })
  deletedAt: Date | null;

  @OneToMany(() => Reservations, (reservations) => reservations.vehicle)
  reservations: Reservations[];

  @ManyToOne(() => Model, (model) => model.vehicles)
  @JoinColumn([{ name: "model_id", referencedColumnName: "modelId" }])
  model: Model;
}
