import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import { Rentals } from "./Rentals.entity";
  import { Employees } from "./Employees.entity";
  
  @Entity("returns", { schema: "public" })
  export class Returns {
    @PrimaryGeneratedColumn({ type: "integer", name: "return_id" })
    returnId: number;
  
    @Column("integer", { name: "rental_id" })
    rentalId: number;
  
    @Column("integer", { name: "employee_id" })
    employeeId: number;
  
    @Column("date", { name: "return_date" })
    returnDate: string;
  
    @Column("time without time zone", { name: "return_time" })
    returnTime: string;
  
    @Column("numeric", { name: "fuel_level", precision: 5, scale: 2, nullable: true })
    fuelLevel: number | null;
  
    @Column("character varying", { name: "vehicle_condition", length: 50 })
    vehicleCondition: string;
  
    @Column("text", { name: "additional_damages", nullable: true })
    additionalDamages: string | null;
  
    @Column("integer", { name: "delay_days", nullable: true })
    delayDays: number | null;
  
    @Column("numeric", { name: "delay_cost", precision: 10, scale: 2, nullable: true })
    delayCost: number | null;
  
    @Column("text", { name: "observations", nullable: true })
    observations: string | null;
  
    @ManyToOne(() => Rentals, (rentals) => rentals.returns, { onDelete: "NO ACTION", onUpdate: "NO ACTION" })
    @JoinColumn([{ name: "rental_id", referencedColumnName: "rentalId" }])
    rental: Rentals;
  
    @ManyToOne(() => Employees, (employees) => employees.returns, { onDelete: "NO ACTION", onUpdate: "NO ACTION" })
    @JoinColumn([{ name: "employee_id", referencedColumnName: "employeeId" }])
    employee: Employees;
  }
  