import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from "typeorm";
  
  @Entity("payment_methods", { schema: "public" })
  export class PaymentMethods {
    @PrimaryGeneratedColumn({ type: "integer", name: "payment_method_id" })
    paymentMethodId: number;
  
    @Column("character varying", { name: "method_name", length: 50 })
    methodName: string;
  
    @Column("boolean", { name: "is_active", default: () => "true" })
    isActive: boolean;
  }