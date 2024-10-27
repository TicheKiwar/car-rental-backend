import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Alquileres } from "./Alquileres.entity";
import { Clientes } from "./Clientes.entity";
import { Vehiculos } from "./Vehiculos.entity";

// @Index("reservas_pkey", ["idReserva"], { unique: true })
@Entity("reservas", { schema: "public" })
export class Reservas {
  @Column("integer", { primary: true, name: "id_reserva" })
  idReserva: number;

  @Column("date", { name: "fecha_inicio", nullable: true })
  fechaInicio: string | null;

  @Column("date", { name: "fecha_fin", nullable: true })
  fechaFin: string | null;

  @Column("character varying", { name: "estado", nullable: true, length: 20 })
  estado: string | null;

  @OneToMany(() => Alquileres, (alquileres) => alquileres.idReserva)
  alquileres: Alquileres[];

  @ManyToOne(() => Clientes, (clientes) => clientes.reservas)
  @JoinColumn([{ name: "id_cliente", referencedColumnName: "idCliente" }])
  idCliente: Clientes;

  @ManyToOne(() => Vehiculos, (vehiculos) => vehiculos.reservas)
  @JoinColumn([{ name: "id_vehiculo", referencedColumnName: "idVehiculo" }])
  idVehiculo: Vehiculos;
}
