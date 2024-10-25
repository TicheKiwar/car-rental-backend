import { Column, Entity, Index, OneToMany } from "typeorm";
import { Reservas } from "./Reservas";

@Index("clientes_correo_key", ["correo"], { unique: true })
@Index("clientes_pkey", ["idCliente"], { unique: true })
@Entity("clientes", { schema: "public" })
export class Clientes {
  @Column("integer", { primary: true, name: "id_cliente" })
  idCliente: number;

  @Column("character varying", {
    name: "direccion",
    nullable: true,
    length: 100,
  })
  direccion: string | null;

  @Column("character varying", { name: "telefono", nullable: true, length: 15 })
  telefono: string | null;

  @Column("character varying", { name: "nombre", nullable: true, length: 50 })
  nombre: string | null;

  @Column("character varying", { name: "apellido", nullable: true, length: 50 })
  apellido: string | null;

  @Column("character varying", {
    name: "correo",
    nullable: true,
    unique: true,
    length: 50,
  })
  correo: string | null;

  @Column("character varying", {
    name: "contraseña",
    nullable: true,
    length: 50,
  })
  contraseA: string | null;

  @OneToMany(() => Reservas, (reservas) => reservas.idCliente)
  reservas: Reservas[];
}
