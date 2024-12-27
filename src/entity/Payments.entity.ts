import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
  } from "typeorm";
  import { Rentals } from "./Rentals.entity";
import { PaymentMethods } from "./PaymentMethods.entity";

@Entity("payments", { schema: "public" })
export class Payments {
  @PrimaryGeneratedColumn({ type: "integer", name: "payment_id" })
  paymentId: number;

  @Column("integer", { name: "rental_id" })
  rentalId: number;

  @Column("character varying", { name: "payment_type", length: 20 })
  paymentType: string; // 'DEPOSIT', 'RENTAL', 'DAMAGE', 'DELAY', 'FUEL'

  @Column("integer", { name: "payment_method_id" })
  paymentMethodId: number;

  @Column("numeric", { name: "amount", precision: 10, scale: 2 })
  amount: number;

  @Column("timestamp", { name: "payment_date", default: () => "CURRENT_TIMESTAMP" })
  paymentDate: Date;

  @Column("character varying", { name: "status", length: 20 })
  status: string;

  @Column("boolean", { name: "is_refundable", default: () => "false" })
  isRefundable: boolean;

  @ManyToOne(() => Rentals, (rentals) => rentals.rentalId)
  @JoinColumn([{ name: "rental_id", referencedColumnName: "rentalId" }])
  rental: Rentals;

  @ManyToOne(() => PaymentMethods, (paymentMethods) => paymentMethods.paymentMethodId)
  @JoinColumn([{ name: "payment_method_id", referencedColumnName: "paymentMethodId" }])
  paymentMethod: PaymentMethods;
}
