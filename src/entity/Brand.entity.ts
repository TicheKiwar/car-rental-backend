import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Model } from "./Model.entity";

@Index("brand_pkey", ["brandId"], { unique: true })
@Index("brand_brand_name_key", ["brandName"], { unique: true })
@Entity("brand", { schema: "public" })
export class Brand {
  @PrimaryGeneratedColumn({ type: "integer", name: "brand_id" })
  brandId: number;

  @Column("character varying", { name: "brand_name", unique: true, length: 50 })
  brandName: string;

  @OneToMany(() => Model, (model) => model.brand)
  models: Model[];
}