import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Payments } from "src/entity/Payments.entity";
import { Rentals } from "src/entity/Rentals.entity";
import { PaymentController } from "./application/payment.controller";
import { PaymentService } from "./interface/payment.service";
import { RentalService } from "src/rental/interface/rental.service";
import { RentalModule } from "src/rental/rental.module";
import { Returns } from "src/entity/Returns.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Rentals,Payments, Returns]), RentalModule],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService]
})
export class PaymentModule {}