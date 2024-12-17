import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users.entity";
import { Reservations } from "./Reservations.entity";

// @Index("clients_pkey", ["clientId"], { unique: true })
// @Index("clients_dni_key", ["dni"], { unique: true })
// @Index("clients_user_id_key", ["userId"], { unique: true })
@Entity("clients", { schema: "public" })
export class Clients {
  @PrimaryGeneratedColumn({ type: "integer", name: "client_id" })
  clientId: number;

  @Column("integer", { name: "user_id", unique: true })
  userId: number;

  @Column("character", { name: "dni", length: 10 })
  dni: string;

  @Column("character varying", { name: "first_name", length: 50 })
  firstName: string;

  @Column("character varying", { name: "last_name", length: 50 })
  lastName: string;

  @Column("character", { name: "phone", nullable: true, length: 10 })
  phone: string | null;

  @Column("character varying", { name: "address", nullable: true, length: 100 })
  address: string | null;

  @OneToOne(() => Users, (users) => users.clients)
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: Users;

  @OneToMany(() => Reservations, (reservations) => reservations.client)
  reservations: Reservations[];
}
