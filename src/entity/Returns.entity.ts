import {
    Column,
    Entity,
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
  
    @Column("integer", { name: "rental_id", nullable: false })
    rentalId: number;
  
    @Column("integer", { name: "employee_id", nullable: false })
    employeeId: number;
  
    @Column("date", { name: "return_date" })
    returnDate: string;
  
    @Column("time without time zone", { name: "return_time" })
    returnTime: string;
  
    @Column("numeric", { 
      name: "cost_per_damages", 
      nullable: true, 
      precision: 10, 
      scale: 2 
    })
    costPerDamages: number | null;

    @Column("numeric", { 
      name: "cost_day_delay", 
      nullable: true, 
      precision: 10, 
      scale: 2 
    })
    costDayDelay: number | null;


    @Column("numeric", { 
      name: "fuel_cost", 
      nullable: true, 
      precision: 10, 
      scale: 2 
    })
    fuelCost: number | null;

    @Column("text", { name: "observations", nullable: true })
    observations: string | null;
  
    @ManyToOne(() => Rentals, (rentals) => rentals.rentalId)
    @JoinColumn([{ name: "rental_id", referencedColumnName: "rentalId" }])
    rental: Rentals;
  
    @ManyToOne(() => Employees, (employees) => employees.employeeId)
    @JoinColumn([{ name: "employee_id", referencedColumnName: "employeeId" }])
    employee: Employees;
  }