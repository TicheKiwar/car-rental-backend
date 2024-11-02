import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Brand } from "./Brand.entity";
import { Vehicles } from "./Vehicles.entity";

@Index("model_pkey", ["modelId"], { unique: true })
@Entity("model", { schema: "public" })
export class Model {
  @PrimaryGeneratedColumn({ type: "integer", name: "model_id" })
  modelId: number;

  @Column("character varying", { name: "model_name", length: 50 })
  modelName: string;

  @Column("integer", { name: "year", nullable: true })
  year: number | null;

  @ManyToOne(() => Brand, (brand) => brand.models)
  @JoinColumn([{ name: "brand_id", referencedColumnName: "brandId" }])
  brand: Brand;

  @OneToMany(() => Vehicles, (vehicles) => vehicles.model)
  vehicles: Vehicles[];
}
