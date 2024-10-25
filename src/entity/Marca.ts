import { Column, Entity, Index, OneToMany } from "typeorm";
import { Modelo } from "./Modelo";

@Index("marca_pkey", ["idMarca"], { unique: true })
@Entity("marca", { schema: "public" })
export class Marca {
  @Column("integer", { primary: true, name: "id_marca" })
  idMarca: number;

  @Column("character varying", { name: "nombre", length: 50 })
  nombre: string;

  @OneToMany(() => Modelo, (modelo) => modelo.idMarca)
  modelos: Modelo[];
}
