import { Column, Entity, Index, OneToMany } from "typeorm";
import { Alquileres } from "./Alquileres";

@Index("empleados_correo_key", ["correo"], { unique: true })
@Index("empleados_pkey", ["idEmpleado"], { unique: true })
@Entity("empleados", { schema: "public" })
export class Empleados {
  @Column("integer", { primary: true, name: "id_empleado" })
  idEmpleado: number;

  @Column("character varying", { name: "puesto", nullable: true, length: 50 })
  puesto: string | null;

  @Column("date", { name: "fecha_contratacion", nullable: true })
  fechaContratacion: string | null;

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

  @Column("character varying", { name: "rol", nullable: true, length: 50 })
  rol: string | null;

  @Column("character varying", {
    name: "contraseña",
    nullable: true,
    length: 50,
  })
  contraseA: string | null;

  @OneToMany(() => Alquileres, (alquileres) => alquileres.idEmpleado)
  alquileres: Alquileres[];
}
