import {
    Column,
    Entity,
    Index,
    JoinColumn,
    OneToOne,
    PrimaryColumn,
  } from "typeorm";
  import { Vehicles } from "./Vehicles.entity";
  
  
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
  
    @Column("boolean", { name: "foreignFluids" })
    foreignFluids: boolean;
  
    @Column("boolean", { name: "brakes" })
    brakes: boolean;
  
    @Column("boolean", { name: "documents" })
    documents: boolean;
  
    @Column("numeric", { name: "fuel_level" })
    fuelLevel: number;
  
    @OneToOne(() => Vehicles)
    @JoinColumn([{ name: "vehicle_id", referencedColumnName: "vehicleId" }])
    vehicle: Vehicles;
  }