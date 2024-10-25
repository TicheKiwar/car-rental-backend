import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Empleados } from "./Empleados";
import { Reservas } from "./Reservas";

@Index("alquileres_pkey", ["idAlquiler"], { unique: true })
@Entity("alquileres", { schema: "public" })
export class Alquileres {
  @Column("integer", { primary: true, name: "id_alquiler" })
  idAlquiler: number;

  @Column("character varying", {
    name: "estado_inicial",
    nullable: true,
    length: 20,
  })
  estadoInicial: string | null;

  @Column("character varying", {
    name: "estado_final",
    nullable: true,
    length: 20,
  })
  estadoFinal: string | null;

  @Column("integer", { name: "kilometraje_inicial", nullable: true })
  kilometrajeInicial: number | null;

  @Column("integer", { name: "kilometraje_final", nullable: true })
  kilometrajeFinal: number | null;

  @ManyToOne(() => Empleados, (empleados) => empleados.alquileres)
  @JoinColumn([{ name: "id_empleado", referencedColumnName: "idEmpleado" }])
  idEmpleado: Empleados;

  @ManyToOne(() => Reservas, (reservas) => reservas.alquileres)
  @JoinColumn([{ name: "id_reserva", referencedColumnName: "idReserva" }])
  idReserva: Reservas;
}
