import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Employees } from "./Employees.entity";

@Index("positions_position_key", ["position"], { unique: true })
@Index("positions_pkey", ["positionId"], { unique: true })
@Entity("positions", { schema: "public" })
export class Positions {
  @PrimaryGeneratedColumn({ type: "integer", name: "position_id" })
  positionId: number;

  @Column("character varying", { name: "position", unique: true, length: 50 })
  position: string;

  @OneToMany(() => Employees, (employees) => employees.position)
  employees: Employees[];
}
