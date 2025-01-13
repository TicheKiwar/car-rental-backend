import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { Vehicles } from "./Vehicles.entity";
import { VehicleMaintenance } from "./VehicleMaintenance";


@Entity("vehicle_status", { schema: "public" })
export class VehicleStatus {
  @PrimaryColumn("integer", { name: "vehicle_id" })
  vehicleId: number;

  @Column("boolean", { name: "scratches" })
  scratches: boolean;

  @Column("boolean", { name: "dents" })
  dents: boolean;

  @Column("boolean", { name: "lights" })
  lights: boolean;

  @Column("boolean", { name: "tires" })
  tires: boolean;

  @Column("boolean", { name: "windshield" })
  windshield: boolean;

  @Column("boolean", { name: "mirrors" })
  mirrors: boolean;

  @Column("boolean", { name: "foreign_fluids" })
  foreignFluids: boolean;

  @Column("boolean", { name: "brakes" })
  brakes: boolean;

  @Column("boolean", { name: "documents" })
  documents: boolean;

  @OneToOne(() => Vehicles)
  @JoinColumn([{ name: "vehicle_id", referencedColumnName: "vehicleId" }])
  vehicle: Vehicles;

  @OneToMany(() => VehicleMaintenance, (maintenances) => maintenances.vehicle)
  maintenances: VehicleMaintenance[];
}