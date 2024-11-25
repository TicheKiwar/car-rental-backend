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

  @Column("timestamp without time zone", {
    name: "delete_date",
    nullable: true,
  })
  deletedAt: Date | null;

  @OneToMany(() => Model, (model) => model.brand)
  models: Model[];

    // Método para realizar un soft delete
    softDelete() {
      this.deletedAt = new Date();
    }
}
