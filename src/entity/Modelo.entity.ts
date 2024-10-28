import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Marca } from "./Marca.entity";
import { Vehiculos } from "./Vehiculos.entity";

// @Index("modelo_pkey", ["idModelo"], { unique: true })
@Entity("modelo", { schema: "public" })
export class Modelo {
  @Column("integer", { primary: true, name: "id_modelo" })
  idModelo: number;

  @Column("character varying", { name: "nombre", length: 50 })
  nombre: string;

  @Column("integer", { name: "año", nullable: true })
  aO: number | null;

  @ManyToOne(() => Marca, (marca) => marca.modelos)
  @JoinColumn([{ name: "id_marca", referencedColumnName: "idMarca" }])
  idMarca: Marca;

  @OneToMany(() => Vehiculos, (vehiculos) => vehiculos.idModelo)
  vehiculos: Vehiculos[];
}
