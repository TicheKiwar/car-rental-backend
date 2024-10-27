import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Reservas } from "./Reservas.entity";
import { Modelo } from "./Modelo.entity";

// @Index("vehiculos_pkey", ["idVehiculo"], { unique: true })
@Entity("vehiculos", { schema: "public" })
export class Vehiculos {
  @Column("integer", { primary: true, name: "id_vehiculo" })
  idVehiculo: number;

  @Column("character varying", { name: "matricula", length: 20 })
  matricula: string;

  @Column("character varying", { name: "tipo", nullable: true, length: 50 })
  tipo: string | null;

  @Column("character varying", { name: "estado", nullable: true, length: 20 })
  estado: string | null;

  @Column("numeric", {
    name: "tarifa_x_dia",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  tarifaXDia: string | null;

  @Column("integer", { name: "capacidad", nullable: true })
  capacidad: number | null;

  @Column("character varying", { name: "calidad", nullable: true, length: 50 })
  calidad: string | null;

  @Column("integer", { name: "velocidad_maxima", nullable: true })
  velocidadMaxima: number | null;

  @Column("character varying", { name: "color", nullable: true, length: 30 })
  color: string | null;

  @Column("character varying", {
    name: "transmision",
    nullable: true,
    length: 20,
  })
  transmision: string | null;

  @Column("integer", { name: "numero_puertas", nullable: true })
  numeroPuertas: number | null;

  @Column("character varying", {
    name: "combustible",
    nullable: true,
    length: 20,
  })
  combustible: string | null;

  @OneToMany(() => Reservas, (reservas) => reservas.idVehiculo)
  reservas: Reservas[];

  @ManyToOne(() => Modelo, (modelo) => modelo.vehiculos)
  @JoinColumn([{ name: "id_modelo", referencedColumnName: "idModelo" }])
  idModelo: Modelo;
}
